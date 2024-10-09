import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  let user;

  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    user = null;
  }

  const isTokenExpired = () => {
    if (!token) return true;
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return expiry < Date.now() / 1000;
  };

  const isAuthenticated = token && user && allowedRoles.includes(user.role) && !isTokenExpired();

  return isAuthenticated ? children : <Navigate to="/home" />;
};

export default ProtectedRoute;