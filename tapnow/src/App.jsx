import { useSelector } from "react-redux";
import "./App.css";
import Analytics from "./Pages/Analytics";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profileedit from "./Pages/Profileedit";
import Register from "./Pages/Register";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
// import ProtectedRoute from './ProtectedRoute'
import Settings from "./Pages/Settings";
import { setAuth } from "./Redux/Authslice";
import { useEffect } from "react";
import Shop from "./Pages/Shop";
import Orders from "./Pages/Orders";
import Dashboard from "./Pages/Dashboard";

function App() {
  let currentUser = localStorage.getItem("tapNowUid");

  const isAuth = useSelector((state) => state.authHandeler.isAuthenticated);

  useEffect(() => {
    setAuth(currentUser);
  }, []);

  const RequireAuth = ({ children }) => {
    return isAuth ? children : <Navigate to="/" />;
  };

  const RequireAuthlogin = ({ children }) => {
    return !isAuth ? children : <Navigate to="/home" />;
  };

  return (
    <div className="select-none" style={{ fontFamily: "Poppins, sans-serif" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/profileedit"
            element={
              <RequireAuth>
                <Profileedit />
              </RequireAuth>
            }
          />
          <Route
            path="/contacts"
            element={
              <RequireAuth>
                <Contact />
              </RequireAuth>
            }
          />
          <Route
            path="/analytics"
            element={
              <RequireAuth>
                <Analytics />
              </RequireAuth>
            }
          />
          <Route
            path="/shop"
            element={
              <RequireAuth>
                <Shop />
              </RequireAuth>
            }
          />
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Settings userId={currentUser} />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
