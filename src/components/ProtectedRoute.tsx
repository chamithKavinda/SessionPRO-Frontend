import { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../reducer/auth-reducer";  
import {jwtDecode} from "jwt-decode"; 

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string;  // Optional role prop
}

interface AuthState {
  auth: {
    isAuthenticated: boolean;
    token: string | null;
  };
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector((state: AuthState) => state.auth.isAuthenticated);
  const token = useSelector((state: AuthState) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch]);

  if (localStorage.getItem("token") && !isAuthenticated) {
    return null; 
  }

  if (isAuthenticated && token && role) {
    const decodedToken = jwtDecode<{ role: string }>(token);
    if (decodedToken.role !== role) {
      return <Navigate to="/auth" />;
    }
  }

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
