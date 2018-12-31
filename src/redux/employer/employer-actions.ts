import { Employer } from '../../models/employer';
import { Action, Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import axios, { AxiosResponse } from 'axios';

// Action Type
export enum EmployerActionType {
    LOAD_BEGIN = 'employer/LOAD_BEGIN',
    LOAD_SUCCESS = 'employer/LOAD_SUCCESS',
    LOAD_FAILURE = 'employer/LOAD_FAILURE'
}

// Action Definitions
export interface ILoadEmployerBeginAction extends Action {
    type: EmployerActionType.LOAD_BEGIN;
}

export interface ILoadEmployerSccessAction extends Action {
    payload: {
        employer: Employer
    },
    type: EmployerActionType.LOAD_SUCCESS
}

export interface ILoadEmployerFailedAction extends Action {
    payload: {
        error: Error
    },
    type: EmployerActionType.LOAD_FAILURE
}

// Action Creators
export const loadEmployerBegin = () => action(EmployerActionType.LOAD_BEGIN);

export const loadEmployerSuccess = (employer: Employer) => 
                    action(EmployerActionType.LOAD_SUCCESS, { employer });

export const loadEmployerFailure = (error: Error) => 
                    action(EmployerActionType.LOAD_FAILURE, { error });

// Actions with Side Effects
export const loadEmployer = () => {
    return (dispatch: Dispatch) => {
        dispatch(loadEmployerBegin());

        axios.create({ 
            baseURL: 'https://test-api.machetessl.org',
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        })
            .get<Employer>('/api/employer/profile')
            .then((res: AxiosResponse<Employer>) => {
            dispatch(loadEmployerSuccess(res.data));
        }).catch((error: Error) => {
            dispatch(loadEmployerFailure(error));
        });
    };
}
