import { IBaseEntity } from '../base.js';

export interface IUpdateTask extends IBaseEntity {
  name?: string;
  description?: string;
}
