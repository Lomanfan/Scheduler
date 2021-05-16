const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2],
      spots: 99
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2],
      spots: 3
    },
  ],

  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 },
    },
  },
};

const updateSpots = function (dayName, days, appointments) {

  // your code goes here

};

// This is the initial state
console.log("\n*** Initial Days State\n", state.days);

// Call the updateSpots function 
const days = updateSpots("Monday", state.days, state.appointments);
console.log("\n*** Updated Days\n", days);

// Hopefully this is unchanged
console.log("\n*** Final Days State\n", state.days);

const passText = 'Pass: Original State unchanged';
const failText = 'Fail: Original State has been changed!!!';

const pass = state.days[0].spots === 99 && state.days[1].spots === 3;
console.log('\n', pass ? passText : failText);