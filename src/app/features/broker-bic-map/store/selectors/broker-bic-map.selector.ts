import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromBroker from '../reducers/broker-bic-map.reducer';


/**
 * Broker
 */
export const getBrokerState = createSelector(
    fromFeature.getBrokerBicMapFeatureState,
    (state: fromFeature.BrokerBicMapState) => state.broker
);



// -----------------------------------------------------

export const getActiveBroker = createSelector(
    getBrokerState,
    fromBroker.getActiveBroker
);









export const getBrokerListEntity = createSelector(
    getBrokerState,
    fromBroker.getBrokerListEntity
);

export const getBrokerListFlat = createSelector(
    getBrokerListEntity,
    entity => {
        const keys = Object.keys(entity);
        return keys.map(key => entity[key]);
    }
);

export const getBrokerListLoading = createSelector(
    getBrokerState,
    fromBroker.getBrokerListLoading
);

export const getBrokerListLoaded = createSelector(
    getBrokerState,
    fromBroker.getBrokerListLoaded
);

export const getBrokerListError = createSelector(
    getBrokerState,
    fromBroker.getBrokerListError
);







// export const getBrokerDetailEntity = createSelector(
//     getBrokerState,
//     fromBroker.getBrokerDetailEntity
// );

// export const getBrokerDetailLoadingEntity = createSelector(
//     getBrokerState,
//     fromBroker.getBrokerDetailLoadingEntity
// );

// export const getBrokerDetailLoadedEntity = createSelector(
//     getBrokerState,
//     fromBroker.getBrokerDetailLoadedEntity
// );

// export const getBrokerDetailErrorEntity = createSelector(
//     getBrokerState,
//     fromBroker.getBrokerDetailErrorEntity
// );

// export const getActiveBrokerDetail = createSelector(
//     getActiveBroker,
//     getBrokerDetailEntity,
//     (activeBroker, entity) => activeBroker && entity && entity[activeBroker] || []
// )






export const getBrokerDetailUpdating = createSelector(
    getBrokerState,
    fromBroker.getBrokerDetailUpdating
);

export const getBrokerDetailUpdated = createSelector(
    getBrokerState,
    fromBroker.getBrokerDetailUpdated
);

export const getBrokerDetailUpdateError = createSelector(
    getBrokerState,
    fromBroker.getBrokerDetailUpdateError
);