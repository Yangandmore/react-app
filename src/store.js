import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import * as storage from 'redux-storage';
import merger from 'redux-storage-merger-immutablejs';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';
import rootReducer from './reducers';

let engine = createEngine('data');

// 白名单
// 黑名单
// 多层数组表示嵌套
engine = filter(engine, ['whitelisted-key', ['main']], ['blacklisted-key', []]);

const getLocalState = () => engine.load()
  .then((state) => state)
  .catch(() => ({}));

// 默认使用空数据初始化
const configureStore = (initialState = fromJS({})) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

  const reducer = storage.reducer(rootReducer, merger);
  const middleware = storage.createMiddleware(engine);
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, middleware)),
  );

  return store;
};

// 启动时根据localStorage中数据初始化state
const configureLocalStateStore = async () => {
  const state = await getLocalState();
  const store = configureStore(fromJS(state));
  return store;
};

export { configureStore, configureLocalStateStore };
