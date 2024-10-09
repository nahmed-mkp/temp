import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromJbot from './jbot.reducer';
import * as fromJbotTech from './jbot-tech.reducer';
import * as fromJbotMonitor from './jbot-monitor.reducer';
import * as fromJbotSummary from './jbot-summary.reducer';

export interface JbotState {
    jbot: fromJbot.State;
    jbotTech: fromJbotTech.State;
    jbotMonitor: fromJbotMonitor.State;
    jbotSummary: fromJbotSummary.State;
}

export interface state extends fromRoot.RootState {
    jbot: JbotState;
}

export const reducers = {
    jbot: fromJbot.reducer,
    jbotTech: fromJbotTech.reducer,
    jbotMonitor: fromJbotMonitor.reducer,
    jbotSummary: fromJbotSummary.reducer,
};

export const getJbotState = createFeatureSelector<JbotState>('jbot');
