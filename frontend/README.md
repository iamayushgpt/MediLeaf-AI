# 🎨 MediLeaf Frontend


## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [Components Guide](#components-guide)
- [State Management](#state-management)
- [Styling Guide](#styling-guide)
- [Build & Deployment](#build--deployment)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## 🌟 Overview

The MediLeaf frontend is a modern, responsive React application built with performance and user experience in mind. It features a clean, intuitive interface designed for both desktop and mobile users, with a focus on accessibility and modern design principles.

### Key Features

- ✅ **Modern React** - React 19.1.1 with Hooks and functional components
- ✅ **Lightning Fast** - Vite build tool for instant HMR and fast builds
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Authentication** - Secure JWT-based authentication with protected routes
- ✅ **Context API** - Clean state management with React Context
- ✅ **Icon System** - Lucide React icons for consistent UI
- ✅ **Form Validation** - Client-side validation for better UX
- ✅ **Error Handling** - Graceful error handling with user feedback
- ✅ **Code Splitting** - Optimized bundle splitting for performance

## 🛠 Technology Stack

### Core Framework

- **React** (19.1.1) - UI library with hooks and context
- **Vite** (7.1.2) - Next-generation frontend build tool
- **React Router DOM** (7.8.2) - Client-side routing

### Styling & UI

- **Tailwind CSS** (4.1.13) - Utility-first CSS framework
- **Lucide React** (0.542.0) - Beautiful, customizable icons
- **CSS3** - Modern CSS features and animations

### HTTP & State

- **Axios** (1.11.0) - Promise-based HTTP client
- **React Context** - Built-in state management
- **Local Storage** - Token persistence

### Development Tools

- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
frontend/
├── README.md              # This file
├── package.json           # Dependencies and scripts
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
├── postcss.config.js     # PostCSS configuration (auto-generated)
├── tailwind.config.js    # Tailwind configuration (auto-generated)
├── public/               # Static assets
│   └── vite.svg         # Vite logo
├── src/                  # Source code
│   ├── main.jsx         # Application entry point
│   ├── App.jsx          # Main App component
│   ├── App.css          # App-specific styles
│   ├── index.css        # Global styles & Tailwind imports
│   ├── components/      # React components
│   │   ├── Home.jsx            # Home page component
│   │   ├── Login.jsx           # Login form component
│   │   ├── Register.jsx        # Registration form component
│   │   └── ProtectedRoute.jsx  # Route protection component
│   ├── context/         # React Context providers
│   │   └── AuthContext.jsx     # Authentication context
│   ├── services/        # API service layer
│   │   └── authService.js      # Authentication API calls
│   ├── utils/           # Utility functions
│   │   ├── api.js              # Axios configuration
│   │   ├── token.js            # Token management utilities
│   │   └── validation.js       # Form validation utilities
│   └── assets/          # Static assets
│       └── react.svg           # React logo
└── dist/                # Build output (generated)
```

### Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │───▶│    Context      │───▶│    Services     │
│   (UI Layer)    │    │  (State Mgmt)   │    │  (API Layer)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Utils       │    │   Validation    │    │   HTTP Client   │
│ (Helpers)       │    │   (Forms)       │    │    (Axios)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 (or yarn >= 1.22.0)
- **Backend API** running on http://localhost:5001

### Step 1: Navigate to Frontend

```bash
# From project root
cd frontend
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### Step 3: Environment Configuration (Optional)

Create a `.env` file for environment variables:

```bash
# Create environment file
touch .env  # macOS/Linux
type nul > .env  # Windows
```

Configure environment variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5001/api

# App Configuration
VITE_APP_NAME=MediLeaf
VITE_APP_VERSION=1.0.0
```

### Step 4: Start Development Server

```bash
# Start the development server
npm run dev

# The app will open at http://localhost:5173
```

## 🔧 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Install new dependency
npm install package-name

# Install dev dependency
npm install --save-dev package-name
```

### Development Workflow

1. **Start Development Server**

   ```bash
   npm run dev
   ```

2. **Make Changes**: Edit files in `src/`

3. **Hot Reload**: Changes appear instantly in browser

4. **Test Features**: Interact with the application

5. **Check Console**: Monitor for errors and warnings

6. **Lint Code**: Run `npm run lint` before committing

### Development Features

- **Hot Module Replacement (HMR)** - Instant updates without page refresh
- **Fast Refresh** - Preserves component state during updates
- **Source Maps** - Debug with original source code
- **Error Overlay** - Visual error reporting in browser
- **TypeScript Support** - Ready for TypeScript migration

## 🧩 Components Guide

### App.jsx

The main application component that sets up routing and global providers.

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
```

### Home.jsx

The main dashboard component for authenticated users.

**Features:**

- User dashboard with navigation
- Logout functionality
- Welcome message with user name
- Responsive design

### Login.jsx

User authentication form component.

**Features:**

- Email and password validation
- Loading states
- Error handling
- Redirect after successful login

### Register.jsx

User registration form component.

**Features:**

- Full name, email, and password fields
- Client-side validation
- Password confirmation
- Account creation feedback

### ProtectedRoute.jsx

Route protection wrapper component.

**Features:**

- JWT token validation
- Automatic redirects to login
- Loading states
- Authentication checks

### Component Best Practices

1. **Functional Components**: Use function components with hooks
2. **Props Validation**: Add PropTypes for type checking (coming soon)
3. **Error Boundaries**: Wrap components in error boundaries
4. **Accessibility**: Include proper ARIA labels and keyboard navigation
5. **Performance**: Use React.memo for expensive components

## 🔄 State Management

### AuthContext

The authentication context manages global user state and authentication logic.

```jsx
// Creating context
const AuthContext = createContext();

// Context provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Authentication methods
  const login = async (email, password) => {
    /* ... */
  };
  const register = async (userData) => {
    /* ... */
  };
  const logout = () => {
    /* ... */
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
```

### State Structure

```javascript
// AuthContext state
{
  user: {
    id: string,
    fullName: string,
    email: string,
    role: string
  } | null,
  loading: boolean
}
```

### Local Storage

User tokens are persisted in localStorage for session management:

```javascript
// Token management
localStorage.setItem("token", jwtToken);
localStorage.getItem("token");
localStorage.removeItem("token");
```

## 🎨 Styling Guide

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdf4",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
      },
    },
  },
  plugins: [],
};
```

### Color Palette

```css
/* Primary Colors (Green theme for medicinal plants) */
--primary-50: #f0fdf4    /* Very light green */
--primary-100: #dcfce7   /* Light green */
--primary-500: #22c55e   /* Main green */
--primary-600: #16a34a   /* Dark green */
--primary-700: #15803d   /* Darker green */

/* Secondary Colors */
--gray-50: #f9fafb      /* Very light gray */
--gray-100: #f3f4f6     /* Light gray */
--gray-500: #6b7280     /* Medium gray */
--gray-700: #374151     /* Dark gray */
--gray-900: #111827     /* Very dark gray */
```

### Component Styling Examples

```jsx
// Button component
<button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
  Submit
</button>

// Input field
<input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />

// Card component
<div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
  Card content
</div>
```

### Responsive Design

```jsx
// Mobile-first responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="col-span-1">Item 1</div>
  <div className="col-span-1">Item 2</div>
  <div className="col-span-1">Item 3</div>
</div>

// Responsive text sizes
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Responsive Heading
</h1>
```

### Animation Classes

```css
/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Hover effects */
.hover-scale:hover {
  transform: scale(1.05);
}

/* Loading spinner */
.animate-spin {
  animation: spin 1s linear infinite;
}
```

## 🏗 Build & Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Output will be in dist/ directory
```

### Build Configuration

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
```

### Vercel Deployment

1. **Connect Repository**

   ```bash
   # Push to GitHub
   git push origin main
   ```

2. **Configure Vercel**

   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework: `Vite`

3. **Environment Variables**
   ```env
   VITE_API_BASE_URL=https://your-backend-url.com/api
   ```

### Netlify Deployment

```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Performance Optimization

```javascript
// Code splitting with React.lazy
const Home = lazy(() => import('./components/Home'))
const Login = lazy(() => import('./components/Login'))

// Wrap with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <Home />
</Suspense>
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Authentication Flow**

  - [ ] User registration works
  - [ ] User login works
  - [ ] Protected routes redirect correctly
  - [ ] Logout clears session

- [ ] **Form Validation**

  - [ ] Required fields show errors
  - [ ] Email validation works
  - [ ] Password strength validation

- [ ] **Responsive Design**

  - [ ] Mobile layout (320px+)
  - [ ] Tablet layout (768px+)
  - [ ] Desktop layout (1024px+)

- [ ] **Browser Compatibility**
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)

### Unit Testing (Coming Soon)

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm test

# Test coverage
npm run test:coverage
```

### E2E Testing (Coming Soon)

```bash
# Install Playwright
npm install --save-dev @playwright/test

# Run E2E tests
npm run test:e2e
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Backend Connection Error

```
AxiosError: Network Error
```

**Solutions:**

- Ensure backend is running on http://localhost:5001
- Check `VITE_API_BASE_URL` in `.env`
- Verify CORS configuration in backend

#### 2. Build Errors

```
Error: Could not resolve "react"
```

**Solutions:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

#### 3. Styling Issues

```
Tailwind classes not working
```

**Solutions:**

```bash
# Ensure Tailwind is properly configured
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch

# Check tailwind.config.js content paths
```

#### 4. Hot Reload Not Working

```
Changes not reflected in browser
```

**Solutions:**

- Restart development server
- Clear browser cache
- Check console for errors
- Ensure file extensions are correct (.jsx, .css)

### Debug Tools

```bash
# Enable debug mode
DEBUG=vite:* npm run dev

# Check bundle size
npm run build -- --mode=analyze

# Inspect build output
npm run preview
```

### Performance Issues

```bash
# Analyze bundle size
npm install --save-dev rollup-plugin-visualizer

# Check for unused dependencies
npm install --save-dev depcheck
npx depcheck
```

## 📱 Mobile Development

### Responsive Breakpoints

```css
/* Tailwind CSS breakpoints */
sm: 640px    /* Small devices */
md: 768px    /* Medium devices */
lg: 1024px   /* Large devices */
xl: 1280px   /* Extra large devices */
2xl: 1536px  /* 2X large devices */
```

### Mobile-First Design

```jsx
// Always start with mobile styles, then add larger screens
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-xl md:text-2xl lg:text-3xl">Mobile-First Heading</h1>
</div>
```

### Touch-Friendly Design

```jsx
// Larger touch targets for mobile
<button className="min-h-[44px] min-w-[44px] p-3 text-lg">Touch Button</button>
```

## 📞 Support

- 📧 **Frontend Issues**: frontend@medileaf.com
- 📚 **Documentation**: [Frontend Wiki](https://github.com/yourusername/medileaf/wiki/frontend)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/medileaf/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/medileaf/discussions)

## 🤝 Contributing

1. Follow the [main contributing guide](../CONTRIBUTING.md)
2. Use the established component patterns
3. Follow the Tailwind CSS conventions
4. Test on multiple screen sizes
5. Ensure accessibility compliance

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

---

<div align="center">
  <p>🎨 Frontend crafted with ❤️ using React & Tailwind CSS</p>
  <p>
    <a href="../README.md">⬅️ Back to Main README</a>
  </p>
</div>
