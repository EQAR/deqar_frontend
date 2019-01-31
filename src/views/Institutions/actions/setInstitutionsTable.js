import { SET_INSTITUTIONS_TABLE } from "../../../store/actionTypes";

export default function setInstitutionTable(state) {
  return {
    type: SET_INSTITUTIONS_TABLE,
    payload: { state: state }
  }
}
