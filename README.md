# 🍃 MediLeaf - Medicinal Plants Identification System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-19.1.1-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/atlas)

> An AI-powered web application for identifying medicinal plants through image recognition with comprehensive plant information and medicinal properties.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

MediLeaf is a modern web application that combines computer vision and machine learning to help users identify medicinal plants by simply uploading or capturing images. The system provides detailed information about identified plants, including their medicinal properties, traditional uses, and safety information.

### 🎯 Project Goals

- **Accessibility**: Make medicinal plant knowledge accessible to everyone
- **Accuracy**: Provide reliable plant identification using advanced ML models
- **Education**: Educate users about traditional medicine and plant properties
- **Safety**: Include safety warnings and proper usage guidelines

## ✨ Features

### Current Features (v1.0)

- ✅ **User Authentication** - Secure registration and login system
- ✅ **Responsive Design** - Mobile-first design with Tailwind CSS
- ✅ **Protected Routes** - Role-based access control
- ✅ **Professional UI** - Modern, intuitive user interface

### Upcoming Features (v2.0)

- 🔄 **Image Upload** - Support for multiple image formats
- 🔄 **Camera Integration** - Real-time camera capture
- 🔄 **AI Plant Recognition** - Advanced ML-based plant identification
- 🔄 **Plant Database** - Comprehensive medicinal plants information
- 🔄 **Search & Filter** - Advanced search capabilities
- 🔄 **User History** - Personal identification history
- 🔄 **Offline Mode** - Limited offline functionality

## 🛠 Technology Stack

### Frontend

- **Framework**: React 19.1.1 with Hooks and Context API
- **Build Tool**: Vite 7.1.2 for fast development and building
- **Styling**: Tailwind CSS 4.1.13 for utility-first styling
- **HTTP Client**: Axios 1.11.0 for API communication
- **Routing**: React Router DOM 7.8.2 for navigation
- **Icons**: Lucide React 0.542.0 for consistent iconography

### Backend

- **Runtime**: Node.js (>=16.0.0)
- **Framework**: Express.js 5.1.0 for RESTful API
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) for secure auth
- **Password Hashing**: bcrypt for secure password storage
- **File Upload**: Multer for image processing (future)
- **Logging**: Morgan for request logging

### Development Tools

- **Linting**: ESLint with React and Node.js configurations
- **Version Control**: Git with conventional commit standards
- **Environment**: dotenv for environment variable management
- **Development**: Nodemon for auto-restart during development

## 📁 Project Structure

```
MediLeaf/
├── README.md                 # Main project documentation
├── PROJECT_STRUCTURE.md      # Detailed architecture documentation
├── COMMIT_GUIDE.md          # Git commit guidelines
├── backend/                 # Backend application
│   ├── README.md           # Backend-specific documentation
│   ├── package.json        # Backend dependencies
│   ├── index.js           # Application entry point
│   ├── .env.example       # Environment variables template
│   ├── config/            # Configuration files
│   │   └── db.js         # Database connection
│   ├── middleware/        # Express middleware
│   │   └── auth.js       # Authentication middleware
│   ├── models/           # Database models
│   │   └── User.js       # User model
│   ├── routes/           # API routes
│   │   └── auth.js       # Authentication routes
│   ├── services/         # Business logic layer
│   │   └── authService.js # Authentication service
│   └── utils/            # Utility functions
│       ├── jwt.js        # JWT utilities
│       ├── response.js   # Response utilities
│       └── validation.js # Validation utilities
├── frontend/               # Frontend application
│   ├── README.md          # Frontend-specific documentation
│   ├── package.json       # Frontend dependencies
│   ├── index.html         # HTML entry point
│   ├── vite.config.js     # Vite configuration
│   ├── src/
│   │   ├── main.jsx       # Application entry point
│   │   ├── App.jsx        # Main App component
│   │   ├── index.css      # Global styles
│   │   ├── components/    # React components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/       # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── services/      # API services
│   │   │   └── authService.js
│   │   └── utils/         # Utility functions
│   │       ├── api.js     # Axios configuration
│   │       ├── token.js   # Token management
│   │       └── validation.js # Form validation
│   └── public/            # Static assets
└── docs/                  # Additional documentation (future)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 or **yarn** >= 1.22.0
- **MongoDB Atlas** account (or local MongoDB)
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/medileaf.git
   cd medileaf
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

For detailed setup instructions, see:

- [Backend Setup Guide](./backend/README.md)
- [Frontend Setup Guide](./frontend/README.md)

## 🔄 Development Workflow

### Git Workflow

We follow the **GitHub Flow** with conventional commits:

1. **Create a feature branch**

   ```bash
   git checkout -b feature/plant-identification
   ```

2. **Make changes and commit**

   ```bash
   git add .
   git commit -m "feat(ml): add plant identification service"
   ```

3. **Push and create Pull Request**
   ```bash
   git push origin feature/plant-identification
   ```

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat(auth): add user registration with email verification
fix(api): handle edge case in JWT token validation
docs(readme): update installation instructions
refactor(frontend): modernize AuthContext with hooks
```

### Code Quality

- **ESLint**: Automated code linting
- **Prettier**: Code formatting (coming soon)
- **Husky**: Git hooks for pre-commit checks (coming soon)
- **Jest**: Unit testing (coming soon)

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | No            |
| POST   | `/api/auth/login`    | User login        | No            |
| GET    | `/api/auth/me`       | Get current user  | Yes           |

### Request/Response Examples

**Register User:**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

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
    "isEmailVerified": false
  },
  "timestamp": "2025-09-06T10:30:00.000Z"
}
```

For complete API documentation, see [API_DOCS.md](./docs/API_DOCS.md) (coming soon).

## 🏗 Architecture

### Backend Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Routes      │───▶│    Services     │───▶│    Database     │
│  (HTTP Layer)   │    │ (Business Logic)│    │   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Middleware    │    │    Utils        │
│ (Auth, CORS)    │    │ (JWT, Validation)│
└─────────────────┘    └─────────────────┘
```

### Frontend Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │───▶│    Context      │───▶│    Services     │
│   (UI Layer)    │    │  (State Mgmt)   │    │  (API Layer)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Utils       │    │     Hooks       │    │   HTTP Client   │
│ (Validation)    │    │  (Custom)       │    │    (Axios)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run all tests
npm run test:all
```

### Test Coverage

- Unit Tests: 80%+ coverage target
- Integration Tests: API endpoints
- E2E Tests: Critical user flows (coming soon)

## 🚢 Deployment

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start production server
cd backend
npm start
```

### Environment Variables

```env
# Backend (.env)
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-super-secret-jwt-key
```

### Docker Support (Coming Soon)

```bash
docker-compose up -d
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

### Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support

- 📧 **Email**: support@medileaf.com
- 💬 **Discord**: [Join our community](https://discord.gg/medileaf)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/medileaf/issues)
- 📖 **Documentation**: [Wiki](https://github.com/yourusername/medileaf/wiki)

## 🙏 Acknowledgments

- **MongoDB Atlas** for database hosting
- **Vercel** for frontend deployment
- **Railway** for backend hosting
- **Tailwind CSS** for the amazing styling framework
- **React Community** for the excellent ecosystem

## 📊 Project Status

- ✅ **Phase 1**: Authentication System (Completed)
- 🔄 **Phase 2**: Image Processing & ML Integration (In Progress)
- ⏳ **Phase 3**: Plant Database & Search (Planned)
- ⏳ **Phase 4**: Mobile App Development (Future)

---

<div align="center">
  <p>Made with ❤️ for the open source community</p>
  <p>
    <a href="#table-of-contents">⬆️ Back to Top</a>
  </p>
</div>
