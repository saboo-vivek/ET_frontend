import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
import authReducer from "./authReducer";
import expenseReducer from "./expenseReducer";

// const Store = createStore(expenseReducer);
// export default Store;

const rootReducer = combineReducers({
   auth: authReducer,
   expenses: expenseReducer,
});

const store = createStore(rootReducer);

export default store;
