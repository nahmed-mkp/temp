import * as fromModels from '../../models';
import { createAction } from '@ngrx/store';

export const changeSettlementDate = createAction('[BluePearl] Change settlement date', (date: string) => ({date}));
export const changeMigrationDate = createAction('[BluePearl] Change migration date', (date: string) => ({date}));
export const changeSelectedFund = createAction('[BluePearl] Change fund', (fund: fromModels.IFundRes) => ({fund}));

export const loadFunds = createAction('[BluePearl] Load funds')
export const loadFundsComplete = createAction('[BluePearl] Load funds complete', (funds: any) => ({funds}))
export const loadFundsFailed = createAction('[BluePearl] Load funds failed', (err: any) => ({err}))

export const loadSettlementLadder = createAction('[BluePearl] Load settlement ladder', (payload: fromModels.ISettlementLadderRequest) => ({payload}))
export const loadSettlementLadderComplete = createAction('[BluePearl] Load settlement ladder complete', (funds: any) => ({funds}))
export const loadSettlementLadderFailed = createAction('[BluePearl] Load settlement ladder failed', (err: any) => ({err}))

