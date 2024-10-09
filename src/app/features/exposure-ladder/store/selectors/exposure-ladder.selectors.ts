import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromExposureLadder from '../reducers/exposure-ladder.reducer';

export const getExposureLadderState = createSelector(
    fromFeature.getExposureState,
    (state: fromFeature.ExposureLadderState) => state.exposureLadder
);

export const getExposureLadderLoadingStatus = createSelector(
    getExposureLadderState,
    fromExposureLadder.getExposureAsOfDatesLoading
)

export const getExposureAsOfDates = createSelector(
    getExposureLadderState,
    fromExposureLadder.getExposureAsOfDates
);

export const getExposureAsOfDatesLoadingStatus = createSelector(
    getExposureLadderState,
    fromExposureLadder.getExposureAsOfDatesLoading
);

export const getExposureAsOfDatesLoadedStatus = createSelector(
    getExposureLadderState,
    fromExposureLadder.getExposureAsOfDatesLoaded
);

export const getExposureAsOfDatesError = createSelector(
    getExposureLadderState,
    fromExposureLadder.getExposureAsOfDatesError
);

export const getActiveAsOfDate = createSelector(
    getExposureLadderState,
    fromExposureLadder.getActiveAsOfDate
);

export const getExposureLadderData = createSelector(
    getExposureLadderState,
    fromExposureLadder.getExposureLadderData
);


// export const getActiveAsOfDateExposureLadder = createSelector(
//     getActiveAsOfDate,
//     getExposureLadderEntities,
//     getNonFxHedgeMode,
//     (asOfdate, entities, nonfxHedgeMode) => {
//         if (asOfdate) {
//             if (entities[asOfdate]) {
//                 const rawData = Object.assign({}, entities[asOfdate]);
//                 rawData.data = exposureLadderDataFormater(rawData.data);
//                 if(!nonfxHedgeMode) rawData.data = rawData.data.filter(trade => trade.isFxHedged);
//                 return rawData;
//             } else {
//                 return entities[asOfdate];
//             }

//         }
//     }
// );

