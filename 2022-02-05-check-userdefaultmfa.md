$Users = “samaccountname1|samaccountname2”

$Users = $Users.Split(“|”)

# Comment next line if running multiple times

Connect-MsolService

ForEach ($User in $Users) {

   $UPN = (Get-ADUser $User).UserPrincipalName

   $MethodType = ((Get-MsolUser -UserPrincipalName $upn).StrongAuthenticationMethods | Where-Object {$_.IsDefault -eq $true}).MethodType

   If ($MethodType -eq “PhoneAppNotification”) {Write-Host $UPN $MethodType -f Green}

   ElseIf ($MethodType -eq “TwoWayVoiceMobile”) {Write-Host $UPN $MethodType -f Green}

   Else {Write-Host $UPN $MethodType -f Red}

}
