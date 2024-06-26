import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/tutorium-favicon-color.png";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [university, setUniversity] = useState("");
  const [gender, setGender] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track whether OTP has been sent
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isPasswordStrong = (password) => {
    const regex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return regex.test(password);
  };
  const handleRegistration = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!isPasswordStrong(password)) {
      setError(
        "Password must be at least 8 characters long and include upper and lower case letters, numbers, and special characters."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        EMAIL: email,
        PASSWORD: password,
        FULL_NAME: fullName,
        UNIVERSITY_NAME: university,
        PHONE_NUMBER: phoneNumber,
        GENDER: gender,
      });
      setOtpSent(true);
      setError("");
      alert("OTP sent to your email. Please verify to complete registration.");
    } catch (error) {
      setError(
        "Failed to register: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        EMAIL: email,
        otp: otp,
      });
      alert("Verification successful!");
      navigate("/");
    } catch (error) {
      setError(
        "Failed to verify OTP: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center min-h-screen p-10">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse mb-4"
          >
            <img src={logo} className="h-12" alt="Tutorium Logo" />
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
              Tutorium
            </span>
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-8 space-y-6 md:space-y-8 sm:p-10">
              {!otpSent ? (
                <>
                  <div className="flex justify-center">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                      Create an account
                    </h1>
                  </div>

                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleRegistration}
                  >
                    <div className="flex flex-col">
                      <label
                        htmlFor="full-name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="full-name"
                        id="full-name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-gray-900 dark:text-white">
                        Gender:
                      </span>
                      <div className="flex mt-2">
                        <label
                          htmlFor="male"
                          className="ml-2 inline-flex items-center"
                        >
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            checked={gender === "Male"}
                            onChange={(e) => setGender(e.target.value)}
                            className="accent-primary-600"
                          />
                          <i
                            className="fas fa-mars ml-2 text-lg text-blue-600"
                            title="Male"
                          ></i>{" "}
                          {/* Icon for Male */}
                        </label>
                        <label
                          htmlFor="female"
                          className="ml-4 inline-flex items-center"
                        >
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="Female"
                            checked={gender === "Female"}
                            onChange={(e) => setGender(e.target.value)}
                            className="accent-primary-600"
                          />
                          <i
                            className="fas fa-venus ml-2 text-lg text-pink-600"
                            title="Female"
                          ></i>{" "}
                          {/* Icon for Female */}
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
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
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                    <div className="flex flex-wrap justify-between space-y-4 md:space-y-0 md:flex-nowrap mt-4">
                      <div className="flex flex-col w-full md:w-1/2 pr-2">
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
                      <div className="flex flex-col w-full md:w-1/2">
                        <label
                          htmlFor="confirm-password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Confirm password
                        </label>
                        <input
                          type="password"
                          name="confirm-password"
                          id="confirm-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between space-y-4 md:space-y-0 md:flex-nowrap mt-4">
                      <div className="flex flex-col w-full md:w-1/2 pr-2">
                        <label
                          htmlFor="phone-number"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone-number"
                          id="phone-number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          placeholder="+961 --------"
                        />
                      </div>
                      <div className="flex flex-col w-full md:w-1/2">
                        <label
                          htmlFor="university"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          University
                        </label>
                        <input
                          type="text"
                          name="university"
                          id="university"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          placeholder="Your university"
                        />
                      </div>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Create an account
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <a
                        href=""
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        onClick={() => navigate("/login")} // Update to navigate to login form
                      >
                        Login here
                      </a>
                    </p>
                  </form>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                    Enter OTP
                  </h1>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="OTP"
                    required
                  />
                  <button
                    onClick={verifyOtp}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Verify OTP
                  </button>
                </>
              )}
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
