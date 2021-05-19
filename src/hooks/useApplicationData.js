import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const API = {
    GET_DAYS: "/api/days",
    GET_APPOINTMENTS: "/api/appointments",
    GET_INTERVIEWERS: "/api/interviewers",
  };

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    bookInterview: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get(API.GET_DAYS),
      axios.get(API.GET_APPOINTMENTS),
      axios.get(API.GET_INTERVIEWERS),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {
        console.log("Error from API fetching:", error.message);
      });
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const updateSpots = (id, available) => {
    state.days.forEach((day) => {
      if (day.appointments.includes(id)) {
        if (available) {
          day.spots += 1;
        } else {
          day.spots -= 1;
        }
      }
    });
  };

  const bookInterview = (id, interview) => {
    const availableSpot = state.appointments[id].interview === null;
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        availableSpot && updateSpots(id, false);
        setState({ ...state, appointments });
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then((response) => {
        updateSpots(id, true);
        setState({ ...state, appointments });
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
