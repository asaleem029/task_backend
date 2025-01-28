import { IBaseEntity } from '../base.js';
import { ICreateTask } from './ICreateTask.js';

export interface ITask extends IBaseEntity {
  name: string;
  description: string;
  userId: number;
}

export async function convertSignUpToCreateTask(taskData: any): Promise<ICreateTask> {
  const createTask: ICreateTask = {
    name: taskData.name,
    description: taskData.description,
    userId: taskData.userId,
  };
  return createTask;
}

export async function taskCreationMapper(task: ITask): Promise<ICreateTask> {
  const createTask: any = {
    name: task.name,
    description: task.description,
    userId: task.userId,
  };
  return createTask;
}
