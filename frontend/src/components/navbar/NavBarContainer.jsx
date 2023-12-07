import React from 'react';
import NavBarTab from './NavBarTab';
import SearchBar from './SearchBar';
import { useAuth } from '../../context/AuthContext';

const NavBarContainer = () => {
  const { isAuthenticated } = useAuth();

  const primaryNavItems = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'About Us', to: '/about-us' }
  ];

  const authNavItems = isAuthenticated ? [
    { label: 'Watchlist', to: '/watchlist' },
    { label: 'Profile', to: '/profile' },
    { label: 'Logout', to: '/logout' } 
  ] : [
    { label: 'Login', to: '/login' },
    { label: 'Register', to: '/register' }
  ];

  return (
    <nav className="bg-white shadow-lg py-2">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Primary Nav Items */}
          <div className="flex space-x-4">
            {primaryNavItems.map(item => (
              <NavBarTab key={item.label} to={item.to} type="primary">
                {item.label}
              </NavBarTab>
            ))}
          </div>
          {/* SearchBar and Auth Nav Items */}
          <div className="flex items-center space-x-4">
            <SearchBar />
            {authNavItems.map(item => (
              <NavBarTab key={item.label} to={item.to} type="secondary">
                {item.label}
              </NavBarTab>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarContainer;