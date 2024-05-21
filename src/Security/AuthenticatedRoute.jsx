import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";




const AuthenticatedRoute = ({ children }) => {
    const authContext = useAuth();
    const location = useLocation();
    
    if (location.pathname === '/signup') {
        return children;
    }
    if (authContext.isAuthenticated) {
        
        return children;
    } else {
      
       return <Navigate to={'/login'}/>
    }
}

export default AuthenticatedRoute