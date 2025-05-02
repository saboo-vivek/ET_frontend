import "./forget.css";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams
import { useNavigate } from "react-router-dom";

function ResetP() {
   const { uuid } = useParams(); 
   const [password, setPassword] = React.useState("");

   const navigate = useNavigate();
   const BASE_URL = process.env.REACT_APP_BACKEND_API;


   const handlebtn = async (e) => {
      e.preventDefault();
      try {
         let resp = await axios
            .post(`${BASE_URL}/password/update/${uuid}`, { password })
            .then(() => alert("your password has been updated"));
         console.log(resp);
         navigate("/login");
         //  aftercall();
      } catch (error) {
         console.error("Axios Error:", error);
      }
   };

   return (
      <div className="containerforget">
         <h1>Reset Password </h1>
         <br />
         <p>Enter your new password.</p>

         <form id="forgotForm">
            <label htmlFor="passwordid">Enter your new password:</label>
            <input
               type="password"
               name="password"
               id="passwordid"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />
            <button type="submit" className="resetbtn" onClick={handlebtn}>
               Change Password
            </button>
            {/* {screenview && (
               <button
                  type="submit"
                  className="resetloginbtn"
                  onClick={handleloginbtn}
               >
                  Login
               </button>
            )} */}
         </form>
      </div>
   );
}

export default ResetP;
