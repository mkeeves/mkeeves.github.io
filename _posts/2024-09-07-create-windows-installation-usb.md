---
layout: post
author: mike
---

# Create Windows Installation USB

## Get a Windows ISO
Use the Microsoft Windows media creation tool to obtain a copy of the retail version of the windows installation ISO. The ISO contains all versions. It's best to get the international version, as this contains English (British).

Using the retail version means that it should be possible to change to a volume licensed version of Windows.

## Creating Bootable Windows install media
### Mount Windows ISO
Mount the Windows ISO which you’re using for creating the Windows USB installation media.

You can do this in modern versions of Windows by double clicking the ISO file

Once the ISO is mounted, it will appear as another drive letter on your machine. Make a note of the drive letter.

### Partition USB stick
Whilst only 8GB is required for creating the bootable USB stick, it’s better to use a USB stick with 32GB or 64GB, as this will make management easier (because you can store multiple WIMs).

The following will wipe the contents of the USB stick.

1. Open Command Prompt as Administrator
2. Run the utility DISKPART

        DISKPART
3. Show a list of the disks attached to the system

        list disk
4. Based upon the output of the previous command you now know the disk number of your USB drive, so you can select it

        select disk 1
5. Clean the drive

        clean
6. Create a primary partition

        create partition primary
7. Once the partition has been created, list the partitions and select the correct partition

        list partition
8. Type the following command to activate the partition

        active
9. Format the USB drive as NTFS

        format fs=ntfs label="BootableUSB" QUICK OVERRIDE

### Copy boot sector and files
With the ISO mounted, and the USB stick plugged into the laptopBack in DISKPART, list the volumes to find the drive letter of the ISO which you just mounted
1. Open Command Prompt as Administrator (not Powershell)
2. **Edit the following** and paste into the command prompt to set the correct drive letters for the ISO and the USB

        REM Change variable to drive letter of mounted ISO 
        SET ISO=E:
        REM Change variable to drive letter of USB
        SET USB=D:
3. Paste the following into the command prompt to create the boot sector on the USB drive, and also copy the files from the ISO to the USB. This can take some time.

        %ISO%
        cd boot
        bootsect /nt60 %USB%
        xcopy %ISO%\*.* %USB%\ /E /F /H
4. Wait until the files finish copying; this can take some time

## Enabling Edition Selection
Windows bootable media can contain multiple editions of Windows. On OEM hardware the edition selection menu can be skipped during installation.

To make the edition selection menu appear during Windows installation, use notepad to create a file called 'ei.cfg' with the following contents, and save this into the sources\ folder on the USB stick

        [Channel]
        Retail
        [VL]
        0

It’s now possible to build a client machine using the USB stick. We build client machines as Windows 11 Pro.