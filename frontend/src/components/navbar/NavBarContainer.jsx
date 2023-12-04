import React from "react";
import Tab from "./NavbarTab";
import SearchBar from "./SearchBar.jsx";
import { Link } from "react-router-dom";

const NavBarContainer = () => {
  return (
    <nav className="bg-white shadow-lg py-2">
      <div className="max-w-12xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            {/* Primary Nav Items */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/">
                <Tab type="Tab" lable="Home" isCurrent={true} />
              </Link>
              <Link to="/shop">
                <Tab type="Tab" lable="Shop" />
              </Link>
              <Link to="/about-us">
                <Tab type="Tab" lable="About Us" />
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 ">
            <SearchBar />
            <Link to="/login">
              <Tab type="Login" />
            </Link>
            <Link to="/register">
              <Tab type="Register" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarContainer;
