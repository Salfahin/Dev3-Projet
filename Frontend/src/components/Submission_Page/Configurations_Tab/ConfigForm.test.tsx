import { render, screen, fireEvent } from "@testing-library/react";
import ConfigForm from "./ConfigForm";

describe("ConfigForm", () => {
  let configName = "";
  let configAuthor = "";
  const setConfigName = jest.fn((value) => (configName = value));
  const setConfigAuthor = jest.fn((value) => (configAuthor = value));
  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <ConfigForm
        configName={configName}
        setConfigName={setConfigName}
        configAuthor={configAuthor}
        setConfigAuthor={setConfigAuthor}
        onSubmit={onSubmit}
      />
    );
  });

  test("renders input fields and button", () => {
    expect(screen.getByLabelText(/name of the configuration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author of the configuration/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
  });

  test("updates config name on input change", () => {
    const nameInput = screen.getByLabelText(/name of the configuration/i);
    fireEvent.change(nameInput, { target: { value: "My Config" } });
    expect(setConfigName).toHaveBeenCalledWith("My Config");
  });

  test("updates config author on input change", () => {
    const authorInput = screen.getByLabelText(/author of the configuration/i);
    fireEvent.change(authorInput, { target: { value: "Linus Torvals" } });
    expect(setConfigAuthor).toHaveBeenCalledWith("Linus Torvals");
  });

  test("calls onSubmit when Continue button is clicked", () => {
    const button = screen.getByRole("button", { name: /continue/i });
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
