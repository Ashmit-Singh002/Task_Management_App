import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';

// Clear authentication data on app start (for development)
// Comment out this block in production
if (import.meta.env.DEV) {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);