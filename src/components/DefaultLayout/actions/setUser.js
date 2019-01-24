import {SET_USER} from "../../../store/actionTypes";

export default function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  }
}