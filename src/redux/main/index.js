import { createAction, createReducer } from "redux-act-reducer";
import { fromJS, Map, List } from "immutable";
import { createSelector } from "reselect";

const defaultState = fromJS({});

const prefix = "MAIN";

const mainAction = {};

const mainReducer = createReducer({}, defaultState);

const mainSelect = {};

export { mainAction, mainReducer, mainSelect };
