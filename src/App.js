import "./css/App.css";
import { Auth } from "./routes/Auth";
import React, { useState, useEffect } from "react";
import AppRouter from "./components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user.uid);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  //한번만 작동

  return (
    <div className="App">
      <h1 className="title">To Do List</h1>
      {init && <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />}
    </div>
  );
}

export default App;
