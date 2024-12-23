---
layout: post
author: mike
---
# General PowerShell Commands

**Date Published**: January 28, 2022

This article consolidates a variety of general-purpose PowerShell commands for IT administrators. From Active Directory to DNS, SharePoint, and Azure, these commands help streamline tasks and improve efficiency.

---

## **Active Directory**

### Get Active Directory Schema Version
Retrieve the schema version of your Active Directory:
```powershell
Get-ADObject (Get-ADRootDSE).schemaNamingContext -Property objectVersion
```

### Get Groups with Extension Attributes
List all groups with their `extensionAttribute15`:
```powershell
Get-ADGroup -Filter * -Properties extensionAttribute15 | Select name, extensionAttribute15
```

### Set Extension Attributes for Groups
Apply a value to `extensionAttribute15` for a group array:
```powershell
foreach ($i in $groups) {Set-ADGroup $i -add @{extensionAttribute15="NoSync"}}
```

### Remove Extension Attribute from a Group
Clear `extensionAttribute15` for a specific group:
```powershell
Set-ADGroup "groupname" -Clear "extensionAttribute15"
```

---

## **Autopilot**

### Save and Generate Windows Autopilot Information
Save the script and generate the CSV for Autopilot:
```powershell
Save-Script -Name Get-WindowsAutoPilotInfo -Path c:\temp
Get-WindowsAutoPilotInfo.ps1 -OutputFile c:\temp\WindowsAutoPilotInfo.csv
```

---

## **SharePoint and OneDrive**

### Install SharePoint Online Module
```powershell
Install-Module -Name Microsoft.Online.SharePoint.PowerShell
```

### Connect to SharePoint Admin Site
```powershell
$SPAdminSite = "https://contoso-admin.sharepoint.com"
Connect-SPOService -Url $SPAdminSite
```

### List All OneDrive Sites
Retrieve all personal OneDrive sites:
```powershell
Get-SPOSite -IncludePersonalSite $true -Limit all -Filter "Url -like '-my.sharepoint.com/personal/"
```

### Remove SharePoint/OneDrive Site
Delete a specific SharePoint or OneDrive site:
```powershell
Remove-SPOSite -Identity https://contoso-my.sharepoint.com/personal/j_doe_contoso_com
```

### Grant Permissions to Another User’s OneDrive
```powershell
Set-SPOUser -Site https://contoso-my.sharepoint.com/personal/j_doe_contoso_com -LoginName firstname.surname@contoso.com -IsSiteCollectionAdmin $false
```

---

## **Exchange and Azure**

### Install Exchange Online Management Module
```powershell
Install-Module -Name ExchangeOnlineManagement
```

### Get All Azure AD Users Except Members
```powershell
Get-AzureADUser -All $true | Where {$_.UserType -ne "Member" -and $_.UserState -ne "Accepted"}
```

### Retrieve Group Memberships of a Specific User
```powershell
Get-AzureADUser -Filter "UserPrincipalName eq 'firstname.surname@contoso.com'" | Get-AzureADUserMembership
```

---

## **DNS Server**

### Copy Secondary DNS Zones
```powershell
Get-DnsServerZone -ComputerName DNS1 | Where {$_.ZoneType -eq "Secondary"} | Add-DnsServerSecondaryZone -ComputerName DNS2
```

---

## **Registry Operations**

### Get a Registry Item
```powershell
Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows NT\Terminal Services\TSAppSrv\TSMSI"
```

---

## **Network Configuration**

### Prefer IPv4 over IPv6
Check and modify preference for IPv4:
```powershell
ping $env:COMPUTERNAME

New-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\" -Name "DisabledComponents" -Value 0x20 -PropertyType "DWord"

# Modify if the property already exists
Set-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\" -Name "DisabledComponents" -Value 0x20

Restart-Computer
```
