import React, { useState, useEffect } from "react";
import "./allexpense.css";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useExpenseContext } from "../reduxComp/ExpenseContext";
import { deleteExpense, editExpense, fetchExpenses } from "../reduxComp/actions";

export default function AllExpenses() {
   const dispatch = useDispatch();
   const { categories, downloadExpenses } = useExpenseContext();
   const { expenses } = useSelector((state) => state.expenses) || [];
   const [isFormVisible, setFormVisibility] = useState(false);
   const [amount, setAmount] = useState("");
   const [description, setDescription] = useState("");
   const [category, setCategory] = useState("");
   const [idValue, setIdValue] = useState("");
   const token = localStorage.getItem("token");
   const BASE_URL = process.env.REACT_APP_BACKEND_API;

   useEffect(() => {
      fetchData();
   }, [dispatch]);

   const fetchData = async () => {
      try {
         const expData = await axios.get(`${BASE_URL}/pastentries`, {
            headers: { Authorization: token },
         });
         dispatch(fetchExpenses(expData.data));
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   };

   const handleEdit = (id, amount, description, category) => {
      setIdValue(id);
      setAmount(amount);
      setDescription(description);
      setCategory(category);
      setFormVisibility(true);
   };

   const handleDownload = async () => {
      downloadExpenses();
   };

   const handleUpdate = async (e) => {
      e.preventDefault();
      setFormVisibility(false);

      const updatedExpense = {
         price: amount,
         description: description,
         category: category,
      };

      try {
         await axios.put(`${BASE_URL}/update/${idValue}`, updatedExpense, {
            headers: { Authorization: token },
         });
         dispatch(editExpense(idValue, updatedExpense));
         fetchData();
      } catch (error) {
         console.error("Error updating expense:", error);
      }
   };

   const handleDelete = async (id) => {
      try {
         await axios.delete(`${BASE_URL}/deletexpense/${id}`, {
            headers: { Authorization: token },
         });
         dispatch(deleteExpense(id));
         fetchData();
      } catch (error) {
         console.error("Error deleting expense:", error);
      }
   };

   return (
      <div className="expensemain">
         {isFormVisible && (
            <div className="popform">
               <form onSubmit={handleUpdate}>
                  <label>Price:</label>
                  <input
                     type="number"
                     value={amount}
                     onChange={(e) => setAmount(e.target.value)}
                  />
                  <label>Description:</label>
                  <input
                     type="text"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>Category:</label>
                  <select
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                  >
                     {categories.map((cat) => (
                        <option key={cat} value={cat}>
                           {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                     ))}
                  </select>
                  <button type="submit">Update</button>
               </form>
            </div>
         )}

         <div className="listclass">
            <h1 className="expHead">Expenses List</h1>
            {expenses.length === 0 ? (
               <div className="no-expenses">No expenses found.</div>
            ) : (
               <ol className="expense-list">
                  {expenses.map((expense) => (
                     <li key={expense._id}>
                        <p>Amt: {expense.price}</p>
                        <p>Desc: {expense.description}</p>
                        <p>Category: {expense.category}</p>
                        <FaRegEdit
                           size={30}
                           onClick={() =>
                              handleEdit(
                                 expense._id,
                                 expense.price,
                                 expense.description,
                                 expense.category
                              )
                           }
                           className="ebtn"
                        />
                     </li>
                  ))}
               </ol>
            )}
         </div>

         <div className="downDIV">
            <h6>To download expenses, click here</h6>
            <button className="downloadBTN" onClick={handleDownload}>
               Download
            </button>
         </div>
      </div>
   );
}




