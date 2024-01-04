https://graph.microsoft.com/v1.0/users?$count=true&$filter=Department eq ‘Finance’&$orderBy=displayName&$select=id,displayName,department

https://graph.microsoft.com/v1.0/users?$count=true&$filter=UserType eq ‘Guest’&$select=id,displayName,department,externalUserState

https://graph.microsoft.com/v1.0/users?filter=externalUserState

https://graph.microsoft.com/v1.0/users/”SomeUserID”/externalUserState

https://graph.microsoft.com/v1.0/users/{GUID}/externalUserState
