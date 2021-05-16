import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import bookInterview from "../Application";


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
    props.bookInterview(props.id, interviewer).then(() => transition(SHOW));
  }
  //TODO: 2. save function/To be passed to the Form component (see next below); 
  //TODO: 3. Form should capture the name and interviewer and pass them to props.onSave as arguments.
  //TODO: 4. then create a new interview object to be passed to props.bookInterview.
  //TODO: 5. transition to the SHOW mode after calling props.bookInterview.
  //TODO: 6. update the save action to show the SAVING indicator before calling props.bookInterview.
  //TODO: 7. show Status component when mode === SAVING


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
        onCancel={back}
        interviewers={props.interviewers}
      />
    )}
  
  </article>

  );

};
