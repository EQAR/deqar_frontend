import { SET_MY_AGENCIES_TABLE } from "../../../store/actionTypes";

const initialState = {
  pageSize: 10,
  page: 0,
  sorted: [],
  filtered: [],
  filterable: true
};

function myAgenciesTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MY_AGENCIES_TABLE: {
      return {
        ...state,
        pageSize: action.payload.state.pageSize,
        page: action.payload.state.page,
        sorted: action.payload.state.sorted,
        filtered: action.payload.state.filtered
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default myAgenciesTableReducer;
