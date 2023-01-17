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
import Signup from "./pages/signupPage/signupPage";
import EditEduList from "./pages/editEducation/editEducationList";
import EditEdu from "./pages/editEducation/editEducation";
import EditExpList from "./pages/editExperience/editExperienceList";
import EditExp from "./pages/editExperience/editExperience";
import EditLink from "./pages/editLink/editLink";

import { AuthContext } from "./context/authContext";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import CreateEditExp from "./pages/loginPage/CreateEditExp";

function App() {
  const { token, userId, isLoggedIn } = useContext(AuthContext);
  const [logged, setLogged] = useState(false);
  console.log("app.js", token, userId, isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Home />} />
        {logged && (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/editimage" element={<EditImage />} />
            <Route path="/editedulist" element={<EditEduList />} />
            <Route path="/editedu/:eid" element={<EditEdu />} />
            <Route path="/editexplist" element={<EditExpList />} />
            <Route path="/editexp/:eid" element={<EditExp />} />
            <Route path="/editlink" element={<EditLink />} />
            <Route path="/fullJobDescription" element={<JobDescription />} />
            <Route path="/job-listings" element={<JobListings />} />
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;