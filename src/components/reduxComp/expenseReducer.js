// reducer.js
import {
   ADD_EXPENSE,
   DELETE_EXPENSE,
   EDIT_EXPENSE,
   FETCH_EXPENSES,
   LOADING_EXPENSES
} from "./actions";

const initialState =  {
   expenses:[],
   loadingExpenses:false
};


const expenseReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_EXPENSES:
         return {
            ...state,
            expenses: action.payload,
            loadingExpenses:false
         };
      case ADD_EXPENSE:
         return {
            ...state,
            expenses: [...state.expenses, action.payload],
            loadingExpenses:false
         };
      case DELETE_EXPENSE:
         return {
            ...state,
            expenses: state.expenses.filter(
               (expense) => expense.id !== action.payload
            ),
            loadingExpenses:false
         };
      case EDIT_EXPENSE:
         return {
            ...state,
            expenses: state.expenses.map((expense) =>
               expense.id === action.payload.id ? action.payload : expense
            ),
            loadingExpenses:false
         };
         case LOADING_EXPENSES:
         return {
            ...state,
            loadingExpenses: true,
         };
      default:
         return state;
   }
};

export default expenseReducer;
