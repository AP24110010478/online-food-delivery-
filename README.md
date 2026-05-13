# QuickBite Online Food Ordering System

Production-ready MERN stack food ordering app with Vite, React, Tailwind CSS, Redux Toolkit, JWT auth, role-based dashboards, MongoDB, Express, and mock Razorpay/Stripe payments.

## Run Locally

```powershell
cd online-food-ordering-system
npm run install:all
npm run seed
npm run start:server
```

Open a second terminal:

```powershell
cd online-food-ordering-system
npm run dev:client
```

Frontend: http://localhost:5173
API: http://localhost:5000/api

## Demo Accounts

All seeded users use this password:

```text
password123
```

```text
admin@quickbite.com
customer@quickbite.com
owner@quickbite.com
delivery@quickbite.com
```

## Environment

The server expects MongoDB at:

```text
mongodb://127.0.0.1:27017/online-food-ordering
```

Update `server/.env` and `client/.env` if your URLs or secrets differ.
