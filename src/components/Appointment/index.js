import React from "react";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  console.log("Appointment-props", props)

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => transition(ERROR_SAVE, true));
  }

  const deleteAppointment = (id) => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true));
  }
  
  return(
    <article className="appointment" data-testid="appointment">
    <Header time={props.time}/>
    {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />} */}

    {/* {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />} */}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => {transition(CONFIRM)}}
      onEdit={() => {transition(EDIT)}}
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
      message="Saving"
      />
      )}
    {mode === DELETING && (
      <Status 
      message="Deleting"
      />
      )}
      {mode === CONFIRM && (
      <Confirm
      message="Confirm to proceed."
      onCancel={back}
      onConfirm={deleteAppointment}
      />
      )}
      {mode === EDIT && (
      <Form name={props.interview.student}
       interviewer={props.interview.interviewer.id}
       interviewers={props.interviewers}
       onCancel={back}
       onSave={save}
       />
      )}
      {mode === ERROR_SAVE && (
      <Error 
      message="Save Error. Please contact us @ 888-8888." 
      onClose={back}
      />
      )}
      {mode === ERROR_DELETE && (
      <Error 
      message="Delete Error. Please contact us @ 888-8888." 
      onClose={back}
      />
      )}
    </article>
  );
};
