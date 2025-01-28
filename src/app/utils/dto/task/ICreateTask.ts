import { IBaseEntity } from '../base.js';

export interface ICreateTask extends IBaseEntity {
  name: string;
  description: string;
  userId: number;
}
