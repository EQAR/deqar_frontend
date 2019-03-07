import { SET_MY_AGENCIES_TABLE } from "../../../store/actionTypes";

export default function setMyAgenciesTable(state) {
  return {
    type: SET_MY_AGENCIES_TABLE,
    payload: { state: state }
  }
}
