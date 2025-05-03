// authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,LOADING} from "./actions";

const initialState = {
   token: sessionStorage.getItem("token") || null,
   isAuthenticated: !!sessionStorage.getItem("token"),
   error: null,
   loading:false
};

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case LOGIN_SUCCESS:
         return {
            ...state,
            token: action.payload,
            isAuthenticated: true,
            error: null,
            loading:false,
         };
      case LOGIN_FAILURE:
         return {
            ...state,
            error: action.payload,
            loading:false,
         };
      case LOGOUT:
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading:false,
         };
         case LOADING:
         return {
            ...state,
            loading: true,
         };
      default:
         return state;
   }
};

export default authReducer;
