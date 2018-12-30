import { WorkOrder } from './work-order';
import { Record } from './record';
export class Employer extends Record<Employer> {
  public active: boolean;
  public address1: string;
  public address2: string;
  public blogparticipate?: boolean;
  public business: boolean;
  public businessname: string;
  public cellphone: string;
  public city: string;
  public driverslicense: string;
  public email: string;
  public fax: string;
  public isOnlineProfileComplete?: boolean;
  public licenseplate: string;
  public name: string;
  public notes: string;
  public onlineSigninID: string;
  public onlineSource: boolean;
  public phone: string;
  public receiveUpdates: boolean;
  public referredBy?: number;
  public referredByOther: string;
  public returnCustomer: boolean;
  public state: string;
  public workOrders: WorkOrder[];
  public zipcode: string;
}
