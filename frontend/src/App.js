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
import Team from "./components/team";
import EditProfile from "./components/editProfile";
import axios from "axios";
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div style={{
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 2s linear infinite'
        }} />
      </div>
    ); // or some other loading state if desired
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
<<<<<<< HEAD
    location.pathname === "/topics" ||
    location.pathname === "/edit-profile";
=======
    location.pathname === "/tutors" ||
    location.pathname === "/topics";
>>>>>>> aa6a629535dd32d45e850c4528c63bf625ce0b8d

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
