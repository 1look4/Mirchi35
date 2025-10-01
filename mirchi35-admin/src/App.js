import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, LinearProgress } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { HelmetProvider } from 'react-helmet-async';

// Context Providers
import { ThemeContextProvider, useThemeContext } from './contexts/ThemeContext/ThemeContext';
import { LanguageContextProvider, useLanguageContext } from './contexts/LanguageContext/LanguageContext';
import { AuthContextProvider, useAuthContext } from './contexts/AuthContext/AuthContext';
import { AppContextProvider } from './contexts/AppContext/AppContext';

// Layout Components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Lazy loaded components for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const BusinessList = React.lazy(() => import('./pages/Businesses/BusinessList'));
const BusinessDetails = React.lazy(() => import('./pages/Businesses/BusinessDetails'));
const UserList = React.lazy(() => import('./pages/Users/UserList'));
const UserProfile = React.lazy(() => import('./pages/Users/UserProfile'));
const CategoryList = React.lazy(() => import('./pages/Categories/CategoryList'));
const ReviewList = React.lazy(() => import('./pages/Reviews/ReviewList'));
const Analytics = React.lazy(() => import('./pages/Analytics/Analytics'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Register = React.lazy(() => import('./pages/Auth/Register'));

// Loading Component
const LoadingSpinner = () => (
  <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
    <LinearProgress />
    <Box 
      sx={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </Box>
    </Box>
  </Box>
);

// Theme Wrapper Component
const ThemeWrapper = ({ children }) => {
  const { isDarkMode, language } = useThemeContext();
  
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#dc004e',
        light: '#ff5983',
        dark: '#9a0036',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f5f5f5',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h4: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: isDarkMode 
              ? '0 2px 10px rgba(0,0,0,0.3)'
              : '0 2px 10px rgba(0,0,0,0.1)',
            border: isDarkMode 
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(0,0,0,0.05)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

// Route Protection Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

// Public Route Component (redirect to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

// Main App Router Component
const AppRouter = () => {
  const { isInitialized } = useLanguageContext();
  const { isLoading } = useAuthContext();

  if (!isInitialized || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route 
            path="login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
        </Route>

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="businesses" element={<BusinessList />} />
          <Route path="businesses/:id" element={<BusinessDetails />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<UserProfile />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="reviews" element={<ReviewList />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

// Main App Component
const App = () => {
  return (
    <HelmetProvider>
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={4000}
      >
        <ThemeContextProvider>
          <LanguageContextProvider>
            <AuthContextProvider>
              <AppContextProvider>
                <ThemeWrapper>
                  <Router>
                    <Box className="app">
                      <AppRouter />
                    </Box>
                  </Router>
                </ThemeWrapper>
              </AppContextProvider>
            </AuthContextProvider>
          </LanguageContextProvider>
        </ThemeContextProvider>
      </SnackbarProvider>
    </HelmetProvider>
  );
};

export default App;