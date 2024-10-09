import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromPnlRec from './rcpm-pnl-rec.reducer';
import * as fromPrizmSEIPnlRec from './prizm-sei-rec.reducer';

export interface RCPMPnlRecState {
    pnlRec: fromPnlRec.State;
    prizmSeiPnlRec: fromPrizmSEIPnlRec.State;
};


export interface State extends fromRoot.RootState {
    RCPMPnlRec: RCPMPnlRecState;
};

export const reducers = {
    pnlRec: fromPnlRec.reducer,
    prizmSeiPnlRec: fromPrizmSEIPnlRec.reducer
};

export const getRCPMPnlRecState = createFeatureSelector<RCPMPnlRecState>('RCPMPnlRec');


