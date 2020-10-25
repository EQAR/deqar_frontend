import { SET_REPORT_FLAGS_TABLE } from "../../../../store/actionTypes";

export default function setReportFlagsTable(state) {
  return {
    type: SET_REPORT_FLAGS_TABLE,
    payload: { state: state }
  }
}
