import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const API = {
    GET_DAYS: 'http://localhost:8001/api/days',
    GET_APPOINTMENTS: 'http://localhost:8001/api/appointments',
    GET_INTERVIEWERS: 'http://localhost:8001/api/interviewers'
  };
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    bookInterview: {},
    interviewers: {}
  });

  //  console.log("APPOINTMENT", appointments)
  // const setDays = days => setState({ ...state, days });
  
  useEffect(() => {
    Promise.all([
      axios.get(API.GET_DAYS),
      axios.get(API.GET_APPOINTMENTS),
      axios.get(API.GET_INTERVIEWERS)
    ])
    .then(all => {
      console.log("API FETCH RESULT", all);
      setState(prev => ({
        ...prev, 
           days: all[0].data, 
           appointments: all[1].data, 
           interviewers: all[2].data
           // console.log("FROM API: days", days, "appointments", appointments, "interviews", interviews);
          }))
    })
    .catch((error) => {
      console.log("Error from API fetching:", error.message)
    });
  }, []);

  const setDay = day => setState(prev => ({ ...prev, day }));
  // const dailyAppointments = getAppointmentsForDay(state, state.day);

  // function updateSpots(state, day) {
  //   const selectedDay  = state.days.find(each => each.name === day );
  //   const numSpots = selectedDay.appointments.filter(id => state.appointments[id].interview === null).length;
  //   return state.days.map((day) => (day.name === day ? { ...day, numSpots} : day));
  // }

  const updateSpots = (id, increase) => {
    state.days.forEach(day => {
      if(day.appointments.includes(id)) {
        if (increase) {
          day.spots += 1;
        } else {
          day.spots -= 1;
        }
      }
    })
  }


  const bookInterview = (id, interview) => {
        console.log("bookInterview: id, interview", id, interview);

    const isNew = state.appointments[id].interview === null;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment) //TODO//
    .then((response) => {
      console.log("Added new appointments", response);
      // setState({...state, appointments, days: updateSpots(state, state.day)})
      isNew && updateSpots(id, false);
      setState({...state, appointments});

    })
    // .catch(error => console.log("Appointment updating error:", error));
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment) //TODO//
    .then((response) => {
      console.log("Updated appointments", response);
      // setState({...state, appointments, days: updateSpots(state, state.day)})

      updateSpots(id, true);
      setState({...state, appointments})


      console.log("State after delete:", state);
    })
    // .catch(error =>
    // console.log("Appointment cancelling error:", error));
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

};