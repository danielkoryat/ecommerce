const NavBarTab = ({ type, logoImage, isCurrent, lable }) => {
  return (
    <div>
      {type === "Logo" && (
        <div>
          <a href="#" className="flex items-center py-4 px-2">
            <img
              src="https://i.pinimg.com/474x/d2/17/f1/d217f1b6184ad205cab23a8890879fa2.jpg"
              alt="Logo"
              className="h-8 w-8 mr-2 itens-start"
            />
            <span className="font-semibold text-gray-500 text-lg">
              shoping il
            </span>
          </a>
        </div>
      )}
      {type === "Tab" && isCurrent && (
        <a
          href="#"
          className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold "
        >
          {lable}
        </a>
      )}
      {type === "Tab" && !isCurrent && (
        <a
          href="#"
          className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
        >
          {lable}
        </a>
      )}
      {type === "Login" && (
        <a
          href="#"
          className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
        >
          Login
        </a>
      )}
      {type === "Register" && <a
              href="#"
              className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
            >
              Sign Up
            </a>}
    </div>
  );
};

export default NavBarTab;
