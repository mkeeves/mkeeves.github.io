---
layout: post
title: "Proactive Remediation: Credential Provider Password"
date: 2024-10-31
author: mike
tags: [Intune, PowerShell, Security, Credential Provider, Proactive Remediation]
categories: [Intune, Security]
excerpt: "Intune Proactive Remediation solution for managing credential provider password settings across Windows devices."
---

**Configuring Default Credential Provider to Password Using Intune Proactive Remediations**

Ensuring that the default credential provider is set to password on Windows systems is important, particularly when enabling web sign-in for shared devices, which are more likely to be used by individuals with limited IT proficiency. Web sign-in is a prerequisite for Temporary Access Pass (TAP). While this configuration can be managed through the Settings Catalog, inconsistencies may occur due to reliability issues. To mitigate this, implementing a Proactive Remediation through Intune is recommended.

**Detection Script**

The following PowerShell script verifies whether the default credential provider is configured to password.

```powershell
<#
.NOTES
===========================================================================
    Created on:    29/10/2024
    Created by:    Mike Keeves
    Filename:      CredentialProviderPasswordDetect.ps1
===========================================================================
.DESCRIPTION
    Checks if the default credential provider is set to Password.
#>

# Exit codes:
# 0 - No remediation required
# 1 - Remediation required

$RegistryPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\System"
$RegistryName = "DefaultCredentialProvider"
$DesiredValue = "{60b78e88-ead8-445c-9cfd-0b87f74ea6cd}"

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

The following PowerShell script sets the default credential provider to password if it is not already configured.

```powershell
<#
.NOTES
===========================================================================
    Created on:    29/10/2024
    Created by:    Mike Keeves
    Filename:      CredentialProviderPasswordRemediate.ps1
===========================================================================
.DESCRIPTION
    Sets the default credential provider to Password if not already set.
#>

# Exit codes:
# 0 - Remediation successful or not required
# 1 - Remediation failed

$RegistryPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\System"
$RegistryName = "DefaultCredentialProvider"
$DesiredValue = "{60b78e88-ead8-445c-9cfd-0b87f74ea6cd}"

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
        Write-Output "Setting registry value to desired state."
        Set-ItemProperty -Path $RegistryPath -Name $RegistryName -Value $DesiredValue -ErrorAction Stop
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
   - Configure the schedule and scope as per organizational requirements.
   ![Proactive Remediation Configuration](/mkeeves.github.io_images/2024-10-31-proactive-remediation-credproviderpassword/1.jpg)

3. **Assign to Devices**: Assign the remediation to the appropriate device groups, ensuring that all relevant systems are targeted.

4. **Monitor Deployment**: After deployment, monitor the remediation status to confirm successful application across devices.

**Best Practices**

- **Testing**: Before wide deployment, test the scripts on a subset of devices to verify functionality and prevent potential disruptions.

- **Logging**: Ensure that logging is enabled and logs are monitored to detect any issues promptly.

- **Error Handling**: The scripts include error handling to manage exceptions gracefully; review and customize error messages as needed for your environment.

- **Documentation**: Maintain documentation of the remediation process, including script versions and deployment history, for future reference.

**Advanced Use Cases**

- **Custom Credential Providers**: If your organization utilizes custom credential providers, modify the `$DesiredValue` in the scripts to match the GUID of the preferred provider.

- **Conditional Logic**: Enhance the scripts to include conditional logic that adapts to different operating system versions or device configurations.

- **Integration with Monitoring Tools**: Integrate the remediation process with existing monitoring tools to receive real-time alerts on script execution status.

By following this guide, IT administrators can ensure that the default credential provider is consistently set to password across Windows devices, facilitating seamless web sign-in and compliance with organizational security policies. 