import React, { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

const MyCalendar = ({ todoDates }) => {
  // const [value, onChange] = useState < Value > new Date();
  // const [value, onChange] = useState(todoDates);
  console.log(todoDates);

  return (
    <div>
      <Calendar value={todoDates} />
    </div>
  );
};

export default MyCalendar;
