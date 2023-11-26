import 'bootstrap/dist/css/bootstrap.min.css';
import type React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import LoginScreen from './pages/LoginScreen';

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/login' element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
