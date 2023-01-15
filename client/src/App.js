import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./pages/loginPage";
import Profile from "./pages/profilePage";
import AppNavbar from "./pages/navbar";
import Footer from "./pages/footer";


import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/authHook";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

function App() {
  const { token, login, logout, userId } = useAuth();

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
          <Route path="/" element={<h1>HomePage</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
