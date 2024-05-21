import React, { useEffect, useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Security/AuthContext';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const navigate=useNavigate();
    const [regError,setRegError]=useState(false)

    const SecurityContext=useAuth();
  
    const handleFirstNameChange = (e) => {
      setFirstName(e.target.value);
    };
  
    const handleLastNameChange = (e) => {
      setLastName(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  

    
    const handleProfileImageChange = (e) => {
      const file = e.target.files[0];
      setProfileImage(file);
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      var regStatus=false
     regStatus= await SecurityContext.register(firstName,lastName,email,password,profileImage)
     console.log(regStatus);
      if(regStatus){
        var logStatus=false
        logStatus= await SecurityContext.login(email,password)
        console.log(logStatus);
        if(logStatus){
       navigate('/home')
        }else{
          navigate('/login')
        }
      }else{
       setRegError(true)
       setFirstName('')
       setLastName('')
       setEmail('')
       setPassword('')
       setProfileImage(null)
      }
      
     
    };

    useEffect(() => {
      
     console.log("signup work");
    }, []);
  
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
          }}>Registration</h2>

          {regError&& <div style={{color:'red'}}>Some thing wrong Pls Try again</div>}
          <form onSubmit={handleSubmit}>
            {/* Profile Image Selection */}
            <div style={{ marginLeft:'20%', height: '52px', margin: '18px 0' }}>
              <input 
                type="file" 
                onChange={handleProfileImageChange} 
                accept="image/*" 
                style={{ 
                  display: 'none', 
                  marginLeft:'75px'
                }} 
                id="profile-image-input"
              />
              <label htmlFor="profile-image-input" style={{ cursor: 'pointer' }}>
                {profileImage ? (
                  <img 
                    src={URL.createObjectURL(profileImage)} 
                    alt="Profile" 
                    style={{ 
                      width: '52px', 
                      height: '52px', 
                      borderRadius: '50%', // Rounded border for image
                      objectFit: 'cover', 
                      marginLeft:'75px'
                    }} 
                  />
                ) : (
                  <div style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '50%', // Rounded border for empty image container
                    border: '2px dashed #ccc', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}>
                    <span style={{ color: '#ccc' }}>+</span>
                  </div>
                )}
              </label>
            </div>
            {/* First Name */}
            <div style={{ height: '52px', margin: '18px 0' }}>
              <input 
                type="text" 
                placeholder="First Name" 
                value={firstName} 
                onChange={handleFirstNameChange} 
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
            {/* Last Name */}
            <div style={{ height: '52px', margin: '18px 0' }}>
              <input 
                type="text" 
                placeholder="Last Name" 
                value={lastName} 
                onChange={handleLastNameChange} 
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
            {/* Confirm Password */}
            {/* <div style={{ height: '52px', margin: '18px 0' }}>
              <input 
                type="password" 
                placeholder="Confirm password" 
                value={confirmPassword} 
                onChange={handleConfirmPasswordChange} 
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
            </div> */}
            {/* Submit Button */}
            <div style={{ height: '52px', margin: '18px 0' }}>
              <input 
                type="submit" 
                value="Register Now" 
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
              <h3 onClick={()=>navigate('/login')}>Already have an account? Login now</h3>
            </div>
          </form>
        </div>
      </>
    );
  };
  
  export default Signup;
