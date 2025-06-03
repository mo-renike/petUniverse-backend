# 🐾 PetUniverse Connect – Backend API

A RESTful backend API built with **Node.js**, **Express**, and **Prisma ORM** to power a comprehensive pet care platform. This service supports pet profile management, health records, reminders, and a social forum for pet owners.

---

## Overview

PetUniverse Connect is a centralized backend system designed to support a multi-platform (web and mobile) experience for pet lovers. It handles secure user authentication, data storage, and dynamic API routes for pet-related services.

---

## What the Project Does

- Supports user authentication (sign-up/login) via JWT
- Manages pet profiles and health records
- Hosts a community forum for posts and comments
- Handles directory of nearby pet services
- Sends scheduled reminders for medications and care routines
- Serves curated pet articles via API

---

## Features

- Modular, scalable code structure
- Secure authentication with bcrypt & JWT
- Relational data management with Prisma ORM & PostgreSQL
- Built-in notification scheduling using `node-cron`
- Follows REST principles and best practices
- Auto-generated API docs with Swagger (optional)

---

## API Modules

| Module              | Functionality Description                          |
|---------------------|----------------------------------------------------|
| Auth                | Register, login, password encryption, JWT handling |
| Pets                | CRUD for pet profiles                              |
| Health Records      | Track appointments, medications, health logs       |
| Articles            | Serve and manage curated tips                      |
| Services Directory  | Access local pet-related services                  |
| Forum               | Post and reply to pet-related discussions          |
| Notifications       | Automated reminders for users                      |

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/mo-renike/petUniverse-backend.git
```

### 2. Navigate into the project directory
```bash
cd petUniverse-backend
```

### 3. Install dependencies
```bash
npm install
```

### 4. Setup environment variables
Create a `.env` file based on `.env.example`:
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/petuniverse
JWT_SECRET=your_super_secret_key
PORT=3000
```

### 5. Set up Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 6. Start the development server
```bash
npm run dev
```

---

## API Usage

- **GET** `/api/pets`
- **POST** `/api/pets`
- **GET** `/api/health-records`
- **POST** `/api/forum/post`
- **GET** `/api/services`
- **GET** `/api/articles`

Example POST Request:
```bash
POST /api/pets
Content-Type: application/json

{
  "name": "Buddy",
  "species": "dog",
  "age": 3
}
```

Example Response:
```bash
{
  "id": 1,
  "name": "Buddy",
  "species": "dog",
  "age": 3,
  "ownerId": 7
}
```

---

## Error Handling

Returns appropriate status codes and messages:

- `400` for invalid inputs
- `401` for unauthorized access
- `500` for internal server errors

Example Error:
```bash
{
  "error": "Missing required field: name"
}
```

---

## Testing

- Use Postman to test endpoints.
- Unit testing (Jest + Supertest) coming soon.

---

## Deployment

- Deployed via Render / Railway / Vercel (to be confirmed).
- API is stateless and portable.

---

## Team

- **Morenike Oyewole** – Backend Lead  
- Ojo-Kelly Oluwaseyi  
- Oluwagbenga Adedire  
- Olasupo Eniola Halimah  
- Ndong Joseph Scripture Fang  
- Onyeanusi Chiedozie Arthur  
- Olapade Ajose Olorunfemi  

---

## License

For academic capstone use only. Not licensed for commercial deployment.
