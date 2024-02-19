---
layout: post
author: mike
---

{% highlight powershell linenos %}
#### Install the AIPService Module - requires Windows
Install-Module -Name AIPService
#### Lists commands in the module
Get-Command -Module AIPService
#### Connects to the service
Connect-AipService
#### Is it enabled or disabled
Get-AipService
#### Configure AIP to point at group & also require license
$group = Get-AzADGroup -DisplayName "_test aip user group"
Set-AipServiceOnboardingControlPolicy -UseRmsUserLicense $True -SecurityGroupObjectId $group.id -Scope All
#### Enable Service
Enable-AipService
{% endhighlight %}
