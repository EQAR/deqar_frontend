import {
  SET_AGENCIES_TABLE,
  TOGGLE_AGENCIES_TABLE_FILTER,
} from "../../../store/actionTypes";

const initialState = {
  pageSize: 10,
  page: 0,
  total: 0,
  sorted: [],
  filtered: [],
  resized: [],
  filterOpen: false
};

function agenciesTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AGENCIES_TABLE: {
      return {
        ...state,
        pageSize: action.payload.state.pageSize,
        page: action.payload.state.page,
        total: action.payload.state.total,
        sorted: action.payload.state.sorted,
        resized: action.payload.state.resized,
        filtered: action.payload.state.filtered,
      };
    }
    case TOGGLE_AGENCIES_TABLE_FILTER: {
      return {
        ...state,
        filterOpen: !state.filterOpen
      }
    }
    default: {
      return { ...state };
    }
  }
}

export default agenciesTableReducer;
