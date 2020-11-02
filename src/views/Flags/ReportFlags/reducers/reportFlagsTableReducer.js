import {
  SET_REPORT_FLAGS_TABLE,
  TOGGLE_REPORT_FLAGS_TABLE_FILTER
} from "../../../../store/actionTypes";

const initialState = {
  pageSize: 10,
  page: 0,
  total: 0,
  sorted: [{id: 'created_at', desc: true}],
  filtered: [],
  resized: [],
  filterOpen: true
};

function reportFlagsTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REPORT_FLAGS_TABLE: {
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
    case TOGGLE_REPORT_FLAGS_TABLE_FILTER: {
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

export default reportFlagsTableReducer;
