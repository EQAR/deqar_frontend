import {SET_DASHBOARD_REPORT_TABLE} from "../../../store/actionTypes";

export default function setDashboardReportTable(state) {
  return {
    type: SET_DASHBOARD_REPORT_TABLE,
    payload: { state: state }
  }
}