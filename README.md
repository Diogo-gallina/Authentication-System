# 🔒 Authentication System

This is a simple authentication system developed in Node.js using the Nest.js framework. It provides basic authentication features such as account creation, login, token generation, and token renewal.

## 🚀 Features

- **Account Creation**: Users can create a new account by providing an email address and a password.
- **Login**: Users can log in using their email address and password.
- **Token Generation**: After successful login, the system generates an authentication token and a refresh token.
- **Token Renewal**: Users can renew the authentication token using the refresh token.
- **Route Protection**: The system protects specific routes, allowing access only to authenticated users.

## 💻 Technologies Used

- Node.js
- Nest.js
- TypeScript
- Prisma
- PostgreSQL
- JWT (JSON Web Tokens)
- Docker

## ⚙️ Prerequisites

- Node.js
- Docker

## 📝 Installation

1. Clone this repository to your local machine:

```
git clone <https://github.com/your-username/authentication-system.git>

```

1. Navigate to the project directory:

```
cd authentication-system

```

1. Install the project dependencies:

```
npm install

```

1. Start a Docker container for the PostgreSQL database:

```
docker run --name authentication-system-db -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -e POSTGRES_DB=authentication_system -p 5432:5432 -d postgres

```

1. Run the database migrations:

```
npx prisma migrate dev

```

1. Start the development server:

```
npm run start:dev

```

The server will be running at [http://localhost:3000](http://localhost:3000/).

## 🛣️ Routes

### POST /auth/signup

Create a new account.

**Request Parameters:**

- `email`: User's email address.
- `password`: User's password.

**Example Request:**

```
curl -X POST <http://localhost:3000/auth/signup> -d "email=user@example.com" -d "password=password123"

```

### POST /auth/login

Authenticate a user.

**Request Parameters:**

- `email`: User's email address.
- `password`: User's password.

**Example Request:**

```
curl -X POST <http://localhost:3000/auth/login> -d "email=user@example.com" -d "password=password123"

```

### POST /auth/refresh-token

Renew the authentication token.

**Request Parameters:**

- `refreshToken`: User's refresh token.

**Example Request:**

```
curl -X POST <http://localhost:3000/auth/refresh-token> -d "refreshToken=refresh-token-value"
```

### 📝 Application Requirements

**Road**
- The system should allow users to register by providing their name, email, and a password.
- The system should allow users to log in using their registered email and password.
- The system should generate an authentication token and a refresh token upon user login.
- The system should allow users to view their profile, including personal information.
- The system should allow users to soft delete their account.
- The system should allow authenticated users to stay logged in without the need to log out.
- Protect All Routes.
- Access token can be valid just for one user
- Apply password validator and e-mail example@gmail.com.
- Review crypto or bcrypt
- Apply Dependencie Inversion.
- Change everything to english.
- Refactor structure code
- Import Path Maping.
- Block refreshToken access instead of accessToken
- Fix routes, email validation, password, login more then 1 parameters
- Apply tests in memory, unit and e2e.
- Make refresh token exclusive
- Prettier on everything
- Refactor code.


**Functional Requirements:**
- The system should allow users to register by providing their name, email, and a password.
- The system should allow users to log in using their registered email and password.
- The system should generate an authentication token and a refresh token upon user login.
- The system should allow users to view their profile, including personal information.
- The system should allow users to soft delete their account.

**Business Rules:**

// Only one error is necessary in authentication.

- Each user should have a unique email address to register in the system.
- User passwords should be stored securely using encryption techniques.
- Passwords should follow alphanumeric patterns, with a minimum length of 8 characters and a maximum length of 32 characters.
- The existence of a user's email should be validated.
- During email registration, the email format "example@.com" should be validated.
- Authenticated users should only have access to and be able to update their own profile.
- The system should protect specific routes, such as allowing access only to authenticated users.
- Tokens should expire every 5 minutes.
- The refresh token should be used to renew the authentication token when it expires.
- The system should verify the validity of tokens and ensure data security.
- The login route should generate an authentication token.
- Error treatment status code

**Non-Functional Requirements:**

- The system should be developed using the Nest.js framework and the TypeScript programming language.
- The system should follow the principles of RESTful architecture.
- The system should be secure, protecting users' personal information.
- The system should be testable, facilitating the writing and execution of automated tests to ensure code quality.
- The system should have clear and comprehensive documentation using Swagger, including installation instructions, configuration details, and API usage guidelines.
- The system should integrate with third-party services for email authentication, file storage, etc., when necessary.
- The system should persist user data using PostgreSQL.


### 🤝 Contributors

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/88459755?v=4" width="100px;" border-radius='50%' alt="Diogo Gallina's photo on GitHub"/><br>
        <sub>
          <b>Diogo Gallina</b>
        </sub>
      </a>
    </td>
  </tr>
</table>