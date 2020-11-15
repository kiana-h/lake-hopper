import { combineReducers } from "redux";
import filtersReducer from "./filters_reducer";
import loadingReducer from "./loading_reducer";

const uiReducer = combineReducers({
  filters: filtersReducer,
  loading: loadingReducer,
});

export default uiReducer;
