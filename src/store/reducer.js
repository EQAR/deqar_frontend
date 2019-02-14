import { combineReducers } from "redux";
import userReducer from "../components/DefaultLayout/reducers/userReducer";
import reportTableReducer from "../views/Dashboard/reducers/reportTableReducer";
import institutionsTableReducer from "../views/Institutions/reducers/institutionsTableReducer";

// Create the combined reducer
const reducer = combineReducers(
  {
    user: userReducer,
    institutionsTable: institutionsTableReducer,
    reportTable: reportTableReducer
  }
);

export default reducer;
