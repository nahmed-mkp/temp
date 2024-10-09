import { createAction } from "@ngrx/store";
import * as fromModels from '../../models';

export const loadPortfolioDates = createAction('[Agency-Deliverables] Load portfolio dates');
export const loadPortfolioDatesComplete = createAction('[Agency-Deliverables] Load portfolio dates complete', (payload: any) => ({payload}));
export const loadPortfolioDatesFailed = createAction('[Agency-Deliverables] Load portfolio dates failed', (err: string) => ({err}));

export const changeLatestPortfolioDate = createAction('[Agency-Deliverables] Change latest portfolio date', (payload: string) => ({payload}));

export const loadLatestPortfolioDate = createAction('[Agency-Deliverables] Load latest portfolio date');
export const loadLatestPortfolioDateComplete = createAction('[Agency-Deliverables] Load latest portfolio date complete', (payload: any) => ({payload}));
export const loadLatestPortfolioDateFailed = createAction('[Agency-Deliverables] Load latest portfolio date failed', (err: string) => ({err}));

export const loadDeliverableConfigData = createAction('[Agency-Deliverables] Load deliverable config data');
export const loadDeliverableConfigDataComplete = createAction('[Agency-Deliverables] Load deliverable config data complete', (payload: fromModels.IDeliverableData[]) => ({payload}));
export const loadDeliverableConfigDataFailed = createAction('[Agency-Deliverables] Load deliverable config data failed', (err: string) => ({err}));

export const updateDeliverableConfigData = createAction('[Agency-Deliverables] Update deliverable data', (payload: fromModels.IDeliverableData) => ({payload}));
export const updateDeliverableConfigDataComplete = createAction('[Agency-Deliverables] Update deliverable data complete', (payload: fromModels.IDeliverableData[]) => ({payload}));
export const updateDeliverableConfigDataFailed = createAction('[Agency-Deliverables] Update deliverable data failed', (err: string) => ({err}));

export const loadDeliverableData = createAction('[Agency-Deliverables] Load deliverable data', (portfolioDate: string) => ({portfolioDate}));
export const loadDeliverableDataComplete = createAction('[Agency-Deliverables] Load deliverable data complete', (payload: fromModels.IAgencyData[]) => ({payload}));
export const loadDeliverableDataFailed = createAction('[Agency-Deliverables] Load deliverable data failed', (err: string) => ({err}));

export const loadCashData = createAction('[Agency-Deliverables] Load cash data', (portfolioDate: string) => ({portfolioDate}));
export const loadCashDataComplete = createAction('[Agency-Deliverables] Load cash data complete', (payload: fromModels.IAgencyData[]) => ({payload}));
export const loadCashDataFailed = createAction('[Agency-Deliverables] Load cash data failed', (err: string) => ({err}));