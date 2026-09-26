# CampusCart – Full-Stack E-Commerce Web Application

> **Tagline:** *"Everything You Need for Campus Life"*

CampusCart is a student-focused online shopping platform designed for college students to purchase stationery, college essentials, technology accessories, campus wear, and hostel/lifestyle products.

This application is built as a complete, working full-stack project featuring real MongoDB database persistence, Node.js + Express REST APIs, JWT authentication, role-based authorization (USER / ADMIN), cart & checkout system, stock tracking, and visual order tracking.

---

## 🌟 Key Features

### **Student / Customer Features**
- 🛍️ **Product Catalog & Details**: Browse products across 5 campus categories (Stationery, Bags & Essentials, Tech & Accessories, Campus Wear, Hostel & Lifestyle).
- 🔍 **Real-Time Search & Multi-Filtering**: Filter products by category, price range, availability, and sort by price, rating, or newest.
- 🛒 **Dynamic Shopping Cart**: Real-time stock validation, quantity limits, cost breakdown (Subtotal + ₹50 Shipping = Total).
- 💳 **Seamless Checkout**: Address collection, Cash on Delivery (COD) or Demo Online Payment, automatic stock deduction upon order placement.
- 📦 **Live Order Tracking**: Visual step-by-step timeline tracking (`Order Placed` ➔ `Confirmed` ➔ `Packed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`).
- 👤 **User Profile**: Update contact details, shipping address, view order history.

### **Administrator Features**
- 📊 **Admin Dashboard**: Real-time statistics overview (Total Sales in ₹, Total Orders, Total Products, Total Users, Recent Orders).
- ✏️ **Product Management (CRUD)**: Create, Read, Update, and Delete products with confirmation modals and field validations.
- 🚚 **Order Management**: View all customer orders and update live order statuses in real-time.
- 👥 **User Management**: View list of all registered users and their assigned roles.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, JavaScript, HTML5, Vanilla CSS3 (Custom Design System), Lucide Icons |
| **Backend** | Node.js, Express.js, REST APIs |
| **Database** | MongoDB, Mongoose ODM (with automatic MongoMemoryServer fallback for zero-config local run) |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs (Password Hashing) |
| **Security** | Role-based Authorization Middleware, Environment Secret Management, CORS |

---

## 📁 Project Structure

```
CampusCart/
├── .env.example                # Global Environment Variables Template
├── README.md                   # Complete Documentation & Setup Guide
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection & memory fallback
│   ├── controllers/
│   │   ├── authController.js   # Registration, Login, Profile endpoints
│   │   ├── productController.js# Product CRUD & search/filter
│   │   ├── cartController.js   # Cart management & stock checks
│   │   ├── orderController.js  # Order creation, stock deduction, status updates
│   │   └── userController.js   # User management
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT protect & Admin role guards
│   │   └── errorMiddleware.js  # 404 & global error handling
│   ├── models/
│   │   ├── User.js             # User Mongoose schema & bcrypt hooks
│   │   ├── Product.js          # Product Mongoose schema
│   │   ├── Cart.js             # Cart Mongoose schema
│   │   └── Order.js            # Order Mongoose schema & statuses
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userRoutes.js
│   ├── seed/
│   │   └── seed.js            # Database seeder (28 products, Admin & Student accounts)
│   ├── .env                    # Backend environment config
│   ├── package.json
│   └── server.js               # Express application server
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── Navbar.jsx      # Navigation header & search drawer
    │   │   ├── Footer.jsx      # Campus store footer
    │   │   ├── ProductCard.jsx # Product card UI with stock badges
    │   │   ├── Modal.jsx       # Reusable confirmation modal
    │   │   ├── Toast.jsx       # Toast feedback notifications
    │   │   ├── OrderTimeline.jsx# Step-by-step visual tracker
    │   │   └── ProtectedRoute.jsx# Auth & Admin route guards
    │   ├── context/
    │   │   ├── AuthContext.jsx # JWT session context
    │   │   └── CartContext.jsx # Cart state & toast context
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── ShopPage.jsx
    │   │   ├── ProductDetailPage.jsx
    │   │   ├── CartPage.jsx
    │   │   ├── CheckoutPage.jsx
    │   │   ├── OrderConfirmationPage.jsx
    │   │   ├── OrdersPage.jsx
    │   │   ├── TrackOrderPage.jsx
    │   │   ├── ProfilePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── AdminDashboardPage.jsx
    │   │   ├── AdminProductsPage.jsx
    │   │   ├── AdminOrdersPage.jsx
    │   │   └── AdminUsersPage.jsx
    │   ├── services/
    │   │   └── api.js          # API client wrapper
    │   ├── index.css           # Global design system
    │   ├── App.jsx             # Main router
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js          # Vite config & API dev proxy
```

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@campuscart.com` | `Admin@123` | Full Admin Dashboard, Inventory CRUD, Order Status Management, Users List |
| **Student (User)** | `student@campuscart.com` | `Student@123` | Browse, Cart, Checkout, Order Placement, Personal Order Tracking, Profile |

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` directory (or use `.env.example` as a template):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/campuscart
JWT_SECRET=campuscart_jwt_secret_key_2026_dev
NODE_ENV=development
```

> **Note:** If local MongoDB is not running on your machine, CampusCart automatically launches an in-memory MongoDB instance (`MongoMemoryServer`) so the application works out-of-the-box seamlessly!

---

## 🚀 Installation & Setup Instructions

### **1. Prerequisites**
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### **2. Install Dependencies**

**Backend Dependencies:**
```bash
cd backend
npm install
```

**Frontend Dependencies:**
```bash
cd frontend
npm install
```

### **3. Seed the Database**
Run the database seed script to populate products and initial demo accounts:
```bash
cd backend
npm run seed
```

### **4. Start the Application**

**Start Backend API Server (Port 5000):**
```bash
cd backend
npm start
# or for hot reload: npm run dev
```

**Start Frontend Development Server (Port 3000):**
```bash
cd frontend
npm run dev
```

Open your browser and navigate to: `http://localhost:3000`

---

## 📡 REST API Overview

### **Auth Endpoints**
- `POST /api/auth/register` – Register a new student account
- `POST /api/auth/login` – Authenticate user and return JWT token
- `GET /api/auth/me` – Get logged-in user profile (Private)

### **Product Endpoints**
- `GET /api/products` – Get all products (supports `?search=`, `?category=`, `?minPrice=`, `?maxPrice=`, `?inStock=`, `?sort=`)
- `GET /api/products/:id` – Get single product details
- `POST /api/products` – Create new product (Admin Only)
- `PUT /api/products/:id` – Update product details (Admin Only)
- `DELETE /api/products/:id` – Delete product (Admin Only)

### **Cart Endpoints**
- `GET /api/cart` – Get user's cart (Private)
- `POST /api/cart` – Add product to cart with stock validation (Private)
- `PUT /api/cart/:productId` – Update item quantity (Private)
- `DELETE /api/cart/:productId` – Remove item from cart (Private)
- `DELETE /api/cart` – Clear all cart items (Private)

### **Order Endpoints**
- `POST /api/orders` – Place new order & deduct product stock (Private)
- `GET /api/orders` – Get user's order history (User gets own, Admin gets all) (Private)
- `GET /api/orders/:id` – Get order details & authorization check (Private)
- `PUT /api/orders/:id/status` – Update order status (Admin Only)

### **User Management Endpoints**
- `GET /api/users/profile` – Get user profile details (Private)
- `PUT /api/users/profile` – Update profile info or password (Private)
- `GET /api/users` – Get list of all registered users (Admin Only)

---

## 🧪 Testing User & Admin Flows

### **User Workflow Test:**
1. Click **Register** or **Log In** (`student@campuscart.com` / `Student@123`).
2. Go to **Shop Catalog**, search for "Notebook" or filter by **Tech & Accessories**.
3. Click a product card to view **Product Details**. Select quantity and click **Add to Cart**.
4. Open **Cart**, verify item count badge and subtotal calculation.
5. Click **Proceed to Checkout**, fill shipping address, select **Cash on Delivery**, and click **Place Order**.
6. View **Order Confirmation** page with generated Order ID.
7. Click **Track Order Progress** to inspect the live visual timeline.

### **Admin Workflow Test:**
1. Log in using Admin credentials (`admin@campuscart.com` / `Admin@123`).
2. Click **Admin Portal** in the navigation bar.
3. Inspect **Dashboard Overview** statistics cards (Total Sales, Orders, Products, Users).
4. Go to **Manage Products**, click **Add New Product** modal, enter details, and save.
5. Edit or Delete a product and verify inventory table update.
6. Go to **Manage Orders**, select the student's recent order, and change status from `Order Placed` ➔ `Shipped` ➔ `Delivered`.
7. Switch back to student view/order tracking to verify live status synchronization!

---

## ☁️ Deployment Guide

- **Frontend**: Deployable to [Vercel](https://vercel.com/) or Netlify. Set root directory to `frontend`, build command `npm run build`, output directory `dist`.
- **Backend**: Deployable to [Render](https://render.com/) or Railway. Set root directory to `backend`, start command `npm start`.
- **Database**: Connect to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) by updating `MONGO_URI` in environment variables.

---

## 📄 License
This project is developed for educational and demonstration purposes under the Thiranex task requirements.
