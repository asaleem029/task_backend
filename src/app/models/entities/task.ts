import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.js';
import { ITask } from '../../utils/index.js';

@Entity('tasks')
export class Task extends BaseEntity implements ITask {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name!: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  description!: string;

  @Column({
    name: 'userId',
    type: 'integer',
    nullable: false,
  })
  userId!: number;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.userTasks, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user!: import('./index.js').User;
}
