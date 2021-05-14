

export default function getAppointmentsForDay(state, day) {
  // ... returns an array of appointments for that day
  // console.log("selector/Array?State", Array.isArray(state));

  const selectedDay = state.days.find(each => each.name === day);
  // console.log("selector/SelectedDay", selectedDay);
  if (!selectedDay) {
    return [];
  }

  return selectedDay.appointments.map(id => state.appointments[id]);
  
};
