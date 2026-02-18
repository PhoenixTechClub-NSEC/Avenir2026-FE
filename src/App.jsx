import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Team from "./components/Team";
import Loader from "./components/Loader";
import Phone_loader from "./components/Phone_loader";
import EventPage from "./components/EventPage";
import Cam_Rep from "./components/Cam_Rep";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // match loader video length

    return () => clearTimeout(timer);
  }, []);

  if (loading) return isSmallScreen ? <Phone_loader /> : <Loader />;
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/campus_rep" element={<Cam_Rep />} />
      </Routes>
    </>
  );
};

export default App;
