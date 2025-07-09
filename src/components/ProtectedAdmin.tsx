
import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';

const ProtectedAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated (using sessionStorage)
    const authStatus = sessionStorage.getItem('mithila_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      // Store authentication state in session storage
      // This will persist during the browser session but reset when browser is closed
      sessionStorage.setItem('mithila_admin_auth', 'true');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mithila_admin_auth');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mithila-blue"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return null; // Removed Admin onLogout={handleLogout}
};

export default ProtectedAdmin;
