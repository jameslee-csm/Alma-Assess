import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../app/context/AuthContext";
import Login from "../../app/components/Login";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the AuthContext
jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Login Component", () => {
  const mockPush = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    // Setup router mock
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // Setup auth mock
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    render(<Login />);

    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors for empty fields", async () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Username is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  test("shows validation error for short username", async () => {
    render(<Login />);

    const usernameInput = screen.getByPlaceholderText("Username");
    fireEvent.change(usernameInput, { target: { value: "ab" } });

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Username must be at least 3 characters")
    ).toBeInTheDocument();
  });

  test("shows validation error for short password", async () => {
    render(<Login />);

    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "12345" } });

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Password must be at least 6 characters")
    ).toBeInTheDocument();
  });

  test("successful login redirects to admin page", async () => {
    mockLogin.mockResolvedValueOnce(true);

    render(<Login />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "validuser" } });
    fireEvent.change(passwordInput, { target: { value: "validpassword" } });

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("validuser", "validpassword");
      expect(mockPush).toHaveBeenCalledWith("/admin");
    });
  });

  test("shows error message on failed login", async () => {
    mockLogin.mockResolvedValueOnce(false);

    render(<Login />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "invaliduser" } });
    fireEvent.change(passwordInput, { target: { value: "invalidpassword" } });

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });

  test("clears errors when user types", async () => {
    render(<Login />);

    // First trigger an error
    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Username is required")).toBeInTheDocument();

    // Type in the username field
    const usernameInput = screen.getByPlaceholderText("Username");
    fireEvent.change(usernameInput, { target: { value: "test" } });

    // Error should be cleared
    expect(screen.queryByText("Username is required")).not.toBeInTheDocument();
  });
});
