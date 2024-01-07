---
layout: post
author: mike
---
{% highlight conf linenos %}
#### Debug Commands
diagnose debug disable
diagnose debug flow filter clear
diagnose debug reset
get router info routing-table all
diagnose debug flow filter addr x.x.x.x —> where x.x.x.x is the IP 
address of the source or destination
diagnose debug flow filter addr x.x.x.x x.x.x.x and
diagnose debug flow show function-name enable
diagnose debug console timestamp enable
diagnose debug flow trace start 100
diagnose debug enable
#### Show current flow filters
diag deb flow filter
#### LACP mode
configure system interface edit set lacp-mode {static | passive | active} 
#### ARP
get system arp
{% endhighlight %}
