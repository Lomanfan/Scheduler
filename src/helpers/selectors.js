export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((each) => each.name === day);
  if (!selectedDay) {
    return [];
  }
  const appointments = selectedDay.appointments.map(
    (id) => state.appointments[id]
  );
  return appointments;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const interviewerId = interview.interviewer;
  const interviewDetails = {
    student: interview.student,
    interviewer: state.interviewers[interviewerId],
  };
  return interviewDetails;
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find((each) => each.name === day);
  if (!selectedDay) {
    return [];
  }
  const interviewers = selectedDay.interviewers.map(
    (id) => state.interviewers[id]
  );
  return interviewers;
}
