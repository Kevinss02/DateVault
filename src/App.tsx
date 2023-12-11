import 'bootstrap/dist/css/bootstrap.min.css';
import type React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import ProtectedRoute from './ProtectedRoute';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import VaultPage from './pages/VaultPage';

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />

        {/* Private routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/vault' element={<VaultPage />} />
          <Route path='/profile' element={<h1>Profile Page</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
