import { createAction } from "@ngrx/store";
import * as fromModels from '../../models';

export const loadImportableScenarios = createAction('[Scenario Analysis] Load importable scenarios');
export const loadImportableScenariosComplete = createAction('[Scenario Analysis] Load importable scenarios complete', (res: fromModels.IInitScenarioData) => ({res}));
export const loadImportableScenariosFailed = createAction('[Scenario Analysis] Load importable scenarios failed', (err: string) => ({err}));

export const loadScenarioByGuid = createAction('[Scenario Analysis] Load scenario by guid', (guid: string) => ({guid}));
export const loadScenarioByGuidComplete = createAction('[Scenario Analysis] Load scenario by guid complete', (res: fromModels.IScenario) => ({res}));
export const loadScenarioByGuidFailed = createAction('[Scenario Analysis] Load scenario by guid failed', (err: string) => ({err}));

export const saveScenario = createAction('[Scenario Analysis] Save scenario', (scenario: fromModels.IScenario) => ({scenario}));
export const saveScenarioComplete = createAction('[Scenario Analysis] Save scenario complete', (res: any) => ({res}));
export const saveScenarioFailed = createAction('[Scenario Analysis] Save scenario failed', (err: string) => ({err}));

export const loadPositionsGroupingData = createAction('[Scenario Analysis] Load positions grouping data');
export const loadPositionsGroupingDataComplete = createAction('[Scenario Analysis] Load positions grouping data complete', (res: any) => ({res}));
export const loadPositionsGroupingDataFailed = createAction('[Scenario Analysis] Load positions grouping data failed', (err: string) => ({err}));

export const loadPositionsLiteData = createAction('[Scenario Analysis] Load positions lite data');
export const loadPositionsLiteDataComplete = createAction('[Scenario Analysis] Load positions lite data complete', (res: any) => ({res}));
export const loadPositionsLiteDataFailed = createAction('[Scenario Analysis] Load positions lite data failed', (err: string) => ({err}));

export const addNewTab = createAction('[Scenario Analysis] Add new tab]', (tab: fromModels.ITab) => ({tab}));
export const switchTab = createAction('[Scenario Analysis] Change current tab', (tabName: string) => ({tabName}));
export const deleteTab = createAction('[Scenario Analysis] Delete tab', (tab: fromModels.ITab) => ({tab}));

export const updateGeneralShocks = createAction('[Scenario Analysis] Update general shocks', (shocks: fromModels.IGeneralShock[]) => ({shocks}));
export const updateCustomShocks = createAction('[Scenario Analysis] Update custom shocks', (shocks: fromModels.ICustomShock[]) => ({shocks}));

export const updateDates = createAction('[Scenario Analysis] Update dates', (dates: string[]) => ({dates}));

export const updateSIDInput = createAction('[Scenario Analysis] Enter SID input', (sid: string) => ({sid}));

export const resetSIDSuggestions = createAction('[Scenario Analysis] Reset SID suggestions');
export const getSIDSuggestions = createAction('[Scenario Analysis] Get SID suggestions', (sid: string) => ({sid}));
export const getSIDSuggestionsComplete = createAction('[Scenario Analysis] Get SID suggestions complete', (res: string[]) => ({res}));
export const getSIDSuggestionsFailed = createAction('[Scenario Analysis] Get SID suggestions failed', (err: string) => ({err}));

