---
layout: post
author: mike
---
# Checking Default MFA Method for Users

**Date Published**: February 5, 2022

This guide provides a PowerShell script for service desk teams to efficiently check the default multi-factor authentication (MFA) methods assigned to users in an organization. Enhancements include improved output formatting and additional error handling.

---

## **Purpose**

The script is designed to:
1. Connect to Microsoft Online Services.
2. Retrieve the default MFA method for specified users.
3. Display results in a clear, color-coded format to indicate method status.

---

## **PowerShell Script**

### Original Script
```powershell
$Users = "samaccountname1|samaccountname2"
$Users = $Users.Split("|")
Connect-MsolService
ForEach ($User in $Users) {
   $UPN = (Get-ADUser $User).UserPrincipalName
   $MethodType = ((Get-MsolUser -UserPrincipalName $upn).StrongAuthenticationMethods | Where-Object {$_.IsDefault -eq $true}).MethodType
   If ($MethodType -eq "PhoneAppNotification") {Write-Host $UPN $MethodType -f Green}
   ElseIf ($MethodType -eq "TwoWayVoiceMobile") {Write-Host $UPN $MethodType -f Green}
   Else {Write-Host $UPN $MethodType -f Red}
}
```

---

## **Enhanced Script**

The improved script includes dynamic input, error handling, and CSV export for reporting.

```powershell
# Prompt for user input or file path
$UserInput = Read-Host "Enter samAccountNames separated by '|' or provide a file path"
If (Test-Path $UserInput) {
    $Users = Get-Content $UserInput
} Else {
    $Users = $UserInput.Split("|")
}

# Connect to Microsoft Online Services
Connect-MsolService

# Initialize results array
$Results = @()

# Process each user
ForEach ($User in $Users) {
    Try {
        $UPN = (Get-ADUser $User -ErrorAction Stop).UserPrincipalName
        $MethodType = ((Get-MsolUser -UserPrincipalName $UPN).StrongAuthenticationMethods | Where-Object {$_.IsDefault -eq $true}).MethodType

        # Determine MFA method status
        If ($MethodType -eq "PhoneAppNotification" -or $MethodType -eq "TwoWayVoiceMobile") {
            Write-Host "$UPN: $MethodType" -ForegroundColor Green
            $Status = "Success"
        } Else {
            Write-Host "$UPN: $MethodType" -ForegroundColor Red
            $Status = "Non-Standard MFA"
        }

        # Add to results array
        $Results += [PSCustomObject]@{
            UserPrincipalName = $UPN
            MFAType           = $MethodType
            Status            = $Status
        }
    } Catch {
        Write-Host "Error processing $User: $_" -ForegroundColor Yellow
        $Results += [PSCustomObject]@{
            UserPrincipalName = $User
            MFAType           = "Error"
            Status            = "Failed"
        }
    }
}

# Export results to CSV
$Results | Export-Csv -Path "MFA_Status_Report.csv" -NoTypeInformation -Force
Write-Host "MFA status report saved to MFA_Status_Report.csv" -ForegroundColor Cyan
```

---

## **Enhancements Explained**

### 1. **Dynamic Input**
- Users can now provide input directly or specify a file containing `samAccountName` entries.

### 2. **Error Handling**
- Handles potential errors from `Get-ADUser` or `Get-MsolUser` commands.
- Logs errors for later review.

### 3. **Output Enhancements**
- Saves results to a CSV file for easy sharing and reporting.
- Uses `Write-Host` with color coding to highlight statuses.

### 4. **Improved Flexibility**
- Supports non-standard MFA types and provides appropriate warnings.

---

## **Best Practices**

1. **Secure Connectivity**:
   - Ensure PowerShell is run with appropriate permissions and secure endpoints.

2. **Review Results**:
   - Periodically review MFA reports to ensure compliance with organizational policies.

3. **Automate Scheduling**:
   - Use Task Scheduler to run this script periodically and generate automated reports.

---
