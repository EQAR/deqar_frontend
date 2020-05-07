import {SET_MY_REPORTS_TABLE, TOGGLE_MY_REPORTS_TABLE_FILTER} from "../../../../store/actionTypes";

const initialState = {
  pageSize: 10,
  page: 0,
  total: 0,
  sorted: [{id: 'id', desc: 'true'}],
  filtered: [],
  resized: [],
  filterOpen: false
};

function myReportsTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MY_REPORTS_TABLE: {
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
    case TOGGLE_MY_REPORTS_TABLE_FILTER: {
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

export default myReportsTableReducer;
