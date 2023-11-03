import React, { useState } from "react";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signupImg from "../assets/images/Sign up-amico.png";
import signUpSchema from "../models/SignUpSchema";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBase/FireBaseConfigs";
import { useNavigate } from "react-router";
const SignUpForm = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null); // State to store and display error message
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const onSubmitHandler = async (data) => {
    const { userName, email, password } = data;
    console.log(data);
    try {
      await createUserWithEmailAndPassword(auth, email, password, userName);
      navigate("/sign-in");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("Email already exists. Please use a different email.");
      } else {
        setErrorMsg(error.message);
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center md:flex-row md:justify-center md:h-[90vh]">
        <div className="w-4/5  md:w-3/5">
          <img src={signupImg} alt="sign-up" className=" md:h-[85vh]" />
        </div>

        <section className="bg-gray-50 px-3 sm:px-12 md:px-0 ">
          <div className="flex flex-col items-center justify-center  px-6 py-5 mx-auto md:h-[90vh]  ">
            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6  text-left space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-lg sm:text-xl font-bold  text-gray-900 md:text-2xl ">
                  Sign up a new account
                </h1>
                <form
                  onSubmit={handleSubmit(onSubmitHandler)}
                  className="space-y-4 md:space-y-6"
                >
                  {/* name */}
                  <div>
                    <label
                      htmlFor="userName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      user name
                    </label>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      {...register("userName", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1 sm:py-2  "
                      placeholder="example"
                      required=""
                    />
                    <p className="text-red-500 mx-auto lg:text-base sm:text-sm text-[10px]">
                      {errors.userName?.message}
                    </p>
                  </div>
                  {/* email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your email
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
                      Password
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
                  </div>
                  {/* confirm password */}

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      {...register("confirmPassword", { required: true })}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full  px-2 py-1 sm:py-2"
                      required=""
                    />
                    <p className="text-red-500 mx-auto lg:text-base  sm:text-sm text-[10px]">
                      {errors.confirmPassword?.message}
                    </p>
                    <p className="text-red-500 mx-auto lg:text-base  sm:text-sm text-[10px]">
                      {errors.error?.message}
                    </p>
                    <p className="text-red-500 mx-auto lg:text-base sm:text-sm text-[10px]">
                      {errorMsg} {/* Display error message here */}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start"></div>
                  </div>
                  <Button className="text-center w-full" type="submit">
                    Sign up
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
export default SignUpForm;
