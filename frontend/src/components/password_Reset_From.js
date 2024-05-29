import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/tutorium-favicon-color.png";

const PasswordResetPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    );
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    try {
      // Add password confirmation validation
      if (newPassword !== confirmPassword) {
        setLocalError("Passwords do not match");
        return;
      }

      // Add strong password validation
      if (!isStrongPassword(newPassword)) {
        setLocalError(
          "Password must be at least 8 characters long, include uppercase and lowercase letters, a digit, and a special character."
        );
        return;
      }

      await axios.post(`http://localhost:5000/reset-password/${token}`, {
        newPassword,
      });
      setSuccessMessage("Password reset successful!");
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.error
        : "Failed to reset password";
      setLocalError(errorMsg);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="flex items-center space-x-3 rtl:space-x-reverse mb-2"
        >
          <img src={logo} className="h-10" alt="Tutorium Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Tutorium
          </span>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Password Reset
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleResetPassword}
            >
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:border-primary-600"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:border-primary-600"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              {localError && (
                <p className="text-sm text-red-500">{localError}</p>
              )}
              {successMessage && (
                <div>
                  <p className="text-sm text-green-500 mb-2">
                    {successMessage}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Back to Login
                  </button>
                </div>
              )}
              {!successMessage && (
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Reset Password
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordResetPage;
