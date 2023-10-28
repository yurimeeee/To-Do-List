import { useState, useEffect } from "react";
import Todo from "./Todo";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
// import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
//datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { Navigate, useNavigate } from "react-router-dom";

// import TimePicker from "./TimePicker";ß
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";

//EF2420IZ0vbmDEAdOlzI7AVPFl22
const List = ({ userObj }) => {
  console.log("list", userObj);
  const navigate = useNavigate();
  const [todoid, setTodoid] = useState("");
  const [todo, setTodo] = useState([]); //조회된 글을 배열로 만듦
  // const [newList, setNewList] = useState(listObj.text); //기존 값을 초기값으로 지정

  const [selectedDate, setSelectedDate] = useState(new Date());
  //DatePicker
  const today = new Date(); // 현재 날짜, 시간
  const lastWeek = new Date(today); // 현재 날짜를 복사
  lastWeek.setDate(today.getDate() - 7); // 현재 날짜 -7일
  //TimePicker

  // const [selectedHour, setSelectedHour] = useState("00");
  // const [selectedMinute, setSelectedMinute] = useState("00");

  // 선택한 날짜 업데이트
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };

  // 할 일 추가
  const addTodo = async (e, value) => {
    e.preventDefault();
    console.log("value", value);
    const text = e.target.elements.text.value;

    let newId = todoid + 1;
    setTodoid(newId); //todo는 상수라 직접 바꿀 수 없어 todoid++는 불가 todoid +1은 가능하나 느림

    // const timestamp = {
    //   seconds: listObj.date.seconds,
    //   nanoseconds: listObj.date.nanoseconds,
    // };
    // console.log(timestamp);

    // const date = new Date(timestamp.seconds * 1000); // 초 단위로 변환

    // const year = date.getFullYear();
    // const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월
    // const day = date.getDate().toString().padStart(2, "0"); // 일

    // const formattedDate = `${year}-${month}-${day}`;
    // console.log(formattedDate);

    try {
      //오류 점검
      await addDoc(collection(db, "todolist"), {
        // posts는 컬렉션명
        lid: todoid,
        text: text,
        date: `${selectedDate}`, // 선택한 날짜를 사용
        uid: userObj,
        checked: false,
      });
      document.getElementById("todo").value = ""; //인풋 비우기
      console.log(selectedDate, "selectedDate");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  // const updateTodo = async (e) => {
  //   e.preventDefault();
  //   const postRef = doc(db, "todolist", listObj.id);
  //   await updateDoc(postRef, {
  //     text: newList,
  //   });
  //   // setEdit(false); //수정모드 해제
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "todolist"));
        const todosData = [];
        querySnapshot.forEach((doc) => {
          todosData.push({ id: doc.id, ...doc.data() });
        });
        setTodo(todosData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // 할 일 입력
  return (
    <div className="container list_wrap">
      <Form onSubmit={addTodo}>
        <Form.Group className="mb-3" controlId="todo">
          <Form.Label>Todo</Form.Label>
          <Form.Control
            type="text"
            name="text"
            placeholder="할 일을 입력하세요."
          />
        </Form.Group>
        <DatePicker
          showIcon
          dateFormat="yyyy.MM.dd"
          selected={selectedDate}
          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
          minDate={new Date(lastWeek)} // 이전 날짜 선택 불가
          onChange={handleDateChange}
          icon="fa fa-calendar"
          className="form-control"
          name="date"
        />

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker label="" className="form-control" />
          </DemoContainer>
        </LocalizationProvider>
 */}
        <button type="submit" className="btn submit_btn">
          Submit
        </button>
      </Form>
      <div>
        <ul className="list_ul">
          {todo.map((item) => (
            <Todo
              key={item.id}
              listObj={item}
              userConfirm={item.uid === userObj}
              todo={todo}
              // updateTodo={updateTodo}
            ></Todo>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
