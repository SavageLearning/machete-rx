import { Employer } from '../../models/employer';
import { IEmployerState, EmployerActionType } from '.';
import { Action, Reducer } from 'redux';

const initialState: IEmployerState = {
    error: null,
    loading: false,
    employer: null
};
  
interface IEmployerAction extends Action {
    payload: {
        employer: Employer,
        error: any
    }
}
  
export const employerReducer: Reducer<IEmployerState> = 
            (state: IEmployerState = initialState, action: IEmployerAction) => {
  
    switch (action.type) {
      // 
      case EmployerActionType.LOAD_BEGIN: 
        return {
          ...state,
          error: null,
          loading: true
        };
      //
      case EmployerActionType.LOAD_SUCCESS: 
        return {
          ...state,
          loading: false,
          employer: action.payload.employer
        };
          //
      case EmployerActionType.LOAD_BEGIN: 
        return {
          ...state,
          error: action.payload.error,
          employer: null
        };
      default:
        return state;
    }
}
