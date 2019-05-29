import {
  SET_REPORTS_TABLE,
  TOGGLE_REPORTS_TABLE_FILTER
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

function reportsTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REPORTS_TABLE: {
      return {
        ...state,
        pageSize: action.payload.state.pageSize,
        page: action.payload.state.page,
        total: action.payload.state.total,
        sorted: action.payload.state.sorted,
        filtered: action.payload.state.filtered,
        resized: action.payload.state.resized
      };
    }
    case TOGGLE_REPORTS_TABLE_FILTER: {
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

export default reportsTableReducer;
