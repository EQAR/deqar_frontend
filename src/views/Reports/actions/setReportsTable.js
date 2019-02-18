import { SET_REPORTS_TABLE } from "../../../store/actionTypes";

export default function setReportsTable(state) {
  return {
    type: SET_REPORTS_TABLE,
    payload: { state: state }
  }
}
