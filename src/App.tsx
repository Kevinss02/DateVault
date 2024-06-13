import 'bootstrap/dist/css/bootstrap.min.css';
import type React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import ProtectedRoute from './ProtectedRoute';
import MemoryForm from './pages/MemoryForm';
import MemoryView from './pages/MemoryViewPage';
import NotFoundPage from './pages/NotFoundPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import TestPage from './pages/TestPage';
import VaultPage from './pages/VaultPage';

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Navigate to='/vault' />} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/test' element={<TestPage />} />
        <Route path='/404' element={<NotFoundPage />} />

        {/* Private routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/vault' element={<VaultPage />} />
          <Route path='/profile' element={<h1>Profile Page</h1>} />
          <Route path='/vault/create' element={<MemoryForm />} />
          <Route path='/vault/edit/:id' element={<MemoryForm />} />
          <Route path='/vault/view/:id' element={<MemoryView />} />
        </Route>

        {/* Fallback route */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
