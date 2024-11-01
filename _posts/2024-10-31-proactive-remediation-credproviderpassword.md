---
layout: post
author: mike
---

# Proactive Remediations - Credential Provider Password Default

Setting the credential provider to password as default on Windows is useful when enabling web sign in, which is a prerequisite for TAP (Temporary Access Pass). It's possible to do this by doing configuration from the Settings Catalog, however I've found this sometimes doesn't work, which can be an issue on Shared Devices which are often used by users who are less IT literate.

To fix this, I've written a Proactive Remediation which can be implemented via Intune as follows:

![Proactive Remediation Configuration](/mkeeves.github.io_images/2024-10-31-proactive-remediation-credproviderpassword/1.jpg)

## Detection Script:
```
<#
    .NOTES
    ===========================================================================
        Created on:   	29/10/2024 14:10
        Created by:   	Mike Keeves
    
        Filename:     	CredentialProviderPasswordDetect.ps1
    ===========================================================================
    .DESCRIPTION
        Identifies if the default credential provider is set to Password
#>

# exit 0 if no remediation required
# exit 1 if remediation required

$RegistryKey = $null
$RegistryKey = Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\System" -Name DefaultCredentialProvider

try {
    if ($RegistryKey -eq $null) {
        Write-Output "Key not present, so will need to add it" 
        exit 1
    } else {
        Write-Output "Key present, now need to check value"
        if ($RegistryKey.DefaultCredentialProvider -eq "{60b78e88-ead8-445c-9cfd-0b87f74ea6cd}") {
            Write-Output "Registry value correct, do nothing"
            exit 0
        }
        else {
            Write-Output "Registry value incorrect, so set it"
            exit 1
        }
    }
} catch {
    Write-Output "An issue occurred : $($_.Exception.Message)" | Out-Null
    exit 1
}
```


## Remediation Script:
```
<#
	.NOTES
	===========================================================================
	 Created on:   	29/10/2024 14:10
	 Created by:   	Mike Keeves
	 
	 Filename:     	CredentialProviderPasswordRemediate.ps1
	===========================================================================
	.DESCRIPTION
		Identifies if the default credential provider is set to Password, and if not remediates.
#>

# exit 0 if no remediation required
# exit 1 if remediation required

$RegistryKey = $null
$RegistryKey = Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\System" -Name DefaultCredentialProvider

try {
    if ($RegistryKey -eq $null) {
        Write-Output "Key not present, so will need to add it"
        New-ItemProperty "HKLM:\SOFTWARE\Policies\Microsoft\Windows\System" -Name DefaultCredentialProvider -Value "{60b78e88-ead8-445c-9cfd-0b87f74ea6cd}" -PropertyType "REG_SZ"
        exit 0
    } else {
        Write-Output "Key present, now need to check value"
        if ($RegistryKey.DisabledComponents -eq "{60b78e88-ead8-445c-9cfd-0b87f74ea6cd}") {
            Write-Output "Registry value correct, do nothing"
            exit 0
        }
        else {
            Write-Output "Registry value incorrect, so set it"
            Set-ItemProperty "HKLM:\SOFTWARE\Policies\Microsoft\Windows\System" -Name DefaultCredentialProvider -Value "{60b78e88-ead8-445c-9cfd-0b87f74ea6cd}"
            exit 0
        }
    }
} catch {
	Write-Output "An issue occurred : $($_.Exception.Message)" | Out-Null
    exit 1
}
```