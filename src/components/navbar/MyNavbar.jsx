// import React from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// import "./MyNavbar.css";
// import { useDispatch } from "react-redux";
// import { logout } from "../reduxComp/actions";
// import { useNavigate } from "react-router-dom";
// import { useExpenseContext } from "../reduxComp/ExpenseContext";
// import { useThemeContext } from "../reduxComp/ThemeContext";

// const MyNavbar = () => {
//    const dispatch = useDispatch();
//    const navigate = useNavigate();
//    const { handlePremium } = useExpenseContext();
//    const { theme, toggleTheme } = useThemeContext();

//    const handleLogout = () => {
//       localStorage.removeItem("token");
//       dispatch(logout());
//       navigate("/signup");
//    };

//    const token = localStorage.getItem("token");
//    const parseJwt = (token) => {
//       try {
//          return JSON.parse(atob(token.split(".")[1]));
//       } catch (e) {
//          return null;
//       }
//    };
//    let isPremium = false;
//    if (token) {
//       const decodeToken = parseJwt(token);
//       isPremium = decodeToken.ispremiumuser;
//    }

//    return (
//       <Navbar className={`navbar ${theme}`} expand="lg" sticky="top">
//          <Container fluid>
//             <Navbar.Brand as={NavLink} to="/home" className="navbar-brand">
//                Khata
//             </Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//                <Nav className="me-auto">
//                   <Nav.Link as={NavLink} to="/home">
//                      Home
//                   </Nav.Link>
//                   <Nav.Link as={NavLink} to="/allexpenses">
//                      Expenses
//                   </Nav.Link>
//                   <Nav.Link as={NavLink} to="/about">
//                      About Us
//                   </Nav.Link>
//                   <Nav.Link as={NavLink} to="/contact">
//                      Contact Us
//                   </Nav.Link>
//                </Nav>
//                <Nav className="ms-auto">
//                   <Nav.Link onClick={toggleTheme} className="toggle">
//                      {/* Theme Toggle Icon */}
//                      <svg fill="#ffffff" width="30px" height="34px" viewBox="0 0 35 35">
//                         <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z"></path>
//                      </svg>
//                   </Nav.Link>
//                   {/* Conditional Premium Button */}
//                   {!isPremium && (
//                      <Nav.Link className="premium-button" onClick={handlePremium}>
//                         Activate Premium
//                      </Nav.Link>
//                   )}
//                   <Nav.Link as={NavLink} to="/login" className="logout-link" onClick={handleLogout}>
//                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
//                   </Nav.Link>
//                </Nav>
//             </Navbar.Collapse>
//          </Container>
//       </Navbar>
//    );
// };

// export default MyNavbar;
import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faCrown } from "@fortawesome/free-solid-svg-icons"; // Added crown icon
import "./MyNavbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../reduxComp/actions";
import { useNavigate } from "react-router-dom";
import { useExpenseContext } from "../reduxComp/ExpenseContext";
import { useThemeContext } from "../reduxComp/ThemeContext";

const MyNavbar = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { handlePremium } = useExpenseContext();
   const { theme, toggleTheme } = useThemeContext();

   const handleLogout = () => {
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/signup");
   };

   const token = localStorage.getItem("token");
   const parseJwt = (token) => {
      try {
         return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
         return null;
      }
   };
   let isPremium = false;
   if (token) {
      const decodeToken = parseJwt(token);
      isPremium = decodeToken.ispremiumuser;
   }

   return (
      <Navbar className={`navbar ${theme}`} expand="lg" sticky="top">
         <Container fluid>
            <Navbar.Brand as={NavLink} to="/home" className="navbar-brand">
               Khata
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Nav.Link as={NavLink} to="/home">
                     Home
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/allexpenses">
                     Expenses
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/about">
                     About Us
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/contact">
                     Contact Us
                  </Nav.Link>
               </Nav>
               <Nav className="ms-auto">
                  <Nav.Link onClick={toggleTheme} className="toggle">
                     {/* Theme Toggle Icon */}
                     <svg fill="#ffffff" width="30px" height="34px" viewBox="0 0 35 35">
                        <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z"></path>
                     </svg>
                  </Nav.Link>
                  {/* Premium Status Indicator */}
                  {isPremium ? (
                     <Nav.Link className="premium-label" disabled>
                        <FontAwesomeIcon icon={faCrown} className="me-1" />
                        Premium
                     </Nav.Link>
                  ) : (
                     <Nav.Link className="premium-button" onClick={handlePremium}>
                        Activate Premium
                     </Nav.Link>
                  )}
                  <Nav.Link as={NavLink} to="/login" className="logout-link" onClick={handleLogout}>
                     <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default MyNavbar;