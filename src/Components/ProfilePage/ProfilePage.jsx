import React, { useState } from 'react';
import './ProfilePage.css';
import { useAuth } from '../../Security/AuthContext';

import axiosInstance from '../../axios/axios';

const ProfilePage = () => {
    const authContext = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(authContext.userData);
    const [image,setImage]=useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        setImage(file)
        reader.onloadend = () => {
            setProfile({
                ...profile,
                imageUrl: reader.result
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
    
        
        try {
            const formData = new FormData();
            formData.append('firstName', profile.firstName);
            formData.append('lastName', profile.lastName);
            formData.append('email',profile.email)
            console.log(profile.email);
            if (image!==null) {
                console.log("imag its go");
                formData.append('image', image); // Only append if there's a new image
            }
           
            const token = authContext.token;

            console.log(token);

    if (!token) {
      console.error('Missing JWT token for authorization');
      return;
    }

    // 3. Prepare the authorization header
    const authorizationHeader = `Bearer ${token}`;

  
    const response = await axiosInstance.put('/user/update', formData, {
        headers: {
            Authorization: authorizationHeader,
         
        },
    });
   

            if (response.status==200) {
                const updatedUserData = await response.data;
                authContext.setUserData(updatedUserData);
                console.log(updatedUserData);
                console.log("   ");
                console.log(authContext.userData);
                setIsEditing(false);
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="user-profile">
            <div className="header">
                <img src={profile.imageUrl} alt="Profile" className="profile-image" />
                {isEditing && <input type="file" onChange={handleImageChange} />}
                <div>
                    <h1>{isEditing ? (
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleInputChange}
                                placeholder="First Name"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                            />
                        </div>
                    ) : (
                        profile.firstName + ' ' + profile.lastName
                    )}
                    </h1>
                </div>
                <button onClick={isEditing ? handleSubmit : () => setIsEditing(true)}>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
            <div className="details">
                <div className="detail-item">
                    <h3>Contact Information:</h3>
                    <p>Email: {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                        />
                    ) : (
                        profile.email
                    )}
                    </p>
                </div>
                <div className="detail-item">
                    <h3>Basic Information:</h3>
                    <p>Full name: {profile.firstName + " " + profile.lastName}</p>
                    <p>Email: {profile.email}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
