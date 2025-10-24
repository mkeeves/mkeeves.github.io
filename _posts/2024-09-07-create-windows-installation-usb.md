---
layout: post
author: mike
---
# Creating a Bootable Windows Installation USB

**Date Published**: September 7, 2024
**Updated**: October 24,2025

This guide explains how to create a bootable USB drive for installing Windows. It includes instructions for obtaining the ISO, preparing the USB drive, and enabling edition selection. Enhancements include automation tips and error handling for common issues.

**Important Note**: If when using the media to install Windows, devices are not present (for example disks or network cards), then you may need to inject drivers into the WIM files. Alternatively, use the vendor's installation media.

---

## **1. Get a Windows ISO**

First, obtain an ISO file with a Windows installation. It's important to obtain an ISO which contains the correct SKU of Windows.


### **Why N Editions Could Be a Bad Idea**:
- [Media Feature Pack for N editions of Windows 10 Version 1607 - Microsoft Support](https://support.microsoft.com/en-us/help/3010081/media-feature-pack-for-n-editions-of-windows-10-version-1607)

---

## **2. Preparing the USB Drive**

### **Step 1: Mount Windows ISO**

Mount the Windows ISO which you're using for creating the Windows USB installation media.

You can do this in modern versions of Windows by double clicking the ISO file.

Once the ISO is mounted, it will appear as another drive letter on your machine. Make a note of the drive letter.

---

### **Step 2: Partition USB Stick**

Whilst only 8GB is required for creating the bootable USB stick, it's better to use a USB stick with 32GB or 64GB, as this will make management easier (because you can store multiple WIMs).

The following will wipe the contents of the USB stick.

1. Open Command Prompt as Administrator
2. Run the utility DISKPART
3. Show a list of the disks attached to the system:
   ```plaintext
   list disk
   ```
4. Based upon the output of the previous command you now know the disk number of your USB drive, so you can select it:
   ```plaintext
   select disk X
   ```
5. Clean the drive:
   ```plaintext
   clean
   ```
6. Create a primary partition:
   ```plaintext
   create partition primary
   ```
7. Once the partition has been created, list the partitions and select the correct partition:
   ```plaintext
   list partition
   select partition 1
   ```
8. Type the following command to activate the partition:
   ```plaintext
   active
   ```
9. Format the USB drive either:

   **as FAT32 (supports secure boot, but file size limit for install.wim)**:
   ```plaintext
   format fs=fat32 label="BootableUSB" QUICK OVERRIDE
   ```

   **OR as NTFS**:
   ```plaintext
   format fs=ntfs label="BootableUSB" QUICK OVERRIDE
   ```

10. Exit Diskpart using the command:
    ```plaintext
    exit
    ```

---

### **Step 3: Copy Boot Sector and Files**

With the ISO mounted, and the USB stick plugged into the laptop. Back in DISKPART, list the volumes to find the drive letter of the ISO which you just mounted.

Open Command Prompt as Administrator (not Powershell).

Edit the following and paste into the command prompt to set the correct drive letters for the ISO and the USB:

```cmd
REM Change variable to drive letter of mounted ISO
SET ISO=E:
REM Change variable to drive letter of USB
SET USB=D:
```

#### **If using FAT32**:

Paste the following into the command prompt to create the boot sector on the USB drive, and also copy the files from the ISO to the USB. This can take some time.

```cmd
%ISO%
cd boot
bootsect /nt60 %USB%
robocopy %ISO%\ %USB%\ /E /XF %ISO%\sources\install.wim
```

Wait until the files finish copying; this can take some time.

Split the wim from the source and output to the USB stick:

```cmd
Dism /Split-Image /ImageFile:%ISO%\sources\install.wim /SWMFile:%USB%\sources\install.swm /FileSize:4000
```

Wait until complete.

#### **If using NTFS**:

Paste the following into the command prompt to create the boot sector on the USB drive, and also copy the files from the ISO to the USB. This can take some time.

```cmd
%ISO%
cd boot
bootsect /nt60 %USB%
xcopy %ISO%\*.* %USB%\ /E /F /H
```

Wait until the files finish copying; this can take some time.

---

## **4. Allow Local Account**

Bypass the need for cloud account use by saving the following as `unattend.xml` in the `sources` folder on the USB installation media:

```xml
<?xml version="1.0" encoding="utf-8"?>
<unattend xmlns="urn:schemas-microsoft-com:unattend">
  <settings pass="oobeSystem">
    <!-- amd64 -->
    <component name="Microsoft-Windows-Shell-Setup"
               processorArchitecture="amd64"
               publicKeyToken="31bf3856ad364e35"
               language="neutral"
               versionScope="nonSxS">
      <OOBE>
        <HideWirelessSetupInOOBE>true</HideWirelessSetupInOOBE>
        <HideOnlineAccountScreens>true</HideOnlineAccountScreens>
        <HideLocalAccountScreen>false</HideLocalAccountScreen>
        <NetworkLocation>Work</NetworkLocation>
        <SkipMachineOOBE>false</SkipMachineOOBE>
        <SkipUserOOBE>false</SkipUserOOBE>
        <ProtectYourPC>1</ProtectYourPC>
      </OOBE>
    </component>

    <!-- arm64 -->
    <component name="Microsoft-Windows-Shell-Setup"
               processorArchitecture="arm64"
               publicKeyToken="31bf3856ad364e35"
               language="neutral"
               versionScope="nonSxS">
      <OOBE>
        <HideWirelessSetupInOOBE>true</HideWirelessSetupInOOBE>
        <HideOnlineAccountScreens>true</HideOnlineAccountScreens>
        <HideLocalAccountScreen>false</HideLocalAccountScreen>
        <NetworkLocation>Work</NetworkLocation>
        <SkipMachineOOBE>false</SkipMachineOOBE>
        <SkipUserOOBE>false</SkipUserOOBE>
        <ProtectYourPC>1</ProtectYourPC>
      </OOBE>
    </component>
  </settings>
</unattend>
```

---

## **5. Enabling Edition Selection**

Windows bootable media can contain multiple editions of Windows. On OEM hardware the edition selection menu can be skipped during installation.

To make the edition selection menu appear during Windows installation, use notepad to create a file called `ei.cfg` with the following contents, and save this into the `sources\` folder on the USB stick:

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
