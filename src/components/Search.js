import React from "react";
// import { Form } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../Firebase";

const Search = async () => {
  const firestore = getFirestore(db);
  const usersCollection = collection(firestore, "todolist");
  const q = query(usersCollection, where("text", "===", "Music"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });

  return (
    <form className="container list-wrap">
      <div className="mb-3 d-flex">
        <label for="exampleInputEmail1" className="form-label"></label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="일정을 검색하세요."
        />
        <button type="submit" className="btn btn-primary ">
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
