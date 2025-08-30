import { render, screen, fireEvent } from "@testing-library/react";
import SubmissionForm from "./SubmissionForm";

jest.mock("./Parts_Tab/PartSubmissionForm", () => () => <div>Part Form</div>);
jest.mock("./Configurations_Tab/ConfigSubmissionForm", () => () => <div>Config Form</div>);

describe("SubmissionForm", () => {
  test("renders the component with tabs", () => {
    render(<SubmissionForm />);
    
    expect(screen.getByText("Submission Form")).toBeInTheDocument();
    expect(screen.getByText("Submit a Part")).toBeInTheDocument();
    expect(screen.getByText("Submit a Configuration")).toBeInTheDocument();
  });

  test("defaults to 'Submit a Part' tab", () => {
    render(<SubmissionForm />);
    
    expect(screen.getByText("Part Form")).toBeInTheDocument();
    expect(screen.queryByText("Config Form")).not.toBeInTheDocument();
  });

  test("switches to 'Submit a Configuration' tab on click", () => {
    render(<SubmissionForm />);
    
    fireEvent.click(screen.getByText("Submit a Configuration"));
    
    expect(screen.getByText("Config Form")).toBeInTheDocument();
    expect(screen.queryByText("Part Form")).not.toBeInTheDocument();
  });

  test("switches back to 'Submit a Part' tab", () => {
    render(<SubmissionForm />);
    
    fireEvent.click(screen.getByText("Submit a Configuration"));
    fireEvent.click(screen.getByText("Submit a Part"));
    
    expect(screen.getByText("Part Form")).toBeInTheDocument();
    expect(screen.queryByText("Config Form")).not.toBeInTheDocument();
  });
});
