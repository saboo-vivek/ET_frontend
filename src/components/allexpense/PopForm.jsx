import React from "react";

export default function PopForm() {
   return (
      <div>
         <div className="popform">
            <form onSubmit={handleUpdate}>
               <label>
                  Price:
                  <input
                     type="number"
                     value={amount}
                     onChange={(e) => setAmount(e.target.value)}
                  />
               </label>
               <label>
                  Description:
                  <input
                     type="text"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </label>
               <label>
                  Category:
                  <select
                     id="category"
                     name="category"
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                  >
                     {categories.map((cat) => (
                        <option key={cat} value={cat}>
                           {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                     ))}
                  </select>
               </label>

               <button type="submit" onClick={handleUpdate}>
                  Update
               </button>
            </form>
         </div>
      </div>
   );
}
