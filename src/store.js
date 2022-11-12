import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
const reducer = combineReducers({
  // this will contain our reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
});

const userInfofromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: { userInfo: userInfofromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
