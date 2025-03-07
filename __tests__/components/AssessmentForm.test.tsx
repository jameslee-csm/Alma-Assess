import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import AssessmentForm from "../../app/components/AssessmentForm";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={props.src} alt={props.alt} />;
  },
}));

// Mock fetch API
global.fetch = jest.fn();

describe("AssessmentForm", () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
  });

  it("renders the form correctly", () => {
    render(<AssessmentForm />);

    // Check for form elements
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Country of Citizenship")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("LinkedIn / Personal Website URL")
    ).toBeInTheDocument();

    // Check for visa options
    expect(screen.getByText("O-1")).toBeInTheDocument();
    expect(screen.getByText("EB-1A")).toBeInTheDocument();
    expect(screen.getByText("EB-2 NIW")).toBeInTheDocument();
    expect(screen.getByText("I don't know")).toBeInTheDocument();

    // Check for help text area
    expect(
      screen.getByPlaceholderText(/What is your current immigration status/)
    ).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("updates form values when user inputs data", async () => {
    render(<AssessmentForm />);

    // Fill out the form
    await userEvent.type(screen.getByPlaceholderText("First Name"), "John");
    await userEvent.type(screen.getByPlaceholderText("Last Name"), "Doe");
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "john.doe@example.com"
    );

    // Select country
    const countrySelect = screen.getByRole("combobox");
    await userEvent.selectOptions(countrySelect, "United States");

    await userEvent.type(
      screen.getByPlaceholderText("LinkedIn / Personal Website URL"),
      "https://linkedin.com/in/johndoe"
    );

    // Check visa options
    await userEvent.click(screen.getByLabelText("O-1"));

    // Fill help text
    await userEvent.type(
      screen.getByPlaceholderText(/What is your current immigration status/),
      "I'm currently on an F-1 visa and looking to transition to work in the US."
    );

    // Verify values
    expect(screen.getByPlaceholderText("First Name")).toHaveValue("John");
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue("Doe");
    expect(screen.getByPlaceholderText("Email")).toHaveValue(
      "john.doe@example.com"
    );
    expect(screen.getByLabelText("O-1")).toBeChecked();
  });

  it("submits the form successfully", async () => {
    render(<AssessmentForm />);

    // Fill out required fields
    await userEvent.type(screen.getByPlaceholderText("First Name"), "John");
    await userEvent.type(screen.getByPlaceholderText("Last Name"), "Doe");
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "john.doe@example.com"
    );

    // Select country
    const countrySelect = screen.getByRole("combobox");
    await userEvent.selectOptions(countrySelect, "United States");

    await userEvent.type(
      screen.getByPlaceholderText("LinkedIn / Personal Website URL"),
      "https://linkedin.com/in/johndoe"
    );

    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    // Check that fetch was called with the right data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: expect.stringContaining('"firstName":"John"'),
      });
    });

    // Check for success message
    await waitFor(() => {
      expect(
        screen.getByText(
          "Your assessment request has been submitted successfully!"
        )
      ).toBeInTheDocument();
    });
  });

  it("displays error message on submission failure", async () => {
    // Mock fetch to return an error
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({
        error: "Something went wrong. Please try again.",
      }),
    });

    render(<AssessmentForm />);

    // Fill out required fields
    await userEvent.type(screen.getByPlaceholderText("First Name"), "John");
    await userEvent.type(screen.getByPlaceholderText("Last Name"), "Doe");
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "john.doe@example.com"
    );

    // Select country
    const countrySelect = screen.getByRole("combobox");
    await userEvent.selectOptions(countrySelect, "United States");

    await userEvent.type(
      screen.getByPlaceholderText("LinkedIn / Personal Website URL"),
      "https://linkedin.com/in/johndoe"
    );

    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    // Check for error message
    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("displays validation errors from the server", async () => {
    // Mock fetch to return validation errors
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({
        errors: [{ field: "email", message: "Invalid email format" }],
      }),
    });

    render(<AssessmentForm />);

    // Fill out required fields with invalid data
    await userEvent.type(screen.getByPlaceholderText("First Name"), "John");
    await userEvent.type(screen.getByPlaceholderText("Last Name"), "Doe");
    await userEvent.type(screen.getByPlaceholderText("Email"), "invalid-email");

    // Select country
    const countrySelect = screen.getByRole("combobox");
    await userEvent.selectOptions(countrySelect, "United States");

    await userEvent.type(
      screen.getByPlaceholderText("LinkedIn / Personal Website URL"),
      "https://linkedin.com/in/johndoe"
    );

    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    // Check for validation error message
    await waitFor(() => {
      expect(
        screen.getByText(/Please correct the following errors/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/email: Invalid email format/)
      ).toBeInTheDocument();
    });
  });

  it("handles network errors during submission", async () => {
    // Mock fetch to throw an error
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    render(<AssessmentForm />);

    // Fill out required fields
    await userEvent.type(screen.getByPlaceholderText("First Name"), "John");
    await userEvent.type(screen.getByPlaceholderText("Last Name"), "Doe");
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "john.doe@example.com"
    );

    // Select country
    const countrySelect = screen.getByRole("combobox");
    await userEvent.selectOptions(countrySelect, "United States");

    await userEvent.type(
      screen.getByPlaceholderText("LinkedIn / Personal Website URL"),
      "https://linkedin.com/in/johndoe"
    );

    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    // Check for network error message
    await waitFor(() => {
      expect(
        screen.getByText(
          "Connection error. Please check your internet connection and try again."
        )
      ).toBeInTheDocument();
    });
  });

  it("resets form after successful submission", async () => {
    render(<AssessmentForm />);

    // Fill out required fields
    await userEvent.type(screen.getByPlaceholderText("First Name"), "John");
    await userEvent.type(screen.getByPlaceholderText("Last Name"), "Doe");
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "john.doe@example.com"
    );

    // Select country
    const countrySelect = screen.getByRole("combobox");
    await userEvent.selectOptions(countrySelect, "United States");

    await userEvent.type(
      screen.getByPlaceholderText("LinkedIn / Personal Website URL"),
      "https://linkedin.com/in/johndoe"
    );

    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    // Check that form was reset
    await waitFor(() => {
      expect(screen.getByPlaceholderText("First Name")).toHaveValue("");
      expect(screen.getByPlaceholderText("Last Name")).toHaveValue("");
      expect(screen.getByPlaceholderText("Email")).toHaveValue("");
      expect(
        screen.getByPlaceholderText("LinkedIn / Personal Website URL")
      ).toHaveValue("");
    });
  });
});
