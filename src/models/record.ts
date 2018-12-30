export class Record<T> {
  public id: number;
  public constructor(init?: Partial<T>) {
    Object.assign(this, init);
  }
}
