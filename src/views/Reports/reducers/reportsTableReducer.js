import { SET_REPORTS_TABLE } from "../../../store/actionTypes";

const initialState = {
  pageSize: 10,
  page: 0,
  sorted: [],
  filterOpen: false,
  filtered: []
};

function reportsTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REPORTS_TABLE: {
      return {
        ...state,
        pageSize: action.payload.state.pageSize,
        page: action.payload.state.page,
        sorted: action.payload.state.sorted,
        filterOpen: action.payload.state.filterOpen,
        filtered: action.payload.state.filtered
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default reportsTableReducer;
