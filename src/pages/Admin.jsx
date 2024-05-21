import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminHome from '../Components/AdminHome/AdminHome';
import AuthenticatedRoute from '../Security/AuthenticatedRoute';
import ProfilePage from '../Components/ProfilePage/ProfilePage';
const Admin = () => {
  return (

   <>
   <Navbar/>
    <Routes>
        <Route path='/home' element={<AuthenticatedRoute><AdminHome/></AuthenticatedRoute>}/>
        <Route path='/profile' element={<ProfilePage/>} />
    </Routes>
   </>
  )
}

export default Admin
