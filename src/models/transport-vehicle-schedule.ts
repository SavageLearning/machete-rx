import { Record } from './record';
export class Employer extends Record<Employer> {
    public startTime: Date;
    public endTime: Date;
    public capacity: number;
    public vehicle: string;
    public assigned: number;
}
