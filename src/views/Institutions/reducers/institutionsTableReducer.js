import { SET_INSTITUTIONS_TABLE } from "../../../store/actionTypes";

const initialState = {
  tableType: 'institution',
  pageSize: 10,
  page: 0,
  sorted: [],
  filtered: []
};

function institutionsTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INSTITUTIONS_TABLE: {
      return {
        ...state,
        pageSize: action.payload.state.pageSize,
        page: action.payload.state.page,
        sorted: action.payload.state.sorted,
        filtered: action.payload.state.filtered
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default institutionsTableReducer;
