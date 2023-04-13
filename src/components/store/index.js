import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginReducer from "../../reducer/loginSlice";
import registerSlice from "../../reducer/registerSlice";
import todolistReducer from "../../reducer/todolistReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const reducer = combineReducers({
  loginReducer,
  registerSlice,
  todolistReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
