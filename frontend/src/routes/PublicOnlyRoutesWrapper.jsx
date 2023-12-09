import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserService from '../api/services/UserService';

const PublicOnlyRoutesWrapper = ({ routes }) => {
  const isAuthenticated = UserService.isAuthenticated();

  if (isAuthenticated) {
    // If the user is authenticated, redirect them from any public-only route to the home page.
    return <Navigate to="/" replace />;
  }

  // If the user is not authenticated, render the public-only routes.
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default PublicOnlyRoutesWrapper;