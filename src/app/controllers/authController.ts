import { BaseController } from './baseController.js';
import { Controller, Middleware, Post } from '@overnightjs/core';
import {
  AuthRoutes,
  ICustomRequest,
  ICustomHeaders,
  JoiValidator,
  ReqValidations,
} from '../utils/index.js';
import { AuthService } from '../services/auth/index.js';
import { logging } from '../../config/decorators/index.js';

@Controller(AuthRoutes.BASE)
export class AuthController extends BaseController {
  @Post(AuthRoutes.SIGN_UP)
  @Middleware([JoiValidator(ReqValidations.SignUpValidator)])
  @logging()
  private async _signUp(req: ICustomRequest, res: any) {
    const { language: language }: ICustomHeaders = req.headers;
    try {
      const result = await AuthService.signUp({
        ...req.body,
        origin: req.headers.referer,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: unknown) {
      this.sendErrorResponse(res, error as IAPIErrorResponse, language);
    }
  }

  @Post(AuthRoutes.SIGN_IN)
  @Middleware([JoiValidator(ReqValidations.signInValidator)])
  @logging()
  private async _signIn(req: ICustomRequest, res: any) {
    const { language: language }: ICustomHeaders = req.headers;
    try {
      const result = await AuthService.signIn({
        ...req.body,
        origin: req.headers.referer,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: unknown) {
      this.sendErrorResponse(res, error as IAPIErrorResponse, language);
    }
  }
}
