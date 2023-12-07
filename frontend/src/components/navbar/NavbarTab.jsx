import { NavLink } from 'react-router-dom';

const NavBarTab = ({ to, children }) => {
  const baseTabStyle = "py-4 px-2 font-semibold transition duration-300";
  const baseButtonStyle = "py-2 px-2 font-medium rounded transition duration-300";
  const tabStyles = {
    base: baseTabStyle,
    inactive: "text-gray-500 hover:text-green-500",
    active: "text-green-500 border-b-4 border-green-500",
    login: `${baseButtonStyle} text-gray-500 hover:bg-green-500 hover:text-white`,
    register: `${baseButtonStyle} text-white bg-green-500 hover:bg-green-400`,
    logout: `${baseButtonStyle} text-white bg-red-500 hover:bg-red-400`,
  };

  const getNavLinkClass = ({ isActive }) => {
    switch (children) {
      case 'Login':
        return tabStyles.login;
      case 'Register':
        return tabStyles.register;
      case 'Logout':
        return tabStyles.logout;
      default:
        return isActive ? `${tabStyles.base} ${tabStyles.active}` : `${tabStyles.base} ${tabStyles.inactive}`;
    }
  };

  return (
    <NavLink to={to} className={getNavLinkClass}>
      {children}
    </NavLink>
  );
};

export default NavBarTab;