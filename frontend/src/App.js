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
import UserProfile from "./components/UserProfile";
import PasswordResetPage from "./components/password_Reset_From";
import axios from "axios";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import Introduction from "./components/introduction";
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
       <div className="spinner">
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
       </div>
       <style jsx>{`
         .spinner {
           width: 44.8px;
           height: 44.8px;
           animation: spinner-y0fdc1 2s infinite ease;
           transform-style: preserve-3d;
         }

         .spinner > div {
           background-color: rgba(59, 130, 246, 0.2);
           height: 100%;
           position: absolute;
           width: 100%;
           border: 2.2px solid #3b82f6;
         }

         .spinner div:nth-of-type(1) {
           transform: translateZ(-22.4px) rotateY(180deg);
         }

         .spinner div:nth-of-type(2) {
           transform: rotateY(-270deg) translateX(50%);
           transform-origin: top right;
         }

         .spinner div:nth-of-type(3) {
           transform: rotateY(270deg) translateX(-50%);
           transform-origin: center left;
         }

         .spinner div:nth-of-type(4) {
           transform: rotateX(90deg) translateY(-50%);
           transform-origin: top center;
         }

         .spinner div:nth-of-type(5) {
           transform: rotateX(-90deg) translateY(50%);
           transform-origin: bottom center;
         }

         .spinner div:nth-of-type(6) {
           transform: translateZ(22.4px);
         }

         @keyframes spinner-y0fdc1 {
           0% {
             transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
           }
           50% {
             transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
           }
           100% {
             transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
           }
         }
       `}</style>
     </div>
   );
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
    location.pathname === "/edit-profile" ||
    location.pathname === "/tutors" ||
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
        <Route path="/team" element={<Team />} />
        {/* Add the route for password reset */}
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path="/view-profile/:userEmail" element={<UserProfile />} />
      </Routes>
      <Introduction />
      <Footer />
    </>
  );
};

export default App;
