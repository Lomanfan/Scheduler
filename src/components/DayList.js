import React from "react";
import classNames from 'classnames';
import DayListItem from "./DayListItem";


export default function DayList(props) {

// console.log("*props:", props.days);

  const dayList = props.days.map((day) => {
    // console.log("*day", day);

    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{dayList}</ul>;

}