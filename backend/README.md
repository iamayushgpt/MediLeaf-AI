# 🔧 MediLeaf Backend

> Node.js + Express.js + MongoDB backend API for the MediLeaf medicinal plants identification system.

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Environment Configuration](#environment-configuration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🌟 Overview

The MediLeaf backend is a RESTful API built with modern Node.js practices, providing secure authentication, user management, and future plant identification services. It follows a clean architecture with separated concerns for maintainability and scalability.

### Key Features

- ✅ **JWT Authentication** - Secure user authentication with JSON Web Tokens
- ✅ **Password Encryption** - bcrypt hashing for secure password storage
- ✅ **Input Validation** - Comprehensive request validation
- ✅ **Error Handling** - Centralized error handling with consistent responses
- ✅ **Modular Architecture** - Clean separation of routes, services, and utilities
- ✅ **MongoDB Integration** - Mongoose ODM with Atlas connection
- ✅ **Environment Configuration** - Flexible environment-based configuration
- ✅ **Request Logging** - Morgan middleware for HTTP request logging
- ✅ **CORS Support** - Cross-origin resource sharing enabled

## 🛠 Technology Stack

### Core Dependencies

- **Node.js** (>=16.0.0) - JavaScript runtime
- **Express.js** (5.1.0) - Web application framework
- **MongoDB** - NoSQL database (Atlas cloud)
- **Mongoose** (8.8.4) - MongoDB object modeling

### Authentication & Security

- **bcrypt** (5.1.1) - Password hashing
- **jsonwebtoken** (9.0.2) - JWT token generation/verification
- **cors** (2.8.5) - Cross-origin resource sharing

### Development Tools

- **nodemon** (3.1.9) - Development auto-restart
- **morgan** (1.10.0) - HTTP request logger
- **dotenv** (16.4.7) - Environment variable management

## 📁 Project Structure

```
backend/
├── README.md              # This file
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
├── index.js              # Application entry point
├── config/               # Configuration files
│   └── db.js            # Database connection configuration
├── middleware/           # Express middleware
│   └── auth.js          # JWT authentication middleware
├── models/              # Database models (Mongoose schemas)
│   └── User.js         # User model definition
├── routes/              # API route definitions
│   └── auth.js         # Authentication routes
├── services/            # Business logic layer
│   └── authService.js  # Authentication business logic
└── utils/               # Utility functions
    ├── jwt.js          # JWT utility functions
    ├── response.js     # API response utilities
    └── validation.js   # Input validation utilities
```

### Architecture Principles

- **Separation of Concerns**: Each layer has a specific responsibility
- **Dependency Injection**: Services are injected into routes
- **Error Boundaries**: Centralized error handling
- **Modular Design**: Features are self-contained modules

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 (or yarn >= 1.22.0)
- **MongoDB Atlas** account (or local MongoDB instance)
- **Git** for version control

### Step 1: Clone and Navigate

```bash
# From project root
cd backend
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### Step 3: Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit the .env file with your configuration
notepad .env  # Windows
```

### Step 4: Environment Variables

Configure your `.env` file:

```env
# Server Configuration
NODE_ENV=development
PORT=5001

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medileaf?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRE=7d

# CORS Configuration (optional)
FRONTEND_URL=http://localhost:5173
```

### Step 5: Database Setup

The application will automatically connect to MongoDB when started. Ensure your MongoDB Atlas cluster is running and accessible.

## 🔧 Development

### Available Scripts

```bash
# Start development server with auto-restart
npm run dev

# Start production server
npm start

# Install new dependency
npm install package-name

# Install dev dependency
npm install --save-dev package-name
```

### Development Server

```bash
# Start the development server
npm run dev

# The server will start on http://localhost:5001
# API endpoints available at http://localhost:5001/api
```

### Development Workflow

1. **Make Changes**: Edit files in your preferred editor
2. **Auto Restart**: Nodemon automatically restarts the server
3. **Test API**: Use Postman, Thunder Client, or curl
4. **Check Logs**: Monitor console output for errors/requests
5. **Database**: Check MongoDB Atlas for data changes

## 📡 API Documentation

### Base URL

```
Local Development: http://localhost:5001/api
Production: https://your-domain.com/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isEmailVerified": false,
    "createdAt": "2025-09-06T10:30:00.000Z"
  },
  "timestamp": "2025-09-06T10:30:00.000Z"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "lastLogin": "2025-09-06T10:30:00.000Z"
  },
  "timestamp": "2025-09-06T10:30:00.000Z"
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <jwt-token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isEmailVerified": false,
    "createdAt": "2025-09-06T10:30:00.000Z"
  },
  "timestamp": "2025-09-06T10:30:00.000Z"
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information",
  "timestamp": "2025-09-06T10:30:00.000Z"
}
```

**Common HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate data)
- `500` - Internal Server Error

### Testing API Endpoints

#### Using curl

```bash
# Register a new user
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"

# Get current user (replace TOKEN with actual JWT)
curl -X GET http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

#### Using Postman

1. Import the collection from `postman/MediLeaf-API.json` (coming soon)
2. Set environment variables for base URL and tokens
3. Run the requests in sequence

## 🗄 Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Indexes

- **email**: Unique index for fast user lookup
- **createdAt**: For sorting and pagination

## ⚙️ Environment Configuration

### Development (.env)

```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/medileaf-dev
JWT_SECRET=dev-secret-key-32-characters-minimum
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Production (.env.production)

```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/medileaf-prod
JWT_SECRET=super-secure-production-secret-64-characters-recommended
JWT_EXPIRE=24h
FRONTEND_URL=https://yourdomain.com
```

### Environment Variables Explained

| Variable       | Description               | Default     | Required |
| -------------- | ------------------------- | ----------- | -------- |
| `NODE_ENV`     | Environment mode          | development | Yes      |
| `PORT`         | Server port               | 5001        | No       |
| `MONGODB_URI`  | MongoDB connection string | -           | Yes      |
| `JWT_SECRET`   | JWT signing secret        | -           | Yes      |
| `JWT_EXPIRE`   | JWT token expiration      | 7d          | No       |
| `FRONTEND_URL` | Frontend URL for CORS     | -           | No       |

## 🧪 Testing

### Manual Testing

```bash
# Start the server
npm run dev

# Test health endpoint
curl http://localhost:5001/health

# Test API endpoints using Postman or curl
```

### Unit Tests (Coming Soon)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Integration Tests (Coming Soon)

```bash
# Run integration tests
npm run test:integration

# Test database connections
npm run test:db
```

## 🚢 Deployment

### Railway Deployment

1. **Connect Repository**

   ```bash
   # Push to GitHub
   git push origin main
   ```

2. **Configure Environment**

   - Add environment variables in Railway dashboard
   - Set `NODE_ENV=production`

3. **Deploy**
   ```bash
   # Railway auto-deploys on push
   # Monitor logs in Railway dashboard
   ```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker Deployment (Coming Soon)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5001
CMD ["npm", "start"]
```

### Health Checks

The server includes health check endpoints for monitoring:

```bash
# Basic health check
GET /health

# Detailed health check
GET /health/detailed
```

## 🔍 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error

```
Error: MongoServerError: bad auth Authentication failed
```

**Solution:**

- Check MongoDB URI in `.env`
- Verify username/password
- Ensure IP whitelist includes your IP
- Check cluster status in MongoDB Atlas

#### 2. JWT Secret Missing

```
Error: JWT secret is required
```

**Solution:**

```bash
# Add to .env file
JWT_SECRET=your-secret-key-min-32-characters
```

#### 3. Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5001
```

**Solutions:**

```bash
# Option 1: Kill process using port
npx kill-port 5001

# Option 2: Use different port
PORT=5002 npm run dev

# Option 3: Find and kill process
netstat -ano | findstr :5001
taskkill /PID <process_id> /F
```

#### 4. CORS Errors

```
Access to fetch at 'http://localhost:5001/api/auth/login'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**

- Check `FRONTEND_URL` in `.env`
- Ensure CORS middleware is properly configured

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev

# Enable specific debug namespace
DEBUG=app:* npm run dev
```

### Logging

The application uses Morgan for HTTP request logging:

```
HTTP/1.1 POST /api/auth/login - 200 45ms
HTTP/1.1 GET /api/auth/me - 401 12ms
```

### Performance Monitoring

Monitor key metrics:

- Response times
- Database query performance
- Memory usage
- CPU usage

## 📞 Support

- 📧 **Backend Issues**: backend@medileaf.com
- 📚 **Documentation**: [Backend Wiki](https://github.com/yourusername/medileaf/wiki/backend)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/medileaf/issues)

## 🤝 Contributing

1. Follow the [main contributing guide](../CONTRIBUTING.md)
2. Ensure all tests pass
3. Update API documentation for new endpoints
4. Follow the established code style

---

<div align="center">
  <p>🔧 Backend built with ❤️ using Node.js & Express</p>
  <p>
    <a href="../README.md">⬅️ Back to Main README</a>
  </p>
</div>
