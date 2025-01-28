import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.js';
import { IUser } from '../../utils/dto/user/user.js';

@Entity('users')
export class Users extends BaseEntity implements IUser {
  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  firstName!: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  lastName!: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email!: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
  })
  password!: string;
}
