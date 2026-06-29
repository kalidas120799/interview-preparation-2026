# 1. What is Authentication?

Authentication is the process of verifying the identity of a user. It confirms that the user is who they claim to be using credentials such as a username, password, OTP, fingerprint, or token. Authentication happens before authorization in most applications.

### Example

```txt
Username: kalidas
Password: ********

✅ User Verified
```

---

# 2. What is Authorization?

Authorization is the process of determining what an authenticated user is allowed to access. It checks permissions, roles, and privileges after identity verification is completed. Authorization ensures users can only access resources they are permitted to use.

### Example

```txt
User: Kalidas
Role: Admin

✅ Can Create Users
✅ Can Delete Users
```

---

# 3. Difference Between Authentication and Authorization

Authentication verifies a user's identity, while authorization determines what actions that user can perform. Authentication occurs first, followed by authorization. Both are important components of application security.

| Authentication | Authorization |
|---------------|---------------|
| Who are you? | What can you do? |
| Login Process | Permission Check |
| Username/Password | Roles/Permissions |
| Happens First | Happens After Authentication |

---

# 4. What is JWT?

JWT (JSON Web Token) is a compact and secure method for transmitting user information between client and server.

It consists of three parts:

- Header
- Payload
- Signature

JWT is commonly used for stateless authentication in REST APIs.

### Structure

```txt
Header.Payload.Signature
```

### Example

```txt
eyJhbGciOiJIUzI1Ni...
```

---

# 5. How Does JWT Work?

When a user logs in successfully, the server generates a JWT and sends it to the client.

The client stores the token and includes it in future requests via the Authorization header.

The server verifies the token signature before granting access.

### Flow

```txt
Login
   ↓
Server Creates JWT
   ↓
Client Stores JWT
   ↓
Request + JWT
   ↓
Server Verifies
   ↓
Response
```

---

# 6. What are JWT Claims?

Claims are pieces of information stored inside the JWT payload. They contain details about the user and metadata about the token.

Claims are categorized into:

- Registered Claims
- Public Claims
- Private Claims

### Example Payload

```js
{
  "id": 101,
  "name": "Kalidas",
  "role": "admin"
}
```

### Common Claims

```txt
sub → Subject
iat → Issued At
exp → Expiration Time
iss → Issuer
```

---

# 7. What are Access Tokens?

Access tokens are short-lived tokens used to access protected resources and APIs.

Every authenticated request usually includes the access token in the Authorization header.

They have shorter expiration times to improve security.

### Example

```http
Authorization: Bearer access_token
```

### Typical Lifetime

```txt
15 mins
30 mins
1 hour
```

---

# 8. What are Refresh Tokens?

Refresh tokens are long-lived tokens used to generate new access tokens without requiring the user to log in again.

They are usually stored securely and sent only when the access token expires.

This improves user experience while maintaining security.

### Flow

```txt
Access Token Expired
        ↓
Send Refresh Token
        ↓
Generate New Access Token
        ↓
Continue Access
```

---

# 9. What is bcrypt?

bcrypt is a password hashing library used to securely store passwords.

Instead of saving plain text passwords, bcrypt converts them into irreversible hashes.

It also automatically includes salting, making password attacks more difficult.

### Example

```js
const bcrypt = require("bcrypt");

const hash = await bcrypt.hash("password123", 10);
```

---

# 10. Why Hash Passwords?

Passwords should never be stored in plain text because database leaks can expose user credentials.

Hashing converts passwords into fixed-length encrypted-looking values that cannot be easily reversed.

Even if a database is compromised, original passwords remain protected.

### Example

```txt
Password: admin123

Hashed:
$2b$10$3xj...
```

---

# 11. What is Salting?

Salting adds a random value to a password before hashing it.

This ensures that identical passwords generate different hashes and protects against rainbow table attacks.

bcrypt automatically generates and manages salts internally.

### Without Salt

```txt
password123
    ↓
abc123
```

### With Salt

```txt
password123 + xyz789
         ↓
xk92jd...
```

---

# 12. What is Passport.js?

Passport.js is a popular authentication middleware for Node.js applications.

It provides multiple authentication strategies such as:

- JWT
- Google OAuth
- GitHub OAuth
- Facebook Login
- Local Authentication

Passport simplifies user authentication implementation.

### Example

```js
const passport = require("passport");

app.use(passport.initialize());
```

### Popular Strategies

```txt
passport-local
passport-jwt
passport-google-oauth20
passport-github2
```

---

# 13. What is OAuth?

OAuth is an authorization framework that allows users to grant limited access to an application without sharing their passwords.

It is commonly used for:

- Login with Google
- Login with GitHub
- Login with Facebook

OAuth improves security and user convenience.

### Example Flow

```txt
User
  ↓
Login with Google
  ↓
Google Verifies User
  ↓
Access Granted
```

---

# 14. Difference Between JWT and Session

JWT stores authentication data inside the token and is stateless, while Session authentication stores data on the server.

JWT is preferred for microservices and APIs, whereas Sessions are commonly used in traditional server-rendered applications.

JWT scales more easily because no server-side session storage is required.

| JWT | Session |
|------|----------|
| Stateless | Stateful |
| Stored on Client | Stored on Server |
| Better for APIs | Better for Traditional Apps |
| Highly Scalable | Requires Session Store |

### JWT Flow

```txt
Client → JWT → Server
```

### Session Flow

```txt
Client → Session ID
          ↓
   Server Session Store
```

---

# 15. How Do You Implement Role-Based Access Control (RBAC)?

RBAC restricts access based on user roles such as Admin, Manager, or User.

After authentication, middleware checks the user's role before allowing access to protected resources.

This approach centralizes authorization logic and improves security.

### Example

```js
function authorize(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
}

app.get("/admin", authorize("admin"), (req, res) => {
  res.send("Admin Panel");
});
```

### Flow

```txt
Login
  ↓
JWT Verify
  ↓
Check Role
  ↓
Authorized?
  ↓
Allow / Deny
```

### Common Roles

```txt
Admin
Manager
User
Super Admin
```