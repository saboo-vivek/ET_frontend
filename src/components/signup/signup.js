import { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";


export default function Signup() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   
   const navigate = useNavigate();
   const BASE_URL=process.env.REACT_APP_BACKEND_API;

   const handleSignUp = async (e) => {
      e.preventDefault();
      try {
         
         const res = await axios.post(`${BASE_URL}/signup`, {
            name,
            email,
            password,
         });
         
         setName("");
         setEmail("");
         setPassword("");
         navigate("/login");
      } catch (error) {
         if (error.response) {
            alert(error.response.data.error);
            setError(error.response.data.error);
         } else {
            setError("An unexpected error occurred. Please try again later.");
            console.error("Error Signing Up:", error);
         }
      }
   };
   const handleLogin = () => {
      navigate("/login");
   };
   return (
      <>
         <div className="lbody background-image">
            <div className="container">
               <div className="row justify-content-center mt-5">
                  <div className="col-md-6">
                     <div className="signup-form">
                        <h2 className="text-center mb-4">Sign Up</h2>
                        <form>
                           <div className="mb-3">
                              <input
                                 type="text"
                                 className="form-control"
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                                 placeholder="Name"
                              />
                           </div>
                           <div className="mb-3">
                              <input
                                 type="email"
                                 className="form-control"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 placeholder="Email"
                              />
                           </div>
                           <div className="mb-3">
                              <input
                                 type="password"
                                 className="form-control"
                                 id="password"
                                 name="password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder="Password"
                              />
                           </div>

                           <div className="mb-3">
                              <button
                                 type="submit"
                                 className="loginButton"
                                 onClick={handleSignUp}
                              >
                                 SignUp
                              </button>

                              {/* <span style={{ paddingLeft: "13rem" }}>Or</span> */}
                              <p className="span2">Or</p>
                              <button
                                 type="submit"
                                 className="signupButton"
                                 onClick={handleLogin}
                              >
                                 Already Have an Account
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
