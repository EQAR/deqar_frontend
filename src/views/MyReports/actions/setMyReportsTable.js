import { SET_MY_REPORTS_TABLE } from "../../../store/actionTypes";

export default function setMyReportsTable(state) {
  return {
    type: SET_MY_REPORTS_TABLE,
    payload: { state: state }
  }
}
