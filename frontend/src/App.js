import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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
<<<<<<< HEAD
import Team from "./components/team";
=======
import axios from "axios";
axios.defaults.withCredentials = true;


>>>>>>> 7c535714f1f62a6ab6bf528a9bcf2722f7962376
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
    location.pathname === "/" || location.pathname === "/profile" || location.pathname === "/topics";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<SignInCard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/topics" element={<Skills />} /> 
        <Route path="/tutors" element={<Tutors />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
