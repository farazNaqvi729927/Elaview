import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const nav = useNavigate();

  useEffect(() => {
    if (!token) {
      nav('/signin');
    }
  }, [token]);

  return children;
}

export default ProtectedRoute;
