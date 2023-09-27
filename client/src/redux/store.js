import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import contactsReducer from "./reducer/contactsReducer";

const middleWares = [logger, thunk];
const store = createStore(
  contactsReducer,
  compose(applyMiddleware(...middleWares)),
);

export default store;
