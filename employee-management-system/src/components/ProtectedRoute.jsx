import {useAuth} from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) =>{
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate(); 
  if (!isAuthenticated) {
    navigate("/");
  }

  return children;
}

export default ProtectedRoute;