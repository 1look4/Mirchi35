import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to monitoring service
    console.error('Application Error:', error, errorInfo);
    
    // You can also send errors to your error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-boundary-icon">⚠️</div>
            <h1>Something went wrong</h1>
            <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
            
            <details className="error-details">
              <summary>Error Details (For Developers)</summary>
              <div className="error-stack">
                <strong>Error:</strong> {this.state.error && this.state.error.toString()}
                <br />
                <strong>Component Stack:</strong>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </div>
            </details>
            
            <div className="error-actions">
              <button onClick={this.handleReload} className="error-btn error-btn-primary">
                Reload Page
              </button>
              <button onClick={this.handleGoHome} className="error-btn error-btn-secondary">
                Go to Home
              </button>
            </div>
            
            <div className="error-support">
              <p>If the problem persists, please contact support.</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance monitoring configuration
const perfConfig = {
  // Capture Web Vitals metrics
  onPerfEntry: (metric) => {
    // Send metrics to your analytics service
    const { name, value, rating } = metric;
    
    console.log('Web Vital:', {
      name,
      value: Math.round(value),
      rating,
      timestamp: new Date().toISOString()
    });

    // Example: Send to analytics service
    // if (window.gtag) {
    //   window.gtag('event', 'web_vital', {
    //     event_category: 'Web Vitals',
    //     event_label: name,
    //     value: Math.round(name === 'CLS' ? value * 1000 : value),
    //     non_interaction: true,
    //   });
    // }
  },
};

// Root component with all providers
const Root = () => (
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </I18nextProvider>
  </React.StrictMode>
);

// Initialize React application
const initializeApp = () => {
  const container = document.getElementById('root');
  
  if (!container) {
    console.error('Root container not found. Make sure you have a div with id="root" in your HTML.');
    return;
  }

  try {
    const root = ReactDOM.createRoot(container);
    
    root.render(<Root />);
    
    // Register service worker for PWA (optional)
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
    
  } catch (error) {
    console.error('Failed to initialize React application:', error);
    
    // Fallback UI for initialization errors
    container.innerHTML = `
      <div class="init-error">
        <h1>Application Failed to Load</h1>
        <p>We're unable to load the application at this time. Please check your browser console for details.</p>
        <button onclick="window.location.reload()">Try Again</button>
      </div>
    `;
  }
};

// Start the application
initializeApp();

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
  reportWebVitals(perfConfig.onPerfEntry);
} else {
  // Development-specific logging
  console.log(`
    🚀 HyperLocal Admin Dashboard - Development Mode
    -----------------------------------------------
    Version: 1.0.0
    Environment: ${process.env.NODE_ENV}
    Build Date: ${new Date().toLocaleDateString()}
    
    Happy coding! 👨‍💻👩‍💻
  `);
}

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global Error Handler:', event.error);
  
  // You can send errors to your error reporting service here
  // logErrorToService(event.error, 'global_error');
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
  
  // You can send promise rejections to your error reporting service here
  // logErrorToService(event.reason, 'unhandled_promise_rejection');
});

// Export for testing purposes
export { ErrorBoundary };