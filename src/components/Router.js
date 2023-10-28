import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ({ isLoggedIn, userObj }) => {
  console.log(userObj, isLoggedIn);
  return (
    <>
      {isLoggedIn}
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route
                path="/"
                element={<Home isLoggedIn={isLoggedIn} userObj={userObj} />}
              ></Route>
            </>
          ) : (
            <>
              <Route path="/" element={<Home userObj={userObj} />}></Route>
              <Route
                path="/login"
                element={<Auth isLoggedIn={isLoggedIn} />}
              ></Route>
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};
export default AppRouter;
