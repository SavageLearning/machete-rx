import * as _ from 'lodash';
import { InitialEmployerState, IEmployerState } from './employer';

export interface IApplicationState {
    readonly employer: IEmployerState
}

export let InitialState: IApplicationState = {
    employer: _.clone(InitialEmployerState)
}
