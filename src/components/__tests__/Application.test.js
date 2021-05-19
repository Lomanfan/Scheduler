import React from "react";

import { 
  render, 
  cleanup, 
  fireEvent,
  getAllByTestId,
  getByText,
  getByAltText,
  getByPlaceholderText,
  prettyDOM,
  queryByText,
  queryByAltText,
  waitForElement
} from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"))

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container} = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment")[0];
  fireEvent.click(getByAltText(appointment, "Add"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);  //render application
  await waitForElement(() => getByText(container, "Archie Cohen"));  //wait until "Archie Cohen" displays

  const appointment = getAllByTestId(
    container, 
    "appointment"
    ).find(each => queryByAltText(each, "Delete"));
    
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Confirm to proceed.")).toBeInTheDocument();
    
    fireEvent.click(getByText(appointment, "Confirm")); //delete button confirmation
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();  //display of deleting message

  await waitForElement(() => queryByAltText(appointment, "Add"));  //wait until "Add" displays

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  ); // Check DayListItem for text "Monday" and text "1 spot remaining".
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
 
  const appointment = getAllByTestId(
    container, 
    "appointment"
    ).find(each => queryByText(each, "Archie Cohen"));

  fireEvent.click(getByAltText(appointment, "Edit"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Bart Simpson" }   //change name
  });

  fireEvent.click(getByText(appointment, "Save"));  //click "Save" on form
  expect(getByText(appointment, "Saving")).toBeInTheDocument();  //"Saving" is displayed

  await waitForElement(() => getByText(container, "Bart Simpson"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday") //check DayListItem for text "Monday" and text "1 spot remaining"
  );
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});

it("shows the save error when failing to save an edited appointment", async () => {
  axios.put.mockRejectedValueOnce();
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments.find(each => queryByText(each, "Archie Cohen"));
  fireEvent.click(getByAltText(appointment, "Edit"));
 
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Bart Simpson" }
  });
 
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  await waitForElement(() => getByText(container, "Save Error. Please contact us @ 888-8888.")); //wait for error msg to display

  fireEvent.click(getByAltText(appointment, "Close")); //click "Close"
  fireEvent.click(getByText(appointment, "Cancel"));  //click "Cancel"
});

it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(
    container, 
    "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));

  fireEvent.click(getByAltText(appointment, "Delete"));

  expect(getByText(appointment, "Confirm to proceed.")).toBeInTheDocument();

  fireEvent.click(getByText(appointment, "Confirm"));

  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Delete Error. Please contact us @ 888-8888."));

  fireEvent.click(getByAltText(appointment, "Close"));

});
