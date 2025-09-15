import { Navigate } from "react-router-dom";

function PublicRoutes({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" replace /> : children;
}

export default PublicRoutes;
