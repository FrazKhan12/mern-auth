import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.js";
import Home from "./pages/Home/index.js";
import Register from "./pages/auth/Register.js";
import Login from "./pages/auth/Login.js";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./components/PublicRoute.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import UserDashboard from "./pages/User/userDashboard.js";
import { useSelector } from "react-redux";
import AdminDashboard from "./pages/Admin/adminDashboard.js";
import SingleUserScreen from "./pages/Admin/singleUserScreen.js";
import Pagination from "./pages/Pagination/index.js";

function App() {
  const { loading } = useSelector((state) => state.loading);
  return (
    <div>
      <BrowserRouter>
        {loading && (
          <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="border-t-4 border-blue-500 rounded-full w-12 h-12 border-t-blue-500 animate-spin"></div>
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/user-screen/:id" element={<SingleUserScreen />} />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/pagination"
            element={
              <ProtectedRoute>
                <Pagination />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
