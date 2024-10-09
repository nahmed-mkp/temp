import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromPosition from '../reducers/rcpm2-positions.reducer';
import * as fromFeature from '../reducers';

export const getRCPM2PositionState = createSelector(
    fromFeature.getRCPM2State,
    (state: fromFeature.RCPM2State) => state.positions
);

// export const getRCPM2ActiveDate = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getActiveDate
// );

// export const getTraders = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getTraders
// );

// export const getManagers = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getManagers
// );

export const getActiveDate = createSelector(
    getRCPM2PositionState,
    fromPosition.getActiveDate
);

export const getIsOnCurrentDate = createSelector(
    getRCPM2PositionState,
    fromPosition.getIsOnCurrentDate
);


export const getPositionLookups = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionLookups
);

export const getPositionLookupsLoading = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionLookupsLoading
);

export const getPositionLookupsLoaded = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionLookupsLoaded
);

export const getPositionLookupsError = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionLookupsError
);


export const getMissingCloses = createSelector(
    getRCPM2PositionState, 
    fromPosition.getMissingCloses
)


export const getMissingClosesLoading = createSelector(
    getRCPM2PositionState, 
    fromPosition.getMissingClosesLoading
)

export const getMissingClosesLoaded = createSelector(
    getRCPM2PositionState, 
    fromPosition.getMissingClosesLoaded
)




export const getNonlinearSupportGrouping = createSelector(
    getRCPM2PositionState,
    fromPosition.getNonlinearSupportGrouping
);

export const getNonlinearSupportGroupingLoading = createSelector(
    getRCPM2PositionState,
    fromPosition.getNonlinearSupportGroupingLoading
);

export const getNonlinearSupportGroupingLoaded = createSelector(
    getRCPM2PositionState,
    fromPosition.getNonlinearSupportGroupingLoaded
);

export const getNonlinearSupportGroupingError = createSelector(
    getRCPM2PositionState,
    fromPosition.getNonlinearSupportGroupingError
);

export const getPositionPresetLayout = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionPresetLayout
);

export const getPositionPresetLayoutLoading = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionPresetLayoutLoading
);

export const getPositionPresetLayoutLoaded = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionPresetLayoutLoaded
);

export const getPositionPresetLayoutError = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionPresetLayoutError
);

export const getPositionDates = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionDates
);

export const getPositionDatesLoading = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionDatesLoading
);

export const getPositionDatesLoaded = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionDatesLoaded
);

export const getPositionDatesError = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionDatesError
);

export const getPositionDatesFormat = createSelector(
    getPositionDates,
    (dateObj) => {
        if (dateObj) {
            const dates = Object.keys(dateObj.portfolios).map(key => {
                const date = dateObj.portfolios[key].date;
                // if (date[0] === '0') {
                //     date = date.substring(1);
                // }
                return date;
            });
            dates.sort((a, b) => (new Date(a)).getTime() - (new Date(b)).getTime());
            return dates || [];
        } else {
            return [];
        }
    }
);

export const getLatestAvailableDate = createSelector(
    getPositionDates,
    (dateObj) => {
        if (dateObj) {
            const latest = dateObj.latest;
            const latestDate = dateObj.portfolios[latest].date;
            // if (latestDate[0] === '0') {
            //     latestDate = latestDate.substring(1);
            // }
            return latestDate;
        } else {
            return undefined;
        }
    }
);

export const getLatestPositionDate = createSelector(
    getRCPM2PositionState,
    fromPosition.getLatestPositionDate
);

export const getLatestPositionDateLoading = createSelector(
    getRCPM2PositionState,
    fromPosition.getLatestPositionDateLoading
);

export const getLatestPositionDateLoaded = createSelector(
    getRCPM2PositionState,
    fromPosition.getLatestPositionDateLoaded
);

export const getLatestPositionDateError = createSelector(
    getRCPM2PositionState,
    fromPosition.getLatestPositionDateError
);

export const getPositionDateLoadToggle = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionDateLoadToggle
);

export const getPositionTimeStamp = createSelector(
    getRCPM2PositionState,
    fromPosition.getTimeStamp
);

export const getTimeStampCollection = createSelector(
    getRCPM2PositionState,
    fromPosition.getTimeStampCollection
);

export const getPositionManager = createSelector(
    getRCPM2PositionState,
    fromPosition.getManagers
);

export const getPositionManagerSorted = createSelector(
    getPositionManager,
    managers => {
        if (managers && managers.length && managers.length > 0) {
            const managersSorted = [...managers];
            managersSorted.sort((valueA, valueB) => {
                if (valueA === '' || valueA === undefined) {
                    return 1;
                } else if (valueB === '' || valueB === undefined) {
                    return -1;
                } else {
                    return valueA.localeCompare(valueB);
                }
            });
            return managersSorted;

        } else {
            return [];
        }
    }
);

export const getSpinningActivate = createSelector(
    getRCPM2PositionState,
    fromPosition.getSpinningActivate
);

export const getUserLayouts = createSelector(
    getRCPM2PositionState,
    fromPosition.getUserLayouts
);

export const getUserLayoutStyle = createSelector(
    getRCPM2PositionState,
    fromPosition.getUserLayoutStyle
);


/*  Important Notice Keep in mind that a selector only keeps the previous input arguments in its cache. If you reuse this selector with another props factor,
 the selector would always have to re-evaluate its value. This is because it's receiving both of the multiply factors (e.g. one time 2, the other time 4).
  In order to correctly memoize the selector, wrap the selector inside a factory function to create different instances of the selector.*/

export const getSelectedLayoutStyle = () => {
    return createSelector(
        getUserLayoutStyle,
        (styleEntity, props) => {
            return styleEntity && styleEntity[props];
        }
    );
};

export const getDataSourcePermission = createSelector(
    getRCPM2PositionState,
    fromPosition.getDataSourcePermission
);

export const getDataSourcePermissionLoading = createSelector(
    getRCPM2PositionState,
    fromPosition.getDataSourcePermissionLoading
);

export const getDataSourcePermissionLoaded = createSelector(
    getRCPM2PositionState,
    fromPosition.getDataSourcePermissionLoaded
);

export const getDataSourcePermissionError = createSelector(
    getRCPM2PositionState,
    fromPosition.getDataSourcePermissionError
);

// layout spectific data---------------------------------------------------------------------------------------------------------------------------------------------
// export const getActiveLayout = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getActiveLayout
// );

export const getSelectedLayouts = createSelector(
    getRCPM2PositionState,
    fromPosition.getSelectedLayouts
);

export const getRcpm20PositionsEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20PositionsEntity
);

export const getRcpm20PositionsLoadingEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20PositionsLoadingEntity
);

export const getRcpm20PositionsLoadedEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20PositionsLoadedEntity
);

export const getRcpm20PositionsErrorEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20PositionsErrorEntity
);

export const getSelectedLayoutPositionData = createSelector(
    getRcpm20PositionsEntity,
    (entity, props) => {
        if (props && entity[props]) {
            return entity[props].rcpm20Positions;
        } else {
            return [];
        }
    }
);

export const getSelectedLayoutPositionLoading = () => {
    return createSelector(
        getRcpm20PositionsLoadingEntity,
        (entity, props) => {
            return entity && entity[props];
        }
    );
};

// export const getSelectedLayoutPositionLoading = createSelector(
//     getRcpm20PositionsLoadingEntity,
//     (entity, props) => {
//         console.log('getSelectedLayoutPositionLoading', props);
//         return entity && entity[props];
//     }
// );

export const getSelectedLayoutPositionLoaded = () => {
    return createSelector(
        getRcpm20PositionsLoadedEntity,
        (entity, props) => {
            return entity && entity[props];
        }
    );
};


// export const getSelectedLayoutPositionLoaded = createSelector(
//     getRcpm20PositionsLoadedEntity,
//     (entity, props) => entity && entity[props]
// );

export const getSelectedLayoutPositionError = () => {
    return createSelector(
        getRcpm20PositionsErrorEntity,
        (entity, props) => entity && entity[props]
    );
};

// export const getSelectedLayoutPositionError = createSelector(
//     getRcpm20PositionsErrorEntity,
//     (entity, props) => entity && entity[props]
// );

export const getRcpm20NonlinearAggDataEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20NonlinearAggDataEntity
);

export const getRcpm20NonlinearAggDataLoadingEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20NonlinearAggDataLoadingEntity
);

export const getRcpm20NonlinearAggDataLoadedEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20NonlinearAggDataLoadedEntity
);

export const getRcpm20NonlinearAggDataErrorEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20NonlinearAggDataErrorEntity
);

export const getSelectedLayoutNonlinearAggData = () => {
    return createSelector(
        getRcpm20NonlinearAggDataEntity,
        (entity, props) => {
            if (props && entity[props]) {
                return entity[props].nonlinearAggData;
            } else {
                return [];
            }
        }
    );
};

// export const getSelectedLayoutNonlinearAggData = createSelector(
//     getRcpm20NonlinearAggDataEntity,
//     (entity, props) => {
//         console.log('getSelectedLayoutNonlinearAggData', props)
//         if (props && entity[props]) {
//             return entity[props].nonlinearAggData;
//         } else {
//             return [];
//         }
//     }
// );

export const getSelectedLayoutNonlinearAggDatasLoading = () => {
    return createSelector(
        getRcpm20NonlinearAggDataLoadingEntity,
        (entity, props) => {
            return entity && entity[props];
        }
    );
};

// export const getSelectedLayoutNonlinearAggDatasLoading = createSelector(
//     getRcpm20NonlinearAggDataLoadingEntity,
//     (entity, props) => {
//         console.log('getSelectedLayoutNonlinearAggDatasLoading', props);
//         return entity && entity[props]
//     }
// );

export const getSelectedLayoutNonlinearAggDatasLoaded = () => {
    return createSelector(
        getRcpm20NonlinearAggDataLoadedEntity,
        (entity, props) => entity && entity[props]
    );
};

// export const getSelectedLayoutNonlinearAggDatasLoaded = createSelector(
//     getRcpm20NonlinearAggDataLoadedEntity,
//     (entity, props) => entity && entity[props]
// );

export const getSelectedLayoutNonlinearAggDataError = () => {
    return createSelector(
        getRcpm20NonlinearAggDataErrorEntity,
        (entity, props) => entity && entity[props]
    );
};

// export const getSelectedLayoutNonlinearAggDataError = createSelector(
//     getRcpm20NonlinearAggDataErrorEntity,
//     (entity, props) => entity && entity[props]
// );

export const getRcpm20NonlinearPnlDataEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20NonlinearPnlDataEntity
);

export const getRcpm20NonlinearPnlDataLoadingEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20NonlinearPnlDataLoadingEntity
);

export const getRcpm20NonlinearPnlDataLoadedEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20NonlinearPnlDataLoadedEntity
);

export const getRcpm20NonlinearPnlDataErrorEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20NonlinearPnlDataErrorEntity
);

export const getSelectedLayoutNonlinearPnlData = (layoutName: string) => {
    return createSelector(
        getRcpm20NonlinearPnlDataEntity,
        entity => entity && entity[layoutName] || {}
    );
};

export const getSelectedLayoutNonlinearPnlDatasLoading = (layoutName: string) => {
    return createSelector(
        getRcpm20NonlinearPnlDataLoadingEntity,
        entity => entity && entity[layoutName]
    );
};

export const getSelectedLayoutNonlinearPnlDatasLoaded = (layoutName: string) => {
    return createSelector(
        getRcpm20NonlinearPnlDataLoadedEntity,
        entity => entity && entity[layoutName]
    );
};

export const getSelectedLayoutNonlinearPnlDataError = (layoutName: string) => {
    return createSelector(
        getRcpm20NonlinearPnlDataErrorEntity,
        entity => entity && entity[layoutName]
    );
};





































export const getRcpm20PositionsGroupingsEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20PositionsGroupingsEntity
);

export const getRcpm20PositionsGroupingsLoadingEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20PositionsGroupingsLoadingEntity
);

export const getRcpm20PositionsGroupingsLoadedEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20PositionsGroupingsLoadedEntity
);

export const getRcpm20PositionsGroupingsErrorEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20PositionsGroupingsErrorEntity
);

export const getSelectedLayoutGroupings = createSelector(
    getRcpm20PositionsGroupingsEntity,
    (entity, props) => {
        if (props && entity[props]) {
            return entity[props].rcpm20PositionsGroupings;
        } else {
            return [];
        }
    }
);


export const getSelectedLayoutGroupingsLoading = createSelector(
    getRcpm20PositionsGroupingsLoadingEntity,
    (entity, props) => entity && entity[props]
);

export const getSelectedLayoutGroupingsLoaded = createSelector(
    getRcpm20PositionsGroupingsLoadedEntity,
    (entity, props) => entity && entity[props]
);

export const getSelectedLayoutGroupingsError = createSelector(
    getRcpm20PositionsGroupingsErrorEntity,
    (entity, props) => entity && entity[props]
);

export const getSelectedLayoutCombineLoadedStatus = () => {
    return createSelector(
        getRcpm20PositionsLoadedEntity,
        getRcpm20PositionsGroupingsLoadedEntity,
        (positionsLoadedEntity, groupingsLoadedEntity, props) => {
            if (positionsLoadedEntity[props] && groupingsLoadedEntity[props]) {
                return positionsLoadedEntity[props].rcpm20PositonsLoaded && groupingsLoadedEntity[props].rcpm20PositionsGroupingsLoaded;
            } else {
                return false;
            }
        }
    );
};

// export const getSelectedLayoutCombineLoadedStatus = createSelector(
//     getRcpm20PositionsLoadedEntity,
//     getRcpm20PositionsGroupingsLoadedEntity,
//     (positionsLoadedEntity, groupingsLoadedEntity, props) => {
//         console.log('getSelectedLayoutCombineLoadedStatus', props)
//         if (positionsLoadedEntity[props] && groupingsLoadedEntity[props]) {
//             return positionsLoadedEntity[props].rcpm20PositonsLoaded && groupingsLoadedEntity[props].rcpm20PositionsGroupingsLoaded;
//         } else {
//             return false;
//         }
//     }
// );


export const getRcpm20PositionsGroupingCombineEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20PositionsGroupingCombineEntity
);

export const getSelectedLayoutPositionsWithGroupings = () => {
    return createSelector(
        getRcpm20PositionsGroupingCombineEntity,
        (entity, props) => {
            return entity && entity[props];
        }
    );
};

// export const getSelectedLayoutPositionsWithGroupings = createSelector(
//     getRcpm20PositionsGroupingCombineEntity,
//     (entity, props) => {
//         console.log('getting combine data for layout: ', props);
//         return entity && entity[props]
//     }
// )















export const getPrimaryGroupingNameIdMappingEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getPrimaryGroupingNameIdMappingEntity
);

export const getSelectedLayoutPrimaryGroupingNameIdMapping = () => {
    return createSelector(
        getPrimaryGroupingNameIdMappingEntity,
        (entity, props) => {
            if (props && entity[props]) {
                return entity[props];
            } else {
                return null;
            }
        }
    );
};

// export const getSelectedLayoutPrimaryGroupingNameIdMapping = createSelector(
//     getPrimaryGroupingNameIdMappingEntity,
//     (entity, props) => {
//         console.log('getSelectedLayoutPrimaryGroupingNameIdMapping', props)
//         if (props && entity[props]) {
//             return entity[props];
//         } else {
//             return null;
//         }
//     }
// );





export const getRcpm20ExecutionsEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20ExecutionsEntity
);

export const getRcpm20ExecutionsLoadingEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20ExecutionsLoadingEntity
);

export const getRcpm20ExecutionsLoadedEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20ExecutionsLoadedEntity
);

export const getRcpm20ExecutionsErrorEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20ExecutionsErrorEntity
);

export const getSelectedAsOfDateExecutions = createSelector(
    getRcpm20ExecutionsEntity,
    (entity, props) => {
        console.log('getSelectedAsOfDateExecutions', props);
        if (props && entity[props]) {
            return entity[props].rcpm20Executions;
        } else {
            return [];
        }
    }
);

export const getSelectedAsOfDateExecutionsLoading = createSelector(
    getRcpm20ExecutionsLoadingEntity,
    (entity, props) => entity && entity[props]
);


export const getSelectedAsOfDateExecutionsLoaded = createSelector(
    getRcpm20ExecutionsLoadedEntity,
    (entity, props) => entity && entity[props]
);

export const getSelectedAsOfDateExecutionsError = createSelector(
    getRcpm20ExecutionsErrorEntity,
    (entity, props) => entity && entity[props]
);

export const getSelectedAsOfDateExecutionsTraders = createSelector(
    getRcpm20ExecutionsEntity,
    (entity, props) => {
        console.log('getSelectedAsOfDateExecutionsTraders', props);
        if (props && entity[props]) {
            return entity[props].traders;
        } else {
            return [];
        }
    }
);






export const getRcpm20ExecutionsAdvanceEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20ExecutionsAdvanceEntity
);

export const getRcpm20ExecutionsAdvanceLoadingEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20ExecutionsAdvanceLoadingEntity
);

export const getRcpm20ExecutionsAdvanceLoadedEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20ExecutionsAdvanceLoadedEntity
);

export const getRcpm20ExecutionsAdvanceErrorEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getRcpm20ExecutionsAdvanceErrorEntity
);


export const getSelectedLayoutExecutions = (layoutName: string) => {
    return createSelector(
        getRcpm20ExecutionsAdvanceEntity,
        entity => entity && entity[layoutName] && entity[layoutName].data || []
    );
};

export const getSelectedLayoutExecutionsTraders = (layoutName: string) => {
    return createSelector(
        getRcpm20ExecutionsAdvanceEntity,
        entity => entity && entity[layoutName] && entity[layoutName].traders || []
    );
};

export const getSelectedLayoutExecutionsLoading = (layoutName: string) => {
    return createSelector(
        getRcpm20ExecutionsAdvanceLoadingEntity,
        entity => entity && entity[layoutName]
    );
};

export const getSelectedLayoutExecutionsLoaded = (layoutName: string) => {
    return createSelector(
        getRcpm20ExecutionsAdvanceLoadedEntity,
        entity => entity && entity[layoutName]
    );
};

export const getSelectedLayoutExecutionsError = (layoutName: string) => {
    return createSelector(
        getRcpm20ExecutionsAdvanceErrorEntity,
        entity => entity && entity[layoutName]
    );
};




// export const getRcpm20Positions = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getRcpm20Positions
// );

// export const getRcpm20PositonsLoading = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getRcpm20PositonsLoading
// );

// export const getRcpm20PositonsLoaded = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getRcpm20PositonsLoaded
// );

// export const getRcpm20PositonsError = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getRcpm20PositonsError
// );




// export const getRcpm20PositionsGroupings = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getRcpm20PositionsGroupings
// );

// export const getRcpm20PositionsGroupingsLoading = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getRcpm20PositionsGroupingsLoading
// );

// export const getRcpm20PositionsGroupingsLoaded = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getRcpm20PositionsGroupingsLoaded
// );

// export const getRcpm20PositionsGroupingsError = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getRcpm20PositionsGroupingsError
// );

// export const getRcpm20PositionsWithGroupings = createSelector(
//     getRcpm20Positions,
//     getRcpm20PositionsGroupings,
//     (positions, groupings) => {
//         if (groupings && groupings.length > 0) {
//             const groupingMaping: any = {};
//             groupings.forEach(element => groupingMaping[element.Id] = element);
//             const combineResult = positions.map(element => {
//                 if (groupingMaping[element.Id]) {
//                     return {...element, ...groupingMaping[element.Id]} // Object.assign({}, element, groupingMaping[element.Id]);
//                 } else {
//                     return element;
//                 }
//             });
//             return combineResult;
//         } else {
//             return [];
//         }

//     }
// );



// export const getPrimaryGroupingNameIdMaping = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getPrimaryGroupingNameIdMaping
// );









// export const getRcpm20Executions = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getRcpm20Executions
// );

// export const getRcpm20ExecutionsLoading = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getRcpm20ExecutionsLoading
// );

// export const getRcpm20ExecutionsLoaded = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getRcpm20ExecutionsLoaded
// );

// export const getRcpm20ExecutionsError = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getRcpm20ExecutionsError
// );



// export const getNonlinearAggData = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getNonlinearAggData
// );

// export const getNonlinearAggDataLoading = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getNonlinearAggDataLoading
// );

// export const getNonlinearAggDataLoaded = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getNonlinearAggDataLoaded
// );

// export const getNonlinearAggDataError = createSelector(
//     getRCPM2PositionState,
//     fromPosition.getNonlinearAggDataError
// );




export const getPositionInfoEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionInfoEntity
);

export const getPositionInfoLoadingEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionInfoLoadingEntity
);

export const getPositionInfoLoadedEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionInfoLoadedEntity
);

export const getPositionInfoErrorEntity = createSelector(
    getRCPM2PositionState,
    fromPosition.getPositionInfoErrorEntity
);

export const getSelectedLayoutPositionInfo = () => {
    return createSelector(
        getPositionInfoEntity,
        (entity, props) => {
            if (props && entity[props]) {
                return entity[props];
            } else {
                return undefined;
            }
        }
    );
};


export const getSelectedLayoutPositionInfoLoading = () => {
    return createSelector(
        getPositionInfoLoadingEntity,
        (entity, props) => {
            return entity && entity[props];
        }
    );
};


export const getSelectedLayoutPositionInfoLoaded = () => {
    return createSelector(
        getPositionInfoLoadedEntity,
        (entity, props) => entity && entity[props]
    );
};


export const getSelectedLayoutPositionInfoError = () => {
    return createSelector(
        getPositionInfoErrorEntity,
        (entity, props) => entity && entity[props]
    );
};




export const getNonlinearSupportedLayoutOfActiveDay = createSelector(
    getNonlinearSupportGrouping,
    getActiveDate,
    (entity, activeDate) => {
        if (entity && activeDate) {
            const dateArray = activeDate.split('/');
            const month = dateArray[0];
            const day = dateArray[1];
            const year = dateArray[2];
            const formateDate = '' + year + month + day;

            if (entity[formateDate]) {
                const originGroupings = entity[formateDate].Groupings;
                const enrichGroupings = [];
                originGroupings.forEach((grouping: string) => {
                    enrichGroupings.push(grouping);

                    if (grouping.includes('TradeName')) {
                        let enrichCopy = grouping;
                        enrichCopy = enrichCopy.replace('TradeName', 'TradeNameWithID');
                        enrichGroupings.push(enrichCopy);
                    }
                });

                return enrichGroupings;
            } else {
                return [];
            }
        } else {
            return [];
        }
    }
);

export const getNonlinearSupportedLayoutOfRecentDay = createSelector(
    getNonlinearSupportGrouping,
    entity => {
        if (entity) {
            const dates = Object.keys(entity).map(key => parseInt(key));
            dates.sort();
            const recentDate = dates.pop();
            return entity[recentDate] && entity[recentDate].Groupings;
        } else {
            return [];
        }
    }
);

export const getNonlinearSupportedLayoutOfActiveDayDict = createSelector(
    getNonlinearSupportedLayoutOfActiveDay,
    enrichGroupings => {
        const mainFirstLevelGroupings = [];
        const groupingCollection: any = {};
        enrichGroupings.forEach(grouping => {
            const mainGroupingLevel = grouping.split('|')[0];
            if (mainFirstLevelGroupings.indexOf(mainGroupingLevel) === -1) {
                mainFirstLevelGroupings.push(mainGroupingLevel);
            }

            if (groupingCollection[mainGroupingLevel] === undefined) {
                groupingCollection[mainGroupingLevel] = [];
                groupingCollection[mainGroupingLevel].push(grouping);
            } else {
                groupingCollection[mainGroupingLevel].push(grouping);
            }
        });

        mainFirstLevelGroupings.sort((a: string, b: string) => {
            return a.toLowerCase().charCodeAt(0) - b.toLowerCase().charCodeAt(0);
        });
        Object.keys(groupingCollection).forEach(key => {
            groupingCollection[key].sort((a: string, b: string) => {
                const targetValueA = a.split('|')[1];
                const targetValueB = b.split('|')[1];
                return targetValueA.toLowerCase().charCodeAt(0) - targetValueB.toLowerCase().charCodeAt(0);
            });
        });


        return {
            mainGroupings: mainFirstLevelGroupings,
            groupingCollection: groupingCollection
        };
    }
);