import { createAction } from '@ngrx/store';

export const loadSyntheticTrades = createAction('[BluePearl] Load synthetic trades');
export const loadSyntheticTradesComplete = createAction('[BluePearl] Load synthetic trades complete', (res: any) => ({res}));
export const loadSyntheticTradesFailed = createAction('[BluePearl] Load synthetic trades failed', (err: string) => ({err}));
