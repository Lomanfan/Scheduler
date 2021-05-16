import React from "react";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

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

  const deleteAppointment = (id) => {
    transition(DELETING);
    props.cancelInterview(id)
    .then(() => transition(EMPTY))
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
      onDelete={() => {transition(CONFIRM)}}
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
    {mode === DELETING && (
      <Status 
      message="Deleting..."
      />
      )}
      {mode === CONFIRM && (
      <Confirm
      message="Confirm to proceed."
      onCancel={back}
      onConfirm={deleteAppointment}
      />
      )}

    </article>
  );
};
