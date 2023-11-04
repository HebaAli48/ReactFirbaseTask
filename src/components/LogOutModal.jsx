import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Button from "../ui/Button";
import { auth } from "../fireBase/FireBaseConfigs";
import { signOut } from "firebase/auth";
import { LogInContext } from "../utils/LogInContext";

const LogOutModal = () => {
  // State to control whether the logout modal is shown
  const [showModal, setShowModal] = useState(false);

  // Context to manage the user login state
  const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);

  // Hook for navigating to different pages
  const navigate = useNavigate();

  // Function to handle the logout process
  const onLogoutHandler = async () => {
    setShowModal(false);
    try {
      // Sign out the user
      await signOut(auth);

      // Show a success message
      toast.success("You are Signing Out Successfully");

      // Remove user tokens from local storage
      localStorage.removeItem("Token");
      localStorage.removeItem("refreshToken");

      // Navigate to the sign-in page and update the login state
      navigate("/sign-in", { replace: true });
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
      // Show an error message in case of an issue during sign out
      toast.error("An error occurred during Sign Out. Please try again later.");
    }
  };

  return (
    <>
      <span
        className="ease-linear transition-all duration-150"
        onClick={() => setShowModal(true)}
      >
        <Button className="ms-2">Logout</Button>
      </span>

      {showModal
        ? createPortal(
            <>
              {/* Modal UI */}
              <div className="justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none flex">
                <div className="relative w-[80vw] my-14 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Log Out!</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                      </button>
                    </div>
                    <div className="relative px-6 py-2">
                      <p className="text-xl text-center font-semibold">
                        <span className="text-2xl font-bold me-1 text-red-600">
                          Are you sure
                        </span>
                        you want to Log Out?
                      </p>
                      <div className="flex items-center justify-evenly p-2">
                        <button
                          className="text-white bg-red-500  hover:bg-red-700 font-bold uppercase px-6 py-3 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setShowModal(false);
                          }}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white  hover:bg-emerald-600 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                          onClick={() => onLogoutHandler()}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>,
            document.body
          )
        : null}
    </>
  );
};

export default LogOutModal;
