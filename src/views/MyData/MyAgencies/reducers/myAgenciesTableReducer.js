import {
  SET_MY_AGENCIES_TABLE,
} from "../../../../store/actionTypes";

const initialState = {
  pageSize: 10,
  page: 0,
  total: 0,
  sorted: [],
  filtered: [],
  filterOpen: false,
  resized: []
};

function myAgenciesTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MY_AGENCIES_TABLE: {
      return {
        ...state,
        pageSize: action.payload.state.pageSize,
        page: action.payload.state.page,
        total: action.payload.state.total,
        sorted: action.payload.state.sorted,
        filtered: action.payload.state.filtered,
        resized: action.payload.state.resized,
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default myAgenciesTableReducer;
