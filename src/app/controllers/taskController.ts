import { Response } from 'express';
import { Controller, Delete, Get, Middleware, Post, Put } from '@overnightjs/core';
import { BaseController } from './baseController.js';
import {
  ICustomHeaders,
  ICustomRequest,
  JoiValidator,
  ReqValidations,
  TOKEN_SECRET,
} from '../utils/index.js';
import { logging } from '../../config/decorators/log.js';
import { TaskRoutes } from '../utils/index.js';
import { TaskCRUDService, TaskService } from '../services/index.js';
import { ValidateToken } from '../helpers/validateToken.js';

@Controller(TaskRoutes.BASE)
export class TaskController extends BaseController {
  @Post(TaskRoutes.CREATE)
  @Middleware([JoiValidator(ReqValidations.TaskCreationValidator)])
  @logging()
  private async _create(req: ICustomRequest, res: Response) {
    const { language: language, authorization }: ICustomHeaders = req.headers;
    try {
      await ValidateToken(authorization, TOKEN_SECRET);
      const result = await TaskService.taskCreation({
        ...req.body,
        requestUrl: req.originalUrl,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: unknown) {
      this.sendErrorResponse(res, error as IAPIErrorResponse, language);
    }
  }

  @Get(TaskRoutes.GET_ALL)
  @logging()
  private async _get(req: ICustomRequest, res: Response) {
    const { language: language, authorization }: ICustomHeaders = req.headers;
    try {
      await ValidateToken(authorization, TOKEN_SECRET);
      const result = await TaskCRUDService.list({
        ...req.query,
        requestUrl: req.originalUrl,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error) {
      this.sendErrorResponse(res, error as IAPIErrorResponse, language);
    }
  }

  @Get(TaskRoutes.GET_BY_ID)
  @logging()
  private async _getById(req: ICustomRequest, res: Response) {
    const { language: language }: ICustomHeaders = req.headers;
    try {
      const result = await TaskCRUDService.readById({
        id: req.params.id,
        requestUrl: req.originalUrl,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Put(TaskRoutes.UPDATE_BY_ID)
  @Middleware([JoiValidator(ReqValidations.TaskUpdationValidator)])
  @logging()
  private async _updateById(req: ICustomRequest, res: Response) {
    const { language: language, authorization }: ICustomHeaders = req.headers;
    try {
      await ValidateToken(authorization, TOKEN_SECRET);
      const taskId = Number(req.params.id);
      const result = await TaskService.updateTask(taskId, {
        ...req.body,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Delete(TaskRoutes.DELETE)
  @logging()
  private async _deleteById(req: ICustomRequest, res: Response) {
    const { language: language, authorization }: ICustomHeaders = req.headers;
    try {
      await ValidateToken(authorization, TOKEN_SECRET);
      const result = await TaskCRUDService.deleteById(Number(req.params.id));
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }
}
