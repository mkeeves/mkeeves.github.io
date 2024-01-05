---
layout: post
author: mike
---

{% highlight powershell linenos %}


#### Mailbox Rules

Get-Mailbox SomePerson@contoso.com |

Select-Object -ExpandProperty UserPrincipalName |

Foreach-Object {Get-InboxRule -Mailbox $_ |

Select-Object -Property MailboxOwnerID,Name,Enabled,From,Description,RedirectTo,ForwardTo}

Get-Mailbox firstname.surname@contoso.com | Remove-MailboxPermission -User “groupname” -AccessRights FullAccess -Deny

set-mailbox <mailbox name> -MessageCopyForSentAsEnabled $True

set-mailbox <mailbox name> -MessageCopyForSendOnBehalfEnabled $True

{% endhighlight %}
