import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "flowbite";
import Header from "./components/header";
import HeroSection from "./components/hero_section";
import SignInCard from "./components/sign_in_card";
import RegisterForm from "./components/registerForm";
import ProfilePage from "./components/profile_page";
import Skills from "./components/skills";
import Tutors from "./components/tutors";
import Footer from "./components/footer";
import axios from "axios";
import Team from "./components/team";

axios.defaults.withCredentials = true;

const ProtectedRoute = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/session");
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error("Authentication check failed", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or some other loading state if desired
  }

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const showHeader =
    location.pathname === "/" ||
    location.pathname === "/profile" ||
    location.pathname === "/topics";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<SignInCard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/profile"
          element={<ProtectedRoute component={ProfilePage} />}
        />
        <Route path="/topics" element={<Skills />} />
        <Route path="/tutors" element={<Tutors />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
