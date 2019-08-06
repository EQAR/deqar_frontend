import { combineReducers } from "redux";
import userReducer from "../components/DefaultLayout/reducers/userReducer";
import dashboardReportTableReducer from "../views/Dashboard/reducers/dashboardReportTableReducer";
import institutionsTableReducer from "../views/Institutions/reducers/institutionsTableReducer";
import myReportsTableReducer from "../views/MyReports/reducers/myReportsTableReducer";
import reportsTableReducer from "../views/Reports/reducers/reportsTableReducer";
import agenciesTableReducer from "../views/Agencies/reducers/agenciesTableReducer";
import agencyActivitiesTableReducer from "../views/AgencyActivities/reducers/agencyActivitiesTableReducer";

// Create the combined reducer
const reducer = combineReducers(
  {
    user: userReducer,
    institutionsTable: institutionsTableReducer,
    dashboardReportTable: dashboardReportTableReducer,
    myReportsTable: myReportsTableReducer,
    reportsTable: reportsTableReducer,
    agencyActivitiesTable: agencyActivitiesTableReducer,
    agenciesTable: agenciesTableReducer
  }
);

export default reducer;
