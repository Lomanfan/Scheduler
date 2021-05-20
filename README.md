# Interview Scheduler

Interview Scheduler is a single page application (SPA) built using React with the latest tools and technologies. Data is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format to provide a realtime experience.

Appointment Schedule
!["Schedule"](https://github.com/Lomanfan/scheduler/blob/master/docs/schedule.png)

Cancel/Delete Confirmation
!["CancelConfirmation"](https://github.com/Lomanfan/scheduler/blob/master/docs/cancelInterview.png)

Delete Indicator
!["DeleteIndicator"](https://github.com/Lomanfan/scheduler/blob/master/docs/deleteIndicator.png)

## Project Features

- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Setup

- Install all dependencies using the `npm install` command.

## Project Stack

Front-End:

- React
- JSX
- SASS
- Axios
- HTML

Back-End:

- Express
- Node.js
- PostgreSQL

Testing:

- Cypress
- Jest
- Storybook
- Webpack Dev Server

## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts
