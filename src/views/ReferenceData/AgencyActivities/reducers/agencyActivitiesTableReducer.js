import {
  SET_AGENCY_ACTIVITIES_TABLE,
  TOGGLE_AGENCY_ACTIVITIES_TABLE_FILTER
} from "../../../../store/actionTypes";

const initialState = {
  pageSize: 10,
  page: 0,
  total: 0,
  sorted: [{id: 'agency', desc: false}],
  filtered: [],
  filterOpen: false,
};

function agencyActivitiesTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AGENCY_ACTIVITIES_TABLE: {
      return {
        ...state,
        pageSize: action.payload.state.pageSize,
        page: action.payload.state.page,
        total: action.payload.state.total,
        sorted: action.payload.state.sorted,
        filtered: action.payload.state.filtered
      };
    }
    case TOGGLE_AGENCY_ACTIVITIES_TABLE_FILTER: {
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

export default agencyActivitiesTableReducer;
