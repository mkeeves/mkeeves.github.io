---
layout: post
author: mike
---

# Proactive Remediations - PreferIPv4

Configures IPv4 to be preferred over IPv6. Requires reboot to take effect, which is not handled by script

## Detection Script:
```
<#
	.NOTES
	===========================================================================
	 Created on:   	31/01/2022 11:51
	 Created by:   	Mike Keeves
	 
	 Filename:     	IPv4PreferredDetect.ps1
	===========================================================================
	.DESCRIPTION
		Identifies if IPv4 is preferred over IPv6. A reboot is required after setting reg key, which is not handled by this script
#>

# exit 0 if no remediation required
# exit 1 if remediation required

$RegistryKey = $null
$RegistryKey = Get-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\" -Name DisabledComponents

try {
    if ($RegistryKey -eq $null) {
        Write-Output "Key not present, so will need to add it" 
        exit 1
    } else {
        Write-Output "Key present, now need to check value"
        if ($RegistryKey.DisabledComponents -eq "32") {
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
	 Created on:   	31/01/2022 11:51
	 Created by:   	Mike Keeves
	 
	 Filename:     	IPv4PreferredRemediate.ps1
	===========================================================================
	.DESCRIPTION
		Identifies if IPv4 is preferred over IPv6, and if not remediates. A reboot is required after setting reg key, which is not handled by this script
#>

# exit 0 if no remediation required
# exit 1 if remediation required

$RegistryKey = $null
$RegistryKey = Get-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\" -Name DisabledComponents

try {
    if ($RegistryKey -eq $null) {
        Write-Output "Key not present, so will need to add it"
        New-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\" -Name DisabledComponents -Value 0x20 -PropertyType "DWord"
        exit 0
    } else {
        Write-Output "Key present, now need to check value"
        if ($RegistryKey.DisabledComponents -eq "32") {
            Write-Output "Registry value correct, do nothing"
            exit 0
        }
        else {
            Write-Output "Registry value incorrect, so set it"
            Set-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\" -Name DisabledComponents -Value 0x20
            exit 0
        }
    }
} catch {
	Write-Output "An issue occurred : $($_.Exception.Message)" | Out-Null
    exit 1
}
```