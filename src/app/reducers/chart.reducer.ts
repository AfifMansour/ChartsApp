import {GraphsActions, ChartGraphActionType} from './chart.actions';

export const initialState = {};

export function graphsReducer(state = initialState, action: GraphsActions) {

  switch (action.type) {

    case ChartGraphActionType.GET_GRAPH: {
      return {...state};
    }

    case ChartGraphActionType.GET_SECOND_GRAPH: {
      return {...state};
    }

    case ChartGraphActionType.GET_THIRD_GRAPH: {
      return {...state};
    }

    case ChartGraphActionType.GET_GRAPH_SUCCESS: {
      return {
        ...state,
        todoList: action.payload
      };
    }

    case ChartGraphActionType.GET_GRAPH_FAILED: {
      return {...state};
    }
  }
}
