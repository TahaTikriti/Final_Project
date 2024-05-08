import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/tutorium-favicon-color.png";

const SignInCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // On component mount, check if we have a token and email stored
    const storedToken = sessionStorage.getItem("authToken");
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedToken && storedEmail) {
      // Update state to reflect logged-in status
      setLoggedInEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        EMAIL: email,
        PASSWORD: password,
      });

      // Extract token and email (adjust based on your backend's response structure)
      const { token, userEmail } = response.data;

      // Store the token and email in sessionStorage
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("userEmail", userEmail);

      // Update state to reflect logged-in status
      setLoggedInEmail(userEmail);

      alert("Login successful!");
      navigate("/"); // Redirect to home after successful login
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.message
        : error.message;
      setLocalError("Failed to login: " + errorMsg);
    }
  };

  const handleSignUp = () => {
    navigate("/register"); // Redirect to the Register component
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/"); // Home link should also be handled properly
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
              {loggedInEmail
                ? `Welcome, ${loggedInEmail}!`
                : "Sign in to your account"}
            </h1>
            {!loggedInEmail && (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    placeholder="••••••••"
                  />
                </div>
                {localError && (
                  <p className="text-sm text-red-500">{localError}</p>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
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
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInCard;
