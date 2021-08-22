import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import { ChartGraphModel } from '../models/chartGraph';
// import { headers } from '../../headers/headers';
import { HttpHeaders } from '@angular/common/http';
import {HttpService} from '../core/services/http.service';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  headers =   new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpService: HttpService, private store: Store<any>) {
  }

  getChartGraphApi(): Observable<ChartGraphModel[]> {
    return this.httpService.get(`Graph/GetFirstGraph`);
  }

  getSecondChartGraphApi(): Observable<ChartGraphModel[]> {
    return this.httpService.get(`Graph/GetSecondGraph`);
  }

  getThirdChartGraphApi(): Observable<ChartGraphModel[]> {
    return this.httpService.get(`Graph/GetThirdGraph`);
  }

  getToken(): Observable<string> {
    return this.httpService.get(`Graph/GetToken`);
  }
}
