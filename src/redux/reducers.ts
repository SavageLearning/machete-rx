import { combineReducers } from 'redux';
import { employerReducer } from './employer';
import { IApplicationState } from './state';

export default combineReducers<IApplicationState>({
    employer: employerReducer
});
