export function getAppointmentsForDay(state, day) {
  // ... returns an array of appointments for that day
  // console.log("selector/Array?State", Array.isArray(state));
  const selectedDay = state.days.find(each => each.name === day);
  // console.log("selector/SelectedDay", selectedDay);
  if (!selectedDay) {
    return [];
  }
  // return selectedDay.appointments.map(id => state.appointments[id]);
  const appointments = selectedDay.appointments.map(id => state.appointments[id]);

  // console.log("getAppointmentsForDay", appointments);
  return appointments;
};

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const interviewerId = interview.interviewer;
  const interviewDetails = {
    student: interview.student,
    interviewer: state.interviewers[interviewerId]
  };

  console.log("interviewDetails", interviewDetails);

  return interviewDetails;
};

export function getInterviewersForDay(state, day) {
  // console.log("getInterviewersForDay/state", state);
  const selectedDay = state.days.find(each => each.name === day);
  if (!selectedDay) {
    return [];
  }
  const interviewers = selectedDay.interviewers.map(id => state.interviewers[id]);
  
  console.log("getInterviewersForDay/interviewers", interviewers);
  
  return interviewers;
}
