import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useContext } from "react";

import Home from "./pages/homePage/homePage";
import Login from "./pages/loginPage/loginPage";
import Profile from "./pages/profilePage/profilePage";
import AppNavbar from "./pages/navbar/navbar";
import Footer from "./pages/footer/footer";
import EditImage from "./pages/editImage/editImage";
import JobDescription from "./pages/fullJobInformation/fullJobInformation";
import JobListings from "./pages/jobListingPage/jobListingsPage";

import { AuthContext } from "./context/authContext";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

function App() {
  const { token, userId, isLoggedIn } = useContext(AuthContext);
  const [logged, setLogged] = useState(false);
  console.log("app.js", token, userId, isLoggedIn);

  useEffect(() => {
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [token, userId]);

  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/editimage"
          element={isLoggedIn ? <EditImage /> : <Navigate to="/login" />}
        />
        <Route
          path="/fullJobDescription"
          element={isLoggedIn ? <JobDescription /> : <Navigate to="/login" />}
        />

        <Route
          path="/job-listings"
          element={isLoggedIn ? <JobListings /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
