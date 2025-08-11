import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, redirectTo = '/' }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // If user is logged in, redirect them away from login/signup pages
  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute; 


//Now let me create a ProtectedRoute component to hide login/signup pages when user is logged in: