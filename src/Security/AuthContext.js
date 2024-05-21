import { createContext, useContext, useState } from "react";
import axiosInstance from "../axios/axios";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);



export default function AuthProvider({ children }) {


   

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userData,setUserData]=useState(null)
    const [token,setToken]=useState('')
    const [admin,setAdmin]=useState(false)


    const logout=()=>{
        setAuthenticated(false)
        setUserData(null)
        setToken('')
        setAdmin(false)
     return true;
    
    }



    const login=async (email,password)=>{
        try {
         const response=await axiosInstance.post('/auth/login',{
            email:email,
            password:password
         })

        //  console.log(response.status);

         if(response.status==200){



            console.log(response.data);

            setAuthenticated(true)
            setUserData(response.data.user)
            setToken(response.data.token)
            console.log("login work");
            const role=response.data.user.authorities[0].authority
            
            if(role==='ADMIN'){
                setAdmin(true)
            }
            
            return true
        
        }else{
            return false
        }
            
        } catch (error) {
            console.log(error)
            console.log(isAuthenticated);
            return false
        }
    }


    const register = async (firstName,lastName, email, password,profileImage) => {
        try {
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', profileImage); // Assuming profileImage is a File object
    
            const response = await axiosInstance.post('/auth/register', formData);

           console.log(response.status);
            if (response.status === 200) {
                console.log(response);
                return true;
            } else {
                
                return false;
            }
        } catch (error) {
            
            console.error("Error:", error);
            return false;
        }
    }
return (
    <AuthContext.Provider value={{register,login,admin,userData,isAuthenticated,logout,token,setUserData}}>
        {children}
    </AuthContext.Provider>
);
}

