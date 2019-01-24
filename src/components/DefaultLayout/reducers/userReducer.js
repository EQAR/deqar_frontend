import {SET_EMAIL, SET_USER} from "../../../store/actionTypes";

const initialState = {
  id: 0,
  username: "",
  email: ""
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email
      };
    }
    case SET_EMAIL: {
      return {
        ...state,
        email: action.payload.email
      }
    }
    default: {
      return { ...state };
    }
  }
}

export default userReducer;