---
layout: post
author: mike
---

{% highlight powershell linenos %}
#### DNS Policy to prevent a subnet from obtaining AAAA records

Add-DnsServerClientSubnet -Name “VPNClientSubnet” -IPv4Subnet “192.168.0.0/24”

Add-DnsServerQueryResolutionPolicy -Name “VPNClientPolicy” -Action IGNORE -ClientSubnet “EQ,VPNClientSubnet” -QType “EQ,AAAA”

Disable-DnsServerPolicy -Name “VPNClientPolicy” -Level Server

{% endhighlight %}
