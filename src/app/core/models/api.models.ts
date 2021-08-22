import {has} from 'lodash';

export class AppResponse<T> {
  data: T;
  constructor(data) {
    this.data = has(data, 'data') ? data.data : data;
  }
}

export interface HttpResponseBody<T> {
  data: T;
  message?: string;
  errorCode?: number;
}
