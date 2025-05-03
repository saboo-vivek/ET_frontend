// import React, { useState, createContext, useContext } from "react";
// import axios from "axios";
// import { load } from "@cashfreepayments/cashfree-js";

// const ExpenseContext = createContext();
// export const useExpenseContext = () => useContext(ExpenseContext);

// export const ExpenseProvider = ({ children }) => {
//    const token = sessionStorage.getItem("token");

//    const parseJwt = (token) => {
//       try {
//          return JSON.parse(atob(token.split(".")[1]));
//       } catch (e) {
//          return null;
//       }
//    };
//    const decodeToken = parseJwt(token);

//    const categories = [
//       "Choose Category...",
//       "Books",
//       "Electronics",
//       "Vehicles",
//       "Food",
//       "Shopping",
//       "Rent",
//       "Bill",
//       "Travel",
//    ];

//    const BASE_URL = process.env.REACT_APP_BACKEND_API;
   
//    const handlePremium = async () => {
//       try {
//          const response = await axios.get(`${BASE_URL}/purchase/premium`, {
//             headers: { Authorization: token },
//          });
   
//          const { payment_session_id,order_id } = response.data;
   
//          console.log("payment_session_id:", payment_session_id);
   
//          if (!payment_session_id) {
//             console.log("Failed to get payment_session_id");
//             alert("Failed to get payment_session_id");
//             return;
//          }
   
//          // Load Cashfree SDK
//          const cashfree = await load({ mode: "sandbox" });
   
//          // Ensure cashfree is loaded before proceeding
//          if (!cashfree || !cashfree.checkout) {
//             console.error("Cashfree SDK failed to load properly");
//             alert("Failed to initialize payment gateway. Please try again.");
//             return;
//          }
         
   
//          // Proceed with payment
//          let checkoutOptions = {
//             paymentSessionId: payment_session_id,
//             redirectTarget: "_modal",
//          };

//          cashfree.checkout(checkoutOptions).then((result) => {
//             if (result.error) {
//                console.log("User has closed the popup or there is some payment error. Check for Payment Status.");
//                console.log(result.error);
//             }
//             if (result.redirect) {
//                console.log("Payment will be redirected.");
//             }
//             if (result.paymentDetails) {
//                console.log("Payment has been completed. Check for Payment Status.");
//                console.log(result.paymentDetails.paymentMessage);
//             }
//          });
//          console.log('cashfree.checkoutOptions: ',cashfree.checkoutOptions)
   
//       } catch (error) {
//          console.error("Error purchasing premium:", error);
//          alert("Failed to initiate premium purchase");
//       }
//    };

   
//    // Function to check payment status after redirection
//    const checkPaymentStatus = async (order_id) => {
//       try {
//          const response = await axios.post(
//             `${BASE_URL}/purchase/updatetransactionstatus`,
//             { order_id },
//             { headers: { Authorization: token } }
//          );

//          if (response.data.success) {
//             alert("You are a premium user");
//             sessionStorage.setItem("token", response.data.token);
//          } else {
//             alert("Transaction failed");
//          }
//       } catch (error) {
//          console.error("Error updating transaction status:", error);
//          alert("Failed to update transaction status");
//       }
//    };


//    const downloadExpenses = async () => {
//       console.log("download btn clicked");
//       try {
//          let response = await axios.get(`${BASE_URL}/download`, {
//             headers: { Authorization: token },
//          });
//          console.log("response", response);
//          if (response.status === 200) {
//             var a = document.createElement("a");
//             a.href = response.data.fileUrl;
//             a.download = "myexpense.csv";
//             a.click();
//          } else {
//             throw new Error(response.data.message);
//          }
//       } catch (err) {
//          console.error("Error while downloading:", err);
//          alert("Failed to download");
//       }
//    };

//    return (
//       <ExpenseContext.Provider
//          value={{
//             handlePremium,
//             categories,
//             downloadExpenses,
//          }}
//       >
//          {children}
//       </ExpenseContext.Provider>
//    );
// };


import React, { createContext, useContext } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

const ExpenseContext = createContext();

export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const token = sessionStorage.getItem("token");

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const decodeToken = parseJwt(token);

  const categories = [
    "Choose Category...",
    "Books",
    "Electronics",
    "Vehicles",
    "Food",
    "Shopping",
    "Rent",
    "Bill",
    "Travel",
  ];

  const BASE_URL = process.env.REACT_APP_BACKEND_API;

  const initializeCashfree = async () => {
    try {
      return await load({ mode: "sandbox" });
    } catch (error) {
      console.error("Failed to initialize Cashfree SDK:", error);
      throw new Error("Payment gateway initialization failed");
    }
  };

  const handlePremium = async () => {
    try {
      console.log("handlePremium called",'decoded token',decodeToken)
      // Step 1: Get payment session ID from backend
      const response = await axios.get(`${BASE_URL}/purchase/premium`, {
        headers: { Authorization: token },
      });

      const { payment_session_id, order_id } = response.data;

      if (!payment_session_id) {
        throw new Error("Failed to get payment session ID");
      }

      // Step 2: Initialize Cashfree SDK
      const cashfree = await initializeCashfree();

      // Step 3: Open payment modal
      const checkoutOptions = {
        paymentSessionId: payment_session_id,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then(async (result) => {
        if (result.error) {
          console.error("Payment error:", result.error);
          alert("Payment failed or was cancelled");
          return;
        }

        if (result.paymentDetails) {
          console.log("Payment completed:", result.paymentDetails);
          // Step 4: Verify payment status with backend
          await checkPaymentStatus(order_id);
        }
      });
    } catch (error) {
      console.error("Premium purchase error:", error);
      alert(error.message || "Failed to initiate premium purchase");
    }
  };

  const checkPaymentStatus = async (order_id) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/purchase/updatetransactionstatus`,
        { order_id },
        { headers: { Authorization: token } }
      );

      if (response.data.success) {
        alert("Payment successful! You are now a premium user.");
        sessionStorage.setItem("token", response.data.token);
        window.location.reload(); // Refresh to reflect premium status
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Payment status check error:", error);
      alert("Failed to verify payment status");
    }
  };

  const downloadExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/download`, {
        headers: { Authorization: token },
      });

      if (response.status === 200) {
        const a = document.createElement("a");
        a.href = response.data.fileUrl;
        a.download = "myexpense.csv";
        a.click();
      } else {
        throw new Error(response.data.message || "Download failed");
      }
    } catch (err) {
      console.error("Download error:", err);
      alert(err.message || "Failed to download expenses");
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        handlePremium,
        categories,
        downloadExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};





