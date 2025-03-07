import { render } from "@testing-library/react";
import Home from "../../app/page";
import { redirect } from "next/navigation";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should redirect to /assessment when rendered", () => {
    render(<Home />);

    expect(redirect).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledTimes(1);
  });

  it("should redirect to the correct path", () => {
    render(<Home />);

    expect(redirect).toHaveBeenCalledWith("/assessment");
  });
});
