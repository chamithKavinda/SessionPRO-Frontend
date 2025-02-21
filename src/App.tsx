import {} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomePage from "./pages/WelcomePage";
import AuthPage from "./pages/AuthPage"; 
import Dashboard from "./pages/DashboardPage";
import SessionsPage from "./pages/SessionsPage";
import SpeakersPage from "./pages/SpeakersPage";
import UserPage from "./pages/UserPage";
import MySessionPage from "./pages/MySessionPage";

const App = () => {
  return (
    <Router>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/my-sessions" element={<MySessionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
