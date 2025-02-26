import { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../reducer/auth-reducer";  

interface ProtectedRouteProps {
  children: ReactNode;
}

interface AuthState {
  auth: {
    isAuthenticated: boolean;
    token: string | null;
  };
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector((state: AuthState) => state.auth.isAuthenticated);
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

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;