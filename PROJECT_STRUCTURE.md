# 📁 MediLeaf Project Structure

> Comprehensive guide to the MediLeaf project architecture, file organization, and development patterns.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Directory Structure](#directory-structure)
- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)
- [File Naming Conventions](#file-naming-conventions)
- [Module Organization](#module-organization)
- [Data Flow](#data-flow)
- [Development Patterns](#development-patterns)

## 🌟 Project Overview

MediLeaf follows a **monorepo structure** with clear separation between frontend and backend applications. The project is organized using industry-standard practices with modular architecture, separation of concerns, and scalable folder structures.

### Architecture Principles

- **Separation of Concerns** - Each module has a single responsibility
- **Modular Design** - Features are organized in self-contained modules
- **Scalability** - Structure supports growth and team collaboration
- **Maintainability** - Clear organization for easy navigation and updates
- **Industry Standards** - Follows widely accepted patterns and conventions

## 📁 Directory Structure

```
MediLeaf/
├── 📄 README.md                    # Main project documentation
├── 📄 PROJECT_STRUCTURE.md         # This file - architecture guide
├── 📄 COMMIT_GUIDE.md              # Git commit guidelines
├── 📄 CONTRIBUTING.md              # Contributing guidelines (future)
├── 📄 LICENSE                      # MIT license (future)
├── 📄 .gitignore                   # Git ignore rules
├── 🗃️ docs/                        # Additional documentation (future)
│   ├── API_DOCS.md                # API documentation
│   ├── DEPLOYMENT.md              # Deployment guidelines
│   └── ARCHITECTURE.md            # System architecture
├── 🔧 backend/                     # Backend application
│   ├── 📄 README.md               # Backend documentation
│   ├── 📄 package.json            # Dependencies & scripts
│   ├── 📄 .env.example            # Environment template
│   ├── 📄 index.js                # Application entry point
│   ├── ⚙️ config/                  # Configuration files
│   │   ├── db.js                  # Database connection
│   │   ├── cors.js                # CORS configuration (future)
│   │   └── multer.js              # File upload config (future)
│   ├── 🛡️ middleware/              # Express middleware
│   │   ├── auth.js                # JWT authentication
│   │   ├── validation.js          # Request validation (future)
│   │   ├── errorHandler.js        # Error handling (future)
│   │   └── logger.js              # Request logging (future)
│   ├── 📋 models/                  # Database models
│   │   ├── User.js                # User model
│   │   ├── Plant.js               # Plant model (future)
│   │   └── Identification.js      # Identification model (future)
│   ├── 🛣️ routes/                  # API route definitions
│   │   ├── auth.js                # Authentication routes
│   │   ├── plants.js              # Plant routes (future)
│   │   ├── upload.js              # File upload routes (future)
│   │   └── search.js              # Search routes (future)
│   ├── 🏢 services/                # Business logic layer
│   │   ├── authService.js         # Authentication logic
│   │   ├── plantService.js        # Plant identification (future)
│   │   ├── searchService.js       # Search functionality (future)
│   │   └── emailService.js        # Email notifications (future)
│   ├── 🔧 utils/                   # Utility functions
│   │   ├── jwt.js                 # JWT utilities
│   │   ├── response.js            # API response formatting
│   │   ├── validation.js          # Input validation
│   │   ├── imageProcessor.js      # Image processing (future)
│   │   └── errorTypes.js          # Custom error types (future)
│   ├── 🧪 tests/                   # Test files (future)
│   │   ├── unit/                  # Unit tests
│   │   ├── integration/           # Integration tests
│   │   └── fixtures/              # Test data
│   ├── 📁 uploads/                 # File upload directory (future)
│   └── 📝 logs/                    # Application logs (future)
├── 🎨 frontend/                    # Frontend application
│   ├── 📄 README.md               # Frontend documentation
│   ├── 📄 package.json            # Dependencies & scripts
│   ├── 📄 index.html              # HTML entry point
│   ├── 📄 vite.config.js          # Vite configuration
│   ├── 📄 eslint.config.js        # ESLint configuration
│   ├── 📄 tailwind.config.js      # Tailwind configuration
│   ├── 📁 public/                  # Static assets
│   │   ├── vite.svg               # Vite logo
│   │   ├── favicon.ico            # Favicon (future)
│   │   └── manifest.json          # PWA manifest (future)
│   ├── 📂 src/                     # Source code
│   │   ├── 📄 main.jsx            # Application entry point
│   │   ├── 📄 App.jsx             # Main app component
│   │   ├── 📄 App.css             # App-specific styles
│   │   ├── 📄 index.css           # Global styles & Tailwind
│   │   ├── 🧩 components/          # React components
│   │   │   ├── 🏠 pages/           # Page components
│   │   │   │   ├── Home.jsx       # Home dashboard
│   │   │   │   ├── Login.jsx      # Login page
│   │   │   │   ├── Register.jsx   # Registration page
│   │   │   │   ├── Profile.jsx    # User profile (future)
│   │   │   │   └── NotFound.jsx   # 404 page (future)
│   │   │   ├── 🔐 auth/            # Authentication components
│   │   │   │   ├── LoginForm.jsx  # Login form (future)
│   │   │   │   ├── RegisterForm.jsx # Register form (future)
│   │   │   │   └── ProtectedRoute.jsx # Route protection
│   │   │   ├── 📱 ui/              # Reusable UI components
│   │   │   │   ├── Button.jsx     # Button component (future)
│   │   │   │   ├── Input.jsx      # Input component (future)
│   │   │   │   ├── Modal.jsx      # Modal component (future)
│   │   │   │   ├── Spinner.jsx    # Loading spinner (future)
│   │   │   │   └── Toast.jsx      # Toast notifications (future)
│   │   │   ├── 🏗️ layout/          # Layout components
│   │   │   │   ├── Header.jsx     # Header component (future)
│   │   │   │   ├── Footer.jsx     # Footer component (future)
│   │   │   │   ├── Sidebar.jsx    # Sidebar navigation (future)
│   │   │   │   └── Layout.jsx     # Main layout wrapper (future)
│   │   │   └── 🍃 features/        # Feature-specific components
│   │   │       ├── upload/        # Image upload feature (future)
│   │   │       ├── identification/ # Plant ID feature (future)
│   │   │       └── search/        # Search feature (future)
│   │   ├── 🗂️ context/             # React Context providers
│   │   │   ├── AuthContext.jsx    # Authentication context
│   │   │   ├── ThemeContext.jsx   # Theme management (future)
│   │   │   └── AppContext.jsx     # Global app state (future)
│   │   ├── 🔗 hooks/               # Custom React hooks
│   │   │   ├── useAuth.js         # Authentication hook (future)
│   │   │   ├── useLocalStorage.js # Local storage hook (future)
│   │   │   └── useApi.js          # API hook (future)
│   │   ├── 🌐 services/            # API service layer
│   │   │   ├── authService.js     # Authentication API
│   │   │   ├── plantService.js    # Plant API (future)
│   │   │   ├── uploadService.js   # Upload API (future)
│   │   │   └── searchService.js   # Search API (future)
│   │   ├── 🔧 utils/               # Utility functions
│   │   │   ├── api.js             # Axios configuration
│   │   │   ├── token.js           # Token management
│   │   │   ├── validation.js      # Form validation
│   │   │   ├── formatters.js      # Data formatting (future)
│   │   │   └── constants.js       # App constants (future)
│   │   ├── 🎨 assets/              # Static assets
│   │   │   ├── images/            # Image assets
│   │   │   ├── icons/             # Icon assets
│   │   │   └── fonts/             # Font files (future)
│   │   └── 🎭 styles/              # Style files (future)
│   │       ├── components/        # Component styles
│   │       ├── utilities/         # Utility classes
│   │       └── themes/            # Theme definitions
│   ├── 🧪 tests/                   # Test files (future)
│   │   ├── components/            # Component tests
│   │   ├── hooks/                 # Hook tests
│   │   ├── services/              # Service tests
│   │   └── utils/                 # Utility tests
│   └── 📦 dist/                    # Build output (generated)
└── 🚀 deployment/                  # Deployment configurations (future)
    ├── docker/                    # Docker configurations
    ├── nginx/                     # Nginx configurations
    └── ci-cd/                     # CI/CD pipeline scripts
```

## 🔧 Backend Architecture

### Layered Architecture Pattern

```
┌─────────────────┐
│   🛣️ Routes      │  ← HTTP endpoints & request handling
├─────────────────┤
│   🛡️ Middleware  │  ← Authentication, validation, logging
├─────────────────┤
│   🏢 Services    │  ← Business logic & operations
├─────────────────┤
│   📋 Models      │  ← Data models & database interaction
├─────────────────┤
│   🗄️ Database    │  ← MongoDB with Mongoose ODM
└─────────────────┘
```

### File Responsibilities

| Layer | Purpose | Example Files |
|-------|---------|---------------|
| **Routes** | HTTP endpoint definitions, request routing | `auth.js`, `plants.js` |
| **Middleware** | Cross-cutting concerns, request processing | `auth.js`, `validation.js` |
| **Services** | Business logic, complex operations | `authService.js`, `plantService.js` |
| **Models** | Data schema, database operations | `User.js`, `Plant.js` |
| **Utils** | Helper functions, utilities | `jwt.js`, `validation.js` |
| **Config** | Application configuration | `db.js`, `cors.js` |

### Request Flow

```
HTTP Request → Route → Middleware → Service → Model → Database
                ↓         ↓          ↓        ↓        ↓
           Validation  Auth Check  Business  Schema   MongoDB
                ↓         ↓          ↓        ↓        ↓
HTTP Response ← Format ← Transform ← Process ← Query ← Result
```

## 🎨 Frontend Architecture

### Component Hierarchy

```
App.jsx (Root)
├── AuthProvider (Context)
├── Router (Navigation)
│   ├── Public Routes
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── NotFound.jsx
│   └── Protected Routes
│       ├── ProtectedRoute.jsx (Wrapper)
│       ├── Home.jsx
│       ├── Profile.jsx
│       └── Features/
│           ├── Upload/
│           ├── Identification/
│           └── Search/
```

### State Management Strategy

```
┌─────────────────┐
│   🗂️ Context API  │  ← Global state (auth, theme)
├─────────────────┤
│   🪝 Custom Hooks │  ← Reusable logic & local state
├─────────────────┤
│   🔄 Component    │  ← Component-specific state
│   State          │
└─────────────────┘
```

### Data Flow

```
User Action → Component → Hook/Context → Service → API → Backend
     ↓           ↓          ↓             ↓       ↓       ↓
UI Update ← Re-render ← State Update ← Response ← HTTP ← Database
```

## 📝 File Naming Conventions

### Backend (Node.js)

```javascript
// Files: camelCase.js
authService.js
userController.js
plantModel.js

// Variables: camelCase
const userService = require('./userService')
const jwtToken = generateToken()

// Constants: UPPER_SNAKE_CASE
const JWT_SECRET = process.env.JWT_SECRET
const MAX_FILE_SIZE = 5 * 1024 * 1024

// Classes: PascalCase
class UserService {
  constructor() {}
}
```

### Frontend (React)

```javascript
// Components: PascalCase.jsx
LoginForm.jsx
UserProfile.jsx
PlantIdentification.jsx

// Hooks: camelCase starting with 'use'
useAuth.js
useLocalStorage.js
useApiCall.js

// Utilities: camelCase.js
apiHelper.js
tokenManager.js
formValidator.js

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:5001'
const SUPPORTED_FORMATS = ['jpg', 'png', 'jpeg']
```

### CSS Classes (Tailwind)

```css
/* Utility-first approach */
.btn-primary
.card-container
.form-input

/* Component-specific */
.login-form
.plant-card
.upload-area
```

## 📦 Module Organization

### Feature-Based Structure

Each feature is organized as a self-contained module:

```
features/
├── authentication/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   └── utils/
├── plant-identification/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   └── utils/
└── search/
    ├── components/
    ├── services/
    ├── hooks/
    └── utils/
```

### Shared Resources

```
shared/
├── components/        # Reusable UI components
├── hooks/            # Common hooks
├── services/         # Shared API services
├── utils/            # Common utilities
└── constants/        # Application constants
```

## 🔄 Data Flow

### Authentication Flow

```
1. User Input → LoginForm.jsx
2. Form Submit → authService.login()
3. API Call → POST /api/auth/login
4. Backend → authService.validateUser()
5. Database → User.findOne()
6. Response → JWT token + user data
7. Frontend → AuthContext.setUser()
8. State Update → Re-render protected components
9. Redirect → Home.jsx
```

### Plant Identification Flow (Future)

```
1. Image Upload → UploadComponent.jsx
2. File Processing → uploadService.processImage()
3. API Call → POST /api/plants/identify
4. Backend → plantService.identifyPlant()
5. ML Processing → AI model prediction
6. Database → Plant.findById()
7. Response → Plant data + confidence score
8. Frontend → Display results
```

## 🏗️ Development Patterns

### Backend Patterns

#### Service Pattern
```javascript
// services/authService.js
class AuthService {
  async register(userData) {
    // Business logic
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const user = new User({ ...userData, password: hashedPassword })
    return await user.save()
  }
}
```

#### Middleware Pattern
```javascript
// middleware/auth.js
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Access denied' })
  }
}
```

#### Response Utility Pattern
```javascript
// utils/response.js
const sendSuccess = (res, data, message = 'Success') => {
  res.status(200).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  })
}
```

### Frontend Patterns

#### Context Pattern
```jsx
// context/AuthContext.jsx
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  
  const login = async (credentials) => {
    const response = await authService.login(credentials)
    setUser(response.user)
    localStorage.setItem('token', response.token)
  }

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  )
}
```

#### Custom Hook Pattern
```jsx
// hooks/useAuth.js
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

#### Service Pattern
```javascript
// services/authService.js
import apiClient from '../utils/api'

export const authService = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials)
    return response.data
  },
  
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData)
    return response.data
  }
}
```

## 🔒 Security Patterns

### Environment Variables
```env
# Backend
JWT_SECRET=your-super-secret-key
MONGODB_URI=mongodb+srv://...
NODE_ENV=production

# Frontend
VITE_API_BASE_URL=https://api.medileaf.com
```

### Input Validation
```javascript
// Backend validation
const validateUserInput = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' })
  }
  next()
}

// Frontend validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

## 📊 Performance Patterns

### Code Splitting
```jsx
// Lazy loading components
const Home = lazy(() => import('./components/Home'))
const Profile = lazy(() => import('./components/Profile'))

// Wrap with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Home />
</Suspense>
```

### API Optimization
```javascript
// Debounced search
const debouncedSearch = useMemo(
  () => debounce((query) => searchPlants(query), 300),
  []
)

// Caching responses
const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  headers: { 'Cache-Control': 'max-age=300' }
})
```

---

<div align="center">
  <p>🏗️ Project structure designed for scalability and maintainability</p>
  <p>
    <a href="README.md">⬅️ Back to Main README</a>
  </p>
</div>
