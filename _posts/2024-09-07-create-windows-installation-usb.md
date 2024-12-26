---
layout: post
author: mike
---
# Creating a Bootable Windows Installation USB

**Date Published**: September 7, 2024

This guide explains how to create a bootable USB drive for installing Windows. It includes instructions for obtaining the ISO, preparing the USB drive, and enabling edition selection. Enhancements include automation tips and error handling for common issues.

---

## **1. Obtain a Windows ISO**

Use the **Microsoft Windows Media Creation Tool** to download the retail version of the Windows installation ISO. 

### **Best Practices**:
- **International Version**: Choose the international version to include English (British) language support.
- **Volume Licensing**: Retail versions can later be converted to volume-licensed Windows versions.

---

## **2. Preparing the USB Drive**

### **Step 1: Mount the Windows ISO**

Mount the Windows ISO file:
- Double-click the ISO file in modern Windows versions.
- Note the drive letter assigned to the mounted ISO.

---

### **Step 2: Partition the USB Drive**

While 8GB is sufficient for basic installations, using a 32GB or 64GB USB stick allows room for multiple WIM files for better management.

#### **Commands for Disk Partitioning**:
```plaintext
DISKPART
list disk
select disk X
clean
create partition primary
list partition
active
format fs=ntfs label="BootableUSB" QUICK OVERRIDE
```

**Instructions**:
1. Open **Command Prompt** as Administrator.
2. Run the above commands in sequence:
   - Replace `X` with the USB drive’s disk number.
3. After formatting, the USB is ready for the next steps.

---

### **Step 3: Copy Boot Sector and Files**

To make the USB bootable:
1. Mount the ISO and plug in the USB stick.
2. Note the drive letters of the ISO (`E:`) and USB (`D:`).
3. Run the following commands in **Command Prompt (Admin)**:
   ```cmd
   REM Set variables for ISO and USB drives
   SET ISO=E:
   SET USB=D:

   REM Create boot sector and copy files
   %ISO%
   cd boot
   bootsect /nt60 %USB%
   xcopy %ISO%\*.* %USB%\ /E /F /H
   ```

---

## **3. Enable Edition Selection**

Windows installation media can contain multiple editions (e.g., Home, Pro, Enterprise). On OEM hardware, the edition selection menu may be skipped.

### **Configure Edition Selection**:
1. Create a file called `ei.cfg` in the `sources` folder on the USB.
2. Add the following contents:
   ```plaintext
   [Channel]
   Retail
   [VL]
   0
   ```

This ensures the edition selection menu appears during installation.

---

## **Enhancements**

### **Automating USB Creation**
Use a PowerShell script to automate the above steps:
```powershell
$ISO = "E:"
$USB = "D:"

# Prepare the USB
diskpart /s @"
select disk X
clean
create partition primary
active
format fs=ntfs label="BootableUSB" QUICK
"@

# Copy boot sector and files
Start-Process -FilePath "$ISO\boot\bootsect.exe" -ArgumentList "/nt60 $USB" -Wait
Copy-Item -Path "$ISO\*" -Destination "$USB\" -Recurse -Force
```

---

### **Error Handling**
- **USB Not Recognized**:
  - Ensure the USB is properly connected before running `DISKPART`.
- **File Copy Fails**:
  - Check if the ISO drive is correctly mounted and accessible.
- **Boot Sector Errors**:
  - Verify that the `bootsect.exe` file exists in the ISO's `boot` folder.

---

## **Best Practices**

1. **Label the USB Drive**:
   - Use meaningful labels like `BootableUSB` for easy identification.
2. **Test Bootability**:
   - Test the USB on a non-production machine before deploying.
3. **Use Modern USB Sticks**:
   - Prefer USB 3.0 or 3.1 sticks for faster file transfers and installations.

---
