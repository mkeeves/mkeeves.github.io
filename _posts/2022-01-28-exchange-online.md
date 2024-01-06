---
layout: post
author: mike
---

{% highlight powershell linenos %}
#### Mailbox Rules
Get-Mailbox SomePerson@contoso.com | Select-Object -ExpandProperty UserPrincipalName | Foreach-Object {Get-InboxRule -Mailbox $_ | Select-Object -Property MailboxOwnerID,Name,Enabled,From,Description,RedirectTo,ForwardTo}
#### Remove mailbox permissions
Get-Mailbox firstname.surname@contoso.com | Remove-MailboxPermission -User "groupname" -AccessRights FullAccess -Deny
#### Keep copy of Sent As in Users Mailbox
Set-Mailbox <mailbox name> -MessageCopyForSentAsEnabled $True
#### Keep copy of Sent on Behalf in Users Mailbox
set-mailbox <mailbox name> -MessageCopyForSendOnBehalfEnabled $True
{% endhighlight %}
