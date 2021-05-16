import React from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "./Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
        //  console.log("Application-props", props);

  const interviewers = getInterviewersForDay(state, state.day);
        // console.log("App-Check interviewers", interviewers);
  // const appointments = getAppointmentsForDay(state, state.day);
        // console.log("App-Check Params", state, state.day);  //hardcoded state from line19 & day:Monday; results in [], [] for following functions
        // console.log("App-Check getAppointmentsForDay", getAppointmentsForDay(state, state.day)); //[], okay. see above
        // console.log("App-Check appointments", appointments); //[], okay. see above

  const appointments = getAppointmentsForDay(state, state.day).map((appointment) => {
    // const interview = getInterview(state, appointment.interview);  //seems works, interviewer name is showing
          // console.log("App-Appointment.interview:", appointment.interview);
          // TODO:NOTE// SOME appointments.interview is null
    return (
      <Appointment
        key={appointment.id}
        {...appointment}   //added
        // id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* {dailyAppointments.map(appointment => (<Appointment key={appointment.id} {...appointment} />))} */}
        {appointments}
        <Appointment key="last" time="5pm" />
        TODO
      </section>
    </main>
  );
}
