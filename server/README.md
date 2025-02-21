# API Documentation

## Endpoints

### POST /api/users/register

Registers a new user.

#### Request

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "password": "string"
  }
  ```

#### Response

**Success (201 Created)**:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string",
      "createdAt": "string",
      "updatedAt": "string"
    },
    "token": "string"
  }
}
```

**Validation Error (400 Bad Request)**:

```json
{
  "success": false,
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

**Server Error (500 Internal Server Error)**:

```json
{
  "success": false,
  "message": "string"
}
```

#### Description

This endpoint registers a new user by accepting their first name, last name, email, and password. The password is hashed before storing it in the database. Upon successful registration, a JWT token is generated and returned along with the user details.

#### Validation Rules

- **fullName.firstName**: Must be at least 3 characters long.
- **fullName.lastName**: Optional, but if provided, must be at least 3 characters long.
- **email**: Must be a valid email address.
- **password**: Must be at least 8 characters long.

---

