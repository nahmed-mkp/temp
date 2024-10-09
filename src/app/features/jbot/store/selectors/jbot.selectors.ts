import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromModel from '../../models';
import * as fromJbot from '../reducers/jbot.reducer';

const getJbotState = createSelector(
    fromFeature.getJbotState,
    (state: fromFeature.JbotState) => state.jbot
);


export const getActiveAsOfDate = createSelector(
    getJbotState,
    fromJbot.getActiveAsOfDate
);

export const getActiveSeries = createSelector(
    getJbotState,
    fromJbot.getActiveSeries
)



export const getAsOfDates = createSelector(
    getJbotState,
    fromJbot.getAsOfDates
);

export const getAsOfDateLoadingStatus = createSelector(
    getJbotState,
    fromJbot.getAsOfDateLoading
);

export const getAsOfDateLoadedStatus = createSelector(
    getJbotState,
    fromJbot.getAsOfDateLoaded
);

export const getAsOfDateError = createSelector(
    getJbotState,
    fromJbot.getAsOfDateError
);





export const getJbotResult = createSelector(
    getJbotState,
    fromJbot.getJbotResult
);

export const getJbotResultLoadingStatus = createSelector(
    getJbotState,
    fromJbot.getJbotResultLoading
);

export const getJbotResultLoadedStatus = createSelector(
    getJbotState,
    fromJbot.getJbotResultLoaded
);

export const getJbotResultError = createSelector(
    getJbotState,
    fromJbot.getJbotResultError
);




export const getJbotTimeseries = createSelector(
    getJbotState,
    fromJbot.getJbotTimeseries
);

export const getJbotTimeseriesFlat = createSelector(
    getJbotTimeseries,
    (timeseriesEntity) => Object.keys(timeseriesEntity).map(key => timeseriesEntity[key])
)

export const getJbotTimeseriesLoadingStatus = createSelector(
    getJbotState,
    fromJbot.getJbotTimeseriesLoading
);

export const getJbotTimeseriesLoadedStatus = createSelector(
    getJbotState,
    fromJbot.getJbotTimeseriesLoaded
);

export const getJbotTimeseriesError = createSelector(
    getJbotState,
    fromJbot.getJbotTimeseriesError
);








export const getActiveJbotResult = createSelector(
    getActiveAsOfDate,
    getJbotResult,
    (activeAsOfDate, jbotResultEntities) => {
        if(activeAsOfDate && jbotResultEntities) return jbotResultEntities[activeAsOfDate];
        else return [];
    }
);

export const getActiveJbotTimeseries = createSelector(
    getJbotTimeseries,
    (jbotTimeseriesEntities, prop) => {
        if(jbotTimeseriesEntities) return jbotTimeseriesEntities[prop.seriesName];
        else return [];
    }
);