import {
  SET_INSTITUTIONS_TABLE,
  TOGGLE_INSTITUTIONS_TABLE_FILTER
} from "../../../../store/actionTypes";

const initialState = {
  pageSize: 10,
  page: 0,
  total: 0,
  sorted: [{id: 'deqar_id', desc: false}],
  filtered: [],
  resized: [],
  filterOpen: false
};

function institutionsTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INSTITUTIONS_TABLE: {
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
    case TOGGLE_INSTITUTIONS_TABLE_FILTER: {
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

export default institutionsTableReducer;
