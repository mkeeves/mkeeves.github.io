---
layout: post
author: mike
---

**Configuring Preference for IPv4 over IPv6 via Intune Proactive Remediations**

In certain network environments, prioritizing IPv4 over IPv6 can enhance compatibility and performance. This guide outlines how to configure Windows devices to prefer IPv4 using Intune's Proactive Remediation feature. Please note that a system reboot is required for the changes to take effect; this script does not handle the reboot process.

**Detection Script**

The following PowerShell script checks whether the system is configured to prefer IPv4 over IPv6 by examining the relevant registry setting.

```powershell
<#
.NOTES
===========================================================================
    Created on:    31/01/2022
    Created by:    Mike Keeves
    Filename:      IPv4PreferredDetect.ps1
===========================================================================
.DESCRIPTION
    Checks if the system is configured to prefer IPv4 over IPv6.
    A reboot is required after setting the registry key; this script does not handle the reboot.
#>

# Exit codes:
# 0 - No remediation required
# 1 - Remediation required

$RegistryPath = "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters"
$RegistryName = "DisabledComponents"
$DesiredValue = 32

try {
    if (Test-Path $RegistryPath) {
        $RegistryKey = Get-ItemProperty -Path $RegistryPath -Name $RegistryName -ErrorAction Stop
        if ($RegistryKey.$RegistryName -eq $DesiredValue) {
            Write-Output "Registry value is correct; no action needed."
            exit 0
        } else {
            Write-Output "Registry value is incorrect; remediation required."
            exit 1
        }
    } else {
        Write-Output "Registry path not found; remediation required."
        exit 1
    }
} catch {
    Write-Error "An error occurred: $_"
    exit 1
}
```

**Remediation Script**

The following PowerShell script sets the registry key to prefer IPv4 over IPv6 if it is not already configured.

```powershell
<#
.NOTES
===========================================================================
    Created on:    31/01/2022
    Created by:    Mike Keeves
    Filename:      IPv4PreferredRemediate.ps1
===========================================================================
.DESCRIPTION
    Configures the system to prefer IPv4 over IPv6 by setting the appropriate registry key.
    A reboot is required after setting the registry key; this script does not handle the reboot.
#>

# Exit codes:
# 0 - Remediation successful or not required
# 1 - Remediation failed

$RegistryPath = "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters"
$RegistryName = "DisabledComponents"
$DesiredValue = 32

try {
    if (-not (Test-Path $RegistryPath)) {
        Write-Output "Registry path not found; creating path."
        New-Item -Path $RegistryPath -Force -ErrorAction Stop | Out-Null
    }
    $RegistryKey = Get-ItemProperty -Path $RegistryPath -Name $RegistryName -ErrorAction SilentlyContinue
    if ($RegistryKey -and $RegistryKey.$RegistryName -eq $DesiredValue) {
        Write-Output "Registry value is correct; no action needed."
        exit 0
    } else {
        Write-Output "Setting registry value to prefer IPv4 over IPv6."
        New-ItemProperty -Path $RegistryPath -Name $RegistryName -Value $DesiredValue -PropertyType DWord -Force -ErrorAction Stop | Out-Null
        Write-Output "Registry value set successfully."
        exit 0
    }
} catch {
    Write-Error "An error occurred during remediation: $_"
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

3. **Assign to Devices**: Assign the remediation to the appropriate device groups, ensuring that all relevant systems are targeted.

4. **Monitor Deployment**: After deployment, monitor the remediation status to confirm successful application across devices.

**Best Practices**

- **Testing**: Before wide deployment, test the scripts on a subset of devices to verify functionality and prevent potential disruptions.

- **Logging**: Ensure that logging is enabled and logs are monitored to detect any issues promptly.

- **Error Handling**: The scripts include error handling to manage exceptions gracefully; review and customize error messages as needed for your environment.

- **Documentation**: Maintain documentation of the remediation process, including script versions and deployment history, for future reference.

By following this guide, IT administrators can configure Windows devices to prefer IPv4 over IPv6, enhancing network compatibility and performance in environments where IPv4 is predominant.
