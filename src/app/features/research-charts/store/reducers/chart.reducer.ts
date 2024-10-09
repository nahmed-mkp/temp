import * as fromActions from './../actions/chart.actions';
import * as fromModels from './../../models/chart.models';

export interface State {

    chartPacks: fromModels.IChartPack[];
    chartPacksLoading: boolean;
    chartPacksLoaded: boolean;
    chartPacksError?: string;

    chartPackCharts: { [feature: string]: fromModels.ISubChart[]},
    chartPackChartsLoading: {[feature: string]: boolean};
    chartPackChartsLoaded: {[feature: string]: boolean};
    chartPackChartsError?: {[feature: string]: string};

    selectedChartPack?: string;
}

const initialState: State = {

    chartPacks: [],
    chartPacksLoading: false,
    chartPacksLoaded: false,

    chartPackCharts: {},
    chartPackChartsLoading: {}, 
    chartPackChartsLoaded: {},    
};

export function reducer(state = initialState, action: fromActions.ResearchChartActions): State {

    switch (action.type) {

        case fromActions.ResearchChartActionTypes.LOAD_CHART_PACKS: {
            return {
                ...state,
                chartPacksLoading: true,
                chartPacksLoaded: false,
                chartPacksError: null
            };
        }

        case fromActions.ResearchChartActionTypes.LOAD_CHART_PACKS_COMPLETE: {
            return {
                ...state,
                chartPacks: [...action.payload],
                chartPacksLoading: false,
                chartPacksLoaded: true
            };
        }

        case fromActions.ResearchChartActionTypes.LOAD_CHART_PACKS_FAILED: {
            return {
                ...state,
                chartPacksError: action.payload,
                chartPacksLoading: false,
                chartPacksLoaded: false
            };
        }

        case fromActions.ResearchChartActionTypes.LOAD_CHART_PACK: {
            const chartPack = action.payload;
            return {
                ...state,
                selectedChartPack: action.payload,
                chartPackChartsLoading: Object.assign({}, state.chartPackChartsLoading, { [chartPack]: true }),
                chartPackChartsLoaded: Object.assign({}, state.chartPackChartsLoaded, { [chartPack]: false }),
                chartPackChartsError: Object.assign({}, state.chartPackChartsError, { [chartPack]: null })
            };
        }

        case fromActions.ResearchChartActionTypes.LOAD_CHART_PACK_COMPLETE: {
            const chartPack = action.chartPack;
            const payload = action.payload;
            return {
                ...state,                
                chartPackCharts: Object.assign({}, state.chartPackCharts, { [chartPack]: payload }),
                chartPackChartsLoading: Object.assign({}, state.chartPackChartsLoading, { [chartPack]: false }),
                chartPackChartsLoaded: Object.assign({}, state.chartPackChartsLoaded, { [chartPack]: true })
            };
        }

        case fromActions.ResearchChartActionTypes.LOAD_CHART_PACK_FAILED: {
            const chartPack = action.chartPack;
            const payload = action.payload;
            return {
                ...state,
                chartPackChartsLoading: Object.assign({}, state.chartPackChartsLoading, { [chartPack]: false }),
                chartPackChartsLoaded: Object.assign({}, state.chartPackChartsLoaded, { [chartPack]: false }),
                chartPackChartsError: Object.assign({}, state.chartPackChartsError, { [chartPack]: payload })
            };
        }

        default: {
            return state;
        }
    }
}

export const getChartPacks = (state: State) => state.chartPacks;
export const getChartPacksLoading = (state: State) => state.chartPacksLoading;
export const getChartPacksLoaded = (state: State) => state.chartPacksLoaded;
export const getChartPacksError = (state: State) => state.chartPacksError;

export const getChartPackCharts = (state: State) => state.chartPackCharts;
export const getChartPackChartsLoading = (state: State) => state.chartPackChartsLoading;
export const getChartPackChartsLoaded = (state: State) => state.chartPackChartsLoaded;
export const getChartPackImagesError = (state: State) => state.chartPackChartsError;

export const getSelectedChartPack = (state: State) => state.selectedChartPack;
