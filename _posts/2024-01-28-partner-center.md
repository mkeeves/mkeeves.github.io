---
layout: post
author: mike
---

{% highlight powershell linenos %}
Install-Module -Name PartnerCenter -AllowClobber -Scope AllUsers
Connect-PartnerCenter
Get-PartnerAuditRecord -Start (Get-Date).AddDays(-89) | select ResourceType,organizationName,id,name
Get-Partner
{% endhighlight %}
