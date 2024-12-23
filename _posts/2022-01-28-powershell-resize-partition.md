---
layout: post
author: mike
---

# Resizing Disk Partitions with PowerShell

**Date Published**: January 28, 2022

This guide explains how to resize partitions on Windows systems using PowerShell. These commands are useful when managing disk space for servers, virtual machines, or local machines.

---

## **Steps to Resize a Partition**

### Original Command:
```powershell
$size = (Get-PartitionSupportedSize -DiskNumber 10 -PartitionNumber 2)
Resize-Partition -DiskNumber 10 -PartitionNumber 2 -Size $size.SizeMax
```

---

### **Explanation of the Commands**

1. **`Get-PartitionSupportedSize`**:
   - Retrieves the minimum and maximum sizes that a partition can be resized to.
   - Parameters:
     - **`-DiskNumber`**: The identifier for the disk containing the partition.
     - **`-PartitionNumber`**: The identifier for the partition to be resized.

2. **`Resize-Partition`**:
   - Resizes the partition to the specified size.
   - Parameters:
     - **`-DiskNumber`**: The target disk.
     - **`-PartitionNumber`**: The target partition.
     - **`-Size`**: The new size of the partition, specified in bytes.

---

### **Enhancements for Usability**

#### 1. **Dynamic Disk and Partition Selection**
To make the command more dynamic, list available disks and partitions for selection:
```powershell
Get-Disk | Select Number, Size, PartitionStyle
Get-Partition -DiskNumber 10 | Select PartitionNumber, Size
```

#### 2. **Resizing to a Custom Size**
Instead of always resizing to the maximum size, you can specify a custom size (in bytes):
```powershell
Resize-Partition -DiskNumber 10 -PartitionNumber 2 -Size 500GB
```

To convert `GB` to bytes:
```powershell
$customSize = 500GB
Resize-Partition -DiskNumber 10 -PartitionNumber 2 -Size $customSize
```

---

### **Error Handling**

Add error handling to ensure smooth execution:
```powershell
try {
    $size = Get-PartitionSupportedSize -DiskNumber 10 -PartitionNumber 2
    if ($size.SizeMax -gt 0) {
        Resize-Partition -DiskNumber 10 -PartitionNumber 2 -Size $size.SizeMax
        Write-Host "Partition resized successfully."
    } else {
        Write-Host "No available space to resize the partition."
    }
} catch {
    Write-Host "An error occurred: $_"
}
```

---

## **Best Practices**

1. **Backup Data**:
   - Always back up important data before resizing a partition to avoid data loss in case of failure.

2. **Check Disk Health**:
   - Use the following command to ensure the disk is healthy before resizing:
     ```powershell
     Get-PhysicalDisk | Where-Object HealthStatus -ne "Healthy"
     ```

3. **Monitor Disk Usage**:
   - After resizing, verify disk usage with:
     ```powershell
     Get-Volume | Select DriveLetter, Size, SizeRemaining
     ```
