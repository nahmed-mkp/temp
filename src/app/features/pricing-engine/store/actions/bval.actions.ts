import { createAction } from '@ngrx/store';
import * as fromModels from '../../models';

export const changeBVALAsOfDate = createAction( '[PricingEngine] Change BVAL as of date', (asOfDate: string) => ({ asOfDate }));

export const loadBVALBondPrices = createAction( '[PricingEngine] Load BVAL Bond Prices');
export const loadBVALBondPricesComplete = createAction( '[PricingEngine] Load BVAL Bond Prices Complete', (res: fromModels.IBVALBondPriceRes[]) => ({ res }) );
export const loadBVALBondPricesFailed = createAction( '[PricingEngine] Load BVAL Bond Prices Failed', (err: string) => ({ err }) );

export const loadBVALBondPriceHistory = createAction( '[PricingEngine] Load BVAL Bond Price History', (userInput: fromModels.IBVALPriceHistoryReq) => ({ userInput }) );
export const loadBVALBondPriceHistoryComplete = createAction( '[PricingEngine] Load BVAL Bond Price History Complete', (res: fromModels.IBVALBondPriceHistoryRes[]) => ({ res }) );
export const loadBVALBondPriceHistoryFailed = createAction( '[PricingEngine] Load BVAL Bond Price History Failed', (err: string) => ({ err }) );
