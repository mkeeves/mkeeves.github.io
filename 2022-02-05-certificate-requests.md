request_import.txt

; 1. Copy template folder and create new folder which matches the common name of the certificate required
; 2. Edit the details below to match the certificate requirements
; 3. In an elevated shell, change working directory to where this file resides and run the following command
; certreq -new request_import.txt myrequest.csr
; 4. The command will output the CSR, which be uploaded to the certificate provider
; 5. Once the certificate is received, import to the computer personal store on the same computer as the certificate was generated, then export as a pfx and save in the same location as the csr

[NewRequest]
Subject = “CN=vpn.contoso.com,OU=IT Dept,O=Contoso,L=CAMBRIDGE,S=Cambridgeshire,C=GB” ; E.g. “CN=www.contoso.com”, or “CN=*.contoso.com” for a wildcard certificate
Exportable = TRUE
KeyLength = 2048 ; Required minimum is 2048
KeySpec = 1
KeyUsage = 0xA0
MachineKeySet = True
ProviderName = “Microsoft RSA SChannel Cryptographic Provider”
ProviderType = 12
HashAlgorithm = SHA256

[EnhancedKeyUsageExtension]
OID=1.3.6.1.5.5.7.3.1 ; Server Authentication
OID=1.3.6.1.5.5.7.3.2 ; Client Authentication

[Extensions]
2.5.29.17 = “{text}”
continue = “dns=vpn.contoso.comk&”

continue = “dns=vpn2.contoso.com&”
continue = “dns=vpn3.contoso.com&”

_Splitting the private key.txt

Sometimes it is necessary to split a pfx in to certificate and private key due to software not being able to handle import of PFX files. The following will generate a private.key and certfilename.crt file from a PFX when run in powershell. This relies on OpenSSL, which is stored in the Certificates folder.

Open Powershell as an administrator
Change the working directory to the location of the PFX file
Run the following command to generate the private key
.._OpenSSL-Win64\bin\openssl.exe pkcs12 -in *.pfx -nocerts -out private.key
Run the following command to generate the certificate file
.._OpenSSL-Win64\bin\openssl.exe pkcs12 -in *.pfx -clcerts -nokeys -out certfilename.crt
