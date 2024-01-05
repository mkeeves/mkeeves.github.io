#### Get AD Schema version 

Get-ADObject (Get-ADRootDSE).schemaNamingContext -Property objectVersion

#### Get groups with extension attribute

Get-ADGroup -Filter * -Properties extensionAttribute15 | select name,extensionAttribute15

foreach ($i in $groups) {Set-ADGroup $i -add @{extensionAttribute15=”NoSync”}}

Set-ADGroup “groupname” -clear “extensionAttribute15”

#### Autopilot

Save-Script -Name Get-WindowsAutoPilotInfo -Path c:\temp

Get-WindowsAutoPilotInfo.ps1 -OutputFile c:\temp\WindowsAutoPilotInfo.csv

#### Sharepoint

Install-Module -Name Microsoft.Online.SharePoint.PowerShell

$SPAdminSite = “https://contoso-admin.sharepoint.com“

Connect-SPOService -Url $SPAdminSite

get-sposite -IncludePersonalSite $true -Limit all -Filter “Url -like ‘-my.sharepoint.com/personal/”

Remove-SPOSite -Identity https://contoso-my.sharepoint.com/personal/j_doe_contoso_com

#### Grant permissions to another users OneDrive

Set-SPOUser -Site https://contoso-my.sharepoint.com/personal/j_doe_contoso_com -LoginName firstname.surname@contoso.com -IsSiteCollectionAdmin $false

#### Exchange Powershell Module

Install-Module -Name ExchangeOnlineManagement 

#### Azure AD

Get-AzureADUser -all $true | where {$_.UserType -ne “Member” -and $_.UserState -ne “Accepted”}

#### Azure AD – Users group memberships

Get-AzureADUser -Filter “UserPrincipalName eq ‘firstname.surname@contoso.com'” |Get-AzureADUserMembership

#### DNS Server copy secondary zones

Get-DnsServerZone -ComputerName DNS1 | Where {$_.ZoneType -eq “Secondary”} | Add-DnsServerSecondaryZone -ComputerName DNS2

#### Get a registry item – installation co-ordinator hanging (Windows Installer Coordinator install phase may loop or hang (ibm.com))

Get-ItemProperty -Path “HKLM:\SOFTWARE\Policies\Microsoft\Windows NT\Terminal Services\TSAppSrv\TSMSI”

#### Get Members of distribution list and enumerate sender permissions

$dist | select Name,RequireSenderAuthenticationEnabled,CustomAttribute7,@{Name=’AcceptMessagesOnlyFromSendersOrMembers’;Expression={$_.AcceptMessagesOnlyfromSendersOrMembers -join “/”,”,”}} | Export-Csv c:\temp\Dist

#### Get users default auth method

Install-Module MSOnline

Connect-msolservice

(Get-MsolUser -UserPrincipalName firstname.surname@contoso.com).StrongAuthenticationMethods

#### Prefer IPv4

#In case you paste this in to PowerShell ISE and press run script:)

#Check if IPv4 IP address is preferred

ping $env:COMPUTERNAME

#If the reply is IPv6 address, run following registry setting to just prefer ipv4 and reboot

New-ItemProperty “HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\” -Name“DisabledComponents” -Value 0x20 -PropertyType “DWord”

#If DisabledComponents exists, use the set cmdlet

Set-ItemProperty “HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\” -Name“DisabledComponents” -Value 0x20

#You need to reboot the computer in order for the changes to take effect

Restart-Computer

From <https://msunified.net/2016/05/25/how-to-set-ipv4-as-preferred-ip-on-windows-server-using-powershell/>

New-ItemProperty “HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\” -Name DisabledComponents -Value 0x20 -PropertyType “DWord”

Set-ItemProperty “HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\” -Name DisabledComponents -Value 0x20 -PropertyType “DWord”
