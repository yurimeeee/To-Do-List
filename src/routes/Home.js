import React, { useState } from "react";
import MyCalendar from "../components/Calendar";
import List from "../components/List";
import Auth from "./Auth";

const Main = ({ isLoggedIn, userObj }) => {
  const [secretWord, setSecretWord] = useState("");
  const [isShown, setIsShwon] = useState(false);
  console.log("main", userObj);
  return (
    <main>
      <div className="container">
        {" "}
        {isLoggedIn ? (
          <>
            <MyCalendar />
            <List userObj={userObj} />
          </>
        ) : (
          <Auth />
        )}
      </div>
    </main>
  );
};

const Home = ({ isLoggedIn, userObj }) => {
  return (
    <>
      <Main isLoggedIn={isLoggedIn} userObj={userObj} />{" "}
    </>
  );
};

export default Home;
