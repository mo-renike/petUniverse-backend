# API Endpoints Summary

## User Management (Admin Only)
- `GET    /api/users`           — List all users
- `GET    /api/users/:id`       — Get user by ID
- `PUT    /api/users/:id`       — Update user by ID
- `DELETE /api/users/:id`       — Delete user by ID

## Pet Management
- `GET    /api/pets`            — Admin: all pets; Pet owner: own pets
- `GET    /api/pets/:id`        — Admin: any pet; Pet owner: own pet
- `POST   /api/pets`            — Admin: for any owner; Pet owner: for self
- `PUT    /api/pets/:id`        — Admin: any pet; Pet owner: own pet
- `DELETE /api/pets/:id`        — Admin: any pet; Pet owner: own pet

## Vet Profile Management
- `POST   /api/vets`            — Admin: any vet; Vet: self
- `GET    /api/vets`            — Admin: all vets; Vet: own profile(s)
- `GET    /api/vets/:id`        — Admin: any vet; Vet: own profile
- `PUT    /api/vets/:id`        — Admin: any vet; Vet: own profile

## Booking Management
- `POST   /api/bookings`        — Pet owner: for self; Vet: for self; Admin: any
- `GET    /api/bookings`        — Admin: all; Vet: own appointments; Pet owner: own bookings
- `GET    /api/bookings/:id`    — Admin: any; Vet: own; Pet owner: own
- `PUT    /api/bookings/:id`    — Admin: any; Vet: own; Pet owner: own
- `DELETE /api/bookings/:id`    — Admin: any; Vet: own; Pet owner: own
- `PATCH  /api/bookings/:id/status` — Vet: own appointment status
- `PATCH  /api/bookings/max-appointment` — Vet/Admin: update max daily appointments
- `GET    /api/bookings/vets`   — Vet: own appointments

## Comment Management
- `POST   /api/comments/:postid` — Any authenticated user: create comment on post
- `GET    /api/comments`         — Admin: all comments; User: own comments
- `GET    /api/comments/:id`     — Admin: any; User: own
- `PUT    /api/comments/:id`     — Admin: any; User: own
- `DELETE /api/comments/:id`     — Admin: any; User: own

## Authentication
- `POST   /api/auth/register`    — Register new user
- `POST   /api/auth/login`       — Login
- `POST   /api/auth/forgot-password` — Request password reset
- `POST   /api/auth/reset-password`  — Reset password

## Posts (Community Forum)
- `GET    /api/posts`            — List posts
- `POST   /api/posts`            — Create post

---

### Access Control Summary
- **Admins:** Full access to all endpoints and resources.
- **Vets:** Can manage their own vet profile and bookings.
- **Pet Owners:** Can manage their own pets, bookings, and comments.
- **All Authenticated Users:** Can comment on posts. 