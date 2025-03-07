"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors = { username: "", password: "" };
    let isValid = true;

    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear general error

    if (validateForm()) {
      // Existing login logic
      try {
        const success = login(username, password);
        if (success) {
          router.push("/admin");
        } else {
          setError("Invalid credentials");
        }
      } catch (err) {
        setError("Invalid username or password");
      }
    }
  };

  const handleInputChange = (field: "username" | "password", value: string) => {
    // Clear field-specific error when user types
    setErrors((prev) => ({ ...prev, [field]: "" }));
    // Clear general error
    setError("");

    // Update field value
    if (field === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Username"
                value={username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
              {errors.username && (
                <div className="text-red-500 text-xs mt-1 absolute">
                  {errors.username}
                </div>
              )}
            </div>
            <div className="mt-6">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              {errors.password && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.password}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
