import { render } from "@testing-library/react";
import Home from "../app/page";
import { redirect } from "next/navigation";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    // Clear mock calls between tests
    jest.clearAllMocks();
  });

  it("should redirect to /assessment when rendered", () => {
    render(<Home />);

    // Check if redirect was called
    expect(redirect).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith("/assessment");
  });

  it("should redirect to the correct path", () => {
    render(<Home />);

    // Verify correct redirect path
    expect(redirect).toHaveBeenCalledWith("/assessment");
  });
});
