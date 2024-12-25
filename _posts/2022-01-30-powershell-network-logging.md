---
layout: post
author: mike
---

# Network Logging Function for PowerShell

**Date Published**: January 30, 2022

This guide provides a reusable PowerShell function for network logging. It monitors connectivity between specified source and target machines, logging responses and errors to individual files. Administrators can use this function to automate network health monitoring.

---

## **Function: `Start-NetworkLogging`**

### **Description**
The `Start-NetworkLogging` function automates network logging by testing connectivity between source and target systems. It logs successful pings with timestamps and records unreachable hosts with a predefined error code.

### **Code**
```powershell
function Start-NetworkLogging {
    param (
        [string[]]$Sources,
        [string[]]$Targets,
        [string]$LogPath = "C:\temp\",
        [int]$Interval = 1
    )

    # ScriptBlock for network logging
    $PingScript = {
        param ($Source, $Target, $LogPath, $Interval)
        
        while ($true) {
            $PingDate = Get-Date -Format u
            $LogFile = "$LogPath$Source_$Target_$(Get-Date -f yyyy-MM-dd).log"

            try {
                Test-Connection -Count 1 -ErrorAction Stop -Source $Source -ComputerName $Target `
                    | Select-Object {$PingDate}, __SERVER, Address, ResponseTime `
                    | ConvertTo-Csv `
                    | Select-Object -Skip 2 `
                    | Out-File -FilePath $LogFile -Append
            } catch {
                $ResponseProps = [ordered]@{
                    'datetime'    = $PingDate
                    '__SERVER'    = $Source
                    'Address'     = $Target
                    'ResponseTime' = '9999'
                }
                $Response  = New-Object psobject -Property $ResponseProps
                ConvertTo-Csv -InputObject $Response `
                    | Select-Object -Skip 2 `
                    | Out-File -FilePath $LogFile -Append
            }

            Start-Sleep -Seconds $Interval
        }
    }

    # Start jobs for each source-target pair
    foreach ($Source in $Sources) {
        foreach ($Target in $Targets) {
            Start-Job -Name "$Source ping $Target" -ScriptBlock $PingScript -ArgumentList $Source, $Target, $LogPath, $Interval
        }
    }
}
```

---

## **Parameters**
- **`$Sources`**: An array of source machines to initiate ping requests.
- **`$Targets`**: An array of target machines to test connectivity.
- **`$LogPath`**: The directory to save log files (default is `C:\temp\`).
- **`$Interval`**: Time in seconds between pings for each source-target pair (default is `1` second).

---

## **Usage Instructions**

### **Import and Run**
1. Save the function in a `.ps1` file.
2. Import the function into your session:
   ```powershell
   . .\Start-NetworkLogging.ps1
   ```

### **Example Usage**
Start monitoring connectivity between servers and save logs to a specified directory:
```powershell
Start-NetworkLogging -Sources @("server1", "server2") -Targets @("server3", "server4") -LogPath "C:\Logs\" -Interval 5
```

---

## **Advanced Usage**

### Monitor Running Jobs
To check which logging jobs are active:
```powershell
Get-Job | Where-Object { $_.State -eq "Running" }
```

### Stop All Logging Jobs
To stop all running logging jobs:
```powershell
Get-Job | Stop-Job
```

### View Logs
Access detailed logs saved in the specified `LogPath`. Each file is named after the source-target pair and timestamped for reference.

---

## **Use Cases**
1. **Troubleshooting Connectivity**:
   - Identify slow or unreachable endpoints in real time.
2. **Automated Monitoring**:
   - Continuously track the health of critical network links.
3. **Audit and Analysis**:
   - Maintain logs for performance reviews and compliance reporting.

---

## **References**
https://blog.roostech.se/2016/02/use-powershell-jobs-to-ping-many-from-many-with-log.html