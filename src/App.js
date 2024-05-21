import React from 'react';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';

import AuthenticatedRoute from './Security/AuthenticatedRoute';
import User from './pages/User';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Security/AuthContext';
import Admin from './pages/Admin';

function App() {
  const { admin, isAuthenticated } = useAuth();

  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      
       
      </Routes>
      {isAuthenticated  &&
  admin? <AuthenticatedRoute><Admin/></AuthenticatedRoute> :<AuthenticatedRoute><User/></AuthenticatedRoute>}
    </Router>




 </>
  );
}

export default App;
