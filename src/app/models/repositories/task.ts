import { Repository, SelectQueryBuilder } from 'typeorm';
import { logging } from '../../../config/decorators/index.js';
import { Task } from '../entities/index.js';
import DBConn from '../../../config/typeorm.js';

import {
  MakePaginationObject,
  MakeQueryBuilder,
  OrmExceptionHandling,
  MakeTaskQueryParams,
  MakeQueryBuilderGetOne,
} from '../../helpers/index.js';

import {
  IGetEntity,
  IGetEntityList,
  IGetEntityReturnObject,
  ICreateTask,
  IUpdateTask,
} from '../../utils/index.js';

export abstract class TaskRepository {
  private repo: Repository<Task>;
  constructor() {
    this.repo = DBConn.getRepository(Task);
  }
  @logging()
  async createOne(task: ICreateTask) {
    try {
      const taskEntity = this.repo.create(task);
      const newTask: ICreateTask = await this.repo.save(taskEntity);
      return newTask;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async find(args: IGetEntityList): Promise<IGetEntityReturnObject<Task>> {
    try {
      const queryBuilder: SelectQueryBuilder<Task> = MakeQueryBuilder(
        args,
        MakeTaskQueryParams,
        Task,
        args.childQuery ? args.childQuery : undefined,
      );

      const [allRecords, recordsCount] = await queryBuilder.getManyAndCount();
      const pagination: IPagination = MakePaginationObject({
        totalCount: recordsCount,
        resultCount: allRecords.length,
        requestUrl: args.requestUrl,
        pageNo: args.pageNo,
        limit: args.limit,
      });
      return {
        pagination: pagination,
        data: allRecords,
      };
    } catch (error) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async findOne(args: IGetEntity): Promise<ICreateTask> {
    try {
      const queryBuilder: SelectQueryBuilder<Task> = MakeQueryBuilderGetOne(
        args,
        MakeTaskQueryParams,
        Task,
      );
      const task = await queryBuilder.getOne();
      if (!task) {
        throw 'TASK_NOT_FETCHED';
      }
      return task;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async updateOne(criteria: any, updateParams: Partial<IUpdateTask>): Promise<IUpdateTask> {
    try {
      const result: any = await this.repo.update(criteria, updateParams);
      return result;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async deleteOne(id: number) {
    try {
      return await this.repo.softDelete({
        id,
      });
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }
}
