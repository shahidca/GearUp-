# 🚀 GearUp Rental Marketplace API

A production-ready RESTful API for an online rental marketplace where customers can rent outdoor and sports gear, providers can manage their inventory and rentals, and administrators can monitor the entire platform.

The project is built using **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **Stripe** following a modular and scalable architecture.

---

## 🔗 Repository

GitHub Repository:

**https://github.com/shahidca/GearUp-**

---

---

# 🌐 Live API

**Base URL**

https://gearup-api-lso7.onrender.com

---

---

# 📖 API Documentation

### Swagger UI

https://gearup-api-lso7.onrender.com/api/docs

The API documentation is available through Swagger UI, where all endpoints, request bodies, authentication requirements, and responses can be explored and tested.

---

# ✨ Features

## 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Authorization
* Protected Routes

---

## 👤 User Roles

### Customer

* Register & Login
* Browse Gear
* Rent Gear
* Cancel Rental
* View Rental History
* Make Stripe Payment
* Submit Reviews

### Provider

* Manage Gear Listings
* Confirm Rental Requests
* Pickup Rental Orders
* Return Rental Orders
* Manage Rental Inventory

### Admin

* View All Users
* Suspend / Activate Users
* View All Gear Listings
* View All Rental Orders

---

## 🎒 Gear Management

* Create Gear
* Update Gear
* Delete Gear
* Get All Gear
* Get Single Gear
* Search Gear
* Filter Gear
* Pagination Support

---

## 📦 Rental Management

* Create Rental
* View Rental Details
* View My Rentals
* Cancel Rental
* Confirm Rental
* Pickup Rental
* Return Rental

---

## 💳 Stripe Payment

* Create Payment Intent
* Confirm Payment
* Payment History
* Payment Details

---

## ⭐ Review System

* Review after successful rental return
* 1–5 Star Rating
* Optional Review Comment

---

## 🛡️ Validation & Security

* Zod Request Validation
* JWT Authentication
* Role-Based Access Control
* Global Error Handling
* Prisma Transactions
* Secure Password Hashing
---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js
* TypeScript

## Database

* PostgreSQL
* Prisma ORM

## Authentication

* JSON Web Token (JWT)
* bcrypt

## Validation

* Zod

## Payment Gateway

* Stripe

## Development Tools

* Prisma Studio
* Postman
* Git
* GitHub
* Nodemon
* ts-node-dev

---

# 🏗 Project Architecture

The project follows a **Modular Architecture**, where every feature is organized into its own module.

Each module contains:

* Controller
* Service
* Route
* Validation
* Interface
* Constants (where required)

This structure keeps the project clean, scalable, and easy to maintain.

---
# 📂 Project Structure

```text
src
│
├── app
│   ├── config
│   ├── errors
│   ├── middleware
│   ├── modules
│   │   ├── admin
│   │   ├── auth
│   │   ├── category
│   │   ├── gear
│   │   ├── payment
│   │   ├── provider
│   │   ├── rental
│   │   └── review
│   │
│   ├── routes
│   └── utils
│
├── app.ts
└── server.ts
```



# 🚀 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user profile |

---

## Categories

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/categories` | Create Category (Admin) |

---

## Gear

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/gear` | Get All Gear |
| GET | `/api/gear/:id` | Get Single Gear |
| POST | `/api/gear` | Create Gear |
| PUT | `/api/gear/:id` | Update Gear |
| DELETE | `/api/gear/:id` | Delete Gear |

---

## Rentals

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/rentals` | Create Rental |
| GET | `/api/rentals/my-rentals` | Get My Rentals |
| GET | `/api/rentals/:rentalId` | Rental Details |
| PATCH | `/api/rentals/:rentalId/confirm` | Confirm Rental |
| PATCH | `/api/rentals/:rentalId/cancel` | Cancel Rental |
| PATCH | `/api/rentals/:rentalId/pickup` | Pickup Rental |
| PATCH | `/api/rentals/:rentalId/return` | Return Rental |

---

## Payments

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/payments/create` | Create Payment Intent |
| POST | `/api/payments/confirm` | Confirm Payment |
| GET | `/api/payments` | My Payments |
| GET | `/api/payments/:id` | Payment Details |

---

## Provider

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/provider/orders` | Provider Orders |
| PATCH | `/api/provider/orders/:id` | Update Rental Status |

---

## Reviews

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/reviews` | Submit Review |

---

## Admin

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/admin/users` | Get All Users |
| PATCH | `/api/admin/users/:id` | Update User Status |
| GET | `/api/admin/gear` | Get All Gear |
| GET | `/api/admin/rentals` | Get All Rentals |

---

# 🔒 Authentication

Protected APIs require a JWT access token.

Example:

```http
Authorization: Bearer <your_access_token>
```

---

# ⚙️ Installation

```bash
git clone https://github.com/shahidca/GearUp-.git

cd GearUp-

npm install
```

---

# 🔑 Environment Variables

Create a `.env` file and configure:

```env
NODE_ENV=development

PORT=5000

DATABASE_URL=your_database_url

JWT_ACCESS_SECRET=your_secret

JWT_ACCESS_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10

STRIPE_SECRET_KEY=your_secret_key

STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

---

# ▶️ Run Project

Development

```bash
npm run dev
```

Production Build

```bash
npm run build
```

Start Production

```bash
npm start
```

---

# 👨‍💻 Admin Credentials

Use the admin account created in your database.

> Email: mdshahidca123@gmail.com



# 🚀 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user profile |

---

## Categories

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/categories` | Create Category (Admin) |

---

## Gear

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/gear` | Get All Gear |
| GET | `/api/gear/:id` | Get Single Gear |
| POST | `/api/gear` | Create Gear |
| PUT | `/api/gear/:id` | Update Gear |
| DELETE | `/api/gear/:id` | Delete Gear |

---

## Rentals

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/rentals` | Create Rental |
| GET | `/api/rentals/my-rentals` | Get My Rentals |
| GET | `/api/rentals/:rentalId` | Rental Details |
| PATCH | `/api/rentals/:rentalId/confirm` | Confirm Rental |
| PATCH | `/api/rentals/:rentalId/cancel` | Cancel Rental |
| PATCH | `/api/rentals/:rentalId/pickup` | Pickup Rental |
| PATCH | `/api/rentals/:rentalId/return` | Return Rental |

---

## Payments

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/payments/create` | Create Payment Intent |
| POST | `/api/payments/confirm` | Confirm Payment |
| GET | `/api/payments` | My Payments |
| GET | `/api/payments/:id` | Payment Details |

---

## Provider

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/provider/orders` | Provider Orders |
| PATCH | `/api/provider/orders/:id` | Update Rental Status |

---

## Reviews

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/reviews` | Submit Review |

---

## Admin

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/admin/users` | Get All Users |
| PATCH | `/api/admin/users/:id` | Update User Status |
| GET | `/api/admin/gear` | Get All Gear |
| GET | `/api/admin/rentals` | Get All Rentals |

---

# 🔒 Authentication

Protected APIs require a JWT access token.

Example:

```http
Authorization: Bearer <your_access_token>
```

---

# ⚙️ Installation

```bash
git clone https://github.com/shahidca/GearUp-.git

cd GearUp-

npm install
```

---

# 🔑 Environment Variables

Create a `.env` file and configure:

```env
NODE_ENV=development

PORT=5000

DATABASE_URL=your_database_url

JWT_ACCESS_SECRET=your_secret

JWT_ACCESS_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10

STRIPE_SECRET_KEY=your_secret_key

STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

---

# ▶️ Run Project

Development

```bash
npm run dev
```

Production Build

```bash
npm run build
```

Start Production

```bash
npm start
```

---

# 👨‍💻 Admin Credentials

Use the admin account created in your database.

> Email: mdshahidca123@gmail.com

> Password: Password@123

---

# 🎥 Demo Video

Demo Video Link:

(Add your video link here)

---

# 👨‍💻 Author

**Md. Shahid Hossain**

Full Stack Web Developer

GitHub:
https://github.com/shahidca

LinkedIn:
https://www.linkedin.com/in/md-shahid-hossain-ca

---

> Password: Password@123



---

# 📦 Main Features

* Modular Codebase
* RESTful API Design
* Prisma ORM
* PostgreSQL Database
* JWT Authentication
* Role-Based Authorization
* Stripe Payment Integration
* Rental Lifecycle Management
* Review System
* Global Error Handling
* Request Validation
* Database Transactions
* Stock Management

---

# 👥 User Roles

| Role         | Permissions                      |
| ------------ | -------------------------------- |
| **Customer** | Rent gear, pay, review rentals   |
| **Provider** | Manage gear and rental lifecycle |
| **Admin**    | Manage users, gear, and rentals  |

