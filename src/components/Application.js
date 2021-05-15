import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";
import "./Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";


// console.log("------------", { Appointment });

const API = {
  GET_DAYS: 'http://localhost:8001/api/days',
  GET_APPOINTMENTS: 'http://localhost:8001/api/appointments',
  GET_INTERVIEWERS: 'http://localhost:8001/api/interviewers'
}

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    bookInterview: {},
    interviewers: {}
  });

  //  console.log("APPOINTMENT", appointments)
   console.log("Application-props", props);

  // const setDays = days => setState({ ...state, days });
  
  useEffect(() => {
    Promise.all([
      axios.get(API.GET_DAYS),
      axios.get(API.GET_APPOINTMENTS),
      axios.get(API.GET_INTERVIEWERS)
    ])
    .then(all => {
      setState(prev => ({
        ...prev, 
           days: all[0].data, 
           appointments: all[1].data, 
           interviewers: all[2].data
          }))
      // console.log("FROM API: days", days, "appointments", appointments, "interviews", interviews);
    })
    .catch((error) => {
      console.log("Error from API fetching:", error.message)
    });
  }, []);

  const setDay = day => setState(prev => ({ ...prev, day }));
  // const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day);
        // console.log("App-Check Params", state, state.day);  //hardcoded state from line19 & day:Monday; results in [], [] for following functions
        // console.log("App-Check getAppointmentsForDay", getAppointmentsForDay(state, state.day)); //[], okay. see above
        console.log("App-Check appointments", appointments); //[], okay. see above

  const interviewers = getInterviewersForDay(state, state.day);
        console.log("App-Check interviewers", interviewers);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);  //seems works, interviewer name is showing
          console.log("App-Appointment.interview:", appointment.interview);
          // TODO:NOTE// SOME appointments.interview is null
  
  const bookInterview = (id, interview) => {
        console.log("bookInterview: id, interview", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, ...appointment)
    .then(setState({...state, appointments}));
  }


    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });

  //OR:
  // Promise.all([
  //   Promise.resolve("first"),
  //   Promise.resolve("second"),
  //   Promise.resolve("third"),
  // ]).then((all) => {
  //   setState(prev => ({...prev, first: all[0], second: all[1], third: all[2] }));
  // });

  // console.log("Application-DailyAppt", dailyAppointments);
  // console.log("State", state);

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
        {schedule}
        <Appointment key="last" time="5pm" />
        {/* TODO:Mentor question: what does this do? */}
      </section>
    </main>
  );
}
