import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import patientReducer from "./reducers/patientReducer";

const rootReducer = combineReducers({
  user: userReducer,
  patient: patientReducer,
});

const store = createStore(rootReducer);

export default store;
