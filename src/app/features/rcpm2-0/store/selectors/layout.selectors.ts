import { createSelector } from '@ngrx/store';

import * as fromLayout from '../reducers/layout.reducer';
import * as fromFeature from '../reducers';

export const getLayoutState = createSelector(
    fromFeature.getRCPM2State,
    (state: fromFeature.RCPM2State) => state.layout
);



export const getUserSelectedCommonGrouping = createSelector(
    getLayoutState,
    fromLayout.getUserSelectedCommonGrouping
);

export const getSelectedLayoutsAdvance = createSelector(
    getLayoutState,
    fromLayout.getSelectedLayouts
)

// export const getActiveLayout = createSelector(
//     getLayoutState,
//     fromLayout.getActiveLayout
// )

// export const getActiveLayoutUserSelectedCommonGrouping = createSelector(
//     getActiveLayout,
//     getUserSelectedCommonGrouping,
//     (activeLayout, entity) => {
//         if (activeLayout && entity) {
//             return entity[activeLayout];
//         } else {
//             return undefined;
//         }
//     }
// )

export const getLayoutGroupingAlertEntity = createSelector(
    getLayoutState,
    fromLayout.getLayoutGroupingAlertEntity
);

export const getLayoutGroupingAlertByLayout = (layoutName: string) => {
    return createSelector(
        getLayoutGroupingAlertEntity,
        entity => entity && entity[layoutName] || []
    )
}









export const getTargetLayoutUserSelectedCommonGrouping = () => {
    return createSelector(
        getUserSelectedCommonGrouping,
        (entity, props) => {
            if (entity && props) {
                return entity[props];
            } else {
                return undefined;
            }
        }
    )
}








export const getUserLayoutsCloud = createSelector(
    getLayoutState,
    fromLayout.getUserLayouts
);

export const getUserLayoutsCloudLoading = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutsLoading
);

export const getUserLayoutsCloudLoaded = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutsLoaded
);

export const getUserLayoutsCloudError = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutsError
);





export const getStaticLayoutsEntity = createSelector(
    getLayoutState,
    fromLayout.getStaticLayouts
);

export const getStaticLayoutsLoading = createSelector(
    getLayoutState,
    fromLayout.getStaticLayoutsLoading
);

export const getStaticLayoutsLoaded = createSelector(
    getLayoutState,
    fromLayout.getStaticLayoutsLoaded
);

export const getStaticLayoutsError = createSelector(
    getLayoutState,
    fromLayout.getStaticLayoutsError
);


export const getStaticLayoutMainMenu = createSelector(
    getStaticLayoutsEntity,
    entity => {
        if (entity && entity['menus']) {
            return entity['menus'];
        } else {
            return [];
        }
    }
)

export const getStaticLayoutSubMenu = createSelector(
    getStaticLayoutsEntity,
    entity => {
        if (entity && entity['menu']) {
            return entity['menu'];
        } else {
            return null;
        }
    }
)

export const getStaticLayouts = createSelector(
    getStaticLayoutsEntity,
    entity => {
        if (entity && entity['layouts']) {
            return entity['layouts'];
        } else {
            return null;
        }
    }
)

export const getStaticLayoutConfigAndStyle = createSelector(
    getLayoutState,
    fromLayout.getStaticLayoutConfigAndStyle
);

export const getStaticLayoutConfigAndStyleByLayout = (layoutName: string) => {
    return createSelector(
        getStaticLayoutConfigAndStyle,
        (entity) => {
            if (entity && entity.layoutStyle && entity.layoutStyle[layoutName]) {
                return entity.layoutStyle[layoutName]
            } else {
                return {};
            }
        } 
    )
}

export const getStaticLayoutGridConfig = createSelector(
    getStaticLayoutConfigAndStyle,
    entity => {
        if (entity && entity['gridConfig']) {
            return entity['gridConfig'];
        } else {
            return {}
        }
    }
)

export const getStaticLayoutGroupingStyle = createSelector(
    getStaticLayoutConfigAndStyle,
    entity => {
        if (entity && entity['groupingStyle']) {
            return entity['groupingStyle'];
        } else {
            return {}
        }
    }
)


 


// export const getUserCloudSharedLayouts = createSelector(
//     getUserLayoutsCloud,
//     layoutEntity => {
//         if (layoutEntity && layoutEntity.shared) {
//             return layoutEntity.shared.map(item => {
//                 const targetKey = Object.keys(item)[0];
//                 return item[targetKey];
//             }) || [];
//         }
//     }
// )

// export const getUserCloudPrivateLayouts = createSelector(
//     getUserLayoutsCloud,
//     layoutEntity => {
//         if (layoutEntity && layoutEntity.private) {
//             return layoutEntity.private.map(item => {
//                 const targetKey = Object.keys(item)[0];
//                 return item[targetKey];
//             }) || [];
//         }
//     }
// )




export const getUserLayoutSaving = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutSaving
);

export const getUserLayoutSaved = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutSaved
);

export const getUserLayoutSaveError = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutSaveError
);



export const getUserLayoutDeleting = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutDeleting
);

export const getUserLayoutDeleted = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutDeleted
);

export const getUserLayoutDeleteError = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutDeleteError
);










export const getUserLayoutAndConfigLoading = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutAndConfigLoading
);

export const getUserLayoutAndConfigLoaded = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutAndConfigLoaded
);

export const getUserLayoutAndConfigError = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutAndConfigError
);


export const getUserGridConfigCloud = createSelector(
    getLayoutState,
    fromLayout.getUserGridConfigCloud
);

export const getUserGroupingStyleCloud = createSelector(
    getLayoutState,
    fromLayout.getUserGroupingStyleCloud
);

export const getUserLayoutStyleCloud = createSelector(
    getLayoutState,
    fromLayout.getUserLayoutStyleCloud
);

export const getSystemStyleCloud = createSelector(
    getLayoutState,
    fromLayout.getSystemStyleCloud
);


export const getUserLayoutStyleCloudByLayout = (layoutname: string) => {
    return createSelector(
        getUserLayoutStyleCloud,
        entity => entity && entity[layoutname] || null
    )
}



































