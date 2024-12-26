---
layout: post
author: mike
---
# Generating and Managing Certificate Requests on Windows

**Date Published**: February 5, 2022

This guide provides instructions for generating Certificate Signing Requests (CSRs) on Windows machines and managing certificates, including splitting PFX files into certificates and private keys using OpenSSL.

---

## **Generating a Certificate Signing Request (CSR)**

### **Steps to Create a CSR**

1. **Create the Request File**:
   - Save the following content into a file named `request_import.txt`:
     ```plaintext
     ; 1. Copy template folder and create a new folder matching the certificate's common name (CN)
     ; 2. Edit the details below to match the certificate requirements
     ; 3. In an elevated shell, navigate to the file's location and run:
     ;    certreq -new request_import.txt myrequest.csr
     ; 4. Upload the generated CSR to your certificate provider
     ; 5. After receiving the certificate, import it into the computer's Personal Store, export it as a PFX, and save it alongside the CSR.

     [NewRequest]
     Subject = "CN=vpn.contoso.com,OU=IT Dept,O=Contoso,L=CAMBRIDGE,S=Cambridgeshire,C=GB"
     Exportable = TRUE
     KeyLength = 2048 ; Minimum required is 2048
     KeySpec = 1
     KeyUsage = 0xA0
     MachineKeySet = True
     ProviderName = "Microsoft RSA SChannel Cryptographic Provider"
     ProviderType = 12
     HashAlgorithm = SHA256

     [EnhancedKeyUsageExtension]
     OID=1.3.6.1.5.5.7.3.1 ; Server Authentication
     OID=1.3.6.1.5.5.7.3.2 ; Client Authentication

     [Extensions]
     2.5.29.17 = "{text}"
     continue = "dns=vpn.contoso.com&"
     continue = "dns=vpn2.contoso.com&"
     continue = "dns=vpn3.contoso.com&"
     ```

2. **Run the Command to Generate the CSR**:
   In an elevated PowerShell session, navigate to the file’s location and execute:
   ```bash
   certreq -new request_import.txt myrequest.csr
   ```
   - This creates `myrequest.csr`, ready for submission to a certificate authority.

3. **Import the Certificate**:
   - Once received, import the certificate into the **Personal Store** using the same system where the CSR was generated.

4. **Export the Certificate as a PFX**:
   - Use the Windows Certificate Manager to export the certificate as a PFX file for backup or deployment.

### **Automate CSR Generation**
Automate CSR generation and certificate import using PowerShell:
```powershell
$Subject = "CN=vpn.contoso.com,OU=IT Dept,O=Contoso,L=CAMBRIDGE,S=Cambridgeshire,C=GB"
$RequestFile = "C:\certs\request_import.txt"
$OutputCsr = "C:\certs\myrequest.csr"

# Generate request file
Set-Content -Path $RequestFile -Value @"
[NewRequest]
Subject = "$Subject"
Exportable = TRUE
KeyLength = 2048
MachineKeySet = True
ProviderName = "Microsoft RSA SChannel Cryptographic Provider"
HashAlgorithm = SHA256
"@

# Generate CSR
Start-Process -FilePath "certreq" -ArgumentList "-new", $RequestFile, $OutputCsr -NoNewWindow -Wait
```

---

## **Splitting a PFX File into Certificate and Private Key**

Some software may require separate certificate and private key files instead of a combined PFX file. The following steps show how to split a PFX file using OpenSSL.

### **Steps to Split a PFX File**

1. **Ensure OpenSSL is Installed**:
   - Use the OpenSSL toolkit. On Windows, ensure OpenSSL is accessible in your working directory.

2. **Extract the Private Key**:
   Open an elevated PowerShell session, navigate to the folder containing the PFX file, and run:
   ```bash
   openssl pkcs12 -in yourfile.pfx -nocerts -out private.key
   ```
   - Enter the PFX password if prompted.
   - The private key will be saved as `private.key`.

3. **Extract the Certificate**:
   Run the following command to generate the certificate file:
   ```bash
   openssl pkcs12 -in yourfile.pfx -clcerts -nokeys -out certfilename.crt
   ```
   - The certificate will be saved as `certfilename.crt`.

4. **Handle Multiple Domains**:
   To include multiple domains in the CSR, add DNS names to the `[Extensions]` section:
   ```plaintext
   continue = "dns=additionaldomain1.com&"
   continue = "dns=additionaldomain2.com&"
   ```

---

## **Best Practices**

1. **Backup Certificates**:
   - Store all certificate files and private keys securely. Use encrypted storage where possible.

2. **Use Strong Encryption**:
   - Ensure all certificates use at least 2048-bit keys and SHA-256 hashing.

3. **Validate Certificates**:
   - Use online tools or the OpenSSL `verify` command to confirm certificate validity.

---
