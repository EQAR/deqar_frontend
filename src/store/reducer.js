import {combineReducers} from "redux";
import userReducer from "../components/DefaultLayout/reducers/userReducer";
import reportTableReducer from "../views/Dashboard/reducers/reportTableReducer";

// Create the combined reducer
const reducer = combineReducers(
  {
    user: userReducer,
    reportTable: reportTableReducer
  }
);

export default reducer;
