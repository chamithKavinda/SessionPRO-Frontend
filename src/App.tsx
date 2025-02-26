import React, { useEffect } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute";  
import { useDispatch } from "react-redux";
import { login } from "./reducer/auth-reducer"; 

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sessions"
          element={
            <ProtectedRoute>
              <SessionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/speakers"
          element={
            <ProtectedRoute>
              <SpeakersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-sessions"
          element={
            <ProtectedRoute>
              <MySessionPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;