import { SET_INSTITUTION_TABLE } from "../../../store/actionTypes";

export default function setInstitutionTable(state) {
  return {
    type: SET_INSTITUTION_TABLE,
    payload: { state: state }
  }
}
