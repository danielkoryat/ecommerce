import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserService from '../api/services/UserService';

const PrivateRoutesWrapper = ({ routes }) => {
  const isAuthenticated = UserService.isAuthenticated();

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the login page.
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the private routes.
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default PrivateRoutesWrapper;