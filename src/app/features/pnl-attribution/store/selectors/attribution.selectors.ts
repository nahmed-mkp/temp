import { createSelector } from '@ngrx/store';

import * as fromAttribution from '../reducers/attribution.reducers';
import * as fromFeature from '../reducers';
import * as fromUi from '../selectors/ui.selectors'

export const getAttributionState = createSelector(
    fromFeature.getPnlAttributionState,
    (state: fromFeature.PnlAttributionState) => state.attribution
);

export const getCustomGroupingAttributes = createSelector(
    getAttributionState,
    fromAttribution.getCustomGroupingAttributes
);

export const getCustomGroupingAttributesLoading = createSelector(
    getAttributionState,
    fromAttribution.getCustomGroupingAttributesLoading
);

export const getCustomGroupingAttributesLoaded = createSelector(
    getAttributionState,
    fromAttribution.getCustomGroupingAttributesLoaded
);


export const getAttributionLoadingEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionLoadingEntity
);

export const getAttributionLoadingStatusByLayoutName = (layoutName) => {
    return createSelector(
        getAttributionLoadingEntity,
        entity => entity && entity[layoutName]
    );
};

export const getAttributionLoadedEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionLoadedEntity
);

export const getAttributionLoadedStatusByLayoutName = (layoutName) => {
    return createSelector(
        getAttributionLoadedEntity,
        entity => entity && entity[layoutName]
    );
};

export const getAttributionErrorEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionErrorEntity
);

export const getAttributionErrorByLayoutName = (layoutName) => {
    return createSelector(
        getAttributionErrorEntity,
        entity => entity && entity[layoutName]
    );
};


export const getAttributionFlatDataEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionFlatDataEntity
);

export const getAttributionFlatDataByLayoutName = (layoutName) => {
    return createSelector(
        getAttributionFlatDataEntity,
        entity => entity && entity[layoutName] || []
    );
};

export const getAttributionTreeDataEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionTreeDataEntity
);

export const getAttributionTreeDataByLayoutName = (layoutName) => {
    return createSelector(
        getAttributionTreeDataEntity,
        entity => entity && entity[layoutName] || null
    );
};

export const getAttributionColumnsEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionColumnsEntity
);

export const getAttributionColumnsByLayoutName = (layoutName) => {
    return createSelector(
        getAttributionColumnsEntity,
        entity => entity && entity[layoutName] || []
    );
};

export const getAttributionLineItemEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionLineItemEntity
);

export const getAttributionLineItemLoadingEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionLineItemLoadingEntity
);

export const getAttributionLineItemLoadedEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionLineItemLoadedEntity
);

export const getAttributionLineItemErrorEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionLineItemErrorEntity
);

export const getAttributionLineItemByGuidAndId = (guid, id) => {

    return createSelector(
        getAttributionLineItemEntity,
        entity => {
            if (entity && entity[guid] && entity[guid][id]) {
                return entity[guid][id];
            } else {
                return [];
            }
        }
    )
}

export const getAttributionLineItemLoadingStatusByGuidAndId = (guid, id) => {

    return createSelector(
        getAttributionLineItemLoadingEntity,
        entity => {
            if (entity && entity[guid] && entity[guid][id]) {
                return entity[guid][id];
            } else {
                return null;
            }
        }
    )
}

export const getAttributionLineItemLoadedStatusByGuidAndId = (guid, id) => {

    return createSelector(
        getAttributionLineItemLoadedEntity,
        entity => {
            if (entity && entity[guid] && entity[guid][id]) {
                return entity[guid][id];
            } else {
                return null;
            }
        }
    )
}


export const getAttributionTimeseriesEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionTimeseriesEntity
);

export const getAttributionTimeseriesLoadingEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionTimeseriesLoadingEntity
);

export const getAttributionTimeseriesLoadedEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionTimeseriesLoadedEntity
);

export const getAttributionTimeseriesErrorEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionTimeseriesErrorEntity
);

export const getAttributionTimeseriesByLayoutName = (layoutName) => {

    return createSelector(
        getAttributionTimeseriesEntity,
        fromUi.getGuidByLayoutName(layoutName),
        fromUi.getActiveNodeIdByLayoutName(layoutName),
        (entity, guid ,activeNodeId) => {
            if (entity && entity[guid] && entity[guid][activeNodeId]) {
                return entity[guid][activeNodeId];
            } else {
                return [];
            }
        }
    )
}

export const getAttributionTimeseriesLoadingStatusByLayoutName = (layoutName) => {

    return createSelector(
        getAttributionTimeseriesLoadingEntity,
        fromUi.getGuidByLayoutName(layoutName),
        fromUi.getActiveNodeIdByLayoutName(layoutName),
        (entity, guid, activeNodeId) => {
            if (entity && entity[guid] && entity[guid][activeNodeId]) {
                return entity[guid][activeNodeId];
            } else {
                return null;
            }
        }
    )
}

export const getAttributionTimeseriesLoadedStatusByLayoutName = (layoutName: string) => {

    return createSelector(
        getAttributionTimeseriesLoadedEntity,
        fromUi.getGuidByLayoutName(layoutName),
        fromUi.getActiveNodeIdByLayoutName(layoutName),
        (entity, guid, activeNodeId) => {
            if (entity && entity[guid] && entity[guid][activeNodeId]) {
                return entity[guid][activeNodeId];
            } else {
                return null;
            }
        }
    )
}






export const getAttributionDetailEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionDetailEntity
);

export const getAttributionDetailLoadingEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionDetailLoadingEntity
);

export const getAttributionDetailLoadedEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionDetailLoadedEntity
);

export const getAttributionDetailErrorEntity = createSelector(
    getAttributionState,
    fromAttribution.getAttributionDetailErrorEntity
);

export const getAttributionDetailByLayoutName = (layoutName) => {

    return createSelector(
        getAttributionDetailEntity,
        fromUi.getGuidByLayoutName(layoutName),
        fromUi.getActiveNodeCellWithMonthYearByLayoutName(layoutName),
        (entity, guid ,combineId) => {
            if (entity && entity[guid] && entity[guid][combineId]) {
                return entity[guid][combineId];
            } else {
                return [];
            }
        }
    )
};

export const getAttributionDetailLoadingStatusByLayoutName = (layoutName) => {

    return createSelector(
        getAttributionDetailLoadingEntity,
        fromUi.getGuidByLayoutName(layoutName),
        fromUi.getActiveNodeCellWithMonthYearByLayoutName(layoutName),
        (entity, guid ,combineId) => {
            if (entity && entity[guid] && entity[guid][combineId]) {
                return entity[guid][combineId];
            } else {
                return null;
            }
        }
    )
};

export const getAttributionDetailLoadedStatusByLayoutName = (layoutName) => {

    return createSelector(
        getAttributionDetailLoadedEntity,
        fromUi.getGuidByLayoutName(layoutName),
        fromUi.getActiveNodeCellWithMonthYearByLayoutName(layoutName),
        (entity, guid ,combineId) => {
            if (entity && entity[guid] && entity[guid][combineId]) {
                return entity[guid][combineId];
            } else {
                return null;
            }
        }
    )
};














export const getAttributionReport = createSelector(
    getAttributionState,
    fromAttribution.getAttributionReport
);

export const getAttributionReportLoading = createSelector(
    getAttributionState,
    fromAttribution.getAttributionReportLoading
);

export const getAttributionReportLoaded = createSelector(
    getAttributionState,
    fromAttribution.getAttributionReportLoaded
);

export const getAttributionReportError = createSelector(
    getAttributionState,
    fromAttribution.getAttributionReportError
);


export const getAttributionReportPods = createSelector(
    getAttributionReport,
    result => {
        if (result && result.pods) {
            return result.pods;
        } else {
            return [];
        }
    }
);

export const getAttributionReportFunds = createSelector(
    getAttributionReport,
    result => {
        if (result && result.funds) {
            return result.funds;
        } else {
            return [];
        }
    }
);

export const getAttributionReportData = createSelector(
    getAttributionReport,
    result => {
        if (result && result.attribution) {
            return result.attribution;
        } else {
            return [];
        }
    }
)







export const getAttributionCapitalReport = createSelector(
    getAttributionState,
    fromAttribution.getAttributionCapitalReport
);

export const getAttributionCapitalReportLoading = createSelector(
    getAttributionState,
    fromAttribution.getAttributionCapitalReportLoading
);

export const getAttributionCapitalReportLoaded = createSelector(
    getAttributionState,
    fromAttribution.getAttributionCapitalReportLoaded
);

export const getAttributionCapitalReportError = createSelector(
    getAttributionState,
    fromAttribution.getAttributionCapitalReportError
);


export const getAttributionCapitals = createSelector(
    getAttributionCapitalReport,
    payload => {
        if (payload && payload.capitals) {
            const lastTotalRow =  getBottomTotalRow(payload.capitals, 'CrossPod')
            payload.capitals.push(lastTotalRow);
            return payload.capitals;
        } else {
            return [];
        }
    }
);




export const getAttributionPodCapitalReport = createSelector(
    getAttributionState,
    fromAttribution.getAttributionPodCapitalReport
);

export const getAttributionPodCapitalReportLoading = createSelector(
    getAttributionState,
    fromAttribution.getAttributionPodCapitalReportLoading
);

export const getAttributionPodCapitalReportLoaded = createSelector(
    getAttributionState,
    fromAttribution.getAttributionPodCapitalReportLoaded
);

export const getAttributionPodCapitalReportError = createSelector(
    getAttributionState,
    fromAttribution.getAttributionPodCapitalReportError
);

export const getAttributionPodCapital = createSelector(
    getAttributionPodCapitalReport,
    payload => {
        if (payload && payload.capitals) {
            const lastTotalRow =  getBottomTotalRow(payload.capitals, 'CrossPodName')
            payload.capitals.push(lastTotalRow);
            return payload.capitals;
        } else {
            return [];
        }
    }
);



export const getAttributionCapitalEomReport = createSelector(
    getAttributionState,
    fromAttribution.getAttributionCapitalEomReport
);

export const getAttributionCapitalEomReportLoading = createSelector(
    getAttributionState,
    fromAttribution.getAttributionCapitalEomReportLoading
);

export const getAttributionCapitalEomReportLoaded = createSelector(
    getAttributionState,
    fromAttribution.getAttributionCapitalEomReportLoaded
);

export const getAttributionCapitalEomReportError = createSelector(
    getAttributionState,
    fromAttribution.getAttributionCapitalEomReportError
);

export const getAttributionCapitalEom = createSelector(
    getAttributionCapitalEomReport,
    payload => {
        if (payload && payload.capitals) {
            const lastTotalRow =  getBottomTotalRow(payload.capitals, 'CrossPod')
            payload.capitals.push(lastTotalRow);
            return payload.capitals;
        } else {
            return [];
        }
    }
);

export const getAttributionPodCapitalEomReport = createSelector(
    getAttributionState,
    fromAttribution.getAttributionPodCapitalEomReport
);

export const getAttributionPodCapitalEomReportLoading = createSelector(
    getAttributionState,
    fromAttribution.getAttributionPodCapitalEomReportLoading
);

export const getAttributionPodCapitalEomReportLoaded = createSelector(
    getAttributionState,
    fromAttribution.getAttributionPodCapitalEomReportLoaded
);

export const getAttributionPodCapitalEomReportError = createSelector(
    getAttributionState,
    fromAttribution.getAttributionPodCapitalEomReportError
);

export const getAttributionPodCapitalEom = createSelector(
    getAttributionPodCapitalEomReport,
    payload => {
        if (payload && payload.capitals) {
            const lastTotalRow =  getBottomTotalRow(payload.capitals, 'CrossPodName')
            payload.capitals.push(lastTotalRow);
            return payload.capitals;
        } else {
            return [];
        }
    }
);

export const getReclassifyRepoToggle = createSelector(
    getAttributionState,
    fromAttribution.getReclassifyRepoToggle
);

export const getExcludeFundingToggle = createSelector(
    getAttributionState,
    fromAttribution.getExcludeFundingToggle
);

export const getIncludeBetaAdjustmentToggle = createSelector(
    getAttributionState,
    fromAttribution.getIncludeBetaAdjustmentToggle
);

function getBottomTotalRow(data: any[], targetNameField: string) {
    const result: any = {
        [targetNameField]: 'Total'
    }

    data.forEach(element => {
        Object.keys(element).forEach(key => {
            if (typeof element[key]==='number') {
                if (result[key] === undefined) {
                    result[key] =  element[key];
                } else {
                    result[key] += element[key]
                }
            }
        })
    });

    return result;
}

