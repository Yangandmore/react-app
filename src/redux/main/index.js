import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { testApi } from './api';

const defaultState = fromJS({
  data: {},
  apiData: {},
});

const prefix = 'MAIN';
const LOCAL_TEST = `${prefix}_LOCAL_TEST`;
const API_TEST = `${prefix}_API_TEST`;

const mainAction = {};
mainAction.actionLocalTest = createAction(LOCAL_TEST, 'data');
mainAction.actionApiTest = createActionAsync(API_TEST, testApi);

const mainReducer = createReducer(
  {
    [LOCAL_TEST](state, action) {
      return state.merge({
        data: action.data,
      });
    },
    [API_TEST](state, action) {
      return {
        REQUEST() {
          return state;
        },
        SUCCESS() {
          return state.merge({
            apiData: action.res.body,
          });
        },
        FAILURE() {
          return state.merge({
            apiData: fromJS({}),
          });
        },
      };
    },
  },
  defaultState,
);

const select = (state) => state.get('main');
const mainSelect = {};
mainSelect.dataSelect = createSelector(select, (state) => {
  return state.get('data');
});

export { mainAction, mainReducer, mainSelect };
