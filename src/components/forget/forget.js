import "./forget.css";
import React from "react";
import axios from "axios";
function Forget() {
   const [email, setEmail] = React.useState("");
   const BASE_URL = process.env.REACT_APP_BACKEND_API;
   const handlebtn = async (e) => {
      e.preventDefault();
      try {
         let res = await axios.post(
            `${BASE_URL}/password/forgotpassword`,
            { email }
         );
         console.log(res.data);
         alert("A reset link is sent to your gmail");
      } catch (error) {
         const errorMessage =
            error.response.status === 500
               ? "Invalid Email Address"
               : "User Does Not Exist";
         alert(errorMessage);

         console.log(error.response.status);
      }
      setEmail("");
   };

   return (
      <div className="containerforget">
         <h1>Forgot Your Password?</h1>
         <br />
         <p>
            Please enter your email address. You will receive a link to create a
            new password via email.
         </p>

         <form id="forgotForm">
            <label htmlFor="emailId">Email Address:</label>
            <input
               type="email"
               name="email"
               id="emailId"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
            />
            <button type="submit" onClick={handlebtn}>
               Reset Password
            </button>
         </form>
      </div>
   );
}
export default Forget;
