import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import ConfigPartsForm from "./ConfigPartsForm";

describe("ConfigPartsForm", () => {
  const configId = "12345";
  const mockRows = [{ type: "", value: "" }];
  let handleChange: jest.Mock;
  let addRow: jest.Mock;
  let onSubmit: jest.Mock;

  beforeEach(() => {
    handleChange = jest.fn();
    addRow = jest.fn();
    onSubmit = jest.fn();
    jest.restoreAllMocks();
  });

  // Mock fetch for part types and parts
  const mockFetch = (url: string) => {
    if (url.includes("/api/part-types")) {
      return Promise.resolve({
        json: async () => [{ part_type: "cpu", part_label: "CPU" }],
      } as any);
    }
    if (url.includes("/api/parts-by-type")) {
      return Promise.resolve({
        json: async () => ({ parts: [{ part_id: "1", part_name: "Ryzen 5" }] }),
      } as any);
    }
    return Promise.reject("Unknown URL");
  };

  test("renders initial UI and config ID", async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch);

    await act(async () => {
      render(
        <ConfigPartsForm
          configId={configId}
          rows={mockRows}
          handleChange={handleChange}
          addRow={addRow}
          onSubmit={onSubmit}
        />
      );
    });

    expect(
      screen.getByText((content) =>
        content.includes(`Great! Your configuration got submitted and received the id ${configId}`)
      )
    ).toBeInTheDocument();

    // Wait for part type to be rendered
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "-- Select a type --" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "CPU" })).toBeInTheDocument();
    });
  });


  test("calls addRow when + Add Row clicked", async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch);

    await act(async () => {
      render(
        <ConfigPartsForm
          configId={configId}
          rows={mockRows}
          handleChange={handleChange}
          addRow={addRow}
          onSubmit={onSubmit}
        />
      );
    });

    const addRowButton = screen.getByText("+ Add Row");
    fireEvent.click(addRowButton);
    expect(addRow).toHaveBeenCalledTimes(1);
  });

  test("calls onSubmit when Save Configuration Parts clicked", async () => {
    jest.spyOn(global, "fetch").mockImplementation(mockFetch);

    await act(async () => {
      render(
        <ConfigPartsForm
          configId={configId}
          rows={mockRows}
          handleChange={handleChange}
          addRow={addRow}
          onSubmit={onSubmit}
        />
      );
    });

    const saveButton = screen.getByRole("button", { name: /Save Configuration Parts/i });
    fireEvent.click(saveButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
