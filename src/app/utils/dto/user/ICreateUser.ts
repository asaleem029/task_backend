import { IBaseEntity } from '../base.js';

export interface ICreateUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
