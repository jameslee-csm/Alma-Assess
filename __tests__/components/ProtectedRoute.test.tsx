import { render, screen } from "@testing-library/react";
import { useAuth } from "../../app/context/AuthContext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../app/components/ProtectedRoute";

// Mock the modules
jest.mock("../../context/AuthContext");
jest.mock("next/navigation");

describe("ProtectedRoute", () => {
  const mockUseAuth = useAuth as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockPush = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ push: mockPush });
  });

  it("renders children when user is authenticated", () => {
    // Mock authenticated state
    mockUseAuth.mockReturnValue({ isAuthenticated: true });

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("redirects to login page when user is not authenticated", () => {
    // Mock unauthenticated state
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
