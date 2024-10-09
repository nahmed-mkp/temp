import { Action, createAction } from '@ngrx/store';
import * as fromModels from '../../models';

export const toggleReasonEditor = createAction('[ExecutionTagging] Toggle reason editor');

export const changeStartDate = createAction('[ExecutionTagging] Change start date', (startDate: string) => ({ startDate }));
export const changeEndDate = createAction('[ExecutionTagging] Change end date', (endDate: string) => ({ endDate }));

/* ==================================== PORTFOLIO MANAGERS ==================================== */

export const loadPortfolioManagers = createAction('[ExecutionTagging] Load portfolio managers');
export const loadPortfolioManagersComplete = createAction('[ExecutionTagging] Load portfolio managers complete', (res: any) => ({ res }));
export const loadPortfolioManagersError = createAction('[ExecutionTagging] Load portfolio managers error', (err: any) => ({ err }));

export const changeCurrentPortfolioManager = createAction('[ExecutionTagging] Change portfolio manager', (portfolioManager: fromModels.IPortfolioManager) => ({ portfolioManager }));

/* ==================================== REASONS ==================================== */

export const loadReasons = createAction('[ExecutionTagging] Load reasons');
export const loadReasonsComplete = createAction('[ExecutionTagging] Load reasons complete', (res: any) => ({ res }));
export const loadReasonsError = createAction('[ExecutionTagging] Load reasons error', (err: any) => ({ err }));

export const updateReason = createAction('[ExecutionTagging] Update reasons', (payload: fromModels.IReasonsUpdateReq) => ({ payload }));
export const updateReasonComplete = createAction('[ExecutionTagging] Update reasons complete', (res: any) => ({ res }));
export const updateReasonError = createAction('[ExecutionTagging] Update reasons error', (err: any) => ({ err }));

/* ==================================== TAGS ==================================== */

export const loadExecutionsTaggingData = createAction('[ExecutionTagging] Load executions');
export const loadExecutionsTaggingDataComplete = createAction('[ExecutionTagging] Load executions complete', (res: any) => ({ res }));
export const loadExecutionsTaggingDataError = createAction('[ExecutionTagging] Load executions error', (err: any) => ({ err }));

export const updateTag = createAction('[ExecutionTagging] Update tags', (payload: fromModels.ITagsUpdateReq) => ({ payload }));
export const updateTagComplete = createAction('[ExecutionTagging] Update tags complete', (res: any) => ({ res }));
export const updateTagError = createAction('[ExecutionTagging] Update tags error', (err: any) => ({ err }));
