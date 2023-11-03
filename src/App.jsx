import { Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import { LogInContext } from "./utils/LogInContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <LogInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<h1>Loading ...</h1>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="sign-in"
            element={
              <Suspense fallback={<h1>Loading ...</h1>}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="sign-up"
            element={
              <Suspense fallback={<h1>Loading ...</h1>}>
                <SignUp />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </LogInContext.Provider>
  );
}

export default App;
