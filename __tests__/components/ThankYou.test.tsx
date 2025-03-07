import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ThankYou from "../../app/components/ThankYou";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img src={props.src} alt={props.alt} />;
  },
}));

// Mock the Notice image import
jest.mock("../assets/notice.png", () => "notice-image-mock");

describe("ThankYou Component", () => {
  beforeEach(() => {
    // Mock window.location.href
    Object.defineProperty(window, "location", {
      value: { href: "" },
      writable: true,
    });
  });

  it("renders the notice image", () => {
    render(<ThankYou />);
    const image = screen.getByAltText("notice");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "notice-image-mock");
  });

  it("displays the thank you message", () => {
    render(<ThankYou />);
    expect(
      screen.getByText(
        /Your information was submitted to our team of immigration attorneys/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Expect an email from hello@tryalma.ai/i)
    ).toBeInTheDocument();
  });

  it("navigates back to assessment page when back button is clicked", () => {
    render(<ThankYou />);
    const backButton = screen.getByText("Go Back to Homepage");

    fireEvent.click(backButton);

    expect(window.location.href).toBe("/assessment");
  });
});
