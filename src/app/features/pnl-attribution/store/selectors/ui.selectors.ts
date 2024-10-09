import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromUi from '../reducers/ui.reducer';
import * as fromFeature from '../reducers';

export const getUiState = createSelector(
    fromFeature.getPnlAttributionState,
    (state: fromFeature.PnlAttributionState) => state.ui
);




export const getLayoutNames = createSelector(
    getUiState,
    fromUi.getLayoutNames
);

export const getActiveLayout = createSelector(
    getUiState,
    fromUi.getActiveLayout
);

export const getReadOnlyMode = createSelector(
    getUiState,
    fromUi.getReadOnlyMode
);







export const getGuidEntity = createSelector(
    getUiState,
    fromUi.getGuidEntity
);

export const getActiveGuidAdvance = createSelector(
    getActiveLayout,
    getGuidEntity,
    (layoutName, guidEntity) => {
        if (layoutName && guidEntity) {
            return guidEntity[layoutName];
        }
    }
)



export const getGuidByLayoutName = (layoutName) => {
    return createSelector(
        getGuidEntity,
        entity => entity && entity[layoutName]
    )
}


export const getAttributionRequestEntity = createSelector(
    getUiState,
    fromUi.getAttributionRequestEntity
);

export const getActiveAttributionRequest = createSelector(
    getActiveLayout,
    getAttributionRequestEntity,
    (layoutName, entity) => {
        if (layoutName && entity) {
            return entity[layoutName];
        }
    }
);

export const getAttributionRequestByLayoutName = (layoutName) => {
    return createSelector(
        getAttributionRequestEntity,
        entity => entity && entity[layoutName]
    )
};






export const getGridDisplayModeEntity = createSelector(
    getUiState,
    fromUi.getGridDisplayModeEntity
);

export const getActiveGridDisplayMode = createSelector(
    getGridDisplayModeEntity,
    getActiveLayout,
    (entity, layoutName) => entity && entity[layoutName] || null
);

export const getGridDisplayModeByLayoutName = (layoutName) => {
    return createSelector(
        getGridDisplayModeEntity,
        entity => entity && entity[layoutName]
    )
}





export const getActiveNodeIdEntity = createSelector(
    getUiState,
    fromUi.getActiveNodeIdEntity
);

export const getActiveNodeIdByLayoutName = (layoutName) => {
    return createSelector(
        getActiveNodeIdEntity,
        entity => entity && entity[layoutName]
    )
};

export const getActiveNodeCellWithMonthYearEntity = createSelector(
    getUiState,
    fromUi.getActiveNodeCellWithMonthYearEntity
);

export const getActiveNodeCellWithMonthYearByLayoutName = (layoutName) => {
    return createSelector(
        getActiveNodeCellWithMonthYearEntity,
        entity => entity && entity[layoutName]
    )
};












export const getLayoutEntity = createSelector(
    getUiState,
    fromUi.getLayoutEntity
);

export const getLayoutLoadingStatus = createSelector(
    getUiState,
    fromUi.getLayoutLoadingStatus
);

export const getLayoutLoadedStatus = createSelector(
    getUiState,
    fromUi.getLayoutLoadedStatus
);

export const getLayoutError = createSelector(
    getUiState,
    fromUi.getLayoutError
);


// export const getLayoutNames = createSelector(
//     getLayoutEntity,
//     entity => entity && Object.keys(entity)
// );

export const getLayoutCollection = createSelector(
    getLayoutEntity,
    entity => {
        const layoutCollection: any = {
            shared: [],
            private: [],
        };
        if (entity) {
            Object.keys(entity).forEach(key => {
                const layoutObj = entity[key];
                if (layoutObj.isShared) {
                    layoutCollection.shared.push({
                        layoutName: layoutObj.layoutName,
                        createdBy: layoutObj.createdBy,
                    });
                } else if (layoutObj.isShared === false) {
                    layoutCollection.private.push({
                        layoutName: layoutObj.layoutName,
                        createdBy: layoutObj.createdBy,
                    });
                }
            });
        }
        return layoutCollection;
    }
)

















export const getLayoutInfoByLayoutName = (layoutName) => {
    return createSelector(
        getLayoutEntity,
        entity => entity && entity[layoutName]
    );
}

export const getLayoutGroupingByLayoutName = (layoutName) => {
    return createSelector(
        getLayoutEntity,
        entity => entity && entity[layoutName] && entity[layoutName].grouping
    );
};

export const getLayoutFilterValueByLayoutName = (layoutName) => {
    return createSelector(
        getLayoutEntity,
        entity => entity && entity[layoutName] && entity[layoutName].filterValue
    );
};

export const getLayoutSortStateByLayoutName = (layoutName) => {
    return createSelector(
        getLayoutEntity,
        entity => entity && entity[layoutName] && entity[layoutName].sortState
    );
};

export const getLayoutDefaultByLayoutName = (layoutName) => {
    return createSelector(
        getLayoutEntity,
        entity => entity && entity[layoutName] && entity[layoutName].default
    );
};

export const getLayoutIsSharedByLayoutName = (layoutName) => {
    return createSelector(
        getLayoutEntity,
        entity => entity && entity[layoutName] && entity[layoutName].isShared
    );
};



export const getCommonGroupings = createSelector(
    getUiState,
    fromUi.getCommonGroupings
);

export const getCommonGroupingsLoading = createSelector(
    getUiState,
    fromUi.getCommonGroupingsLoadingStatus
);

export const getCommonGroupingsLoaded = createSelector(
    getUiState,
    fromUi.getCommonGroupingsLoadedStatus
);

export const getCommonGroupingsError = createSelector(
  getUiState,
  fromUi.getCommonGroupingsError
);


export const getCommonGroupingsMainCategory = createSelector(
    getCommonGroupings,
    result => {
        const mainCategoryNames = result.map(names => names[1]);
        const uniqueCategoryNames = _.uniq(mainCategoryNames);
        return uniqueCategoryNames;
    }
);

export const getCommonGroupingsByCategory = createSelector(
    getCommonGroupings,
    result => {
        const dict: any = {};

        result.forEach(names => {
            const mainCategoryName = names[1];
            if (dict[mainCategoryName] === undefined) {
                dict[mainCategoryName] = []
            }
            dict[mainCategoryName].push(names);
        });

        return dict;
    }
);
