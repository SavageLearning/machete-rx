import { WorkAssignment } from "./work-assignment";
import { Record } from './record';

export class WorkOrder extends Record<WorkOrder> {
  // createdby: string;
  // datecreated: Date;
  // dateupdated: Date;
  // updatedby: string;
  public city: string;
  public contactName: string;
  public dateTimeofWork: Date;
  public description: string;
  // disclosureAgreement?: boolean;
  // employerID: number;
  public englishRequired: boolean;
  public englishRequiredNote: string;
  // onlineSource: boolean;
  // paperOrderNum?: number;
  public ppFee?: string;
  public ppPayerID?: number;
  public ppState?: string;
  public ppResponse?: string;
  public ppPaymentToken?: string;
  public ppPaymentID?: string;
  public phone: string;
  public state: string;
  // statusEN: string;
  // statusID: number;
  // timeFlexible: boolean;
  // timeZoneOffset: number;
  // transportFee: number;
  // transportMethodEN: string;
  public transportProviderID: number;
  // waPseudoIDCounter: number;
  public worksiteAddress1: string;
  public worksiteAddress2: string;
  public zipcode: string;

  public workAssignments?: WorkAssignment[];

  public isNotEmpty(): boolean {
    return !this.isEmpty();
  }
  public isEmpty(): boolean {    
    // for (var key in this) {
    //   if (this[key] !== null && this[key] != "")
    //     console.log('Not empty: ', this[key]);
    //     return false;
    // }
    for(const key in this) {
      if(this.hasOwnProperty(key)) {
      // console.log('Not empty: ', this[key]);
      return false;
      }

  }
  return true;

  }
}
