import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBarTab from "./NavBarTab";
import SearchBar from "./SearchBar";
import UserService from "../../api/services/UserService.js";
import { logoutUser } from "../../app/userSlice.js";

const NavBarContainer = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutButtonStyle = `
  py-2 px-4 
  font-semibold 
  text-white 
  bg-red-600 
  hover:bg-red-500 
  rounded-lg 
  shadow-md 
  hover:shadow-lg 
  transition 
  ease-in-out 
  duration-300 
  transform 
  hover:-translate-y-1 
  focus:outline-none 
  focus:ring-2 
  focus:ring-red-700 
  focus:ring-opacity-50
`;
  const primaryNavItems = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "About Us", to: "/about-us" },
  ];

  const authNavItems = isAuthenticated
    ? [
        { label: "Watchlist", to: "/watchlist" },
        { label: "Sell", to: "/sell" },
        { label: "Dashboard", to: "/dashboard" },
        { label: "Logout", to: "/logout" },
      ]
    : [
        { label: "Login", to: "/login" },
        { label: "Register", to: "/register" },
      ];

  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      await UserService.logUserOut();
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <nav className="bg-white shadow-lg py-2">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Primary Nav Items */}
          <div className="flex space-x-4">
            {primaryNavItems.map((item) => (
              <NavBarTab key={item.label} to={item.to} type="primary">
                {item.label}
              </NavBarTab>
            ))}
          </div>
          {/* SearchBar and Auth Nav Items */}
          <div className="flex items-center space-x-4">
            <SearchBar />
            {authNavItems.map((item) =>
              item.label === "Logout" ? (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className={logoutButtonStyle}
                >
                  {item.label}
                </button>
              ) : (
                <NavBarTab key={item.label} to={item.to} type="secondary">
                  {item.label}
                </NavBarTab>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarContainer;
