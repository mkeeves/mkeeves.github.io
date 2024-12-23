---
layout: post
author: mike
---
# Managing Hyper-V with PowerShell

**Date Published**: January 28, 2022

This article provides practical PowerShell commands for managing Hyper-V environments. From identifying mounted ISOs to removing hard disks from virtual machines, these commands streamline Hyper-V administration.

---

## **Retrieve Mounted ISOs Across a Cluster**

To identify mounted ISO files on virtual machines (VMs) within a Hyper-V cluster:

### Original Command:
```powershell
$Cluster = clustername
$clusternodes = Get-ClusterNode -Cluster $Cluster
foreach ($clusternode in $clusternodes) {get-vm -computername $clusternode.name | get-vmdvddrive}
```

### Explanation:
1. **`Get-ClusterNode`**: Retrieves all nodes in the specified cluster.
2. **`Get-VM`**: Lists all virtual machines on each cluster node.
3. **`Get-VMDvdDrive`**: Fetches details of DVD drives attached to the VMs, including mounted ISOs.

### Enhancement:
To filter only VMs with ISOs mounted:
```powershell
foreach ($clusternode in $clusternodes) {
    Get-VM -ComputerName $clusternode.name | Get-VMDvdDrive | Where-Object { $_.Path -ne $null }
}
```

---

## **Remove Hard Disks from VMs**

To remove virtual hard disks (VHDs) from specified virtual machines on a Hyper-V server:

### Original Command:
```powershell
$VMs = server1,server2,server3
Get-VMHardDiskDrive -ComputerName diplodocus -VMName $VMs -ControllerNumber 1 | Remove-VMHardDiskDrive
```

### Explanation:
1. **`Get-VMHardDiskDrive`**: Fetches details of the hard disks attached to the specified VMs.
2. **`Remove-VMHardDiskDrive`**: Detaches the selected hard disks from the VMs.

### Enhancement:
Add a confirmation step before removing the disks to prevent accidental deletion:
```powershell
$VMs = server1,server2,server3
$Disks = Get-VMHardDiskDrive -ComputerName diplodocus -VMName $VMs -ControllerNumber 1

foreach ($Disk in $Disks) {
    Write-Host "Ready to remove: $($Disk.Path) from VM $($Disk.VMName). Proceed? (Y/N)"
    $Response = Read-Host
    if ($Response -eq "Y") {
        Remove-VMHardDiskDrive -VMHardDiskDrive $Disk
        Write-Host "Removed $($Disk.Path)"
    } else {
        Write-Host "Skipped $($Disk.Path)"
    }
}
```
