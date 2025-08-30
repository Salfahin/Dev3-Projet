import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import PartSubmissionForm from "./PartSubmissionForm";
import { API_URL } from "../../../config";

// Mock subcomponents
jest.mock("./PartForm", () => (props) => (
  <div data-testid="part-form">
    <button onClick={props.onSubmit}>Submit Part</button>
    <input
      placeholder="partName"
      value={props.partName}
      onChange={(e) => props.setPartName(e.target.value)}
    />
    <input
      placeholder="partManufacturer"
      value={props.partManufacturer}
      onChange={(e) => props.setPartManufacturer(e.target.value)}
    />
    <input
      placeholder="partPrice"
      value={props.partPrice}
      onChange={(e) => props.setPartPrice(e.target.value)}
    />
    <select
      value={props.partType}
      onChange={(e) => props.setPartType(e.target.value)}
    >
      <option value="0">CPU / Processor</option>
      <option value="1">Cooler</option>
    </select>
  </div>
));

jest.mock("./PartSpecificationsForm", () => (props) => (
  <div data-testid="specs-form">
    <button onClick={props.onSubmit}>Submit Specs</button>
  </div>
));

describe("PartSubmissionForm", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    global.fetch = jest.fn();
    global.alert = jest.fn();
  });

  it("renders PartForm initially and submits a part", async () => {
    const fakePartId = 456;

    fetch.mockResolvedValueOnce({
      json: async () => ({ part: { part_id: fakePartId } }),
    });

    render(<PartSubmissionForm />);

    fireEvent.change(screen.getByPlaceholderText("partName"), {
      target: { value: "Ryzen 5 5600X" },
    });
    fireEvent.change(screen.getByPlaceholderText("partManufacturer"), {
      target: { value: "AMD" },
    });
    fireEvent.change(screen.getByPlaceholderText("partPrice"), {
      target: { value: "230" },
    });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "0" } });

    // Wrap click in act because it triggers async state updates
    await act(async () => {
      fireEvent.click(screen.getByText("Submit Part"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("specs-form")).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/api/add-part`, expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        part_name: "Ryzen 5 5600X",
        part_manufacturer: "AMD",
        part_price: 230,
        part_type: 0,
      }),
    }));
  });

  it("submits specifications and calls alert", async () => {
    const fakePartId = 789;

    // Mock first fetch for part submission
    fetch.mockResolvedValueOnce({
      json: async () => ({ part: { part_id: fakePartId } }),
    });

    render(<PartSubmissionForm />);

    await act(async () => {
      fireEvent.click(screen.getByText("Submit Part"));
    });

    // Mock fetch for specifications submission
    fetch.mockResolvedValueOnce({ json: async () => ({}) });

    await act(async () => {
      fireEvent.click(screen.getByText("Submit Specs"));
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        ":)\nYour part has been submitted. It is now waiting for review before being added to our webiste.\nThanks!"
      );
    });
  });
});
