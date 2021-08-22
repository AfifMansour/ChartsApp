import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, share} from 'rxjs/operators';
import {has} from 'lodash';
import {AppResponse, HttpResponseBody} from '../models/api.models';
import {ChartGraphModel} from '../../models/chartGraph';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class HttpService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient, private auth: AuthService) {
    this.baseUrl = 'https://localhost:44367';
  }

  get<T>(url: string, options?): Observable<any> {
    const requestOptions = this.createRequestOptions(options, 'GET');
    return this.httpClient.get<HttpResponseBody<T>>(`${this.baseUrl}/${url}`, requestOptions)
      .pipe(
        share(),
        map(this.handleResponse)
      );
  }

  private createRequestOptions(options, method): any {
    let headers = options?.headers ? (options.headers) : null;
    let params: HttpParams = null;
    switch (method) {
      case 'GET':
        headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
        break;
      case 'PUT':
        break;
    }
    if (options?.params) {
      params = new HttpParams();
      Object.keys(options.params).map(key => params = params.set(key, options.params[key]));
    }

    const observe: 'response' = 'response';
    const withCredentials = true;
    return {
      headers,
      params,
      observe,
      withCredentials
    };

  }

  private headersOfType(headers: HttpHeaders, contentType: string): boolean {
    return headers !== null && headers instanceof HttpHeaders && headers.has(contentType);
  }


  private handleResponse<T>(response: HttpResponse<HttpResponseBody<T>>): any | HttpResponse<HttpResponseBody<T>> {
    return has(response?.body, 'data') ? response.body : response.body;
  }
}


