---
layout: post
author: mike
---

# Proactive Remediations - BlockAADWorkplaceJoin

Blocking Workplace join prevents users from being prompted to join their device to a workplace during authentication. This is helpful on corporate devices, so that the device doesn't get joined to another tenant, as doing so can cause some things to break, for example Univeral Print.

## Detection Script:
```
<#
	.NOTES
	===========================================================================
	 Created on:   	07/11/2024
	 Created by:   	Mike Keeves
	 
	 Filename:     	BlockAADWorkplaceJoinDetect.ps1
	===========================================================================
	.DESCRIPTION
        Identifies if the workplace join is blocked, to prevent the device being added to other organisations
        HKLM\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin, "BlockAADWorkplaceJoin"=dword:00000001
#>

# exit 0 if no remediation required
# exit 1 if remediation required

$RegistryKey = $null
$RegistryKey = Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin" -Name BlockAADWorkplaceJoin -ErrorAction SilentlyContinue

try {
    if ($RegistryKey -eq $null) {
        Write-Output "Key not present, so will need to add it" 
        exit 1
    } else {
        Write-Output "Key present, now need to check value"
        if ($RegistryKey.BlockAADWorkplaceJoin -eq "00000001") {
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
	 Created on:   	07/12/2024
	 Created by:   	Mike Keeves
	 
	 Filename:     	BlockAADWorkplaceJoinRemediate.ps1
	===========================================================================
	.DESCRIPTION
		Identifies if the workplace join is blocked, to prevent the device being added to other organisations, and if not remediates.
        HKLM\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin, "BlockAADWorkplaceJoin"=dword:00000001
#>

# exit 0 if no remediation required
# exit 1 if remediation required

$RegistryKey = $null
$RegistryKey = Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin" -Name BlockAADWorkplaceJoin  -ErrorAction SilentlyContinue

try {
    if ($RegistryKey -eq $null) {
        Write-Output "Key not present, so will need to add it"
        New-ItemProperty "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin" -Name BlockAADWorkplaceJoin -Value "00000001" -PropertyType "DWord"
        exit 0
    } else {
        Write-Output "Key present, now need to check value"
        if ($RegistryKey.BlockAADWorkplaceJoin -eq "00000001") {
            Write-Output "Registry value correct, do nothing"
            exit 0
        }
        else {
            Write-Output "Registry value incorrect, so set it"
            Set-ItemProperty "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin" -Name BlockAADWorkplaceJoin -Value "00000001"
            exit 0
        }
    }
} catch {
	Write-Output "An issue occurred : $($_.Exception.Message)" | Out-Null
    exit 1
}
```