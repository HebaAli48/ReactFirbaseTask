/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
// import Loader from "../ui/Loader";

const AppLayout = () => {
  // State variable to track loading state
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col  ">
      <Header />
      <main className="min-h-[80vh] flex flex-col bg-back-color">
        {/* {isLoading && <Loader />} */}
        {!isLoading && <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
