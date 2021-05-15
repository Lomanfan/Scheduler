import React from "react";
import classNames from 'classnames';
import "components/InterviewerListItem";

export default function InterviewerListItem(props) {
  console.log("InterviewerListItem-props", props);

  const InterviewerListItemClass = `${props.selected ? "interviewers__item--selected" : "interviewers__item"}`;

  return (
    <li className={InterviewerListItemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
  
}