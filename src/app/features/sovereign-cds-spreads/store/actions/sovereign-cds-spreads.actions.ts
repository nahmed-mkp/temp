import { createAction } from "@ngrx/store";

export const changeAsOfDate = createAction( '[SovereignCdsSpreads] Change as of date', (date: string) => ({ date }) );

export const loadSovereignSpreadData = createAction( '[SovereignCdsSpreads] Load sovereign spread data');
export const loadSovereignSpreadDataComplete = createAction( '[SovereignCdsSpreads] Load sovereign spread data complete', (res: any) => ({ res }) );
export const loadSovereignSpreadDataFailed = createAction( '[SovereignCdsSpreads] Load sovereign spread data failed', (err: string) => ({ err }) );  



