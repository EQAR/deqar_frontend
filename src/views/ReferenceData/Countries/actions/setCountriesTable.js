import {  } from "../../../../store/actionTypes";
import {SET_COUNTRIES_TABLE} from "../../../../store/actionTypes";

export default function setCountriesTable(state) {
  return {
    type: SET_COUNTRIES_TABLE,
    payload: { state: state }
  }
}
