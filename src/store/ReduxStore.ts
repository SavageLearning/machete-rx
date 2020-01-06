import { applyMiddleware, createStore, combineReducers } from 'redux';
import { entitiesReducer, queriesReducer, queryMiddleware, errorsReducer } from 'redux-query';
import superagentInterface from 'redux-query-interface-superagent';

export const getQueries = (state: any) => state.queries;
export const getEntities = (state: any) => state.entities;
export const getErrors = (state: any) => state.errors;

const reducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer,
  errors: errorsReducer
});

const store = createStore(
  reducer,
  applyMiddleware(queryMiddleware(superagentInterface, getQueries, getEntities)),
);

export default store;