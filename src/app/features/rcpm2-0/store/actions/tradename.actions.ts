import { createAction } from '@ngrx/store';

import * as fromModels from '../../models/tradename.models';

export const loadPmPodDetails = createAction('[TradeNames] Load PM Pod Details')
export const loadPmPodDetailsComplete = createAction('[TradeNames] Load PM Pod Details complete', (res: any) => ({res}))
export const loadPmPodDetailsFailed = createAction('[TradeNames] Load PM Pod Details failed', (err: string) => ({err}))

export const createTradeName = createAction('[TradeNameAllocations] Create TradeName', (payload: fromModels.INewTradeName) => ({payload}))
export const createTradeNameComplete = createAction('[TradeNameAllocations] Create TradeName complete', (res: fromModels.ITradeNameCreateResult) => ({res}))
export const createTradeNameFailed = createAction('[TradeNameAllocations] Create TradeName failed', (err: string) => ({err}))

export const clearTradeNameCreateMessage = createAction('[TradeNameAllocations] clear trade name create message')

export const loadClientServicesTradeThemes = createAction('TradeNames] Load client services trade themes')
export const loadClientServicesTradeThemesComplete = createAction('TradeNames] Load client services trade themes complete', (res: any) => ({res}))
export const loadClientServicesTradeThemesFailed = createAction('TradeNames] Load client services trade themes failed', (err: string) => ({err}))

export const loadMultipleAllocTradeNames = createAction('[TradeNameAllocations] Load multiple allocation tradenames')
export const loadMultipleAllocTradeNamesComplete = createAction('[TradeNameAllocations] Load multiple allocation tradenames complete', (res: fromModels.IMultiAllocTradeName[]) => ({res}))
export const loadMultipleAllocTradeNamesFailed = createAction('[TradeNameAllocations] Load multiple allocation tradenames failed', (err: string) => ({err}))

export const loadMultipleAllocTradeNameSplit = createAction('[TradeNameAllocations] Load multiple allocation tradename split', (payload: fromModels.IMultiAllocTradeName) => ({payload}))
export const loadMultipleAllocTradeNameSplitComplete = createAction('[TradeNameAllocations] Load multiple allocation tradename split complete', (res: fromModels.IMultiAllocationSplit[]) => ({res}))
export const loadMultipleAllocTradeNameSplitFailed = createAction('[TradeNameAllocations] Load multiple allocation tradename split failed', (err: string) => ({err}))

export const createMultipleAllocTradeNameSplit = createAction('[TradeNameAllocations] Create multiple allocation tradename split', (payload: fromModels.INewOrUpdateMultiAllocTradeName) => ({payload}))
export const createMultipleAllocTradeNameSplitComplete = createAction('[TradeNameAllocations] Create multiple allocation tradename split complete', (res: fromModels.INewOrUpdateMultiAllocTradeName) => ({res}))
export const createMultipleAllocTradeNameSplitFailed = createAction('[TradeNameAllocations] Create multiple allocation tradename split failed', (err: string) => ({err}))

export const updateMultipleAllocTradeNameSplit = createAction('[TradeNameAllocations] Update multiple allocation tradename split', (payload: fromModels.INewOrUpdateMultiAllocTradeName) => ({payload}))
export const updateMultipleAllocTradeNameSplitComplete = createAction('[TradeNameAllocations] Update multiple allocation tradename split complete', (res: fromModels.INewOrUpdateMultiAllocTradeName) => ({res}))
export const updateMultipleAllocTradeNameSplitFailed = createAction('[TradeNameAllocations] Update multiple allocation tradename split failed', (err: string) => ({err}))
