import { IBaseEntity } from '../base.js';

export interface IUpdateUser extends IBaseEntity {
  firstName?: string;
  lastName?: string;
  email?: string;
}
