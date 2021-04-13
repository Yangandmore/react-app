import { createStore, applyMiddleware } from "redux";
import { fromJS } from "immutable";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import * as storage from "redux-storage";
import merger from "redux-storage-merger-immutablejs";
import createEngine from "redux-storage-engine-localstorage";
const engine = createEngine("local-key");

const configureStore = (initialState = {}) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

  const reducer = storage.reducer(rootReducer, merger);
  const middleware = storage.createMiddleware(engine);
  const store = createStore(
    reducer,
    fromJS(initialState),
    composeEnhancers(applyMiddleware(thunk, middleware))
  );

  // 加载localstorage中数据
  const load = storage.createLoader(engine);
  load(store);

  return store;
};

const getLoad = async (store) => {
  const load = storage.createLoader(engine);
  await load(store);
};

export default configureStore;
