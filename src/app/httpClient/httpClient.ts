import axios, { AxiosInstance, AxiosResponse as IAxiosResponse } from 'axios';
import { CustomLogger } from '../utils/index.js';

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string, withCredentials = false) {
    this.instance = axios.create({
      withCredentials,
      timeout: 300000,
      baseURL,
    });
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse, this.handleError);
  };

  private _handleResponse = ({ data }: IAxiosResponse) => {
    return data;
  };

  protected handleError = (error: any) => {
    CustomLogger.log(
      'error',
      `Error caught in HTTP call - Context: httpClient.handleError: ${error}`,
    );
    return Promise.reject(error);
  };
}
