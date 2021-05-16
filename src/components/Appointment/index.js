import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  // console.log("Appointment-props", props)
  // console.log("Appointment-props.interview", props.interview)

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);


  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer: interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  return(
  <article className="appointment">
    <Header time={props.time}/>
    {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />} */}

    {/* {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />} */}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && (
      <Form
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      />
    )}
    {mode === SAVING && (
      <Status 
      message="Saving..."
      />
    )}
  </article>

  );

};
