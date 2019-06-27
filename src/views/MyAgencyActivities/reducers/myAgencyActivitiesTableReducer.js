import { SET_MY_AGENCY_ACTIVITIES_TABLE } from "../../../store/actionTypes";

const initialState = {
  pageSize: 10,
  page: 0,
  sorted: [],
  filterOpen: false,
  filtered: [],
};

function myAgencyActivitiesTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MY_AGENCY_ACTIVITIES_TABLE: {
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

export default myAgencyActivitiesTableReducer;
