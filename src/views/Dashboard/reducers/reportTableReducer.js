import { SET_REPORT_TABLE } from "../../../store/actionTypes";

const initialState = {
  tableType: 'report',
  pageSize: 20,
  page: 0,
  sorted: [],
  filtered: [],
  expanded: {},
  resized: []
};

function reportTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REPORT_TABLE: {
      return {
        ...state,
        pageSize: action.payload.state.pageSize,
        page: action.payload.state.page,
        sorted: action.payload.state.sorted,
        filtered: action.payload.state.filtered,
        expanded: action.payload.state.expanded,
        resized: action.payload.state.resized
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default reportTableReducer;
