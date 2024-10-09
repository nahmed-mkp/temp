import { createAction } from "@ngrx/store";
import * as fromModels from '../../models';

export const changeTab = createAction('[SSNC-Feed] Change active tab', (tab: string) => ({tab}));

export const changeFromDate = createAction('[SSNC-Feed] Change From date', (date: string) => ({date}))
export const changeToDate = createAction('[SSNC-Feed] Change To date', (date: string) => ({date}))

export const changeFilterText = createAction('[SSNC-Feed] Change filter text', (text: string) => ({text}));

export const changeSelectedDate = createAction('[SSNC-Feed] Change selected date', (date: string) => ({date}));
export const changeSelectedColumn = createAction('[SSNC-Feed] Change selected column', (col: string) => ({col}));

export const loadSummary = createAction('[SSNC-Feed] Load summary');
export const loadSummaryComplete = createAction('[SSNC-Feed] Load summary complete', (res: any) => ({res}));
export const loadSummaryFailed = createAction('[SSNC-Feed] Load summary failed', (err: string) => ({err}));

// export const loadFailedTrades = createAction('[SSNC-Feed] Load failed trades');
// export const loadFailedTradesComplete = createAction('[SSNC-Feed] Load failed trades complete', (res: any) => ({res}));
// export const loadFailedTradesFailed = createAction('[SSNC-Feed] Load failed trades failed', (err: string) => ({err}));

export const loadSSNCFeedData = createAction('[SSNC-Feed] Load ssnc feed data', (payload: fromModels.ISSNCFeedReq) => ({payload}));
export const loadSSNCFeedDataComplete = createAction('[SSNC-Feed] Load ssnc feed data complete', (res: any) => ({res}));
export const loadSSNCFeedDataFailed = createAction('[SSNC-Feed] Load ssnc feed failed', (err: string) => ({err}));

export const loadAdditionalSSNCFeedData = createAction('[SSNC-Feed] Load additional ssnc feed data', (client_ref: string) => ({client_ref}));
export const loadAdditionalSSNCFeedDataComplete = createAction('[SSNC-Feed] Load additional ssnc feed data complete', (res: any) => ({res}));
export const loadAdditionalSSNCFeedDataFailed = createAction('[SSNC-Feed] Load additional ssnc feed failed', (err: string) => ({err}));

export const selectOrderId = createAction('[SSNC-Feed] Select Sec Order Id', ( orderId: number ) => ({orderId}));

export const downloadTradeFile = createAction('[SSNC-Feed] Download trade file', (orderId: string) => ({orderId}));
export const downloadTradeFileComplete = createAction('[SSNC-Feed] Download trade file complete', (res: any) => ({res}));
export const downloadTradeFileFailed = createAction('[SSNC-Feed] Download trade file failed', (err: string) => ({err}));

export const downloadAckFile = createAction('[SSNC-Feed] Downlaod ack file', (orderId: string) => ({orderId}));
export const downloadAckFileComplete = createAction('[SSNC-Feed] Download ack file complete', (res: any) => ({res}));
export const downloadAckFileFailed = createAction('[SSNC-Feed] Download ack file failed', (err: string) => ({err}));