import { createSelector } from '@ngrx/store';

import * as fromDirectionality from '../reducers/directionality.reducer';
import * as fromFeature from '../reducers';
import { ColDef } from 'ag-grid-community';

export const getDirectionalityState = createSelector(
    fromFeature.getRCPM2State,
    (state: fromFeature.RCPM2State) => state.directionality
);



// UI --------------------------------------------------------------




export const getDirectionalitySelectedLookbackEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalitySelectedLookbackEntity
);


export const getDirectionalityActiveTabIndexEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityActiveTabIndexEntity
);

export const getUpdateTimestampEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getUpdateTimestampEntity
);

export const getGridClearingEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getGridClearingEntity
);

export const getDisplayModeEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getDisplayModeEntity
);


export const getUpdateTimestampForLayout = (layoutName: string) => {
    return createSelector(
        getUpdateTimestampEntity,
        (entity) => {
            if (entity && entity[layoutName]) {
                return entity[layoutName];
            } else {
                return undefined;
            }
        }
    )
}

export const getGridClearingStatusForLayout = (layoutName: string) => {
    return createSelector(
        getGridClearingEntity,
        (entity) => {
            if (entity && entity[layoutName]) {
                return entity[layoutName];
            } else {
                return false;
            }
        }
    )
}

export const getDisplayModeForLayout = (layoutName: string) => {
    return createSelector(
        getDisplayModeEntity,
        (entity) => {
            if (entity && entity[layoutName]) {
                return entity[layoutName];
            } else {
                return undefined;
            }
        }
    )
}



// Data--------------------------------------------------------------




export const getDirectionalityInput = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityInput
);

export const getDirectionalityInputLoading = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityInputLoading
);

export const getDirectionalityInputLoaded = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityInputLoaded
);

export const getDirectionalityInputError = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityInputError
);






export const getRegressionFactors = createSelector(
    getDirectionalityState,
    fromDirectionality.getRegressionFactors
);

export const getRegressionFactorsLoading = createSelector(
    getDirectionalityState,
    fromDirectionality.getRegressionFactorsLoading
);

export const getRegressionFactorsLoaded = createSelector(
    getDirectionalityState,
    fromDirectionality.getRegressionFactorsLoaded
);

export const getRegressionFactorsError = createSelector(
    getDirectionalityState,
    fromDirectionality.getRegressionFactorsError
);






// export const getDirectionalitySelectedLookbackEntity = createSelector(
//     getDirectionalityState,
//     fromDirectionality.getDirectionalitySelectedLookbackEntity
// );

export const getDirectionalityEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityEntity
);

export const getDirectionalityLoadingEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityLoadingEntity
);

export const getDirectionalityLoadedEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityLoadedEntity
);

export const getDirectionalityErrorEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityErrorEntity
);





export const getDirectionalityScatterPlotDataEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityScatterPlotDataEntity
);

export const getDirectionalityScatterPlotDataLoadingEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityScatterPlotDataLoadingEntity
);

export const getDirectionalityScatterPlotDataLoadedEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityScatterPlotDataLoadedEntity
);

export const getDirectionalityScatterPlotDataErrorEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getDirectionalityScatterPlotDataErrorEntity
);

// export const getSelectedLayoutDirectionalityInput = () => {
//     return createSelector(
//         getDirectionalityInput,
//         (entity, props) => entity && entity[props]
//     );
// };

// export const getSelectedLayoutDirectionalityInputLoading = () => {
//     return createSelector(
//         getDirectionalityInputLoading,
//         (entity, props) => entity && entity[props]
//     );
// };

// export const getSelectedLayoutDirectionalityInputLoaded = () => {
//     return createSelector(
//         getDirectionalityInputLoaded,
//         (entity, props) => entity && entity[props]
//     );
// };

// export const getSelectedLayoutDirectionalityInputError = () => {
//     return createSelector(
//         getDirectionalityInputError,
//         (entity, props) => entity && entity[props]
//     );
// };


export const getSelectedLayoutDirectionality = () => {
    return createSelector(
        getDirectionalityEntity,
        (entity, props) => entity && entity[props]
    );
};

export const getSelectedLayoutDirectionalityLoading = () => {
    return createSelector(
        getDirectionalityLoadingEntity,
        (entity, props) => {
           return  entity && entity[props];
        }
    );
};

export const getSelectedLayoutDirectionalityLoaded = () => {
    return createSelector(
        getDirectionalityLoadedEntity,
        (entity, props) => entity && entity[props]
    );
};

export const getSelectedLayoutDirectionalityError = () => {
    return createSelector(
        getDirectionalityErrorEntity,
        (entity, props) => entity && entity[props]
    );
};

export const getSelectedLayoutScatterPlotDataWithLookback = (layoutName: string, lookback: string) => {
    return createSelector(
        getDirectionalityScatterPlotDataEntity,
        (entity) => {
            return entity[layoutName] &&  entity[layoutName][lookback];
        }
    );
};


export const getSelectedLayoutScatterPlotDataWithLookbackLoading = (layoutName: string, lookback: string) => {
    return createSelector(
        getDirectionalityScatterPlotDataLoadingEntity,
        (entity) => {
            return entity[layoutName] &&  entity[layoutName][lookback];
        }
    );
};

export const getSelectedLayoutScatterPlotDataWithLookbackLoaded = (layoutName: string, lookback: string) => {
    return createSelector(
        getDirectionalityScatterPlotDataLoadedEntity,
        (entity) => {
            return entity[layoutName] &&  entity[layoutName][lookback];
        }
    );
};

export const getSelectedLayoutScatterPlotDataWithLookbackError = (layoutName: string, lookback: string) => {
    return createSelector(
        getDirectionalityScatterPlotDataErrorEntity,
        (entity) => {
            return entity[layoutName] &&  entity[layoutName][lookback];
        }
    );
};


export const getSelectedLayoutLookBackCollection = (layoutName: string) => {
    return createSelector(
        getDirectionalitySelectedLookbackEntity,
        lookbackEntity => {
            if (lookbackEntity && lookbackEntity[layoutName]) {
                return  lookbackEntity[layoutName];
            }
        }
    )
}


export const getSelectedLayoutCurrentLookback = (layoutName: string) => {
    return createSelector(
        getDirectionalitySelectedLookbackEntity,
        getDirectionalityActiveTabIndexEntity,
        (lookbackEntity, activeTabEntity) => {
            if (lookbackEntity && activeTabEntity && lookbackEntity[layoutName] && activeTabEntity[layoutName] !== undefined) {
                const activeTab = activeTabEntity[layoutName];
                const selectedLookbackForLayout = lookbackEntity[layoutName];
                return selectedLookbackForLayout[activeTab];
            }
            // return entity[layoutName] && entity[layoutName];
        }
    );
};










export const getRegressionEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getRegressionEntity
);

export const getRegressionLoadingEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getRegressionLoadingEntity
);

export const getRegressionLoadedEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getRegressionLoadedEntity
);

export const getRegressionErrorEntity = createSelector(
    getDirectionalityState,
    fromDirectionality.getRegressionErrorEntity
);




// Regression Data Fetching ------------------------------------------------------------------

export const getRegressionFromLayout = (layoutName: string) => {
    return createSelector(
        getRegressionEntity,
        (entity) => {
            if (entity && entity[layoutName]) {
                return entity[layoutName];
            }
        }
    )
}

export const getRegressionDynamicColumnsFromLayout = (layoutName: string) => {
    return createSelector(
        getRegressionFromLayout(layoutName),
        regressionResult => {
            if (regressionResult && regressionResult['colDefs']) {
                const RegressionDynamicColumns: any = Object.keys(regressionResult['colDefs']).map(key => {
                    return {
                        name: regressionResult['colDefs'][key],
                        field: key,
                    };
                });

                return RegressionDynamicColumns;


                // return  {
                //     headerName: 'Regression',
                //     children: formattedColumnDefs
                // };
            }
        }
    )
}

export const getRegressionNonlinearDataFromLayout = (layoutName: string) => {
    return createSelector(
        getRegressionFromLayout(layoutName),
        regressionResult => {
            if (regressionResult && regressionResult['columns'] && regressionResult['root']) {
                return {
                    data: regressionResult['root'],
                    columns: regressionResult['columns']
                };
            }
        }
    )
}

export const getRegressionLoadingFromLayout = (layoutName: string) => {
    return createSelector(
        getRegressionLoadingEntity,
        (entity) => {
            if (entity && entity[layoutName]) {
                return entity[layoutName];
            }
        }
    )
}

export const getRegressionLoadedFromLayout = (layoutName: string) => {
    return createSelector(
        getRegressionLoadedEntity,
        (entity) => {
            if (entity && entity[layoutName]) {
                return entity[layoutName];
            }
        }
    )
}

export const getRegressionErrorFromLayout = (layoutName: string) => {
    return createSelector(
        getRegressionErrorEntity,
        (entity) => {
            if (entity && entity[layoutName]) {
                return entity[layoutName];
            }
        }
    )
}