import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useContext } from "react";

import Home from "./pages/homePage/homePage";
import Login from "./pages/loginPage/loginPage";
import Profile from "./pages/profilePage/profilePage";
import AppNavbar from "./pages/navbar/navbar";
import Footer from "./pages/footer/footer";
import EditImage from "./pages/editImage/editImage";

import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/authHook";
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
    <>
      <AppNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={logged ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/editimage"
            element={logged ? <EditImage /> : <Navigate to="/login" />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editimage" element={<EditImage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
