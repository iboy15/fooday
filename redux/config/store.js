import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import restaurantReducer from "../reducers/restaurant";

const reducers = combineReducers({
  restaurants: restaurantReducer
});

const middleware = applyMiddleware(thunk);

export default createStore(reducers, middleware);
