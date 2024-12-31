---
layout: post
author: mike
---

**Managing Duplicate Microsoft Teams Shortcuts via Intune Proactive Remediations**

In environments where OneDrive Known Folder Move is enabled and users access multiple Windows machines, duplicate application shortcuts—particularly for Microsoft Teams—may proliferate on user desktops. This guide outlines a method to identify and remove these redundant shortcuts using Intune's Proactive Remediation feature.

**Detection Script**

The following PowerShell script detects multiple copies of the Microsoft Teams shortcut on a user's desktop. It includes enhanced logging and error handling to facilitate troubleshooting.

```powershell
<#
.NOTES
===========================================================================
    Created on:    23/12/2021
    Created by:    Mike Keeves
    Filename:      ShortcutTeamsDetect.ps1
===========================================================================
.DESCRIPTION
    Identifies if the current user has multiple copies of the Teams shortcut on the desktop.
#>

# Define the pattern for duplicate Teams shortcuts
$ShortcutPattern = "Microsoft Teams - Copy*.lnk"

# Retrieve the current user's desktop path
try {
    $UsersDesktop = (Get-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" -Name "Desktop").Desktop
    if (-not (Test-Path $UsersDesktop)) {
        Write-Output "Desktop path not found."
        exit 0
    }
} catch {
    Write-Error "Failed to retrieve desktop path: $_"
    exit 1
}

# Search for duplicate Teams shortcuts
try {
    $DuplicateShortcuts = Get-ChildItem -Path $UsersDesktop -Filter $ShortcutPattern -ErrorAction Stop
    if ($DuplicateShortcuts.Count -eq 0) {
        Write-Output "No duplicate Teams shortcuts found."
        exit 0
    } else {
        Write-Output "Duplicate Teams shortcuts detected."
        exit 1
    }
} catch {
    Write-Error "Error searching for shortcuts: $_"
    exit 1
}
```

**Remediation Script**

The following PowerShell script removes any detected duplicate Microsoft Teams shortcuts from the user's desktop. It incorporates enhanced logging and error handling to ensure reliability.

```powershell
<#
.NOTES
===========================================================================
    Created on:    23/12/2021
    Created by:    Mike Keeves
    Filename:      ShortcutTeamsRemediate.ps1
===========================================================================
.DESCRIPTION
    Removes duplicate Microsoft Teams shortcuts from the current user's desktop.
#>

# Define the pattern for duplicate Teams shortcuts
$ShortcutPattern = "Microsoft Teams - Copy*.lnk"

# Retrieve the current user's desktop path
try {
    $UsersDesktop = (Get-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" -Name "Desktop").Desktop
    if (-not (Test-Path $UsersDesktop)) {
        Write-Output "Desktop path not found."
        exit 0
    }
} catch {
    Write-Error "Failed to retrieve desktop path: $_"
    exit 1
}

# Search for and remove duplicate Teams shortcuts
try {
    $DuplicateShortcuts = Get-ChildItem -Path $UsersDesktop -Filter $ShortcutPattern -ErrorAction Stop
    if ($DuplicateShortcuts.Count -eq 0) {
        Write-Output "No duplicate Teams shortcuts to remove."
        exit 0
    } else {
        foreach ($Shortcut in $DuplicateShortcuts) {
            Remove-Item -Path $Shortcut.FullName -ErrorAction Stop
            Write-Output "Removed shortcut: $($Shortcut.Name)"
        }
        Write-Output "All duplicate Teams shortcuts removed."
        exit 0
    }
} catch {
    Write-Error "Error removing shortcuts: $_"
    exit 1
}
```

**Implementation Steps**

1. **Access Intune Admin Center**: Navigate to the Microsoft Intune admin center.

2. **Create Proactive Remediation**:
   - Go to **Reports** > **Endpoint analytics** > **Proactive remediations**.
   - Click on **+ Create script package**.
   - Provide a name and description for the remediation.
   - Upload the detection and remediation scripts provided above.
   - Configure the schedule and scope according to organizational requirements.
   ![Proactive Remediation Configuration](/mkeeves.github.io_images/2024-11-02-proactive-remediation-shortcutcleanupteams/1.jpg)

3. **Assign to Devices**: Assign the remediation to the appropriate device groups, ensuring that all relevant systems are targeted.

4. **Monitor Deployment**: After deployment, monitor the remediation status to confirm successful application across devices.

**Best Practices**

- **Testing**: Before wide deployment, test the scripts on a subset of devices to verify functionality and prevent potential disruptions.

- **Logging**: Ensure that logging is enabled and logs are monitored to detect any issues promptly.

- **Error Handling**: The scripts include error handling to manage exceptions gracefully; review and customize error messages as needed for your environment.

- **Documentation**: Maintain documentation of the remediation process, including script versions and deployment history, for future reference.

**Advanced Use Cases**

- **Custom Shortcut Management**: Modify the scripts to target other applications that may have duplicate shortcuts, adjusting the `$ShortcutPattern` variable accordingly.

By following this guide, IT administrators can effectively manage and remove duplicate Microsoft Teams shortcuts from user desktops, ensuring a streamlined and user-friendly environment. 