import { SET_AGENCIES_TABLE } from "../../../../store/actionTypes";

export default function setAgenciesTable(state) {
  return {
    type: SET_AGENCIES_TABLE,
    payload: { state: state }
  }
}
