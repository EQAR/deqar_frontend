import {RESET_USER, SET_EMAIL, SET_USER} from "../../../store/actionTypes";

const initialState = {
  id: 0,
  username: "",
  email: "",
  is_admin: false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        is_admin: action.payload.is_admin
      };
    }
    case SET_EMAIL: {
      return {
        ...state,
        email: action.payload.email
      }
    }
    case RESET_USER: {
      return {
        ...initialState
      }
    }
    default: {
      return { ...state };
    }
  }
}

export default userReducer;