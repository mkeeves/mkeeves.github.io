---
layout: post
author: mike
---
{% highlight powershell linenos %}
$size = (Get-PartitionSupportedSize -DiskNumber 10 -PartitionNumber 2)
Resize-Partition -DiskNumber 10 -PartitionNumber 2 -Size $size.SizeMax
{% endhighlight %}
