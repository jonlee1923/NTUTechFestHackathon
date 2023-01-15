import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import Home from "./pages/homePage";
import Login from "./pages/loginPage";
import Profile from "./pages/profilePage";
import AppNavbar from "./pages/navbar";
import Footer from "./pages/footer";
import EditImage from "./pages/editImage";

import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/authHook";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

function App() {
  const { token, login, logout, userId } = useAuth();
  const [logged,setLogged] = useState(false);
  console.log("app.js", token, userId, logged);

  useEffect(()=>{
    if(token){
        setLogged(true);
    }
    else{
        setLogged(false);
    }
  },[token,userId]);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token, // !! converts to true and false
        token: token, //need token to send request in the app
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <AppNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route
            path="/profile"
            element={logged ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/editimage"
            element={logged ? <EditImage /> : <Navigate to="/" />}
          /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/editimage" element={<EditImage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
