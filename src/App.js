// require("dotenv").config();
import "./App.css";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
   BrowserRouter as Router,
   Route,
   Routes,
   
   useLocation,
} from "react-router-dom";

import Login from "./components/login/login";
import Home from "./components/home/home";
import ContactUs from "./components/contact/contact";
import About from "./components/about/about";
import Signup from "./components/signup/signup";
import Allexpense from "./components/allexpense/AllExpenses";
import Forget from "./components/forget/forget";
import ResetP from "./components/forget/resetp";
import MyNavbar from "./components/navbar/MyNavbar";
import Footer from "./components/footer/Footer";
import { useThemeContext } from "./components/reduxComp/ThemeContext";


const AppContent = () => {
   const token = localStorage.getItem("token");
   const location = useLocation();
   const { theme } = useThemeContext();

   useEffect(() => {
      if (
         !token && !["/login","/signup","/forgetpassword", `/resetpassword/${location.pathname.split("/").pop()}`,].includes(location.pathname)) { window.location.href = "/login";}
   }, [token, location]);

   const shouldShowNavbar = ![
      "/login",
      "/signup",
      "/forgetpassword",
      `/resetpassword/${location.pathname.split("/").pop()}`,
   ].includes(location.pathname);

   return (
      <>
         {shouldShowNavbar && <MyNavbar />}
         <div className={`app-container ${theme}`}>
            <Routes>
               <Route path="/signup" element={<Signup />} />
               <Route path="/home" element={<Home />} />
               <Route path="/" element={<Home />} />
               <Route path="/contact" element={<ContactUs />} />
               <Route path="/about" element={<About />} />
               <Route path="/login" element={<Login />} />
               <Route path="/allexpenses" element={<Allexpense />} />
               <Route path="/forgetpassword" element={<Forget />} />
               <Route path="/resetpassword/:uuid" element={<ResetP />} />
               {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            </Routes>
         </div>
         <Footer />
      </>
   );
};

const App = () => {
   return (
      
      <Router>
         <AppContent />
      </Router>
     
   );
};

export default App;
