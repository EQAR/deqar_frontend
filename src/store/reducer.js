import { combineReducers } from "redux";
import userReducer from "../components/DefaultLayout/reducers/userReducer";
import reportTableReducer from "../views/Dashboard/reducers/reportTableReducer";
import institutionTableReducer from "../views/Institutions/reducers/institutionTableReducer";

// Create the combined reducer
const reducer = combineReducers(
  {
    user: userReducer,
    institutionTable: institutionTableReducer,
    reportTable: reportTableReducer
  }
);

export default reducer;
