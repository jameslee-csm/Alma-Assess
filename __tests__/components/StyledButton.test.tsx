import { render, screen, fireEvent } from "@testing-library/react";
import StyledButton from "../../app/components/StyledButton";

describe("StyledButton Component", () => {
  it("renders correctly with default props", () => {
    render(<StyledButton>Click me</StyledButton>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    render(<StyledButton className="custom-class">Click me</StyledButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<StyledButton onClick={handleClick}>Click me</StyledButton>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<StyledButton disabled>Click me</StyledButton>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
