# QuickBite - Online Food Ordering System

A production-ready full-stack food ordering application built with the MERN (MongoDB, Express, React, Node.js) stack. Features a modern UI with Vite, Redux Toolkit for state management, role-based access control, and integrated payment processing.

![version](https://img.shields.io/badge/version-1.0.0-blue)
![license](https://img.shields.io/badge/license-MIT-green)
![node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Configuration](#environment-configuration)
- [Demo Accounts](#demo-accounts)
- [API Endpoints](#api-endpoints)
- [Role-Based Dashboards](#role-based-dashboards)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Features
- **User Authentication**: JWT-based authentication with secure password hashing
- **Multi-Role System**: Admin, Customer, Restaurant Owner, and Delivery Partner roles
- **Restaurant Management**: Browse restaurants, view menus, and filter by cuisine/rating
- **Order Management**: Easy-to-use cart, checkout, and order tracking
- **Payment Integration**: Mock Razorpay and Stripe payment gateways
- **Order Tracking**: Real-time order status updates with delivery tracking
- **Reviews & Ratings**: Customer reviews and restaurant ratings
- **Responsive Design**: Mobile-first UI built with Tailwind CSS

### Admin Features
- User management and moderation
- System analytics and reporting
- Content management

### Restaurant Owner Features
- Menu management (add, edit, delete items)
- Order management and fulfillment
- Restaurant profile customization
- Analytics and performance tracking

### Delivery Partner Features
- Available order list
- Delivery assignment and tracking
- Delivery status updates

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Next generation build tool
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js & Express** - Server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Cloudinary** - Image hosting and CDN
- **Nodemailer** - Email service
- **Multer** - File upload handling

### Development Tools
- **Nodemon** - Auto-restart development server
- **Vite** - Fast module bundler

---

## 📁 Project Structure

```
online-food-delivery/
│
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/             # Reusable React components
│   │   ├── pages/                  # Page components
│   │   ├── redux/                  # Redux slices and store
│   │   ├── services/               # API service calls
│   │   ├── utils/                  # Utility functions
│   │   ├── assets/                 # Images and icons
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx              # Route configuration
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Express backend
│   ├── controllers/                # Route handlers
│   ├── models/                     # MongoDB schemas
│   ├── routes/                     # API routes
│   ├── middleware/                 # Custom middleware
│   ├── config/                     # Configuration files
│   ├── utils/                      # Utility functions
│   ├── uploads/                    # File storage
│   ├── server.js                   # Entry point
│   ├── seed.js                     # Database seeding
│   └── package.json
│
├── README.md
└── package.json                    # Root package.json with npm scripts
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MongoDB** (v4.4 or higher) - Local instance or MongoDB Atlas
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/AP24110010478/online-food-delivery-.git
cd online-food-delivery-
```

### 2. Install Dependencies

#### On Windows (PowerShell)
```powershell
npm run install:all
```

#### On Linux/macOS (Bash)
```bash
npm run install:all
```

This command installs dependencies for both frontend and backend.

### 3. Seed the Database (Optional)

Populate the database with sample data:

```bash
npm run seed
```

---

## ▶️ Running the Application

### Start the Backend Server

```bash
npm run start:server
```

The API will be available at: **http://localhost:5000/api**

### Start the Frontend (in a new terminal)

```bash
npm run dev:client
```

The application will be available at: **http://localhost:5173**

---

## 🔐 Environment Configuration

### Server Environment (.env)

Create a `.env` file in the `server/` directory:

```env
# Database
MONGODB_URI=mongodb://127.0.0.1:27017/online-food-ordering

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Cloudinary (Image Hosting)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment Gateways (Mock)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret

# Server Config
PORT=5000
NODE_ENV=development
```

### Client Environment (.env)

Create a `.env` file in the `client/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CLOUDINARY_NAME=your_cloudinary_name
```

### Default MongoDB Location

The application expects MongoDB at:
```
mongodb://127.0.0.1:27017/online-food-ordering
```

If your MongoDB instance is running elsewhere, update the `MONGODB_URI` in your `.env` file.

---

## 👥 Demo Accounts

Test the application with these pre-seeded accounts. Password for all accounts:

```
password123
```

| Email | Role | Purpose |
|-------|------|---------|
| `admin@quickbite.com` | Admin | System administration |
| `customer@quickbite.com` | Customer | Browse and order food |
| `owner@quickbite.com` | Restaurant Owner | Manage restaurant & menu |
| `delivery@quickbite.com` | Delivery Partner | Handle deliveries |

---

## 🔌 API Endpoints

### Authentication Routes
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - User login
GET    /api/auth/profile           - Get current user profile
PUT    /api/auth/profile           - Update user profile
```

### Restaurant Routes
```
GET    /api/restaurants            - Get all restaurants
GET    /api/restaurants/:id        - Get restaurant details
POST   /api/restaurants            - Create restaurant (owner)
PUT    /api/restaurants/:id        - Update restaurant (owner)
DELETE /api/restaurants/:id        - Delete restaurant (owner)
```

### Menu Routes
```
GET    /api/menu/:restaurantId     - Get menu items
POST   /api/menu                   - Create menu item (owner)
PUT    /api/menu/:id               - Update menu item (owner)
DELETE /api/menu/:id               - Delete menu item (owner)
```

### Cart Routes
```
GET    /api/cart                   - Get user's cart
POST   /api/cart                   - Add item to cart
PUT    /api/cart/:itemId           - Update cart item
DELETE /api/cart/:itemId           - Remove from cart
```

### Order Routes
```
POST   /api/orders                 - Create new order
GET    /api/orders                 - Get user's orders
GET    /api/orders/:id             - Get order details
PUT    /api/orders/:id             - Update order status
```

### Payment Routes
```
POST   /api/payments               - Process payment
GET    /api/payments/:orderId      - Get payment details
```

### Review Routes
```
POST   /api/reviews                - Create review
GET    /api/reviews/:orderId       - Get reviews for item
```

---

## 👨‍💼 Role-Based Dashboards

### Customer Dashboard
- View order history
- Track active orders
- Manage delivery addresses
- View saved payment methods
- Leave reviews and ratings

### Restaurant Owner Dashboard
- Manage menu items (add, edit, delete)
- View incoming orders
- Update order status
- View analytics and revenue
- Manage restaurant information

### Delivery Partner Dashboard
- View available orders
- Accept/reject deliveries
- Update delivery status
- View earnings

### Admin Dashboard
- Manage all users
- View system statistics
- Monitor platform activity
- Manage content

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
✅ **Solution**: Ensure MongoDB is running
```bash
# On Linux/macOS
brew services start mongodb-community

# On Windows
net start MongoDB
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
✅ **Solution**: Change the PORT in `.env` or kill the process using the port
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>
```

### Dependencies Installation Failed
```
npm ERR! code ERESOLVE
```
✅ **Solution**: Clear npm cache and reinstall
```bash
npm cache clean --force
npm install
```

### Vite Port Conflict
```
Error: EADDRINUSE: address already in use :::5173
```
✅ **Solution**: Use a different port
```bash
npm run dev:client -- --port 3000
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please follow the existing code style and add tests for new features.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For support, email support@quickbite.com or open an issue in the repository.

---

## 🙏 Acknowledgments

- MERN Stack Community
- Vite Documentation
- Tailwind CSS Community
- MongoDB Documentation

---

**Last Updated**: May 2026
