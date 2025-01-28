import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.js';
import { IUser } from '../../utils/dto/user/user.js';
import { Task } from './task.js';

@Entity('users')
export class User extends BaseEntity implements IUser {
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

  @OneToMany(() => Task, (task) => task.user)
  userTasks!: Task[];
}
