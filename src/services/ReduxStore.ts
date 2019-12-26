import { applyMiddleware, createStore, combineReducers } from 'redux';
import { entitiesReducer, queriesReducer, queryMiddleware } from 'redux-query';
import superagentInterface from 'redux-query-interface-superagent';

export const getQueries = (state: any) => state.queries;
export const getEntities = (state: any) => state.entities;

const reducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(queryMiddleware(superagentInterface, getQueries, getEntities)),
);

export default store;