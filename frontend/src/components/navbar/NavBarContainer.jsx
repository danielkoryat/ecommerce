import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBarTab from "./NavBarTab";
import SearchBar from "./SearchBar";
import { logoutUserAsync } from "../../app/thunks/userThunks.js";

const NavBarContainer = () => {
  //TODO - add logo,improve mobile menu and clean up the code
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        { label: "Logout", to: "#" },
      ]
    : [
        { label: "Login", to: "/login" },
        { label: "Register", to: "/register" },
      ];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserAsync());
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
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-xl leading-none px-2 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-500 ${isMobileMenuOpen ? "transform rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
  
          <div className="hidden lg:flex flex-grow items-center justify-around">
            {primaryNavItems.map((item) => (
              <NavBarTab key={item.label} to={item.to}>{item.label}</NavBarTab>
            ))}
            <SearchBar />
          </div>
  
          <div className="hidden lg:flex items-center space-x-4">
            {authNavItems.map((item) =>
              item.label === "Logout" ? (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className="py-2 px-4 font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-md hover:shadow-lg transition ease-in-out duration-300"
                >
                  {item.label}
                </button>
              ) : (
                <NavBarTab key={item.label} to={item.to}>{item.label}</NavBarTab>
              )
            )}
          </div>
        </div>
      </div>
  
      <div
        className={`lg:hidden overflow-hidden transition-height duration-500 ease-in-out ${isMobileMenuOpen ? "h-auto" : "h-0"}`}
      >
        <div className="flex flex-col space-y-2 py-4 w-full">
          <SearchBar className="w-full" />
          <div className="flex flex-col space-y-1">
            {primaryNavItems.map((item) => (
              <NavBarTab
                key={item.label}
                to={item.to}
                className="block py-2 px-4 w-full text-left"
              >
                {item.label}
              </NavBarTab>
            ))}
          </div>
          <div className="flex flex-col space-y-1">
            {authNavItems.map((item) =>
              item.label === "Logout" ? (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-md hover:shadow-lg transition ease-in-out duration-300"
                >
                  {item.label}
                </button>
              ) : (
                <NavBarTab
                  key={item.label}
                  to={item.to}
                  className="block py-2 px-4 w-full text-left"
                >
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
