import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Button from "../ui/Button";

import signInSchema from "../models/SignInSchema";
import signInImg from "../assets/images/login.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBase/FireBaseConfigs";
import { useNavigate } from "react-router";
import { LogInContext } from "../utils/LogInContext";

const SignInForm = () => {
  // Hook for navigating to different pages

  const navigate = useNavigate();
  // Context to manage the user login state
  const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);
  // Hook for managing form submission
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(signInSchema), // Using the yup schema for form validation
  });
  // Function to handle form submission
  const onSubmitHandler = async (data) => {
    // Extracting user data from the form
    const { email, password } = data;
    try {
      // Sign in to the user account in Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Successfully signed in
          const Token = userCredential.user.accessToken;
          // Store the user's access token in localStorage
          localStorage.setItem("Token", Token);
          setIsLoggedIn(true);
          // Display a success toast message
          toast.success("Login Sucessfull 😊");

          // Navigate to home Page
          navigate("/", { replace: true });
        }
      );
    } catch (error) {
      // If there is an error during sign-in
      setIsLoggedIn(false); // Set the user as not logged in
      setError(error.code); // Set an error code to be displayed in the component
    }
  };
  return (
    <>
      <div className="flex flex-col items-center md:flex-row md:justify-center md:h-[90vh]">
        <div className="w-4/5  md:w-3/5">
          <img src={signInImg} alt="log-in" className=" md:h-[85vh]" />
        </div>

        <section className="bg-gray-50 px-3 sm:px-12 md:px-0 ">
          <div className="flex flex-col items-center justify-center  px-6 py-5 mx-auto md:h-[90vh]  ">
            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6  text-left space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-lg sm:text-xl font-bold  text-gray-900 md:text-2xl ">
                  Sign in to your account
                </h1>
                <form
                  onSubmit={handleSubmit(onSubmitHandler)}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
                  {/* email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      {...register("email", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1 sm:py-2  "
                      placeholder="name@example.com"
                      required=""
                    />
                    <p className="text-red-500 mx-auto lg:text-base sm:text-sm text-[10px]">
                      {errors.email?.message}
                    </p>
                  </div>
                  {/* password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      {...register("password", { required: true })}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full  px-2 py-1 sm:py-2"
                      required=""
                    />
                    <p className="text-red-500 mx-auto lg:text-base  sm:text-sm text-[10px]">
                      {errors.password?.message}
                    </p>
                    <p className="text-red-500 mx-auto lg:text-base  sm:text-sm text-[10px]">
                      {errors.error?.message}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start"></div>
                  </div>
                  <Button className="text-center w-full" type="submit">
                    Sign in
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignInForm;
