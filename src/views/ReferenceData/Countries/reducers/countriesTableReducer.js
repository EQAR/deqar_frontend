import {
  SET_COUNTRIES_TABLE,
  TOGGLE_COUNTRIES_TABLE_FILTER,
} from "../../../../store/actionTypes";

const initialState = {
  pageSize: 10,
  page: 0,
  total: 0,
  sorted: [{id: 'name', desc: false}],
  filtered: [],
  filterOpen: false,
  resized: []
};

function countriesTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COUNTRIES_TABLE: {
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
    case TOGGLE_COUNTRIES_TABLE_FILTER: {
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

export default countriesTableReducer;
