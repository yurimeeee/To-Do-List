import React, { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase";
//icon
import { IconEdit } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import { IconDeviceFloppy } from "@tabler/icons-react";

const Todo = ({ listObj, userConfirm, updateTodo, deleteTodo }) => {
  const [mode, setMode] = useState("read");
  const [ischecked, setIschecked] = useState(listObj.checked);
  const [newList, setNewList] = useState(listObj.text); //기존 값을 초기값으로 지정

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
    labelDeco += " text-muted";
    deco = { textDecoration: "line-through" };
  }
  const handleChecked = async (isChecked) => {
    setIschecked(isChecked);
    const postRef = doc(db, "todolist", listObj.id);
    await updateDoc(postRef, {
      checked: isChecked,
    });
    // window.location.reload();
  };

  // Mode 변경
  const todoEdit = (e) => {
    setMode("edit");
  };
  const changeMode = (val) => {
    setMode(val);
  };

  // edit
  const handleEdit = (val) => {
    setNewList(val);
    console.log(newList);
  };

  const todoUpdate = async (e) => {
    e.preventDefault();
    const postRef = doc(db, "todolist", listObj.id);
    await updateDoc(postRef, {
      text: newList,
    });
    window.location.reload();
    // setEdit(false); //수정모드 해제
  };

  //delete
  const todoDelete = async (e) => {
    // deleteTodo(listObj.id);
    e.preventDefault();
    if (window.confirm("정말 삭제할까요?")) {
      await deleteDoc(doc(db, "todolist", listObj.id));
      window.location.reload();
    }
  };

  return (
    userConfirm && (
      <div className="d-flex justify-content-between ">
        <div class="form-check d-flex justify-content-between gap-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={ischecked}
            id={`todo_${listObj.id}`}
            //onChange={handleChecked}
            onChange={(e) => {
              handleChecked(e.target.checked);
            }}
            name="checked"
          />
          <label
            className={`form-check-label ${labelDeco}`}
            htmlFor={`todo_${listObj.lid}`}
            style={deco}
          >
            {listObj.text}
          </label>

          <form className={formClass} onSubmit={todoUpdate}>
            <div className="d-flex justify-content-between">
              <input
                className="form-control edit-input"
                type="text"
                name="text"
                value={newList}
                onChange={(e) => {
                  handleEdit(e.target.value);
                }}
              />
              <button type="submit" className="btns">
                <IconDeviceFloppy />
              </button>
              <button
                type="button"
                // className="btn btn-light btn-sm"
                className="btns"
                onClick={() => {
                  changeMode("read");
                }}
              >
                <IconX />
              </button>
            </div>
          </form>
        </div>
        <div className={btnClass}>
          <button type="button" className="btns edit_btn" onClick={todoEdit}>
            <IconEdit />
          </button>
          <button type="button" className="btns del_btn" onClick={todoDelete}>
            <IconTrash />
          </button>
        </div>
      </div>
    )
  );
};

export default Todo;
