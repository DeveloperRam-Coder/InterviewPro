
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import RouteComponents from './components/routes/RouteComponents';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <RouteComponents />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
