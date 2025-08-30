beforeAll(() => {
  // Mock alert so it doesn't throw
  global.alert = jest.fn();

  // Mock window.location.href to prevent errors
  delete window.location;
  window.location = { href: "" };
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ConfigSubmissionForm from "./ConfigSubmissionForm";
import { API_URL } from "../../../config";

// Mock the subcomponents to simplify the test
jest.mock("./ConfigForm", () => (props) => (
  <div>
    <input
      placeholder="configName"
      value={props.configName}
      onChange={(e) => props.setConfigName(e.target.value)}
    />
    <input
      placeholder="configAuthor"
      value={props.configAuthor}
      onChange={(e) => props.setConfigAuthor(e.target.value)}
    />
    <button onClick={props.onSubmit}>Submit Config</button>
  </div>
));

jest.mock("./ConfigPartsForm", () => (props) => (
  <div data-testid="parts-form">
    <button onClick={props.onSubmit}>Submit Parts</button>
  </div>
));

describe("ConfigSubmissionForm", () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    // Mock global.fetch for add-config
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ config: { config_id: 123 } }),
    });
  });

  it("renders ConfigForm initially and submits configuration", async () => {
    render(<ConfigSubmissionForm />);

    // ConfigForm inputs should be present
    expect(screen.getByPlaceholderText("configName")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("configAuthor")).toBeInTheDocument();

    // Fill in inputs
    fireEvent.change(screen.getByPlaceholderText("configName"), {
      target: { value: "My Config" },
    });
    fireEvent.change(screen.getByPlaceholderText("configAuthor"), {
      target: { value: "Linus Torvalds" },
    });

    // Submit config
    fireEvent.click(screen.getByText("Submit Config"));

    // Wait for ConfigPartsForm to appear
    await waitFor(() => {
      expect(screen.getByTestId("parts-form")).toBeInTheDocument();
    });

    // fetch should have been called with correct payload
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}/api/add-config`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config_name: "My Config",
          config_author: "Linus Torvalds",
        }),
      })
    );
  });

  it("submits configuration parts when parts form is submitted", async () => {
    render(<ConfigSubmissionForm />);

    // Fill initial config and submit
    fireEvent.change(screen.getByPlaceholderText("configName"), {
      target: { value: "My Config" },
    });
    fireEvent.change(screen.getByPlaceholderText("configAuthor"), {
      target: { value: "Linus Torvalds" },
    });
    fireEvent.click(screen.getByText("Submit Config"));

    // Wait for parts form
    await waitFor(() => {
      expect(screen.getByTestId("parts-form")).toBeInTheDocument();
    });

    // Mock fetch for add-configparts
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    // Submit parts
    fireEvent.click(screen.getByText("Submit Parts"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/api/add-configparts`,
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            config_id: 123,
            parts: [{ type: "", part: "" }],
          }),
        })
      );
    });
  });
});
