---
layout: post
author: mike
---

# FortiGate Debugging and Configuration Commands

**Date Published**: February 1, 2022

This guide provides essential commands for debugging and configuring FortiGate firewalls. It covers flow debugging, LACP configuration, and ARP table retrieval, making it a valuable resource for network administrators.

---

## **Debugging Commands**

### **General Debug Commands**
These commands are useful for starting and stopping debugging sessions:
```shell
diagnose debug disable
diagnose debug flow filter clear
diagnose debug reset
```

### **View Routing Table**
Retrieve the full routing table to analyze network routes:
```shell
get router info routing-table all
```

### **Filter Debugging by IP Address**
Debug traffic based on the source or destination IP:
```shell
diagnose debug flow filter addr x.x.x.x
```

Debug traffic between a specific source and destination:
```shell
diagnose debug flow filter addr x.x.x.x x.x.x.x and
```

### **Enable Function Name Debugging**
Show function names in debug output for better analysis:
```shell
diagnose debug flow show function-name enable
```

### **Add Timestamps to Debug Output**
Include timestamps in the console output for tracking:
```shell
diagnose debug console timestamp enable
```

### **Start Debugging a Specific Number of Packets**
Trace a set number of packets:
```shell
diagnose debug flow trace start 100
```

Enable debugging:
```shell
diagnose debug enable
```

---

## **Show Current Flow Filters**
To view the currently applied flow filters:
```shell
diag deb flow filter
```

---

## **LACP (Link Aggregation Control Protocol) Configuration**

To configure LACP mode on an interface, use the following:
```shell
configure system interface
edit <interface_name>
set lacp-mode {static | passive | active}
end
```

### Modes:
- **Static**: Sets a static LACP configuration without negotiation.
- **Passive**: Responds to LACP packets but does not initiate them.
- **Active**: Actively negotiates LACP connections.

---

## **ARP (Address Resolution Protocol) Table**

To display the ARP table:
```shell
get system arp
```

To display specific IP Address or MAC from the ARP table:
```shell
get system arp | grep x.x.x.x
get system arp | grep xx:xx:xx:xx
```

### Use Case:
This command is helpful for troubleshooting connectivity issues by ensuring MAC-to-IP mappings are correct.

---

## **Enhancements and Practical Use Cases**

### 1. **Combine Debug Filters**
Apply multiple filters for granular traffic analysis:
```shell
diagnose debug flow filter addr x.x.x.x
diagnose debug flow filter port 80
diagnose debug enable
```

### 2. **Save Debug Logs**
Redirect debug output to a file for detailed offline analysis:
```shell
diagnose debug enable > debug_output.log
```

### 3. **Reset Debugging Quickly**
To quickly clear all debugging configurations and start fresh:
```shell
diagnose debug reset
diagnose debug flow filter clear
```

---

## **Best Practices**

1. **Enable Debugging Judiciously**:
   - Debugging can be resource-intensive. Use it during low-traffic periods when possible.

2. **Apply Filters**:
   - Always apply filters to minimize unnecessary output and focus on the relevant traffic.

3. **Monitor Logs**:
   - Use `diag debug console timestamp enable` to correlate debug events with logs.

---
