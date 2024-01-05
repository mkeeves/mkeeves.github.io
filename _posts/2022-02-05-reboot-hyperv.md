---
layout: post
author: mike
---

{% highlight powershell linenos %}
$Target = "targetmachine"
$FilePath = "C:\temp\RunningVMs.txt"
$Session = New-PSSession -ComputerName $Target
#Check if any updates
Invoke-Command -Session $Session -ScriptBlock {
  $Updates = Start-WUScan
  #If there are updates then install them
  if ($Updates -ne $null) {
    Install-WUUpdates -Updates $Updates
    }
  }
#Check if target needs reboot after installing updates
$IsPendingReboot = Invoke-Command -Session $Session -ScriptBlock {
  #$Updates = Start-WUScan
  Get-WUIsPendingReboot
  }
if ($IsPendingReboot -eq $true) {write-host "true"}
if ($IsPendingReboot -eq $true) {
  #If target needs reboot then save running VMs, reboot, start previously running VMs
  Invoke-Command -Session $Session -ScriptBlock {
    if (!(Get-Item C:\temp -ea ignore)) {mkdir C:\temp}
    (Get-VM | Where-Object {$_.State -eq "Running"}).Name | Out-File -FilePath $using:FilePath
    Save-VM -Name (Get-Content -Path $using:FilePath)
    }
  #Restart the server
  Restart-Computer -ComputerName $Target -Wait -Force
  #Create new session, and restart previously running VMs
  $Session = New-PSSession -ComputerName $Target
  Invoke-Command -Session $Session -ScriptBlock {
    Do {
      Start-Sleep -Seconds 30
      }
    Until (
      (get-service vmms).status -eq "Running"
       )
    Start-VM -Name (Get-Content -Path $using:FilePath)
    Remove-Item -Path $using:FilePath
    }
  }
{% endhighlight %}
