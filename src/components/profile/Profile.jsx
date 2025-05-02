import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./profileStyle.css"; // Import the CSS file
// import { useBookmarkContext } from "./BookmarkContext";


export default function AddPortal() {
   const [inputValue, setInputValue] = useState("");
   const [errorMessage, setErrorMessage] = useState(null);
   const BASE_URL=process.env.REACT_APP_BACKEND_API;
//    const { addBookmark, bookmarkToEdit, closePortal } = useBookmarkContext();

//    useEffect(() => {
//       if (bookmarkToEdit) {
//          setInputValue(bookmarkToEdit.bookmark);
//       }
//    }, [bookmarkToEdit]);

   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         const response = await axios.post(URL, { bookmark: inputValue });

         console.log("Bookmark added Successfully: ", response.data);

         setInputValue("");
         closePortal();
         addBookmark(response.data);
      } catch (error) {
         console.error("Error while Adding Bookmark:", error);
         setErrorMessage("Failed to add bookmark. Please try again.");
      }
   };

   const handleCancel = () => {
      console.log("Form canceled");
      setInputValue("");
      closePortal();
   };

   return (
      <>
         <div className="portal-overlay" />

         {ReactDOM.createPortal(
            <div className="portal-form-container">
               <form onSubmit={handleSubmit}>
                  <input
                     type="text"
                     value={inputValue}
                     placeholder="Enter Bookmark...."
                     onChange={(event) => setInputValue(event.target.value)}
                  />
                  <div className="error-message">{errorMessage}</div>
                  <button type="submit">Submit</button>
                  <button type="button" onClick={handleCancel}>
                     Cancel
                  </button>
               </form>
            </div>,
            document.getElementById("portal-root")
         )}
      </>
   );
}
