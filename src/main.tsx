import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
// @ts-ignore
import Team from "./components/Team";
import EventPage from "./components/EventPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<EventPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
