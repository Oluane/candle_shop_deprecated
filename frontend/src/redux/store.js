import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const isDevEnvironment = process.env.NODE_ENV === "development";

const composer = isDevEnvironment ? composeWithDevTools : compose;

const enhancers = composer(applyMiddleware(thunk));

export default createStore(reducers, enhancers);
