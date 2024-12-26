---
layout: post
author: mike
---

# Managing Microsoft Partner Center with PowerShell

**Date Published**: January 28, 2024

This guide explains how to use the Microsoft Partner Center PowerShell module to manage your Partner Center activities effectively. The article includes steps for module installation, connecting to the Partner Center, and retrieving essential audit and organization data.

---

## **Steps for Managing Partner Center**

### **1. Install the Partner Center Module**

To interact with the Partner Center API, install the Partner Center PowerShell module:
```powershell
Install-Module -Name PartnerCenter -AllowClobber -Scope AllUsers
```

#### **Verify Installation**
Check if the module is installed successfully:
```powershell
Get-Module -Name PartnerCenter -ListAvailable
```

---

### **2. Connect to Partner Center**

Establish a session with Partner Center:
```powershell
Connect-PartnerCenter
```

#### **Verify Connection**
Run the following command to confirm connection status:
```powershell
Get-Partner
```

---

### **3. Retrieve Partner Center Audit Records**

Audit records help track changes and events within Partner Center. Use the following command to retrieve audit logs from the last 89 days:
```powershell
Get-PartnerAuditRecord -Start (Get-Date).AddDays(-89) | Select-Object ResourceType,OrganizationName,Id,Name
```

---

## **Enhancements**

### **Improved Logging**
Add logging to capture Partner Center activities for auditing and troubleshooting:
```powershell
$logFile = "C:\Logs\PartnerCenter_Log.txt"
function Log-Message {
    param ([string]$Message)
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$Timestamp - $Message" | Out-File -FilePath $logFile -Append
}

Log-Message "Starting Partner Center session."
Connect-PartnerCenter
Log-Message "Connected to Partner Center successfully."
```

### **Dynamic Date Range for Audit Records**
Enable dynamic date range input for retrieving audit logs:
```powershell
$daysBack = Read-Host "Enter the number of days to retrieve audit logs"
$startDate = (Get-Date).AddDays(-$daysBack)
Get-PartnerAuditRecord -Start $startDate | Select-Object ResourceType,OrganizationName,Id,Name
```

### **Error Handling**
Add error handling for connection and command execution:
```powershell
try {
    Connect-PartnerCenter
    Write-Host "Connected successfully." -ForegroundColor Green
} catch {
    Write-Host "Failed to connect to Partner Center: $_" -ForegroundColor Red
}
```

---

## **Additional Commands**

### **List All Partner Accounts**
Retrieve a list of all partner accounts associated with your organization:
```powershell
Get-PartnerCustomer
```

### **Retrieve Partner Agreement Details**
Check the agreement status for customers:
```powershell
Get-PartnerAgreementDetail | Select-Object AgreementType,CustomerId,Status
```

---

## **Best Practices**

1. **Secure Credentials**:
   - Avoid hardcoding credentials. Use secure methods like `Get-Credential` for authentication.

2. **Review Audit Logs Regularly**:
   - Periodically analyze audit logs to identify unusual activities.

3. **Automate Reporting**:
   - Schedule PowerShell scripts to run periodically using Task Scheduler for continuous monitoring.

4. **Backup Data**:
   - Always export important Partner Center data for backup purposes.

---
