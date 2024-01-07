---
layout: post
author: mike
---
{% highlight powershell linenos %}
#### Get mounted ISOs
$Cluster = clustername
$clusternodes = Get-ClusterNode -Cluster $Cluster
foreach ($clusternode in $clusternodes) {get-vm -computername $clusternode.name | get-vmdvddrive}
#### Remove disks from VMs
$VMs = server1,server2,server3
Get-VMHardDiskDrive -ComputerName diplodocus -VMName $VMs -ControllerNumber 1 | Remove-VMHardDiskDrive
{% endhighlight %}
