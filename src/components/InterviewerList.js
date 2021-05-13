import React from "react";
import "components/InterviewerListItem.scss";
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {
  console.log("InterviewerLis-props", props)

  const interviewers = props.interviewers.map((interviewer) => {

    // const setInterviewer = () => {
    //   props.setInterviewer(interviewer.id)
    // }

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        // setInterviewer={setInterviewer}
        setInterviewer={(event) => props.setInterviewer(interviewer.id)}
      />
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
}