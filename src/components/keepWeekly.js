import React, { useState, useEffect } from "react";
// import MonthlyCalendar from "./MonthlyCalendar";

const Weekly2 = () => {
  // now 변수를 상태로 관리
  const [now, setNow] = useState(new Date());
  const todayWeak = now.getDay();
  const today = now.getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const [dayList, setDayList] = useState([]);
  const [weekList, setWeekList] = useState([]);
  const [showMonthlyCalendar, setShowMonthlyCalendar] = useState(false);

  const toggleMonthlyCalendar = () => {
    setShowMonthlyCalendar(!showMonthlyCalendar);
  };

  // 주간 날짜와 요일 데이터를 계산하는 함수
  const calculateWeekData = () => {
    const dates = getAlldate(today, lastday);
    const weeks = getAllWeek(todayWeak);

    setDayList(dates);
    setWeekList(weeks);
  };

  useEffect(() => {
    calculateWeekData();
  }, [today, lastday, todayWeak, now]); // now 변수를 의존성 배열에 추가

  const getAlldate = (today, lastday) => {
    let dates = [];

    dates[0] = today;
    for (let i = 1; i <= 6; i++) {
      today++;
      if (today > lastday) {
        today = 1;
      }
      dates[i] = today;
    }

    return dates;
  };

  const getAllWeek = (todayWeak) => {
    const strWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weekList = [];

    weekList[0] = strWeek[todayWeak];

    for (let i = 1; i <= 6; i++) {
      todayWeak++;
      if (todayWeak > 6) {
        todayWeak = 0;
      }
      weekList[i] = strWeek[todayWeak];
    }

    return weekList;
  };

  // 이전 주를 표시하도록 데이터 업데이트 함수
  const showPreviousWeek = () => {
    // now 변수를 업데이트
    const newNow = new Date(now);
    newNow.setDate(newNow.getDate() - 7);
    setNow(newNow);
  };

  // 다음 주를 표시하도록 데이터 업데이트 함수
  const showNextWeek = () => {
    // now 변수를 업데이트
    const newNow = new Date(now);
    newNow.setDate(newNow.getDate() + 7);
    setNow(newNow);
  };

  return (
    <div className="Calendar">
      <div className="Year-MonthList">
        <p>
          <span className="Year">{now.getFullYear()}</span>
          &nbsp;&nbsp;
          <span className="Month">
            {now.toLocaleString("en-us", { month: "long" })}
          </span>
        </p>
      </div>
      <div className="DayList">
        <div className="weekly-wrap">
          {dayList.map((day, index) => (
            <div
              className={`daylist ${day === today ? "today" : ""}`}
              key={index}
            >
              {/* <div className="daylist" key={index}> */}
              <div
                className={`weak ${
                  weekList[index] === "Sun"
                    ? "Sun"
                    : weekList[index] === "Sat"
                    ? "Sat"
                    : ""
                }`}
              >
                {weekList[index]}
              </div>
              <div className="day">{day}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="CalendarIconContainer">
        <span className="CalendarIconText" onClick={toggleMonthlyCalendar}>
          전체 보기
        </span>
        {/* 여기에 전체 보기 아이콘을 추가하세요 */}
      </div>
      <div className="WeekNavigation">
        <button onClick={showPreviousWeek}>전 주</button>
        <button onClick={showNextWeek}>다음 주</button>
      </div>
      {/* {showMonthlyCalendar && (
        <MonthlyCalendar
          year={now.getFullYear()}
          month={now.getMonth() + 1}
          dates={dayList}
        />
      )} */}
    </div>
  );
};

export default Weekly2;
