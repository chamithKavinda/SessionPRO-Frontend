import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomePage from "./pages/WelcomePage";
import AuthPage from "./pages/AuthPage"; 
import AdminDashboard from "./pages/admin/AdminDashboardPage";
import AdminSessionsPage from "./pages/admin/AdminSessionsPage";
import AdminSpeakersPage from "./pages/admin/AdminSpeakersPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminMySessionPage from "./pages/admin/AdminMySessionPage";
import ProtectedRoute from "./components/ProtectedRoute";  
import { useDispatch } from "react-redux";
import { login } from "./reducer/auth-reducer"; 
import UserDashboard from "./pages/user/UserDashboard";
import UserSessionsPage from "./pages/user/UserSessionsPage";
import UserMySessionPage from "./pages/user/UserMySessionPage";
import UserSpeakerPage from "./pages/user/UserSpeakerPage";

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
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminsessions"
          element={
            <ProtectedRoute>
              <AdminSessionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminspeakers"
          element={
            <ProtectedRoute>
              <AdminSpeakersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminusers"
          element={
            <ProtectedRoute>
              <AdminUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminmy-sessions"
          element={
            <ProtectedRoute>
              <AdminMySessionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute>
              <UserDashboard/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/usersessions"
          element={
            <ProtectedRoute>
              <UserSessionsPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/userspeakers"
          element={
            <ProtectedRoute>
              <UserSpeakerPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermy-sessions"
          element={
            <ProtectedRoute>
              <UserMySessionPage/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;