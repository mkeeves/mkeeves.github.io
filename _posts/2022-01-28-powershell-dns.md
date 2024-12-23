---
layout: post
author: mike
---
# Configuring Split Horizon DNS in Windows Server with PowerShell

**Date Published**: January 28, 2022

This article provides guidance on configuring Split Horizon DNS using PowerShell in Windows Server. Split Horizon DNS allows different DNS responses based on the client's source network, enhancing network management and security. 

---

## **DNS Policy Configuration to Prevent AAAA Records for a Subnet**

In this scenario, you’ll configure a DNS policy to block a specific subnet from resolving IPv6 (AAAA) records. This can be useful for environments where IPv6 traffic is restricted or unnecessary.

### **Steps to Configure the DNS Policy**

1. **Define the Client Subnet**  
   Identify and add the subnet for which you want to apply the DNS policy.

   ```powershell
   Add-DnsServerClientSubnet -Name "VPNClientSubnet" -IPv4Subnet "192.168.0.0/24"
   ```

2. **Create the DNS Query Resolution Policy**  
   Configure a policy to ignore AAAA record requests from the specified subnet.

   ```powershell
   Add-DnsServerQueryResolutionPolicy -Name "VPNClientPolicy" -Action IGNORE -ClientSubnet "EQ,VPNClientSubnet" -QType "EQ,AAAA"
   ```

3. **Disable the DNS Policy (Optional)**  
   If you need to disable the policy temporarily, use the following command:

   ```powershell
   Disable-DnsServerPolicy -Name "VPNClientPolicy" -Level Server
   ```

---

## **Practical Use Cases**

1. **Restrict IPv6 Queries**: Prevent specific clients or networks from using IPv6 for improved network control.
2. **Split DNS Configurations**: Apply different DNS resolutions based on client subnets for internal vs. external users.
3. **Testing Environments**: Temporarily block specific query types to test network behavior without affecting all users.

---

## **Best Practices**

1. **Validate Subnet Configurations**:
   Ensure the client subnet IP range matches the intended network segment to avoid unintended restrictions.

2. **Monitor DNS Policies**:
   Regularly review active DNS policies using:
   ```powershell
   Get-DnsServerQueryResolutionPolicy
   ```

3. **Document Changes**:
   Maintain records of implemented policies and their intended purposes for troubleshooting or audits.

---

By leveraging these commands and configurations, administrators can effectively manage DNS queries and enhance control over network traffic. For more advanced scenarios or troubleshooting, consult the official Microsoft DNS documentation.