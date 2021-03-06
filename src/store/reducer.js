import { combineReducers } from "redux";
import userReducer from "../components/DefaultLayout/reducers/userReducer";
import institutionsTableReducer from "../views/ReferenceData/Institutions/reducers/institutionsTableReducer";
import myReportsTableReducer from "../views/MyData/MyReports/reducers/myReportsTableReducer";
import reportsTableReducer from "../views/ReferenceData/Reports/reducers/reportsTableReducer";
import agenciesTableReducer from "../views/ReferenceData/Agencies/reducers/agenciesTableReducer";
import myAgenciesTableReducer from "../views/MyData/MyAgencies/reducers/myAgenciesTableReducer";
import agencyActivitiesTableReducer from "../views/ReferenceData/AgencyActivities/reducers/agencyActivitiesTableReducer";
import countriesTableReducer from "../views/ReferenceData/Countries/reducers/countriesTableReducer";
import reportFlagsTableReducer from "../views/Flags/ReportFlags/reducers/reportFlagsTableReducer";

// Create the combined reducer
const reducer = combineReducers(
  {
    user: userReducer,
    institutionsTable: institutionsTableReducer,
    myReportsTable: myReportsTableReducer,
    reportsTable: reportsTableReducer,
    agencyActivitiesTable: agencyActivitiesTableReducer,
    myAgenciesTable: myAgenciesTableReducer,
    agenciesTable: agenciesTableReducer,
    countriesTable: countriesTableReducer,
    reportFlagsTable: reportFlagsTableReducer
  }
);

export default reducer;
