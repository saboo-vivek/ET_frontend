import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import store from "./components/reduxComp/store";
import { Provider } from "react-redux";
import { ExpenseProvider } from "./components/reduxComp/ExpenseContext";
import { ThemeProvider } from "./components/reduxComp/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <ThemeProvider>
         <Provider store={store}>
            <ExpenseProvider>
               <React.StrictMode>
                  <App />
               </React.StrictMode>
            </ExpenseProvider>
         </Provider>
      </ThemeProvider>
   </React.StrictMode>
);

reportWebVitals();
