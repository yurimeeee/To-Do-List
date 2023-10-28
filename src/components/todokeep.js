import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

const Todo2 = ({ listObj, userConfirm, updateTodo, deleteTodo }) => {
  // const [mode, setMode] = useState("read");
  const [mode, setMode] = useState("read");
  const [ischecked, setIschecked] = useState(false);
  const [newList, setNewList] = useState(listObj.text); //기존 값을 초기값으로 지정
  // const [text, setText] = useState(data.text);
  console.log(listObj, "listObj");
  console.log(listObj.text, "listObj");

  //날짜 변환
  // const timestamp = listObj.timestamp; // Firebase에서 가져온 날짜 데이터
  // const dateObject = timestamp.toDate(); // JavaScript Date 객체로 변환

  // checkbox
  let labelDeco = "";
  let btnClass = "";
  let formClass = "hidden ";
  let deco = {};
  if (mode === "edit") {
    // className += " hidden";
    formClass = "";
    btnClass += "hidden";
    labelDeco = "hidden";
  }
  if (ischecked) {
    labelDeco += "text-muted";
    deco = { textDecoration: "line-through" };
  }
  const handleChecked = (e) => {
    setIschecked(!ischecked); //체크박스 체크되면, 무조건 값을 반대로
    console.log(ischecked);
  };

  // Mode 변경
  const todoEdit = (e) => {
    setMode("edit");
  };
  const changeMode = (val) => {
    setMode(val);
  };

  // edit
  // const todoUpdate = (e) => {
  //   // updateTodo(listObj.id, text);
  // };

  const todoUpdate = async (e) => {
    e.preventDefault();
    const postRef = doc(db, "todolist", listObj.id);
    await updateDoc(postRef, {
      text: newList,
    });
    // setEdit(false); //수정모드 해제
  };
  const handleEdit = (val) => {
    setNewList(val);
    console.log(newList);
  };
  // const onChange = (e) => {
  //   //e.target.value  //기존 문법
  //   const {
  //     target: { value },
  //   } = e; //ES6 문법, 여러개 넘길떄 더 좋음. 하나는 비슷하긴함
  //   setNewList(value);
  // };

  //delete
  const todoDelete = (e) => {
    deleteTodo(listObj.id);
  };

  return (
    userConfirm && (
      <div className="d-flex justify-content-between ">
        <div class="form-check d-flex justify-content-between gap-2 align-item-center">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id={`todo_${listObj.lid}`}
            onChange={handleChecked}
          />
          <label
            className={`form-check-label ${labelDeco}`}
            htmlFor={`todo_${listObj.lid}`}
            style={deco}
          >
            {listObj.text}

            {/* {listObj.toLocaleDateString()} {listObj.toLocaleTimeString()} */}
            {/* {listObj.date.toDate()} */}
            {/* <span>{listObj.date}</span> */}
          </label>

          <form className={formClass} onSubmit={todoUpdate}>
            <div className="d-flex justify-content-between">
              <input
                className="form-control edit-input"
                type="text"
                value={listObj.text}
                onChange={(e) => {
                  handleEdit(e.target.value);
                }}
              />
              <button type="submit" className="btn btn-secondary btn-sm me-2">
                Save
              </button>
              <button
                type="button"
                className="btn btn-light btn-sm"
                onClick={() => {
                  changeMode("read");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div className={btnClass}>
          <button
            type="button"
            className="btn btn-info btn-sm me-2"
            onClick={todoEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={todoDelete}
          >
            Delete
          </button>
        </div>
      </div>
    )
    // <div class="form-check">
    //   <input
    //     class="form-check-input"
    //     type="checkbox"
    //     value=""
    //     id="flexCheckDefault"
    //   />
    //   <label class="form-check-label" for="flexCheckDefault">
    //     {Default checkbox}
    //   </label>
    // </div>
  );
};

export default Todo2;
