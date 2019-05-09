import { SET_INSTITUTIONS_TABLE } from "../../../store/actionTypes";

export default function setInstitutionsTable(state) {
  return {
    type: SET_INSTITUTIONS_TABLE,
    payload: { state: state }
  }
}
