---
layout: post
author: mike
---
# Microsoft Graph API Queries

**Date Published**: February 1, 2022

This guide explores key Microsoft Graph API queries for retrieving user information. The examples focus on filtering, ordering, and selecting data to efficiently manage users and guest accounts.

---

## **Understanding Microsoft Graph API**

Microsoft Graph API provides a unified interface to access Microsoft 365 services. These queries target the **v1.0** endpoint and focus on user-related operations.

---

## **API Query Examples**

### 1. **Retrieve Users from a Specific Department**
To fetch users from the `Finance` department, ordered by their display name:
```http
https://graph.microsoft.com/v1.0/users?$count=true&$filter=Department eq 'Finance'&$orderBy=displayName&$select=id,displayName,department
```

#### Explanation:
- **`$count=true`**: Includes a total count of users matching the criteria.
- **`$filter`**: Filters users based on their department.
- **`$orderBy`**: Orders results alphabetically by `displayName`.
- **`$select`**: Limits the returned fields to `id`, `displayName`, and `department`.

---

### 2. **Fetch Guest Users**
Retrieve all guest users with their external user state:
```http
https://graph.microsoft.com/v1.0/users?$count=true&$filter=UserType eq 'Guest'&$select=id,displayName,department,externalUserState
```

#### Explanation:
- **`$filter=UserType eq 'Guest'`**: Filters only guest accounts.
- **`externalUserState`**: Indicates the status of external users (e.g., `Accepted`, `Pending`).

---

### 3. **Filter Users by External User State**
To list all users based on their `externalUserState`:
```http
https://graph.microsoft.com/v1.0/users?filter=externalUserState
```

#### Example States:
- **Accepted**: User has accepted the invitation.
- **Pending**: User invitation is awaiting acceptance.

---

### 4. **Retrieve a Specific User's External State**
Fetch the `externalUserState` for a particular user by their ID:
```http
https://graph.microsoft.com/v1.0/users/"SomeUserID"/externalUserState
```

#### Replace `"SomeUserID"` with:
- **UserPrincipalName**: e.g., `john.doe@contoso.com`.
- **GUID**: User's unique identifier.

Alternatively:
```http
https://graph.microsoft.com/v1.0/users/{GUID}/externalUserState
```

---

## **Pagination for Large Datasets**
To handle large datasets, use pagination:
```http
https://graph.microsoft.com/v1.0/users?$top=50
```
- **`$top=50`**: Limits the results to 50 entries per page.
- Use the `@odata.nextLink` property in the response to fetch additional pages.

#### Example to Fetch Additional Pages:
1. Perform the initial query:
   ```http
   https://graph.microsoft.com/v1.0/users?$top=50
   ```
2. Check the response for the `@odata.nextLink` property:
   ```json
   {
       "@odata.nextLink": "https://graph.microsoft.com/v1.0/users?$top=50&$skip=50"
   }
   ```
3. Use the `@odata.nextLink` URL to retrieve the next page:
   ```http
   https://graph.microsoft.com/v1.0/users?$top=50&$skip=50
   ```
4. Repeat the process until no `@odata.nextLink` property is returned.

---

## **Combining Filters**
Use logical operators (`and`, `or`) to combine filters:
```http
https://graph.microsoft.com/v1.0/users?$filter=Department eq 'Finance' and UserType eq 'Guest'
```

---

## **Monitoring Query Performance**
Enable query performance tracking:
- **`$count`**: Adds a count of matching items.
- **`$search`**: Quickly search across properties, e.g., names or emails:
  ```http
  https://graph.microsoft.com/v1.0/users?$search="John"
  ```

---

## **Best Practices**

1. **Use `$select` to Limit Results**:
   - Reduces payload size by only retrieving required fields.

2. **Test Queries with Graph Explorer**:
   - Use the [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) to validate queries.

3. **Handle Rate Limits**:
   - Avoid hitting throttling limits by managing query frequency and using exponential backoff for retries.

---
