import { Action } from '@ngrx/store';
import { ChartGraphModel } from '../models/chartGraph';


export enum ChartGraphActionType {
  GET_GRAPH = 'GET_GRAPH',
  GET_SECOND_GRAPH = 'GET_SECOND_GRAPH',
  GET_THIRD_GRAPH = 'GET_THIRD_GRAPH',
  GET_GRAPH_SUCCESS = 'GET_GRAPH_SUCCESS',
  GET_GRAPH_FAILED = 'GET_GRAPH_FAILED'
}

export class GetGraph implements Action {
  readonly type = ChartGraphActionType.GET_GRAPH;
}

export class GetSecondGraph implements Action {
  readonly type = ChartGraphActionType.GET_SECOND_GRAPH;
}

export class GetThirdGraph implements Action {
  readonly type = ChartGraphActionType.GET_THIRD_GRAPH;
}

export class GetGraphSuccess implements Action {
  readonly type = ChartGraphActionType.GET_GRAPH_SUCCESS;
  constructor(public payload: Array<ChartGraphModel>) { }
}

export class GetGraphFailed implements Action {
  readonly type = ChartGraphActionType.GET_GRAPH_FAILED;
  constructor(public payload: string) { }
}

export type GraphsActions = GetGraph |
  GetSecondGraph |
  GetThirdGraph |
  GetGraphSuccess |
  GetGraphFailed;
