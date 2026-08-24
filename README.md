# Employee Leave Management System

**ITUE301 Open-Book Practical Examination — SET C**
**Roll No:** 24AIML065 | **Batch:** D | **Date:** 24/08/2026

---

## Project Overview

A full-stack employee leave management portal built for TechSolutions Pvt Ltd. Employees apply for leave, managers approve/reject, and HR generates reports — replacing the company's WhatsApp-based leave tracking.

**Tech Stack:** React (Vite) · Express.js · MongoDB with Mongoose

---

## Architecture

```
ITUE301-EXAM-24AIML065-D/
│
├── backend/                    Express.js REST API
│   ├── server.js               Entry point (npm start / node server.js)
│   ├── config/
│   │   └── db.js               Mongoose connection (reads MONGO_URI from .env)
│   ├── models/
│   │   ├── Employee.js         Task 5 — name, email (unique), department, leaveBalance (default 20, min 0)
│   │   ├── LeaveType.js        Task 5 — name (enum: Casual|Sick|Earned|CompOff), maxDaysPerYear
│   │   └── LeaveRequest.js     Task 5 — refs to Employee & LeaveType, status enum, days min 1
│   ├── middleware/
│   │   ├── requestLogger.js    Task 3 — logs [METHOD] [PATH] [TIMESTAMP] globally
│   │   ├── authGuard.js        Task 3 — validates Bearer JWT, attaches req.employee
│   │   └── errorHandler.js     Task 3 — structured JSON errors (never raw stack)
│   ├── routes/
│   │   ├── auth.js             POST /api/v1/auth/login — bcrypt + JWT
│   │   ├── leaveTypes.js       GET  /api/v1/leave-types — public
│   │   └── leaves.js           POST /api/v1/leaves, GET /my, PATCH /:id/status
│   ├── seed.js                 Seeder: 3 employees (employee/manager/hr) + 4 leave types
│   ├── .env.example            Environment template
│   └── package.json
│
├── frontend/                   React (Vite) SPA
│   ├── src/
│   │   ├── main.jsx            Entry — wraps App in AuthProvider
│   │   ├── App.jsx             Task 2 — React Router (4 routes, lazy HR)
│   │   ├── index.css           Global reset + base styles
│   │   ├── context/
│   │   │   └── AuthContext.jsx Task 2 — { employee, token, role } + login/logout
│   │   ├── components/
│   │   │   ├── LeaveRequestCard.jsx  Task 1 — props-driven, coloured status badge
│   │   │   ├── Navbar.jsx            Task 2 — React Router Links
│   │   │   └── ProtectedRoute.jsx    Task 2 — auth + role guard
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx         Task 1+4 — form → POST /auth/login
│   │   │   ├── ApplyLeavePage.jsx    Task 1+2+4 — form with useState + computed days
│   │   │   ├── MyLeavesPage.jsx      Task 1+2+4 — fetch + loading/error + filter
│   │   │   └── HRPanel.jsx          Task 2 — lazy-loaded, role='hr'
│   │   └── api/
│   │       └── client.js       Task 4 — fetch wrapper with auth header
│   ├── vite.config.js
│   └── package.json
│
├── README.md                   This file
└── .gitignore                  Excludes node_modules, .env, dist

```

---

## Task Mapping

| Task | Marks | Key Files | What It Covers |
|------|-------|-----------|---------------|
| **1** | 4 | `LeaveRequestCard.jsx`, `LoginPage.jsx`, `ApplyLeavePage.jsx`, `MyLeavesPage.jsx` | Component architecture, props, coloured status badge |
| **2** | 4 | `AuthContext.jsx`, `ProtectedRoute.jsx`, `Navbar.jsx`, `App.jsx` | Routing, protected routes, lazy loading, useState, useContext |
| **3** | 4 | `requestLogger.js`, `authGuard.js`, `errorHandler.js`, `auth.js`, `leaveTypes.js`, `leaves.js`, `server.js` | 5 REST endpoints, global middleware, JWT auth |
| **4** | 4 | `client.js`, `MyLeavesPage.jsx`, `ApplyLeavePage.jsx`, `LoginPage.jsx` | API consumption, useEffect, loading/error states, client-side filter |
| **5** | 4 | `Employee.js`, `LeaveType.js`, `LeaveRequest.js`, `db.js`, `seed.js` | Mongoose schemas, validation, refs, populate, balance check |

---

## Setup Instructions

### Prerequisites
- **Node.js** ≥ 18
- **MongoDB Atlas** account (free tier) — or local MongoDB

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/itue301-exam-24aiml065-D.git
cd itue301-exam-24aiml065-D
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file from the template:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/leave-mgmt
PORT=5000
JWT_SECRET=itue301-secret-key
```

Seed the database (creates employees and leave types):

```bash
npm run seed
```

Start the server:

```bash
npm start
```

Server runs at `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

### 4. Test Credentials

All seeded users share the password: **`password123`**

| Role     | Email                       |
|----------|-----------------------------|
| Employee | krish@techsolutions.com     |
| Manager  | amit@techsolutions.com      |
| HR       | priya@techsolutions.com     |

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/login` | No | Login, returns JWT |
| GET | `/api/v1/leave-types` | No | List all leave types |
| POST | `/api/v1/leaves` | Yes | Apply for leave (checks balance) |
| GET | `/api/v1/leaves/my` | Yes | Employee's own requests (populated) |
| PATCH | `/api/v1/leaves/:id/status` | Yes | Approve/reject (manager) |

---

## MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) → Create free cluster
2. Create database user with read/write access
3. Whitelist your IP (or allow `0.0.0.0/0` for development)
4. Get connection string → paste into `backend/.env` as `MONGO_URI`
5. Run `npm run seed` to populate initial data
