import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Packages from "./pages/Packages";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar";
import Itinerary from "./pages/Itinerary";
import Alerts from "./pages/Alerts";
import AdminItineraries from "./pages/AdminItineraries";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/packages/:destination_id" element={<Packages />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/admin/itineraries" element={<AdminItineraries />} />
      </Routes>
    </Router>
  );
}

export default App;
