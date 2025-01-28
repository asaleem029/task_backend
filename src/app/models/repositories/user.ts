import { Repository, SelectQueryBuilder } from 'typeorm';
import { ICreateUser, IUpdateUser } from '../../utils/dto/index.js';
import { logging } from '../../../config/decorators/index.js';
import { User } from '../entities/index.js';
import DBConn from '../../../config/typeorm.js';

import {
  MakePaginationObject,
  MakeQueryBuilder,
  OrmExceptionHandling,
  MakeUsersQueryParams,
  MakeQueryBuilderGetOne,
} from '../../helpers/index.js';

import { IGetEntity, IGetEntityList, IGetEntityReturnObject } from '../../utils/index.js';

export abstract class UserRepository {
  private repo: Repository<User>;
  constructor() {
    this.repo = DBConn.getRepository(User);
  }
  @logging()
  async createOne(user: ICreateUser) {
    try {
      const userEntity = this.repo.create(user);
      const newUser: ICreateUser = await this.repo.save(userEntity);
      return newUser;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async find(args: IGetEntityList): Promise<IGetEntityReturnObject<User>> {
    try {
      const queryBuilder: SelectQueryBuilder<User> = MakeQueryBuilder(
        args,
        MakeUsersQueryParams,
        User,
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
  async findOne(args: IGetEntity): Promise<ICreateUser> {
    try {
      const queryBuilder: SelectQueryBuilder<User> = MakeQueryBuilderGetOne(
        args,
        MakeUsersQueryParams,
        User,
      );
      const user = await queryBuilder.getOne();
      if (!user) {
        throw 'USER_NOT_FETCHED';
      }
      return user;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async updateOne(criteria: any, updateParams: Partial<IUpdateUser>): Promise<IUpdateUser> {
    try {
      const result: any = await this.repo.update(criteria, updateParams);
      return result;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async deleteOne(id: any) {
    try {
      return await this.repo.softDelete({
        id,
      });
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }
}
