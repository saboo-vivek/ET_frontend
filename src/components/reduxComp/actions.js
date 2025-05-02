// actionTypes.js
export const ADD_EXPENSE = "ADD_EXPENSE";
export const DELETE_EXPENSE = "DELETE_EXPENSE";
export const EDIT_EXPENSE = "EDIT_EXPENSE";
export const FETCH_EXPENSES = "FETCH_EXPENSES";

// actions.js
export const addExpense = (expense) => ({
   type: ADD_EXPENSE,
   payload: expense,
});

export const deleteExpense = (expenseId) => ({
   type: DELETE_EXPENSE,
   payload: expenseId,
});

export const editExpense = (expense) => ({
   type: EDIT_EXPENSE,
   payload: expense,
});

export const fetchExpenses = (expenses) => ({
   type: FETCH_EXPENSES,
   payload: expenses,
});

// authActions.js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';


export const loginSuccess = (token) => ({
   type: LOGIN_SUCCESS,
   payload: token,
 });
 
 export const loginFailure = (error) => ({
   type: LOGIN_FAILURE,
   payload: error,
 });
 
 export const logout = () => ({
   type: LOGOUT,
 });


 export const LOADING='LOADING';
 
 export const loadingApi = () => ({
   type: LOADING,
 });

 export const LOADING_EXPENSES='LOADING_EXPENSES';
 
 export const loadingExpensesFun = () => ({
   type: LOADING_EXPENSES,
 });