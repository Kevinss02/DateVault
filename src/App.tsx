import 'bootstrap/dist/css/bootstrap.min.css';
import type React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
