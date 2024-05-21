import React from 'react';
import './Navbar.css'
import { useAuth } from '../../Security/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const authContext=useAuth();
    const navigate=useNavigate()

  
    const logout = () => {
        authContext.logout();
        navigate('/login');
    }

    if(!authContext.isAuthenticated){
      return null;
    }
  return (
<nav className="navbar">
  <div className="navbar-container">
    <a onClick={()=>navigate('/home')} className="navbar-logo">
      {authContext.userData!==null&&<img src={authContext.userData.imageUrl} alt="Logo" className="logo" />}
    </a>
    <div className="navbar-links">
      <a onClick={()=>navigate('/home')} className="navbar-link">Home</a>
      
      <a onClick={()=>navigate('/profile')}  className="navbar-link"> Profile</a>

      <a onClick={logout} style={{ cursor: 'pointer' }} className="navbar-link">Logout</a>

        
    </div>
  </div>
</nav>
  );
}

export default Navbar;
