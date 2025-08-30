import { render, screen, fireEvent } from "@testing-library/react";
import PartForm from "./PartForm";

describe("PartForm", () => {
  let props;

  beforeEach(() => {
    props = {
      partType: "0",
      setPartType: jest.fn(),
      partName: "",
      setPartName: jest.fn(),
      partManufacturer: "",
      setPartManufacturer: jest.fn(),
      partPrice: "",
      setPartPrice: jest.fn(),
      onSubmit: jest.fn(),
    };
  });

  it("renders all inputs and select", () => {
    render(<PartForm {...props} />);

    // Part type select
    expect(screen.getByLabelText(/Select below the/i)).toBeInTheDocument();

    // Part name input
    expect(screen.getByPlaceholderText("e.g. AMD Ryzen 5 5600X")).toBeInTheDocument();

    // Manufacturer input
    expect(screen.getByPlaceholderText("e.g. AMD")).toBeInTheDocument();

    // Price input
    expect(screen.getByPlaceholderText("e.g. 130")).toBeInTheDocument();

    // Continue button
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it("calls setPartType when selecting a type", () => {
    render(<PartForm {...props} />);
    const select = screen.getByLabelText(/Select below the/i);
    fireEvent.change(select, { target: { value: "3" } });
    expect(props.setPartType).toHaveBeenCalledWith("3");
  });

  it("calls the appropriate setters when typing into inputs", () => {
    render(<PartForm {...props} />);

    const nameInput = screen.getByPlaceholderText("e.g. AMD Ryzen 5 5600X");
    const manufacturerInput = screen.getByPlaceholderText("e.g. AMD");
    const priceInput = screen.getByPlaceholderText("e.g. 130");

    fireEvent.change(nameInput, { target: { value: "Ryzen 7 5800X" } });
    expect(props.setPartName).toHaveBeenCalledWith("Ryzen 7 5800X");

    fireEvent.change(manufacturerInput, { target: { value: "AMD" } });
    expect(props.setPartManufacturer).toHaveBeenCalledWith("AMD");

    fireEvent.change(priceInput, { target: { value: "350" } });
    expect(props.setPartPrice).toHaveBeenCalledWith("350");
  });

  it("calls onSubmit when Continue button is clicked", () => {
    render(<PartForm {...props} />);
    const button = screen.getByText("Continue");
    fireEvent.click(button);
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
