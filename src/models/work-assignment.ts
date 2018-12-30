/**
 * Created by jcii on 5/31/17.
 */
import { Record } from './record';
export class WorkAssignment extends Record<WorkAssignment>
{
  public static sort(a: WorkAssignment, b: WorkAssignment) {
    if (a.id < b.id) { return -1; }
    if (a.id > b.id) { return 1; }
    return 0;
  }
  
  public skillId: number;
  public skill: string;
  public hours: number;
  public description: string;
  public requiresHeavyLifting = false;
  public hourlyWage: number;
  public transportCost: number;
}
