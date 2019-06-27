import { Record } from './record';

export class Config extends Record<Config> {
  public key: string;
  public value: string;
  public description: string;
  public category: string;
  public publicConfig: boolean;
}