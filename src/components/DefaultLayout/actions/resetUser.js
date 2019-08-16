import {RESET_USER} from "../../../store/actionTypes";

export default function resetUser() {
  return {
    type: RESET_USER,
    payload: {}
  }
}