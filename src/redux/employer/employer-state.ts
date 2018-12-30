import { Employer } from '../../models/employer';

export interface IEmployerState {
    readonly error: Error | null,
    readonly loading: boolean,
    readonly employer: Employer | null
}

export let InitialEmployerState: IEmployerState = {
    error: null,
    loading: false,
    employer: null
}
