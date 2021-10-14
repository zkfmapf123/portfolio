import { applyMiddleware, combineReducers, createStore } from "redux";
import { necipeReducer } from "./reducer/necipe.reducer";
import { commentReducer } from "./reducer/comment.reducer";
import { commonReducer } from "./reducer/common.reducer";
import { alertReducer } from "./reducer/alert.reducer";
import thunk from "redux-thunk";

const rootStore = combineReducers({
  necipeReducer,
  commentReducer,
  alertReducer,
  commonReducer,
});

export const store = createStore(rootStore, applyMiddleware(thunk));