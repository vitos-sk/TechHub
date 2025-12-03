import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import { appReducer, userReducer, productReducer, cartReducer } from "./reducers";

const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
