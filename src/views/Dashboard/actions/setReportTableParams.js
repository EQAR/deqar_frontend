import {SET_REPORT_TABLE} from "../../../store/actionTypes";

export default function setReportTable(state) {
  return {
    type: SET_REPORT_TABLE,
    payload: { state: state }
  }
}