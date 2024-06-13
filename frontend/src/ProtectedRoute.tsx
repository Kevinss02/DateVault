import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from './store/authStore';

function ProtectedRoute(): React.JSX.Element {
  const { isAuthenticated, loading, checkLogin } = useAuthStore();

  React.useEffect(() => {
    void checkLogin(); // Llama a checkLogin solo cuando el componente se monta
  }, [checkLogin]);

  console.log('Loading: ', loading);
  console.log('isAuthenticated: ', isAuthenticated);
  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to='/sign-in' replace />;
  return <Outlet />;
}

export default ProtectedRoute;
