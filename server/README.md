# API Documentation

## Users Section

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
  "errors": "string"
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

### POST /api/users/login

Logs in an existing user.

#### Request

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response

**Success (200 OK)**:

```json
{
  "success": true,
  "message": "User logged in successfully",
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
  "errors": "string"
}
```

**Authentication Error (401 Unauthorized)**:

```json
{
  "success": false,
  "message": "Invalid email or password"
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

This endpoint logs in an existing user by accepting their email and password. Upon successful authentication, a JWT token is generated and returned along with the user details.

#### Validation Rules

- **email**: Must be a valid email address.
- **password**: Must be at least 8 characters long.

---

---

### GET /api/users/profile

Fetches the profile of the logged-in user.

#### Request

- **URL**: `/api/users/profile`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <token>`

#### Response

**Success (200 OK)**:

```json
{
  "success": true,
  "message": "User profile",
  "data": {
    "_id": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

**Authentication Error (401 Unauthorized)**:

```json
{
  "success": false,
  "message": "Unauthorized"
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

This endpoint fetches the profile of the logged-in user. The user must provide a valid JWT token in the `Authorization` header, or in cookie.

---

### GET /api/users/logout

Logs out the logged-in user.

#### Request

- **URL**: `/api/users/logout`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <token>`

#### Response

**Success (200 OK)**:

```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

**Authentication Error (401 Unauthorized)**:

```json
{
  "success": false,
  "message": "Unauthorized"
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

This endpoint logs out the logged-in user by clearing the authentication token. The user must provide a valid JWT token in the `Authorization` header, or in cookie.

---

#### Captains Section

---

### POST /api/captains/register

Registers a new captain.

#### Request

- **URL**: `/api/captains/register`
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
    "password": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": 1,
      "vehicleType": "car"
    }
  }
  ```

#### Response

**Success (201 Created)**:

```json
{
  "success": true,
  "message": "Captain created successfully",
  "data": {
    "captain": {
      "_id": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": 1,
        "vehicleType": "car"
      },
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
  "errors": "string"
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

This endpoint registers a new captain by accepting their first name, last name, email, password, and vehicle details. The password is hashed before storing it in the database. Upon successful registration, a JWT token is generated and returned along with the captain details.

#### Validation Rules

- **fullName.firstName**: Must be at least 3 characters long.
- **fullName.lastName**: Optional, but if provided, must be at least 3 characters long.
- **email**: Must be a valid email address.
- **password**: Must be at least 8 characters long.
- **vehicle.color**: Must be at least 3 characters long.
- **vehicle.plate**: Must be at least 3 characters long.
- **vehicle.capacity**: Must be at least 1.
- **vehicle.vehicleType**: Must be one of "car", "motorcycle", or "auto".

---

---

### POST /api/captains/login

Logs in an existing captain.

#### Request

- **URL**: `/api/captains/login`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response

**Success (200 OK)**:

```json
{
  "success": true,
  "message": "Captain logged in successfully",
  "data": {
    "captain": {
      "_id": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": 1,
        "vehicleType": "car"
      },
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
  "errors": "string"
}
```

**Authentication Error (401 Unauthorized)**:

```json
{
  "success": false,
  "message": "Invalid email or password"
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

This endpoint logs in an existing captain by accepting their email and password. Upon successful authentication, a JWT token is generated and returned along with the captain details.

#### Validation Rules

- **email**: Must be a valid email address.
- **password**: Must be at least 8 characters long.

---

---

### GET /api/captains/profile

Fetches the profile of the logged-in captain.

#### Request

- **URL**: `/api/captains/profile`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <token>`

#### Response

**Success (200 OK)**:

```json
{
  "success": true,
  "message": "Captain profile retrieved successfully",
  "data": {
    "_id": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": 1,
      "vehicleType": "car"
    },
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

**Authentication Error (401 Unauthorized)**:

```json
{
  "success": false,
  "message": "Unauthorized"
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

This endpoint fetches the profile of the logged-in captain. The captain must provide a valid JWT token in the `Authorization` header, or in cookie.

---

### GET /api/captains/logout

Logs out the logged-in captain.

#### Request

- **URL**: `/api/captains/logout`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <token>`

#### Response

**Success (200 OK)**:

```json
{
  "success": true,
  "message": "Captain logged out successfully"
}
```

**Authentication Error (401 Unauthorized)**:

```json
{
  "success": false,
  "message": "Unauthorized"
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

This endpoint logs out the logged-in captain by clearing the authentication token. The captain must provide a valid JWT token in the `Authorization` header, or in cookie.

---
