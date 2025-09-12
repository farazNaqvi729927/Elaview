import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  const toastShown = useRef(false); // <-- ensures toast fires only once

  useEffect(() => {
    if (!token && !toastShown.current) {
      toastShown.current = true;
      toast.error("Please login to proceed");
      nav('/signin');
    }
  }, [token]);

  return children;
}

export default ProtectedRoute;
