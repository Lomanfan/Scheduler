import React from "react";
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  // console.log("InterviewerListItem-props", props);

  return (
    <li 
    onClick={props.setInterviewer}
    className={props.selected ? 'interviewers__item--selected' : 'interviewers__item'}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}