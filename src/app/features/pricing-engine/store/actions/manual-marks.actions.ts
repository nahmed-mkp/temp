import { createAction } from "@ngrx/store";

export const changeDate = createAction( '[PricingEngine] Change Manual Marks as of date', (asOfDate: string) => ({ asOfDate }));

export const loadManualMarks = createAction('[Pricing Engine] Load Manual Marks');
export const loadManualMarksComplete = createAction('[Pricing Engine] Load Manual Marks complete', (res: any) => ({ res }));
export const loadManualMarksFailed = createAction('[Pricing Engine] Load Manual Marks failed', (err: string) => ({ err }));  