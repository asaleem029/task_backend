import { Response } from 'express';
import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { BaseController } from './baseController.js';
import { ICustomHeaders, ICustomRequest } from '../utils/index.js';
import { logging } from '../../config/decorators/log.js';
import { UserRoutes } from '../utils/index.js';
import { UserCRUDService, UserService } from '../services/index.js';

@Controller(UserRoutes.BASE)
export class UsersController extends BaseController {
  @Post(UserRoutes.CREATE)
  @logging()
  private async _create(req: ICustomRequest, res: Response) {
    const headers: ICustomHeaders = req.headers;
    try {
      const result = await UserService.userCreation({
        ...req.body,
        requestUrl: req.originalUrl,
      });
      this.sendSuccessResponse(res, result, headers['language']);
    } catch (error: unknown) {
      this.sendErrorResponse(res, error as IAPIErrorResponse, headers['language']);
    }
  }

  @Get(UserRoutes.GET_ALL)
  @logging()
  private async _get(req: ICustomRequest, res: Response) {
    const { language: language }: ICustomHeaders = req.headers;
    try {
      const result = await UserCRUDService.list({
        ...req.query,
        requestUrl: req.originalUrl,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error) {
      this.sendErrorResponse(res, error as IAPIErrorResponse, language);
    }
  }

  @Get(UserRoutes.GET_BY_ID)
  @logging()
  private async _getById(req: ICustomRequest, res: Response) {
    const { language: language }: ICustomHeaders = req.headers;
    try {
      const result = await UserCRUDService.readById({
        id: req.params.id,
        requestUrl: req.originalUrl,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Put(UserRoutes.UPDATE_BY_ID)
  @logging()
  private async _updateById(req: ICustomRequest, res: Response) {
    const { language: language }: ICustomHeaders = req.headers;
    try {
      const userId = Number(req.headers['user-id']);
      const result = await UserService.updateUser(userId, {
        ...req.body,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Delete(UserRoutes.DELETE)
  @logging()
  private async delete(req: ICustomRequest, res: Response) {
    const headers: ICustomHeaders = req.headers;
    try {
      const result = await UserCRUDService.deleteById(req.params.id);
      this.sendSuccessResponse(res, result, headers['language']);
    } catch (error: any) {
      this.sendErrorResponse(res, error, headers['language']);
    }
  }
}
