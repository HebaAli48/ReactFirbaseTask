import React, { useContext, useEffect, useState } from "react";
import Button from "../../ui/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../utils/Icons";
import LogOutModal from "../LogOutModal";
import { LogInContext } from "../../utils/LogInContext";
const Header = () => {
  // State variable to control the collapsed state of the navigation menu
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Access the navigation function from React Router
  const navigate = useNavigate();

  // Access user login status and login function from context
  const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);

  // Use effect to check if a token exists in local storage for authentication
  useEffect(() => {
    // Check for the presence of a token in local storage
    const token = localStorage.getItem("Token");

    if (!token) {
      // If no token is found, navigate to the sign-in page and set isLoggedIn to false
      navigate("/sign-in", { replace: true });
      setIsLoggedIn(false);
    } else {
      // If a token is found, set isLoggedIn to true
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  // Array containing navigation menu items with title and corresponding routes
  const headerData = [
    { title: "Home", to: "/" },
    { title: "About", to: "/" },
    { title: "Support", to: "/" },
  ];

  return (
    <nav
      className={`bg-blue-600 text-[white] border-b border-blue-600    ${
        isCollapsed ? "pb-3" : "  h-[50vh]"
      } pt-2 sm:pb-2 px-5 sm:px-10`}
    >
      <div className="flex justify-between sm:justify-normal items-center  relative">
        {/* logo  */}
        <Link to="/" className="">
          <span className="text-lg text-white font-semibold "> LOGO</span>
        </Link>
        <div className="flex justify-end sm:justify-normal items-center  relative"></div>
        {/* collapse button  */}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="block items-center px-3 py-2 border rounded text-cyan-200 border-blue-400 hover:border-slate-300 hover:text-white  ms-2 sm:hidden order-9"
        >
          {Menu}
        </button>

        {/* links  */}
        <div
          className={`${
            isCollapsed ? "hidden " : "  "
          } absolute w-100  top-5 sm:block sm:relative py-10 pl-2 pr-2 sm:text-center sm:top-0 grow bg-inherit  `}
        >
          <ul className="flex flex-col sm:flex-row justify-start sm:justify-center  gap-14 sm:gap-6  items-center w-4/5 m-auto text-lg">
            {headerData.map((data, index) => (
              <li className="pt-2 sm:pt-0 " key={index}>
                <NavLink
                  to={data.to}
                  className="  hover:border-b-2 border-white py-2 transition"
                >
                  {data.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Authentication Buttons  */}

        {!isLoggedIn && (
          <>
            <div className="sm:ml-auto">
              <Link to="/sign-in">
                <Button className="ms-2">Login</Button>
              </Link>
            </div>

            <div className="sm:ml-auto">
              <Link to="/sign-up">
                <Button className="ms-2">Sign up</Button>
              </Link>
            </div>
          </>
        )}

        {isLoggedIn && (
          <div className="sm:ml-auto ">
            <LogOutModal />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
