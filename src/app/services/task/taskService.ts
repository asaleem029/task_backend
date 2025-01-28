import { ICreateTask, IUpdateTask, TaskMessages } from '../../utils/index.js';
import { logging } from '../../../config/decorators/index.js';
import { ApiError, ApiSuccess } from '../../utils/index.js';
import { TaskCRUDService } from './index.js';

class TaskService {
  @logging()
  async taskCreation(body: ICreateTask): Promise<IAPISuccessResponse> {
    try {
      const createdTask = await TaskCRUDService.create(body);

      return ApiSuccess.format({
        userMessage: TaskMessages.TASK_CREATED.message,
        code: TaskMessages.TASK_CREATED.code,
        keyName: 'data',
        ['data']: createdTask[createdTask.keyName],
      });
    } catch (error) {
      throw ApiError.format(error, TaskMessages.FETCHING_FAILURE);
    }
  }

  @logging()
  async updateTask(taskId: any, args: IUpdateTask) {
    try {
      const task = await TaskCRUDService.readById(taskId);
      if (task[task.keyName].userId !== args.userId) {
        throw ApiError.format(TaskMessages.UNAUTHORIZED_ACCESS);
      }

      const data: any = await TaskCRUDService.updateOne(
        {
          id: taskId,
        },
        args,
      );

      if (data.affected > 0) {
        return ApiSuccess.format({
          userMessage: TaskMessages.TASK_UPDATED.message,
          code: TaskMessages.TASK_UPDATED.code,
          keyName: 'data',
          ['data']: data.affected,
        });
      } else {
        throw TaskMessages.UPDATING_FAILURE;
      }
    } catch (error: any) {
      throw ApiError.format(error, TaskMessages.UPDATING_FAILURE);
    }
  }
}
export default new TaskService();
