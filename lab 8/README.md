# Hostel Management System – RESTful Room Management Service

## Lab 8 – Full Stack Development / Advanced Database Technologies

---

## Overview

A web-based Hostel Management System that demonstrates RESTful service implementation using Express.js, Mongoose, and MongoDB. The application provides a complete Room Management module with full CRUD (Create, Read, Update, Delete) operations through a REST API.

---

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

---

## Features

- Admin login (frontend authentication)
- Admin dashboard with module navigation
- Room Management (full CRUD)
  - Add room with validation
  - View all rooms
  - View one room
  - Update room
  - Delete room (only if status is Available)
- Room number validation (format: A101)
- Auto-calculated capacity based on room type
- MongoDB persistence
- RESTful API architecture

---

## Architecture

```
Frontend (HTML / CSS / JavaScript)
        ↓
    Fetch API
        ↓
  Express REST API
        ↓
     Mongoose
        ↓
     MongoDB
```

---

## REST API Endpoints

| Method | Endpoint          | Description       |
|--------|-------------------|-------------------|
| GET    | /api/rooms        | Get all rooms     |
| GET    | /api/rooms/:id    | Get one room      |
| POST   | /api/rooms        | Add a new room    |
| PUT    | /api/rooms/:id    | Update a room     |
| DELETE | /api/rooms/:id    | Delete a room     |

---

## Database

- **Database**: MongoDB
- **Database Name**: hostel_management_lab8
- **Collection**: rooms
- **ODM**: Mongoose

### Room Schema

| Field     | Type   | Description                          |
|-----------|--------|--------------------------------------|
| room_no   | String | Room number (format: A101), unique   |
| room_type | String | Single, Double, Triple, Four Sharing |
| capacity  | Number | Auto-set based on room type          |
| status    | String | Available, Occupied, Maintenance     |

---

## Project Structure

```
Lab 8/
├── config/
│   └── db.js
├── models/
│   └── Room.js
├── public/
│   ├── index.html
│   ├── login.html
│   ├── admin.html
│   ├── room-management.html
│   ├── app.js
│   └── style.css
├── routes/
│   └── roomRoutes.js
├── package.json
├── README.md
└── server.js
```

---

## How to Run

1. Make sure MongoDB is running locally.
2. Open terminal in the project directory.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open in browser:
   ```
   http://localhost:5000
   ```

---

## Admin Credentials

- **Username**: admin
- **Password**: admin123

---

## Application Flow

```
Home Page → Admin Login → Admin Dashboard → Room Management → CRUD Operations → MongoDB
```
