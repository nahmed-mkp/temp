import { createAction } from '@ngrx/store';
import * as fromModels from '../../models';

export const changeAsOfDate = createAction( '[PricingEngine] Change RV as of date', (asOfDate: string) => ({ asOfDate }));
export const changeMode = createAction( '[PricingEngine] Change RV mode', (mode: 'live' | 'close') => ({ mode }) );

export const loadRVTrades = createAction( '[PricingEngine] Load RV Trades');
export const loadRVTradesComplete = createAction( '[PricingEngine] Load RV Trades Complete', (res: fromModels.IRvDataRes[]) => ({ res }) );
export const loadRVTradesFailed = createAction( '[PricingEngine] Load RV Trades Failed', (err: string) => ({ err }) );

export const loadSecurityDetail = createAction( '[PricingEngine] Load Security Detail', (asOfDate: string) => ({ asOfDate }) );
export const loadSecurityDetailComplete = createAction( '[PricingEngine] Load Security Detail Complete', (res: any) => ({ res }) );
export const loadSecurityDetailFailed = createAction( '[PricingEngine] Load Security Detail Failed', (err: string) => ({ err }) );

export const loadRvSecSuggestions = createAction( '[PricingEngine] Get Security Suggestions', (userInput: any) => ({ userInput }) );
export const loadRvSecSuggestionsComplete = createAction( '[PricingEngine] Get Security Suggestions Complete', (res: any) => ({ res }) );
export const loadRvSecSuggestionsFailed = createAction( '[PricingEngine] Get Security Suggestions Failed', (err: string) => ({ err }) );

export const resetRvSecSuggestions = createAction( '[PricingEngine] Reset Security Suggestions' );

export const loadMdidEnrichedData = createAction( '[PricingEngine] Load mdid enriched data', (payload: fromModels.IMdidEnrichmentReq) => ({ payload }) );
export const loadMdidEnrichedDataComplete = createAction( '[PricingEngine] Load mdid enriched data complete', (res: any) => ({ res }) );
export const loadMdidEnrichedDataFailed = createAction( '[PricingEngine] Load mdid enriched data failed', (err: string) => ({ err }) );

export const loadUserInputEnrichedData = createAction( '[PricingEngine] Load user input enriched data', (payload: fromModels.IDataInputEnrichmentReq) => ({ payload }) );
export const loadUserInputEnrichedDataComplete = createAction( '[PricingEngine] Load user input enriched data complete', (res: any) => ({ res }) );
export const loadUserInputEnrichedDataFailed = createAction( '[PricingEngine] Load user input enriched data failed', (err: string) => ({ err }) );

export const updateRvTradesComplete = createAction( '[PricingEngine] Update RV Trades complete', (res: any) => ({ res }) );
export const updateRvTradesFailed = createAction( '[PricingEngine] Update RV Trades failed', (err: string) => ({ err }) );

export const insertIntoRvTradesComplete = createAction( '[PricingEngine] Insert into RV Trades complete', (res: any) => ({ res }) );
export const insertIntoRvTradesFailed = createAction( '[PricingEngine] Insert into RV Trades failed', (err: string) => ({ err }) );

export const deleteSecsFromRvTrades = createAction( '[PricingEngine] Delete selected securities', (payload: number[]) => ({ payload }) );
export const deleteSecsFromRvTradesComplete = createAction( '[PricingEngine] Delete selected securities complete', (res: any) => ({ res }) );
export const deleteSecsFromRvTradesFailed = createAction( '[PricingEngine] Delete selected securities failed', (err: string) => ({ err }) );