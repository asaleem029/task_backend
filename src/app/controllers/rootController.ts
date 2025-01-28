import { BaseController } from './baseController.js';
import { Controller, Get } from '@overnightjs/core';
import { HEALTH_CHECK, ICustomRequest } from '../utils/index.js';

@Controller(HEALTH_CHECK)
export class RootController extends BaseController {
  @Get('')
  private async _health(_req: ICustomRequest, res: any) {
    res.status(200).send('app is healthy');
  }
}
