import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromReconciliation from '../reducers/sec-master-reconciliation.reducer';

/**
 * Futures Root Management
 */
export const getSecMasterReconciliationState = createSelector(
    fromFeature.getSecurityMasterFeatureState,
    (state: fromFeature.SecurityMasterState) => state.reconciliation
);

// Reconciliation
export const getReconciliationRequest = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getReconciliationRequest
);

export const getOnlyDifferentColumnVisibility = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getOnlyDifferentColumnVisibility
);








export const getReconciliation = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getReconciliation
);

export const getReconciliationLoadingStatus = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getReconciliationLoading
);

export const getReconciliationLoadedStatus = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getReconciliationLoaded
);

export const getReconciliationError = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getReconciliationError
);


export const getReconciliationMatchData = createSelector(
    getReconciliation,
    result => result && result['Matched'] || []
);

export const getReconciliationUnMatchData = createSelector(
    getReconciliation,
    result => result && result['Unmatched'] || []
);









export const getMatchedSecurityDetailEntity = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getMatchedSecurityDetailEntity
);

export const getMatchedSecurityDetailLoadingEntity = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getMatchedSecurityDetailLoadingEntity
);

export const getMatchedSecurityDetailLoadedEntity = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getMatchedSecurityDetailLoadedEntity
);

export const getMatchedSecurityDetailErrorEntity = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getMatchedSecurityDetailErrorEntity
);



export const getUnMatchedSecurityDetailEntity = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getUnMatchedSecurityDetailEntity
);

export const getUnMatchedSecurityDetailLoadingEntity = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getUnMatchedSecurityDetailLoadingEntity
);

export const getUnMatchedSecurityDetailLoadedEntity = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getUnMatchedSecurityDetailLoadedEntity
);

export const getUnMatchedSecurityDetailErrorEntity = createSelector(
    getSecMasterReconciliationState,
    fromReconciliation.getUnMatchedSecurityDetailErrorEntity
);

export const getSecurityDetailBySecurityName = (securityName: string, match: boolean) => {

    if (match === true) {
        return createSelector(
            getMatchedSecurityDetailEntity,
            entity => entity && entity[securityName] || null
        );
    } else if (match === false) {
        return createSelector(
            getUnMatchedSecurityDetailEntity,
            entity => entity && entity[securityName] || null
        );
    } else {
        return null;
    }
}


export const getSecurityDetailLoadingStatusBySecurityName = (securityName: string, match: boolean) => {

    if (match === true) {
        return createSelector(
            getMatchedSecurityDetailLoadingEntity,
            entity => entity && entity[securityName]
        );
    } else if (match === false) {
        return createSelector(
            getUnMatchedSecurityDetailLoadingEntity,
            entity => entity && entity[securityName]
        );
    } else {
        return null;
    }
}


export const getSecurityDetailLoadedStatusBySecurityName = (securityName: string, match: boolean) => {

    if (match === true) {
        return createSelector(
            getMatchedSecurityDetailLoadedEntity,
            entity => entity && entity[securityName]
        );
    } else if (match === false) {
        return createSelector(
            getUnMatchedSecurityDetailLoadedEntity,
            entity => entity && entity[securityName]
        );
    } else {
        return null;
    }
}

