import React from 'react';
import ProfilePage from '../Components/ProfilePage/ProfilePage';
import Navbar from '../Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserHome from '../Components/UserHome/UserHome';
import AuthenticatedRoute from '../Security/AuthenticatedRoute';

const User = () => {
  return (
    <div>
  
  <Navbar />
      <Routes>
     
      <Route path="/" element={<Navigate to="/home" replace />} />
        <Route  path='/home' element={<AuthenticatedRoute><UserHome/></AuthenticatedRoute>}/>
      <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      
       
     
    </div>
  );
}

export default User;
