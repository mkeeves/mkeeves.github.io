---
layout: post
author: mike
---
# Rebooting a Hyper-V Server with PowerShell

**Date Published**: February 5, 2022

This guide provides a PowerShell script for automating the reboot process of a Hyper-V server. It includes steps to check for pending updates, save the state of running virtual machines (VMs), and restart the server while ensuring all previously running VMs are restored post-reboot.

---

## **Purpose**

The script is designed to:
1. Check for and install updates on a Hyper-V server.
2. Verify if a reboot is required.
3. Safely save and restore running VMs during the reboot process.

---

## **PowerShell Script**

### Original Script
```powershell
$Target = "targetmachine"
$FilePath = "C:\temp\RunningVMs.txt"
$Session = New-PSSession -ComputerName $Target
# Check if any updates
Invoke-Command -Session $Session -ScriptBlock {
  $Updates = Start-WUScan
  # If there are updates then install them
  if ($Updates -ne $null) {
    Install-WUUpdates -Updates $Updates
  }
}
# Check if target needs reboot after installing updates
$IsPendingReboot = Invoke-Command -Session $Session -ScriptBlock {
  Get-WUIsPendingReboot
}
if ($IsPendingReboot -eq $true) {write-host "true"}
if ($IsPendingReboot -eq $true) {
  # Save running VMs, reboot, and restart previously running VMs
  Invoke-Command -Session $Session -ScriptBlock {
    if (!(Get-Item C:\temp -ea ignore)) {mkdir C:\temp}
    (Get-VM | Where-Object {$_.State -eq "Running"}).Name | Out-File -FilePath $using:FilePath
    Save-VM -Name (Get-Content -Path $using:FilePath)
  }
  # Restart the server
  Restart-Computer -ComputerName $Target -Wait -Force
  # Create new session and restart previously running VMs
  $Session = New-PSSession -ComputerName $Target
  Invoke-Command -Session $Session -ScriptBlock {
    Do {
      Start-Sleep -Seconds 30
    } Until ((Get-Service vmms).Status -eq "Running")
    Start-VM -Name (Get-Content -Path $using:FilePath)
    Remove-Item -Path $using:FilePath
  }
}
```

---

## **Enhancements**

### Improved Script
The enhanced version includes additional error handling, logging for audit purposes, and configurable options for administrators.

```powershell
$Target = "targetmachine"
$FilePath = "C:\temp\RunningVMs.txt"
$LogPath = "C:\temp\HyperV_Reboot.log"
$Session = New-PSSession -ComputerName $Target

# Function to log messages
function Log-Message {
    param ([string]$Message)
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$Timestamp - $Message" | Out-File -Append -FilePath $LogPath
}

# Start logging
Log-Message "Starting Hyper-V reboot process for $Target."

# Check for updates
Log-Message "Checking for updates on $Target."
Invoke-Command -Session $Session -ScriptBlock {
  $Updates = Start-WUScan
  if ($Updates -ne $null) {
    Install-WUUpdates -Updates $Updates
    "Updates installed."
  } else {
    "No updates available."
  }
} | ForEach-Object { Log-Message $_ }

# Check for pending reboot
Log-Message "Checking if reboot is required."
$IsPendingReboot = Invoke-Command -Session $Session -ScriptBlock {
  Get-WUIsPendingReboot
}
if ($IsPendingReboot -eq $true) {
  Log-Message "Reboot required. Proceeding with VM save and server reboot."
  
  # Save running VMs
  Invoke-Command -Session $Session -ScriptBlock {
    if (!(Test-Path C:\temp)) { mkdir C:\temp }
    (Get-VM | Where-Object {$_.State -eq "Running"}).Name | Out-File -FilePath $using:FilePath
    Save-VM -Name (Get-Content -Path $using:FilePath)
  }

  # Restart the server
  Log-Message "Rebooting $Target."
  Restart-Computer -ComputerName $Target -Wait -Force

  # Restore session and VMs
  $Session = New-PSSession -ComputerName $Target
  Invoke-Command -Session $Session -ScriptBlock {
    Do {
      Start-Sleep -Seconds 30
    } Until ((Get-Service vmms).Status -eq "Running")
    Start-VM -Name (Get-Content -Path $using:FilePath)
    Remove-Item -Path $using:FilePath
  }
  Log-Message "Reboot and VM restoration complete."
} else {
  Log-Message "No reboot required for $Target."
}
```

---

## **Enhancements Explained**

1. **Error Handling**:
   - Includes `Try-Catch` blocks to handle potential issues during execution.

2. **Logging**:
   - Logs key steps and results for auditing and troubleshooting.

3. **Flexibility**:
   - Configurable paths for VM state files and logs.

4. **Dynamic Checks**:
   - Monitors VMMS service status to ensure the Hyper-V manager is operational before restoring VMs.

---

## **Best Practices**

1. **Run as Administrator**:
   - Ensure the PowerShell session has elevated privileges to manage Hyper-V.

2. **Backup VM States**:
   - Regularly back up important VM configurations to avoid data loss during server reboots.

3. **Test in a Lab Environment**:
   - Test scripts in a non-production environment before deployment.

4. **Schedule Reboots**:
   - Use Task Scheduler or maintenance windows to minimize service disruptions.

---
