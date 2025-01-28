import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { Language } from '../constants.js';

interface ICustomHeaders {
  language: Language;
  authorization?: string;
  appversion?: string;
  'org-id'?: string;
  'access-level'?: string;
  'role-id'?: string;
  'user-id'?: string;
  'user-external-id'?: string;
  token?: string;
}

interface ICustomRequest extends Request {
  headers: IncomingHttpHeaders & ICustomHeaders;
}

export { ICustomRequest, ICustomHeaders };
