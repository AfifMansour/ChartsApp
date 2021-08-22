import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ChartService} from '../services/chart.service';
import {
  ChartGraphActionType,
  GetGraphSuccess, GetGraphFailed,
  GetGraph, GetSecondGraph, GetThirdGraph
} from './chart.actions';
import {switchMap, catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

import {ChartGraphModel} from '../models/chartGraph';

@Injectable()
export class ChartEffects {

  constructor(
    private actions$: Actions,
    private chartService: ChartService
  ) {
  }

  @Effect()
  getGraph$ = this.actions$.pipe(
    ofType(ChartGraphActionType.GET_GRAPH),
    switchMap(() =>
      this.chartService.getChartGraphApi().pipe(
        map((graph: Array<ChartGraphModel>) => new GetGraphSuccess(graph)),
        catchError(error => of(new GetGraphFailed(error)))
      )
    )
  );

  @Effect()
  getSecondGraph$ = this.actions$.pipe(
    ofType(ChartGraphActionType.GET_SECOND_GRAPH),
    switchMap(() =>
      this.chartService.getSecondChartGraphApi().pipe(
        map((graph: Array<ChartGraphModel>) => new GetGraphSuccess(graph)),
        catchError(error => of(new GetGraphFailed(error)))
      )
    )
  );

  @Effect()
  getThirdGraph$ = this.actions$.pipe(
    ofType(ChartGraphActionType.GET_THIRD_GRAPH),
    switchMap(() =>
      this.chartService.getThirdChartGraphApi().pipe(
        map((graph: Array<ChartGraphModel>) => new GetGraphSuccess(graph)),
        catchError(error => of(new GetGraphFailed(error)))
      )
    )
  );
}
