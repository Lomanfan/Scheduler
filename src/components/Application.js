import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "components/Appointment";
import "./Application.scss";

// console.log("------------", { Appointment });

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },

  {
    id: 3,
    time: "4pm",
    interview: {
      student: "Bart Simpson",
      interviewer: {
        id: 5,
        name: "Edna Krabappel",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }

];

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [selectedDay, updateSelectedDay] = useState('Monday');
  // const 
//  console.log("APPOINTMENT", appointments)
 console.log("Application-props", props);

  useEffect(() => {
    const URL = '/api/days';
    axios.get(URL).then(response => {
      setDays([...response.data])
    });
  }, [])

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
        days={days}
        selected={selectedDay}
        setDays={updateSelectedDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointments.map(appointment => (<Appointment key={appointment.id} {...appointment} />))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
