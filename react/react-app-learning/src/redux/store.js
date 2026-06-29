import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"
import postsReducer from "./postsReducer";

const rootReducer = combineReducers({
    posts: postsReducer
});
export default createStore(rootReducer, applyMiddleware(thunk))
