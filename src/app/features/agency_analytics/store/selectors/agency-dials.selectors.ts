import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAgencyAnalytics from '../reducers/agency-dials.reducers';

const getAgencyDialsState = createSelector(
    fromFeature.getAgencyAnalyticsFeatureState,
    (state: fromFeature.AgencyAnalyticsState) => state.agencyDials
);

/** Default Template **/

export const getDefaultTemplateId = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getDefaultTemplateId
)

export const getDefaultTemplateDial = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getDefaultTemplateDial
)

export const getDefaultTemplateLoading = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getDefaultTemplateLoading
)

export const getDefaultTemplateLoaded = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getDefaultTemplateLoaded
)

export const getDefaultTemplateError = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getDefaultTemplateError
)

/** Dials **/

export const getDialIds = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getDialIds
)

export const getDialEntities = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getDialEntities
)

export const getDialsLoading = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getDialsLoading
)

export const getDialsLoaded = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getDialsLoaded
)

export const getDialsError = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getDialsError
)

export const getDials = createSelector(
    getDialIds,
    getDialEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
)


/** Selected Dial **/

export const getSelectedDialId = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getSelectedDialId
)

export const getSelectedDial = createSelector(
    getSelectedDialId, 
    getDialEntities, 
    (id, entities) => {
        return entities[id] || null;
    }
)

export const getSelectedDialDetail = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getSelectedDialDetail
)

export const getSelectedDialLoading = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getSelectedDialLoading
)

export const getSelectedDialLoaded = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getSelectedDialLoaded
)

export const getSelectedDialError = createSelector(
    getAgencyDialsState,
    fromAgencyAnalytics.getSelectedDialError
)
