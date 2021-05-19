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

// afterEach(cleanup);

// jest.mock("axios");

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });


});