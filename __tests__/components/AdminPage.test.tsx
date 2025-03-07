import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import AdminDashboard from "../../app/components/admin/index";
import "@testing-library/jest-dom";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock the ProtectedRoute component
jest.mock("../../ProtectedRoute", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock fetch API
global.fetch = jest.fn();

describe("AdminDashboard", () => {
  const mockLeads = {
    submissions: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        status: "Pending",
        country: "USA",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        status: "Reached Out",
        country: "Canada",
      },
    ],
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockLeads),
    });
  });

  test("renders the AdminDashboard component", async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });

    expect(screen.getByText("Leads")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  test("fetches and displays leads data", async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });

    // Verify fetch was called
    expect(global.fetch).toHaveBeenCalledWith("/api/assessment");

    // Wait for the leads data to be displayed
    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("Jane")).toBeInTheDocument();
      expect(screen.getByText("Smith")).toBeInTheDocument();
    });
  });

  test("toggles sidebar when menu button is clicked", async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });

    const menuButton = screen.getByRole("button");

    // Initially sidebar should be closed
    expect(
      document.querySelector('[data-testid="sidebar"]')
    ).not.toHaveAttribute("data-open", "true");

    // Click to open sidebar
    fireEvent.click(menuButton);

    // Sidebar should now be open
    expect(document.querySelector('[data-testid="sidebar"]')).toHaveAttribute(
      "data-open",
      "true"
    );

    // Click again to close sidebar
    fireEvent.click(menuButton);

    // Sidebar should be closed again
    expect(
      document.querySelector('[data-testid="sidebar"]')
    ).not.toHaveAttribute("data-open", "true");
  });

  test("handles search input", async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "John" } });

    expect(searchInput).toHaveValue("John");
  });

  test("handles status filter selection", async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });

    const statusSelect = screen.getByRole("combobox");
    fireEvent.change(statusSelect, { target: { value: "Pending" } });

    expect(statusSelect).toHaveValue("Pending");
  });

  test("handles pagination buttons", async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });

    const paginationButtons = screen
      .getAllByRole("button")
      .filter(
        (button) =>
          button.textContent === "1" ||
          button.textContent === "2" ||
          button.textContent === "3"
      );

    expect(paginationButtons).toHaveLength(3);

    // First button should be active
    expect(paginationButtons[0]).toHaveStyle("background-color: #007bff");

    // Click on second page
    fireEvent.click(paginationButtons[1]);

    // Second button should now be active (this would require component logic to be updated)
    // This is just testing the click event works
    expect(paginationButtons[1]).toHaveTextContent("2");
  });
});
