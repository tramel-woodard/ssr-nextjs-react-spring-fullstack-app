# Full Stack Application: Next.js + Spring Boot + H2

This is a full-stack web application built with Next.js (React) for the frontend and Spring Boot for the backend. It includes full CRUD operations for both Users and Products, styled with Material UI using the Indigo theme.

## Project Structure

```
/frontend        → Next.js app (pages, components, styles)
  /pages
    /users
      index.tsx
      new.tsx
      [id].tsx
    /products
      index.tsx
      new.tsx
      [id].tsx
  /api
    /users
      [id].js
    /products
      [id].js
  /components
    Navbar.tsx
/backend         → Spring Boot app (Java)
  /src
    /main/java/com/demo/fullstackapp
      controller/
      model/
      repository/
      service/
  /resources
    application.properties
```

## Getting Started

### Prerequisites

- Node.js
- Java 17+
- Maven or Gradle

## Frontend (Next.js + MUI)

### Install Dependencies

```bash
cd frontend
npm install
```

### Run the App

```bash
npm run dev
```

Frontend will run on: http://localhost:3000

## Backend (Spring Boot + H2)

### Configuration

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:h2:mem:demo
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=update
```

### Run the App

```bash
cd backend
./mvnw spring-boot:run
```

Backend will run on: http://localhost:8080

## API Endpoints

### Users

| Method | Endpoint           | Description       |
|--------|--------------------|-------------------|
| GET    | /api/users         | Get all users     |
| GET    | /api/users/{id}    | Get user by ID    |
| POST   | /api/users         | Create new user   |
| PUT    | /api/users/{id}    | Update user       |
| DELETE | /api/users/{id}    | Delete user       |

### Products

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| GET    | /api/products         | Get all products    |
| GET    | /api/products/{id}    | Get product by ID   |
| POST   | /api/products         | Create new product  |
| PUT    | /api/products/{id}    | Update product      |
| DELETE | /api/products/{id}    | Delete product      |

## Features

- Full CRUD for Users and Products
- Material UI Indigo Theme
- Responsive UI
- Server-side validation
- Axios API calls with async/await
- H2 in-memory database with H2 console

## Tools & Technologies

- Frontend: React (Next.js), TypeScript, Material UI, Axios
- Backend: Spring Boot, Spring Data JPA
- Database: H2 (in-memory)

## Security

- All sensitive configuration variables should be managed in `.env` files.
- No credentials are hardcoded in this repository.

## .gitignore

See the included `.gitignore` to prevent committing unnecessary files (e.g., `node_modules`, `target/`, `.env`, logs, IDE configs).

## License

This project is licensed under the MIT License.

## Author

Created by Tramel Woodard – Pull requests and contributions are welcome.
