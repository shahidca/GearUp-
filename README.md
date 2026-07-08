# 🚀 GearUp Rental Marketplace API

A production-ready RESTful API for an online rental marketplace where customers can rent outdoor and sports gear, providers can manage their inventory and rentals, and administrators can monitor the entire platform.

The project is built using **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **Stripe** following a modular and scalable architecture.

---

## 🔗 Repository

GitHub Repository:

**https://github.com/shahidca/GearUp-**

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

