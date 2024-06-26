
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './pages/user/Signup';
import Login from './pages/user/Login'; 
import Home from './pages/task/Home'
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';
import ChangePassword from './pages/user/ChangePassword';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Nav/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/home' element={< ProtectedRoute Component ={Home} />} />
          <Route path='/change-pass' element={<ChangePassword/>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

