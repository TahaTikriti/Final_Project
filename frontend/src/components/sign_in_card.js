import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/tutorium-favicon-color.png";

const SignInCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        EMAIL: email,
        PASSWORD: password,
      });
      setOtpSent(true);
      alert("OTP sent to your email!");
      setLocalError("");
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.message
        : error.message;
      setLocalError("Failed to login: " + errorMsg);
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/verify-login-otp",
        {
          EMAIL: email,
          otp,
        }
      );
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.message
        : error.message;
      setLocalError("Failed to verify OTP: " + errorMsg);
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleResetPasswordRequest = async () => {
    try {
      await axios.post("http://localhost:5000/reset-password-request", {
        email: email, // Send the email to backend for password reset
      });
      alert("Password reset link sent to your email!");
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.message
        : error.message;
      setLocalError("Failed to send password reset link: " + errorMsg);
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
              {otpSent ? "Verify OTP" : "Sign in to your account"}
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={otpSent ? handleOtpSubmit : handleLoginSubmit}
            >
              {!otpSent ? (
                <>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:border-primary-600"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:border-primary-600"
                      required
                      placeholder="••••••••"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:border-primary-600"
                    required
                    placeholder="Enter your OTP"
                  />
                </div>
              )}
              {localError && (
                <p className="text-sm text-red-500">{localError}</p>
              )}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {otpSent ? "Verify OTP" : "Sign in"}
              </button>
              {!otpSent && (
                <button
                  type="button"
                  onClick={handleResetPasswordRequest} // Handle password reset request
                  className="text-sm text-primary-500 hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </form>
            {!otpSent && (
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <button
                  type="button"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInCard;
