---
layout: post
author: mike
---

**Blocking Workplace Join via Intune Proactive Remediations**

Preventing devices from joining unintended Azure Active Directory (AAD) tenants is crucial for maintaining organizational security and functionality. Unintended Workplace Joins can disrupt services such as Universal Print. This guide details how to block Workplace Join using Intune's Proactive Remediation feature.

**Detection Script**

The following PowerShell script checks if the Workplace Join is blocked by verifying a specific registry setting.

```powershell
<#
.NOTES
===========================================================================
    Created on:    07/11/2024
    Created by:    Mike Keeves
    Filename:      BlockAADWorkplaceJoinDetect.ps1
===========================================================================
.DESCRIPTION
    Checks if Workplace Join is blocked to prevent the device from being added to other organizations.
    Verifies if the registry key HKLM\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin\BlockAADWorkplaceJoin is set to 1.
#>

# Exit codes:
# 0 - No remediation required
# 1 - Remediation required

$RegistryPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin"
$RegistryName = "BlockAADWorkplaceJoin"
$DesiredValue = 1

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

The following PowerShell script sets the registry key to block Workplace Join if it is not already configured.

```powershell
<#
.NOTES
===========================================================================
    Created on:    07/12/2024
    Created by:    Mike Keeves
    Filename:      BlockAADWorkplaceJoinRemediate.ps1
===========================================================================
.DESCRIPTION
    Blocks Workplace Join by setting the registry key HKLM\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin\BlockAADWorkplaceJoin to 1.
#>

# Exit codes:
# 0 - Remediation successful or not required
# 1 - Remediation failed

$RegistryPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin"
$RegistryName = "BlockAADWorkplaceJoin"
$DesiredValue = 1

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
        Write-Output "Setting registry value to block Workplace Join."
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

By following this guide, IT administrators can effectively block Workplace Join on Windows devices, preventing unauthorized associations with other organizations and maintaining the integrity of corporate resources. 