---
layout: post
author: mike
---
# Exchange Online PowerShell Command Reference

This article provides useful PowerShell commands to streamline the management of Exchange Online. Use these commands to handle mailbox operations, manage permissions, and enhance security configurations.

---

## **Mailbox Management**

### View All Mailboxes

List all mailboxes in your Exchange Online organization:

```powershell
Get-Mailbox
```

### Check Mailbox Sizes

Retrieve the size of a specific mailbox:

```powershell
Get-MailboxStatistics -Identity <UserPrincipalName> | Select DisplayName, TotalItemSize
```

### Create a New Mailbox

Add a new user mailbox with the specified details:

```powershell
New-Mailbox -Name "John Doe" -Password (ConvertTo-SecureString -String "Password123" -AsPlainText -Force) -UserPrincipalName john.doe@domain.com -FirstName John -LastName Doe
```

---

## **Inbox Rules and Permissions**

### List Inbox Rules

View all inbox rules for a specific mailbox:

```powershell
Get-InboxRule -Mailbox <UserPrincipalName>
```

### List Inbox Rules with Useful Properties

Retrieve detailed properties of inbox rules for better analysis:

```powershell
Get-InboxRule -Mailbox <UserPrincipalName> | Select-Object -Property MailboxOwnerID,Name,Enabled,From,Description,RedirectTo,ForwardTo
```

### Remove Inbox Rules

Delete a specific inbox rule by its name:

```powershell
Remove-InboxRule -Mailbox <UserPrincipalName> -Identity <RuleName>
```

### Grant Full Access Permission

Provide a user with full access to a mailbox:

```powershell
Add-MailboxPermission -Identity <MailboxName> -User <UserPrincipalName> -AccessRights FullAccess
```

### Remove Mailbox Permission with Deny

Revoke full access permission for a group with the Deny flag:

```powershell
Remove-MailboxPermission -Identity <UserPrincipalName> -User "groupname" -AccessRights FullAccess -Deny
```

---

## **Sent As and Security**

### Enable Sent As Permission

Allow a user to send emails as another user:

```powershell
Add-RecipientPermission -Identity <MailboxName> -Trustee <UserPrincipalName> -AccessRights SendAs
```

### Enable Sent on Behalf Permission

Permit a user to send emails on behalf of another user:

```powershell
Set-Mailbox -Identity <UserPrincipalName> -GrantSendOnBehalfTo <UserPrincipalName>
```

### Enable Mailbox Auditing

Turn on mailbox auditing for compliance and tracking:

```powershell
Set-Mailbox -Identity <UserPrincipalName> -AuditEnabled $true
```

### Enable Message Copy for Sent As Emails

Ensure a copy of Sent As emails is saved to the mailbox:

```powershell
Set-Mailbox <UserPrincipalName> -MessageCopyForSentAsEnabled $True
```

### Enable Message Copy for Sent on Behalf Emails

Ensure a copy of Sent on Behalf emails is saved to the mailbox:

```powershell
Set-Mailbox <UserPrincipalName> -MessageCopyForSendOnBehalfEnabled $True
```

---

