import {
  IGetEntity,
  IGetEntityList,
  TaskMessages,
  ApiError,
  ApiSuccess,
  ICreateTask,
  taskCreationMapper,
} from '../../utils/index.js';
import { logging } from '../../../config/decorators/index.js';
import { TaskRepository } from '../../models/repositories/index.js';

class TaskCrudsService extends TaskRepository {
  @logging()
  async create(args: ICreateTask): Promise<IAPISuccessResponse> {
    try {
      const createdTask: ICreateTask = await this.createOne(await taskCreationMapper(args));
      return ApiSuccess.format({
        userMessage: TaskMessages.DATA_FETCHED.message,
        code: TaskMessages.DATA_FETCHED.code,
        keyName: 'data',
        ['data']: createdTask,
      });
    } catch (error) {
      throw ApiError.format(error, TaskMessages.FETCHING_FAILURE);
    }
  }

  @logging()
  async list(args: IGetEntityList): Promise<IAPISuccessResponse> {
    try {
      const data: any = await this.find(args);
      return ApiSuccess.format({
        userMessage: TaskMessages.DATA_FETCHED.message,
        code: TaskMessages.DATA_FETCHED.code,
        keyName: 'data',
        ['data']: data.data,
        pagination: data.pagination,
      });
    } catch (error: any) {
      throw ApiError.format(error, TaskMessages.FETCHING_FAILURE);
    }
  }

  @logging()
  async readById(args: IGetEntity): Promise<IAPISuccessResponse> {
    try {
      const data: any = await this.findOne(args);
      return ApiSuccess.format({
        userMessage: TaskMessages.DATA_FETCHED.message,
        code: TaskMessages.DATA_FETCHED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(error, TaskMessages.FETCHING_FAILURE);
    }
  }

  @logging()
  async updateById(taskId: number, args: any) {
    try {
      const data: any = await this.updateOne(taskId, args);

      if (data.affected > 0) {
        return ApiSuccess.format({
          userMessage: TaskMessages.TASK_NOT_FOUND.message,
          code: TaskMessages.TASK_NOT_FOUND.code,
          keyName: 'data',
          ['data']: data.raw,
        });
      } else {
        throw TaskMessages.UPDATING_FAILURE;
      }
    } catch (error: any) {
      throw ApiError.format(error, TaskMessages.UPDATING_FAILURE);
    }
  }

  @logging()
  async deleteById(taskId: string): Promise<IAPISuccessResponse> {
    try {
      const data: any = await this.deleteOne(taskId);

      if (data.affected > 0) {
        return ApiSuccess.format({
          userMessage: TaskMessages.TASK_DELETED.message,
          code: TaskMessages.TASK_DELETED.code,
          keyName: 'data',
          ['data']: data.raw,
        });
      } else {
        throw TaskMessages.TASK_NOT_DELETED;
      }
    } catch (error: any) {
      throw ApiError.format(error, TaskMessages.TASK_NOT_DELETED);
    }
  }
}
export default new TaskCrudsService();
