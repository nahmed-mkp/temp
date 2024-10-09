import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromScenarioAnalysis from '../reducers/scenario-analysis.reducer';


export const getScenarioAnalysisStateSlice = createSelector(
    fromFeature.getScenarioAnalysisState,
    (state) => state.scenarioAnalysis
);

/* ================ TAB DATA  ===================== */

export const getTabs = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getTabs
)

export const getCurrTab = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getCurrTab
)

/* ================ POSITIONS GROUPING DATA  ===================== */

export const getPositionsGroupings = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getPositionsGroupingData
)

export const getPositionsGroupingsLoading = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getPositionsGroupingDataLoading
)

export const getPositionsGroupingsLoaded = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getPositionsGroupingDataLoaded
)

export const getPositionsGroupingsError = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getPositionsGroupingDataError
)

/* ================ POSITIONS LITE DATA  ===================== */

export const getPositions = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getPositionsLiteData
)

export const getPositionsLoading = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getPositionsLiteDataLoading
)

export const getPositionsLoaded = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getPositionsLiteDataLoaded
)

export const getPositionsError = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getPositionsLiteDataError
)

/* ================ SCENARIO DATA  ===================== */

export const getMetaData = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getMetaData
)

export const getImportableScenarios = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getImportableScenarios
)

export const getImportableScenariosLoading = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getImportableScenariosLoading
)

export const getImportableScenariosLoaded = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getImportableScenariosLoaded
)

export const getImportableScenariosError = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getImportableScenariosErrror
)


export const getPositionsAndGroupingData = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getPositionsAndGroupingData
)

/* ======================= SID PROMPT ==================== */

export const getSIDPrompt = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getSIDPrompt
)

export const getSIDPromptLoading = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getSIDPromptLoading
)

export const getSIDPromptLoaded = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getSIDPromptLoaded
)

export const getSIDPromptError = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getSIDPromptError
)


export const getDates = createSelector(
    getScenarioAnalysisStateSlice,
    fromScenarioAnalysis.getDates
)