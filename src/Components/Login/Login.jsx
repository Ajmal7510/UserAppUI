import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Security/AuthContext';

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState(false)

  const navigate=useNavigate();


  const AuthContext=useAuth()
 
 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

 


  const handleSubmit =async (e) => {
    e.preventDefault();
   var logStatus=false
   logStatus= await AuthContext.login(email,password)

   if(logStatus){
    // console.log("its loged");
    // console.log(AuthContext.admin);
    navigate("/home")
   }else{

    setError(true)

   }
  };

  const navigatToRegistor =()=>{
    navigate('/signup')

  }

  return (
    <>
      <div style={{ 
        position: 'relative', 
        maxWidth: '430px', 
        width: '100%', 
        background: '#fff', 
        padding: '34px', 
        borderRadius: '6px', 
        boxShadow: '0 5px 10px rgba(0,0,0,0.2)' 
      }}>
        <h2 style={{ 
          position: 'relative', 
          fontSize: '22px', 
          fontWeight: '600', 
          color: '#333' 
        }}>Login</h2>

        {error&&<div style={{color:'red'}}>Invalid credentials. Please try again.</div>}
        <form onSubmit={handleSubmit}>
          {/* Profile Image Selection */}
         
          {/* First Name */}
        
          {/* Email */}
          <div style={{ height: '52px', margin: '18px 0' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={handleEmailChange} 
              required 
              style={{ 
                height: '100%', 
                width: '100%', 
                outline: 'none', 
                padding: '0 15px', 
                fontSize: '17px', 
                fontWeight: '400', 
                color: '#333', 
                border: '1.5px solid #c7bebe', 
                borderBottomWidth: '2.5px', 
                borderRadius: '30px', // Rounded border
                transition: 'all 0.3s ease' 
              }} 
            />
          </div>
          {/* Password */}
          <div style={{ height: '52px', margin: '18px 0' }}>
            <input 
              type="password" 
              placeholder="Create password" 
              value={password} 
              onChange={handlePasswordChange} 
              required 
              style={{ 
                height: '100%', 
                width: '100%', 
                outline: 'none', 
                padding: '0 15px', 
                fontSize: '17px', 
                fontWeight: '400', 
                color: '#333', 
                border: '1.5px solid #c7bebe', 
                borderBottomWidth: '2.5px', 
                borderRadius: '30px', // Rounded border
                transition: 'all 0.3s ease' 
              }} 
            />
          </div>
       
          {/* Submit Button */}
          <div style={{ height: '52px', margin: '18px 0' }}>
            <input 
              type="submit" 
              value="Login" 
              style={{ 
                height: '100%', 
                width: '100%', 
                color: '#fff', 
                letterSpacing: '1px', 
                border: 'none', 
                background: '#4070f4', 
                cursor: 'pointer', 
                borderRadius: '30px', // Rounded border
                transition: 'background 0.3s ease' 
              }} 
            />
          </div>
          {/* Login Link */}
          <div style={{ color: '#333', width: '100%', textAlign: 'center' }}>
            <h3 onClick={navigatToRegistor}>You don't have an account, please register Register now</h3>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
