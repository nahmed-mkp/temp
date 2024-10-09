import * as fromActions from '../actions';
import * as fromModels from '../../models';
import { Benchmark } from '../../models';

export interface BenchmarkState {
  ids: number[];
  entities: { [id: number]: fromModels.IBenchmark };
  loading: boolean;
  loaded: boolean;
  error?: string;
  actionStatus?: string;
  selectedBenchmark?: number;
}

const initialState: BenchmarkState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: fromActions.BenchmarkActions): BenchmarkState {

  const helper = new BenchmarkReducerHelper();

  switch (action.type) {

    case fromActions.BenchmarkActionTypes.LOAD_ALL_BENCHMARKS: {
      return helper.initializeBenchmark(state);
    }

    case fromActions.BenchmarkActionTypes.LOAD_ALL_BENCHMARKS_COMPLETE: {
      return helper.loadBenchmarks(state, action.payload);
    }

    case fromActions.BenchmarkActionTypes.LOAD_ALL_BENCHMARKS_FAILED:
    case fromActions.BenchmarkActionTypes.LOAD_BENCHMARK_FAILED:
    case fromActions.BenchmarkActionTypes.ADD_BENCHMARK_FAILED:
    case fromActions.BenchmarkActionTypes.UPDATE_BENCHMARK_FAILED:
    case fromActions.BenchmarkActionTypes.DELETE_BENCHMARK_FAILED:
    case fromActions.BenchmarkActionTypes.UPDATE_ALL_BENCHMARK_RETURNS_FAILED:
    case fromActions.BenchmarkActionTypes.UPDATE_BENCHMARK_RETURNS_FAILED: {
      return helper.updateError(state, action.payload);
    }

    case fromActions.BenchmarkActionTypes.LOAD_BENCHMARK_COMPLETE:
    case fromActions.BenchmarkActionTypes.ADD_BENCHMARK_COMPLETE:
    case fromActions.BenchmarkActionTypes.UPDATE_BENCHMARK_COMPLETE: {
      return helper.loadBenchmark(state, action.payload);
    }

    case fromActions.BenchmarkActionTypes.DELETE_BENCHMARK_COMPLETE: {
      return helper.deleteBenchmark(state, action.payload);
    }

    case fromActions.BenchmarkActionTypes.UPDATE_ALL_BENCHMARK_RETURNS_COMPLETE:
    case fromActions.BenchmarkActionTypes.UPDATE_BENCHMARK_RETURNS_COMPLETE: {
      return helper.updateStatus(state, action.payload);
    }

    case fromActions.BenchmarkActionTypes.SELECT_BENCHMARK: {
      return helper.selectBenchmark(state, action.payload);
    }

  }

  return state;
}

class BenchmarkReducerHelper {

  public initializeBenchmark(state: BenchmarkState): BenchmarkState {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    };
  }

  public loadBenchmarks(state: BenchmarkState, payload: fromModels.IBenchmark[]): BenchmarkState {
    const ids = payload.map((benchmark: fromModels.IBenchmark) => benchmark.id);
    const newIds = ids.filter((id: number) => state.ids.indexOf(id) < 0);
    const entities = payload.reduce((entities: { [id: number]: fromModels.Benchmark }, benchmark: fromModels.IBenchmark) => {
        return Object.assign({}, entities, { [benchmark.id]: new fromModels.Benchmark(benchmark) });
      }, state.entities);
    return {
      ...state,
      ids: [...state.ids, ...newIds],
      entities: entities,
      loading: false,
      loaded: true
    };
  }

  public loadBenchmark(state: BenchmarkState, payload: fromModels.IBenchmark): BenchmarkState {
    return state;
    // const ids = payload.map((benchmark: fromModels.IBenchmark) => benchmark.id);
    // const newIds = ids.filter((id: number) => state.ids.indexOf(id) < 0);
    // const entities = payload.reduce((entities: { [id: number]: fromModels.Benchmark }, benchmark: fromModels.IBenchmark) => {
    //     return Object.assign({}, entities, { [benchmark.id]: new fromModels.Benchmark(benchmark) });
    //   }, state.entities);
    // return {
    //   ...state,
    //   ids: [...state.ids, ...newIds],
    //   entities: entities,
    //   loading: false,
    //   loaded: true
    // };
  }

  public deleteBenchmark(state: BenchmarkState, payload: fromModels.IBenchmark): BenchmarkState {
    return state;
    // const ids = payload.map((benchmark: fromModels.IBenchmark) => benchmark.id);
    // const newIds = ids.filter((id: number) => state.ids.indexOf(id) < 0);
    // const entities = payload.reduce((entities: { [id: number]: fromModels.Benchmark }, benchmark: fromModels.IBenchmark) => {
    //     return Object.assign({}, entities, { [benchmark.id]: new fromModels.Benchmark(benchmark) });
    //   }, state.entities);
    // return {
    //   ...state,
    //   ids: [...state.ids, ...newIds],
    //   entities: entities,
    //   loading: false,
    //   loaded: true
    // };
  }

  public selectBenchmark(state: BenchmarkState, payload: fromModels.IBenchmark): BenchmarkState {
    return {
      ...state,
      selectedBenchmark: payload.id
    };
  }

  public updateError(state: BenchmarkState, payload: any): BenchmarkState {
    return {
      ...state,
      error: payload
    };
  }

  public updateStatus(state: BenchmarkState, payload: string): BenchmarkState {
    return {
      ...state,
      actionStatus: payload
    };
  }
}

export const getIds = (state: BenchmarkState) => state.ids;
export const getEntities = (state: BenchmarkState) => state.entities;
export const getLoadingStatus = (state: BenchmarkState) => state.loading;
export const getLoadedStatus = (state: BenchmarkState) => state.loaded;
export const getError = (state: BenchmarkState) => state.error;
export const getActionStatus = (state: BenchmarkState) => state.actionStatus;
export const getSelectedBenchmarkId = (state: BenchmarkState) => state.selectedBenchmark;
