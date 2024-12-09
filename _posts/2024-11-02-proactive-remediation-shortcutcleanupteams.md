---
layout: post
author: mike
---

# Proactive Remediations - Shortcut Cleanup - Teams

When OneDrive known folder move is enabled and syncs the desktop, and additionally if users log onto multiple Windows machines, then depending upon the applications installed it's possible that a user might get multiple copies of application shortcuts on their desktop. One example is Teams, and this article shows how to remove these using a Proactive Remdiation:

![Proactive Remediation Configuration](/mkeeves.github.io_images/2024-11-02-proactive-remediation-shortcutcleanupteams/1.jpg)

## Detection Script:
```
<#
	.NOTES
	===========================================================================
	 Created on:   	23/12/2021 11:23
	 Created by:   	Mike Keeves
	 Filename:     	ShortcutTeamsDetect.ps1
	===========================================================================
	.DESCRIPTION
		Identifies the current user has multiple copies of the Teams shortcut on desktop
#>

#File to look for
$File = "Microsoft Teams - Copy*.lnk"

#Get location of current users desktop
$UsersDesktop = (Get-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" -Name "Desktop").Desktop

$FilePresent = $null
$FilePresent = Get-ChildItem -Path $UsersDesktop -Name $File

try {
    if ($FilePresent -eq $null) {
        Write-Output "Files not present"; exit 0
    } else {
        Write-Output "Files present, needs cleanup"; exit 1
    }
} catch {
	Write-Output "An issue occurred : $($_.Exception.Message)"; exit 1
}
```


## Remediation Script:
```
<#
	.NOTES
	===========================================================================
	 Created on:   	23/12/2021 11:23
	 Created by:   	Mike Keeves
	 Filename:     	ShortcutTeamsRemediate.ps1
	===========================================================================
	.DESCRIPTION
		Identifies the current user has multiple copies of the Teams shortcut on desktop
#>

#File to look for
$File = "Microsoft Teams - Copy*.lnk"

#Get location of current users desktop
$UsersDesktop = (Get-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" -Name "Desktop").Desktop

$FilePresent = $null
$FilePresent = Get-ChildItem -Path $UsersDesktop -Name $File

try {
    if ($FilePresent -eq $null) {
        Write-Output "Files not present"; exit 0
    } else {
        Remove-Item -Path ($UsersDesktop + "\" + $FilePresent)
        Write-Output "Files removed"; exit 0
    }
} catch {
	Write-Output "An issue occurred : $($_.Exception.Message)"; exit 1
}
```