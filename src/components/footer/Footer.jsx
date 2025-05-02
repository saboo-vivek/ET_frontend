import React from "react";
import "./Footer.css";

function Footer() {
   return (
      <footer className="footer">
         <div className="footer-content">
            {/* Contact Us Section */}
            <div className="footer-section">
               <h3>Contact Us</h3>
               <p>Email: info@example.com</p>
               <p>Phone: +1 123-456-7890</p>
            </div>

            {/* Address Section */}
            <div className="footer-section">
               <h3>Address</h3>
               <p>123 Main Street</p>
               <p>City, Country</p>
            </div>

            {/* Follow Us Section */}
            <div className="footer-section">
               <h3>Follow Us</h3>
               <div className="social-links">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                     <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                     <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                     <i className="fab fa-instagram"></i>
                  </a>
               </div>
            </div>
         </div>

         {/* Footer Bottom Section */}
         <div className="footer-bottom">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
         </div>
      </footer>
   );
}

export default Footer;




