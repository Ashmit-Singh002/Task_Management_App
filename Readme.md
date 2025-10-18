# Task Management Application

A full-stack task management application with user authentication built with React, Node.js, Express, and MongoDB.

## Features

- 🔐 User authentication (Register/Login) with JWT
- ✅ Create, Read, Update, Delete (CRUD) tasks
- 🔒 Protected routes - users can only see their own tasks
- ✨ Modern UI with TailwindCSS
- 📱 Responsive design
- 🎯 Form validation with error handling
- 🗄️ MongoDB database with Mongoose ODM
- 🔄 State management with Redux Toolkit

## Technology Stack

### Frontend
- React 18 with Vite
- Redux Toolkit for state management
- TailwindCSS for styling
- React Router for navigation
- Axios for API calls
- React Hook Form for form validation

### Backend
- Node.js & Express
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Express Validator for input validation

## Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher) installed
- npm or yarn package manager
- MongoDB Atlas account (free tier works fine)
- Git installed

## Installation & Setup

### 1. Clone the Repository

```bash
git clone 
cd task-management-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. MongoDB Atlas Configuration

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and add it to backend `.env` file
6. Format: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority`