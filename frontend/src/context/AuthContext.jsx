import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import authService from "../services/authService.js";
import { hasToken, removeToken } from "../utils/token.js";

// Auth Context
const AuthContext = createContext();

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: hasToken(), // Set loading to true if token exists
  error: null,
};

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verify token
  const verifyToken = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const result = await authService.getCurrentUser();
      if (result.success) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: result.data,
        });
      } else {
        removeToken();
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      removeToken();
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  // Check if user is logged in on app start
  useEffect(() => {
    if (hasToken()) {
      verifyToken();
    }
  }, [verifyToken]);

  // Login
  const login = useCallback(async (email, password) => {
    dispatch({ type: "LOGIN_START" });

    const result = await authService.login({ email, password });

    if (result.success) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: result.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: result.error,
      });
      return { success: false, error: result.error };
    }
  }, []);

  // Register
  const register = useCallback(async (fullName, email, password) => {
    dispatch({ type: "REGISTER_START" });

    const result = await authService.register({ fullName, email, password });

    if (result.success) {
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: result.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: result.error,
      });
      return { success: false, error: result.error };
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    authService.logout();
    dispatch({ type: "LOGOUT" });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
