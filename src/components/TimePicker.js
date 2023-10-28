import React, { useState, useRef } from "react";
import { Meridiem, Hours, Minutes } from "./TimeValue";
//스크롤로 선택가능한 타임피커 만드는 방법 리액트로
const TimePicker = ({ selectedValue, onChange }) => {
  const listRef = useRef(null);

  const items = [
    {
      key: "meridiem",
      items: Meridiem,
    },
    {
      key: "hour",
      items: Hours,
    },
    {
      key: "minute",
      items: Minutes,
    },
  ];

  const handleScroll = (e) => {
    const itemHeight = 30; // 각 항목의 높이
    const scrollTop = listRef.current.scrollTop;
    const selectedIndex = Math.round(scrollTop / itemHeight);

    onChange(items[selectedIndex]);
  };

  console.log(items);

  return (
    <div ref={listRef} onScroll={handleScroll} className="time-picker-list">
      {items.map((item, index) => (
        <div key={index} className={item === selectedValue ? "selected" : ""}>
          {item.items.map((value, i) => (
            <div key={i}>{value}</div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default TimePicker;
