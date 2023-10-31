import React, { useEffect, useState } from "react";
import MyCalendar from "../components/Calendar";
import List from "../components/List";
import Auth from "./Auth";

const Main = ({ isLoggedIn, userObj }) => {
  console.log("main", userObj);
  const [todoDate, setTodoDate] = useState([]);

  const setDateArr = (arr) => {
    let dateArr = arr.map((item) => {
      console.log(item.date);
      var date = new Date(item.date.toDate());
      // var date = new Date(item.date.toDate()).toUTCString()

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return `${year}-${month}-${day}`;
      // return date.toLocaleDateString();
      // return date;
    });
    setTodoDate(dateArr);
  };

  console.log(todoDate);

  return (
    <main>
      <div className="container">
        {" "}
        {isLoggedIn ? (
          <>
            <MyCalendar todoDates={todoDate} />
            <List userObj={userObj} dateArr={setDateArr} />
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
