import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};
// AUTHENTICATED ROUTE IF NOT LOGGED IN REDIRECT TO LOGIN PAGE
export default ProtectedRoute;
