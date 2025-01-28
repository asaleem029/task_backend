import { IBaseEntity } from '../base.js';
import { ICreateUser } from './ICreateUser.js';

export interface IUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function convertSignUpToCreateUser(signUpData: any): Promise<ICreateUser> {
  const createUser: ICreateUser = {
    firstName: signUpData.firstName,
    lastName: signUpData.lastName,
    password: signUpData.password,
    email: signUpData.email,
  };
  return createUser;
}

export async function userCreationMapper(user: IUser): Promise<ICreateUser> {
  const createRole: any = {
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    email: user.email,
  };
  return createRole;
}
