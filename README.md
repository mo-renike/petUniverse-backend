# 🐾 PetUniverse Connect – Backend API

A RESTful backend API built with **Node.js**, **Express**, and **Prisma ORM** to power a comprehensive pet care platform. This service supports pet profile management, health records, reminders, and a social forum for pet owners.

---

## Overview

PetUniverse Connect is a centralized backend system designed to support a multi-platform (web and mobile) experience for pet lovers. It handles secure user authentication, data storage, and dynamic API routes for pet-related services.

---

## What the Project Does

- Supports user authentication (sign-up/login) via JWT
- Manages pet profiles
- Hosts a community forum for posts and comments
- Handles directory of nearby pet services (planned)
- Serves curated pet articles via API (planned)

---

## Features

- Modular, scalable code structure
- Secure authentication with bcrypt & JWT
- Relational data management with Prisma ORM & MySQL
- Follows REST principles and best practices

---

## API Modules

| Module              | Functionality Description                          |
|---------------------|----------------------------------------------------|
| Auth                | Register, login, password encryption, JWT handling |
| Pets                | CRUD for pet profiles                              |
| Forum               | Post and reply to pet-related discussions          |
| Bookings            | Book and manage vet appointments                   |

---

## Hosted API Endpoints (for Tutor)

Both the main API and the reminders microservice are already deployed and accessible online:

### Main API
- **Base URL:** `https://your-main-app.onrender.com`
- **Description:** This is the primary backend for authentication, pets, vets, forum, and bookings.
- **How to test:** Use the provided Postman collection or access endpoints directly (see API Usage section below).

### Reminders/Notifications Microservice
- **Base URL:** `https://your-reminders-app.onrender.com`
- **Description:** This service handles appointment reminders and notification scheduling.
- **How to test:** Use the endpoints described in the microservice's own README or contact the team for details.

*Replace the above URLs with your actual Render deployment URLs before submission.*

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
DATABASE_URL=mysql://username:password@localhost:3306/petuniverse
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

- **Auth**
  - POST `/api/auth/register`
  - POST `/api/auth/login`
  - POST `/api/auth/forgot-password`
  - POST `/api/auth/reset-password`
- **Pets**
  - GET `/api/pets`
  - POST `/api/pets`
  - GET `/api/pets/:id`
  - PUT `/api/pets/:id`
  - DELETE `/api/pets/:id`
- **Vets**
  - GET `/api/vets`
  - GET `/api/vets/:id`
  - POST `/api/vets`
- **Community Forum**
  - GET `/api/posts`
  - POST `/api/posts`
  - POST `/api/comments/:postid`
- **Bookings**
  - POST `/api/bookings`
  - GET `/api/bookings`
  - PATCH `/api/bookings/:id/status`
  - PATCH `/api/bookings/max-appointment`

Example POST Request:
```bash
POST /api/pets
Content-Type: application/json

{
  "name": "Buddy",
  "type": "Dog",
  "age": 3
}
```

Example Response:
```bash
{
  "id": 1,
  "name": "Buddy",
  "type": "Dog",
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

- Use Postman to test endpoints (see included Postman collection file).
- Unit testing (Jest + Supertest) coming soon.

---

## Deployment

### Hosting on Render

You can host both the main API and the reminders microservice on [Render](https://render.com/):

#### Main API
- **Root Directory:** `/` (project root)
- **Build Command:** `npm install`
- **Start Command:** `npm run start` or `node index.js`
- **Environment Variables:**
  - `DATABASE_URL` (your MySQL connection string)
  - `JWT_SECRET`
  - `PORT` (e.g., 8080)
- **URL:** Provided by Render after deployment (e.g., `https://your-main-app.onrender.com`)

#### Reminders Microservice
- **Root Directory:** `/appointment_book_Reminders`
- **Build Command:** `npm install`
- **Start Command:** `npm run start` or `node server.js`
- **Environment Variables:**
  - Set as needed for this service (e.g., `PORT`, `DATABASE_URL`, etc.)
- **URL:** Provided by Render after deployment (e.g., `https://your-reminders-app.onrender.com`)

**To add a new service on Render:**
1. Go to your Render dashboard.
2. Click "New +" → "Web Service".
3. Connect your GitHub repo.
4. Set the root directory for the service (see above).
5. Set the build and start commands.
6. Add environment variables.
7. Deploy!

**Each service will have its own URL and can be managed independently.**

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
