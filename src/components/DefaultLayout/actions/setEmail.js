import {SET_EMAIL} from "../../../store/actionTypes";

export default function setEmail(email) {
  return {
    type: SET_EMAIL,
    payload: { email: email }
  }
}