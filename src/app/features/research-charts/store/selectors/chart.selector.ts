import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromResearchCharts from '../reducers/chart.reducer';

const getResearchChartsState = createSelector(
    fromFeature.getResearchChartsFeatureState,
    (state: fromFeature.ResearchChartsState) => state.researchCharts
);

export const getChartPacks = createSelector(
    getResearchChartsState,
    fromResearchCharts.getChartPacks
);

export const getChartPacksLoading = createSelector(
    getResearchChartsState,
    fromResearchCharts.getChartPacksLoading
);

export const getChartPacksLoaded = createSelector(
    getResearchChartsState,
    fromResearchCharts.getChartPacksLoaded
);

export const getChartPacksError = createSelector(
    getResearchChartsState,
    fromResearchCharts.getChartPacksError
);

export const getChartPackCharts = createSelector(
    getResearchChartsState,
    fromResearchCharts.getChartPackCharts
);

export const getChartPackChartsLoading = createSelector(
    getResearchChartsState,
    fromResearchCharts.getChartPackChartsLoading
);

export const getChartPackChartsLoaded = createSelector(
    getResearchChartsState,
    fromResearchCharts.getChartPackChartsLoaded
);

export const getChartPackChartsError = createSelector(
    getResearchChartsState,
    fromResearchCharts.getChartPackImagesError
);

export const getSelectedChartPackName = createSelector(
    getResearchChartsState, 
    fromResearchCharts.getSelectedChartPack
);

export const getSelectedChartPack = createSelector(
    getChartPacks,
    getSelectedChartPackName,
    (chartPacks, selectedChartPack) => {
        const result = chartPacks.filter((chartPack) => chartPack.feature === selectedChartPack);
        if (result.length === 1) {
             return result[0];
        }
        return null;
    }
);

export const getSelectedChartPackCharts = createSelector(
    getChartPackCharts,
    getSelectedChartPackName, 
    (chartPack, selectedChartPack) => {
        if (chartPack && selectedChartPack) {
            return chartPack[selectedChartPack] || [];
        }
        return [];
    }
);

export const getSelectedChartPackImagesFlatten = createSelector(
    getChartPackCharts,
    getSelectedChartPackName,
    (chartPack, selectedChartPack) => {
        if (chartPack && selectedChartPack) {
            const result = [];
            const subCharts = chartPack[selectedChartPack] || [];
            subCharts.forEach((subChart) => {
                subChart.images.forEach((image) => {                    
                    result.push(image);
                });
            });
            return result;
        }
        return [];
    }
);

export const getSelectedChartPackChartsLoading = createSelector(
    getChartPackChartsLoading,
    getSelectedChartPackName,
    (chartPackLoading, selectedChartPack) => {
        if (chartPackLoading && selectedChartPack) {
            return chartPackLoading[selectedChartPack] || false;
        }
        return false;
    }
);

export const getSelectedChartPackChartsLoaded = createSelector(
    getChartPackChartsLoaded,
    getSelectedChartPackName,
    (chartPackLoaded, selectedChartPack) => {
        if (chartPackLoaded && selectedChartPack) {
            return chartPackLoaded[selectedChartPack] || false;
        }
        return false;
    }
);

export const getSelectedChartPackChartsError = createSelector(
    getChartPackChartsError,
    getSelectedChartPackName,
    (chartPackError, selectedChartPack) => {
        if (chartPackError && selectedChartPack) {
            return chartPackError[selectedChartPack] || null;
        }
        return null
    }
);