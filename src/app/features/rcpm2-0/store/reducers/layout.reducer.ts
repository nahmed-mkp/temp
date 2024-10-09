import * as fromActions from '../actions/layout.actions';

// Common Support Grouping name and field name map dictionary
const dict = {
    'Firm': 'Firm',
    'Fund': 'fundName',
    'Pod': 'podName',
    'TradeName': 'tradeName',
    'CrossPod': 'CrossPodName',
    'TradeGroup': 'TradeGroup',
    'CrossFund': 'CrossFund',
    'ExposureCurrency': 'ExposureCurrency',
    'ClientServicesTradeTheme': 'ClientServicesTradeTheme',
    'CountryOfRisk': 'CountryOfRisk',
    'SecurityName': 'SecurityName',
    'MacroTheme': 'MacroTheme',
    'PortfolioBreakout': 'PortfolioBreakout',
    'TradeNameWithID': 'TradeNameWithID',
    'SecurityNameExcludingCP': 'SecurityNameExcludingCP',
};

export interface State {

    // UI --------------------------------------

    activeLayout: string;
    layoutGroupingAlertEntity: {
        [layoutName: string]: string[]
    }
    selectedLayouts: string[],




    // Data ------------------------------------

    userSelectedCommonGrouping: {
        [layoutName: string]: string[];
    }


    staticLayouts: any;
    staticLayoutsLoading: boolean;
    staticLayoutsLoaded: boolean;
    staticLayoutsError?: string;

    staticLayoutConfigAndStyle: {
        gridConfig: any;
        groupingStyle: any;
        layoutStyle: any;
    }


    // User layout specific -------------------------------------

    userLayouts: {
        [layoutName: string]: any
    };
    userLayoutsLoading: boolean;
    userLayoutsLoaded: boolean;
    userLayoutsError?: string;

    userLayoutSaving: boolean;
    userLayoutSaved: boolean;
    userLayoutSaveError?: string;

    userLayoutDeleting: boolean;
    userLayoutDeleted: boolean;
    userLayoutDeleteError?: string;



    userGridConfig: any;
    userGroupingStyle: any;
    userLayoutStyle: any;
    systemStyle: any;
    userLayoutAndConfigLoading: boolean;
    userLayoutAndConfigLoaded: boolean;
    userLayoutAndConfigError?: string;
    updateUserLayoutAndConfigError?: string;

    userLayoutAndConfigSavePending: boolean;
    userLayoutAndConfigSaveComplete: boolean;
    userLayoutAndConfigSaveError?: string;




}

const initialState: State = {

    activeLayout: null,
    layoutGroupingAlertEntity: {},
    selectedLayouts: [],

    userSelectedCommonGrouping: null,

    staticLayouts: null,
    staticLayoutsLoading: false,
    staticLayoutsLoaded: false,
    staticLayoutConfigAndStyle: null,



    userLayouts: {},
    userLayoutsLoading: false,
    userLayoutsLoaded: false,

    userLayoutSaving: false,
    userLayoutSaved: false,

    userLayoutDeleting: false,
    userLayoutDeleted: false,



    userGridConfig: null,
    userGroupingStyle: null,
    userLayoutStyle: null,
    systemStyle: null,
    userLayoutAndConfigLoading: false,
    userLayoutAndConfigLoaded: false,

    userLayoutAndConfigSavePending: false,
    userLayoutAndConfigSaveComplete: false,


}


export function reducer(state = initialState, action: fromActions.LayoutActions): State {

    switch (action.type) {

        // UI ---------------------------------------------------------

        case fromActions.LayoutActionTypes.APPLY_COMMON_GROUPING: {

            const groupingString = action.payload;
            const activeLayout = state.activeLayout;

            const groupingArray = groupingString.split('|');
            if (groupingArray[groupingArray.length - 1] === 'Position') {
                groupingArray.pop();
            }
            const targetGroupingField = groupingArray.map(item => dict[item]);


            return {
                ...state,
                userSelectedCommonGrouping: Object.assign({}, state.userSelectedCommonGrouping, {[activeLayout]: targetGroupingField})
            }
        }

        case fromActions.LayoutActionTypes.SET_ACTIVE_LAYOUT: {
            return {
                ...state,
                activeLayout: action.payload,
            }
        }

        case fromActions.LayoutActionTypes.SET_LAYOUT_GROUPING_ALERT: {
            const targetLayout = action.payload.layout;
            const targetGrouping = action.payload.grouping;

            if (state.layoutGroupingAlertEntity[targetLayout] === undefined) {
                return {
                    ...state,
                    layoutGroupingAlertEntity: Object.assign({}, state.layoutGroupingAlertEntity, {[targetLayout]: [targetGrouping]})
                }
            } else {
                return {
                    ...state,
                    layoutGroupingAlertEntity: Object.assign({}, state.layoutGroupingAlertEntity, {[targetLayout]: [...state.layoutGroupingAlertEntity[targetLayout], targetGrouping]})
                }
            }
        }








        case fromActions.LayoutActionTypes.ADD_SELECTED_LAYOUT: {
            return {
                ...state,
                selectedLayouts: [...state.selectedLayouts, action.payload]
            };
        }

        case fromActions.LayoutActionTypes.REMOVE_SELECTED_LAYOUT: {

            const targetIndex = state.selectedLayouts.indexOf(action.payload);
            if (targetIndex > -1) {
                state.selectedLayouts.splice(targetIndex, 1);
            }

            return {
                ...state,
                selectedLayouts: [...state.selectedLayouts],
            };
        }

        case fromActions.LayoutActionTypes.CHANGE_SELECTED_LAYOUT: {

            state.selectedLayouts[action.payload.targetIndex] = action.payload.targetLayout;

            return {
                ...state,
                selectedLayouts: [...state.selectedLayouts]
            };
        }


        // Server side data loading ------------------------------------------------------------------

        case fromActions.LayoutActionTypes.LOAD_STATIC_LAYOUT: {
            return {
                ...state,
                staticLayoutsLoading: true,
                staticLayoutsLoaded: false,
            }
        }

        case fromActions.LayoutActionTypes.LOAD_STATIC_LAYOUT_COMPLETE: {
            return {
                ...state,
                staticLayouts: action.payload,
                staticLayoutsLoading: false,
                staticLayoutsLoaded: true,
            }
        }

        case fromActions.LayoutActionTypes.LOAD_STATIC_LAYOUT_FAILED: {
            return {
                ...state,
                staticLayoutsLoading: false,
                staticLayoutsLoaded: false,
                staticLayoutsError: action.payload
            }
        }













        case fromActions.LayoutActionTypes.LOAD_LAYOUT: {
            return {
                ...state,
                userLayoutsLoading: true,
                userLayoutsLoaded: false,
            }
        }

        case fromActions.LayoutActionTypes.LOAD_LAYOUT_COMPLETE: {
            
            const userLayouts: any = {};
            const userName = action.payload.userName;
            const layoutData = action.payload.data;


            layoutData.forEach(layout => {
                if (layout && layout.isShared && layout.createdBy) {
                    const prefix = layout.createdBy + '-';
                    userLayouts[prefix + layout.layoutName] = layout;
                } else {
                    userLayouts[layout.layoutName] = layout;
                }
            });

            // let selectedLayouts = Object.keys(userLayouts).filter(key => {
            //     return userLayouts[key].default === true && userLayouts[key].createdBy === userName;
            // }) || [];

            let selectedLayouts = [];
            Object.keys(userLayouts).forEach(key => {
                const targetLayout = userLayouts[key];
                if (!targetLayout['isShared']) {
                    if (targetLayout['default']) {
                        selectedLayouts.push(key);
                    }
                } else {
                    if (targetLayout['default'] && targetLayout['createdBy'] === userName) {
                        selectedLayouts.push(key);
                    }
                }
            })


            if (selectedLayouts.length === 0) {
                selectedLayouts = ['Overview'];
            }

            // const sharelayoutRemap: any = {};

            // Object.keys(action.payload)
            // .filter(key => action.payload[key].isShared && action.payload[key].createdBy)
            // .forEach(key => {
            //     const targetLayout = action.payload[key];
            //     const prefix = targetLayout.createdBy + '-';
            //     sharelayoutRemap[prefix + targetLayout.layoutName] = targetLayout;
            //     delete action.payload[key];
            // });

            // const userLayouts = Object.assign({}, action.payload, sharelayoutRemap);
            

            return {
                ...state,
                selectedLayouts: selectedLayouts,
                userLayouts: userLayouts,
                userLayoutsLoading: false,
                userLayoutsLoaded: true,
            }
        }

        case fromActions.LayoutActionTypes.LOAD_LAYOUT_FAILED: {
            return {
                ...state,
                userLayoutsLoading: false,
                userLayoutsLoaded: false,
                userLayoutsError: action.payload
            }
        }




        case fromActions.LayoutActionTypes.SAVE_LAYOUT:
        case fromActions.LayoutActionTypes.SAVE_LAYOUT_COMPLETE: {

            const targetLayout = action.payload;

            // if (targetLayout.isShared) {
            //     const shareLayoutCollection = state.userLayouts.shared;
            //     if (targetLayout.creationTimestamp) {
            //         let targetIndex;
            //         shareLayoutCollection.forEach((layout, index) => {
            //             if (targetLayout.layoutName === layout.layoutName) {
            //                 targetIndex = index;
            //             }
            //         });
            //         shareLayoutCollection[targetIndex] = targetLayout;
            //     } else {
            //         shareLayoutCollection.push(targetLayout);
            //     }
            //     return {
            //         ...state,
            //         userLayoutSaving: true,
            //         userLayoutSaved: false,
            //         userLayouts: {
            //             ...state.userLayouts,
            //             shared: [...shareLayoutCollection]
            //         }
            //     }
            // } else {
            //     const privateLayoutCollection = state.userLayouts.private;
            //     if (targetLayout.creationTimestamp) {
            //         let targetIndex;
            //         privateLayoutCollection.forEach((layout, index) => {
            //             if (targetLayout.layoutName === layout.layoutName) {
            //                 targetIndex = index;
            //             }
            //         });
            //         privateLayoutCollection[targetIndex] = targetLayout;
            //     } else {
            //         privateLayoutCollection.push(targetLayout);
            //     }

            //     return {
            //         ...state,
            //         userLayoutSaving: true,
            //         userLayoutSaved: false,
            //         userLayouts: {
            //             ...state.userLayouts,
            //             private: [...privateLayoutCollection]
            //         }
            //     }
            // }

            if (targetLayout.isShared && targetLayout.createdBy) {

                const layoutCollection = state.userLayouts;
                delete layoutCollection[targetLayout.layoutName];
                return {
                    ...state,
                    userLayoutSaving: true,
                    userLayoutSaved: false,
                    userLayouts: {
                        ...layoutCollection,
                        [targetLayout.createdBy + '-' + targetLayout.layoutName]: targetLayout,
                    }
                }
            } else {
                return {
                    ...state,
                    userLayoutSaving: true,
                    userLayoutSaved: false,
                    userLayouts: {
                        ...state.userLayouts,
                        [targetLayout.layoutName]: targetLayout
                    }
                }
            }
        }

        // case fromActions.LayoutActionTypes.SAVE_LAYOUT_COMPLETE: {
        //     const targetLayout = action.payload;

        //     if (targetLayout.isShared) {
        //         const shareLayoutCollection = state.userLayouts.shared;
        //         let targetIndex;
        //         shareLayoutCollection.forEach((layout, index) => {
        //             if (targetLayout.layoutName === layout.layoutName) {
        //                 targetIndex = index;
        //             }
        //         });
        //         shareLayoutCollection[targetIndex] = targetLayout;

        //         return {
        //             ...state,
        //             userLayoutSaving: true,
        //             userLayoutSaved: false,
        //             userLayouts: {
        //                 ...state.userLayouts,
        //                 shared: [...shareLayoutCollection]
        //             }
        //         }
        //     } else {
        //         const privateLayoutCollection = state.userLayouts.private;
        //         let targetIndex;
        //         privateLayoutCollection.forEach((layout, index) => {
        //             if (targetLayout.layoutName === layout.layoutName) {
        //                 targetIndex = index;
        //             }
        //         });
        //         privateLayoutCollection[targetIndex] = targetLayout;


        //         return {
        //             ...state,
        //             userLayoutSaving: true,
        //             userLayoutSaved: false,
        //             userLayouts: {
        //                 ...state.userLayouts,
        //                 private: [...privateLayoutCollection]
        //             }
        //         }
        //     }
        // }

        case fromActions.LayoutActionTypes.SAVE_LAYOUT_FAILED: {
            return {
                ...state,
                userLayoutSaving: false,
                userLayoutSaved: false,
                userLayoutsError: action.payload
            }
        }




        case fromActions.LayoutActionTypes.DELETE_LAYOUT: {

            const targetLayout = action.payload;
            const layoutCollection = state.userLayouts;

            if (targetLayout.isShared && targetLayout.createdBy) {
                const targetLayoutName = targetLayout.createdBy + '-' + targetLayout.layoutName;
                delete layoutCollection[targetLayoutName];
            } else {
                delete layoutCollection[targetLayout.layoutName];
            }

            // if (layoutCollection[targetLayout.layoutName]) {
            //     delete layoutCollection[targetLayout.layoutName];
            // }

            return  {
                ...state,
                userLayoutDeleting: false,
                userLayoutDeleted: true,
                userLayouts: {
                    ...layoutCollection
                }
            }

            // if (targetLayout.isShared) {
            //     const shareLayoutCollection = state.userLayouts.shared;
            //     let targetIndex;
            //     shareLayoutCollection.forEach((layout, index) => {
            //         if (targetLayout.layoutName === layout.layoutName) {
            //             targetIndex = index;
            //         }
            //     });
            //     shareLayoutCollection.splice(targetIndex, 1);
            //     return {
            //         ...state,
            //         userLayoutDeleting: true,
            //         userLayoutDeleted: false,
            //         userLayouts: {
            //             ...state.userLayouts,
            //             shared: [...shareLayoutCollection]
            //         }
            //     }
            // } else {
            //     const privateLayoutCollection = state.userLayouts.shared;
            //     let targetIndex;
            //     privateLayoutCollection.forEach((layout, index) => {
            //         if (targetLayout.layoutName === layout.layoutName) {
            //             targetIndex = index;
            //         }
            //     });
            //     privateLayoutCollection.splice(targetIndex, 1);
            //     return {
            //         ...state,
            //         userLayoutDeleting: true,
            //         userLayoutDeleted: false,
            //         userLayouts: {
            //             ...state.userLayouts,
            //             private: [...privateLayoutCollection]
            //         }
            //     }
            // }

        }

        case fromActions.LayoutActionTypes.DELETE_LAYOUT_COMPLETE: {
            return {
                ...state,
                userLayoutDeleting: false,
                userLayoutDeleted: true,
            }
        }

        case fromActions.LayoutActionTypes.DELETE_LAYOUT_FAILED: {
            return {
                ...state,
                userLayoutDeleting: false,
                userLayoutDeleted: false,
                userLayoutsError: action.payload
            }
        }


        // --------------------------------------------------------------------------------------



        



        // --------------------------------------------------------------------

        case fromActions.LayoutActionTypes.LOAD_CONFIG_AND_STYLE: {
            return {
                ...state,
                userLayoutAndConfigLoading: true,
                userLayoutAndConfigLoaded: false,
                userLayoutAndConfigError: null
            }
        }

        case fromActions.LayoutActionTypes.LOAD_CONFIG_AND_STYLE_COMPLETE: {

            // Default Config --------------------------------------------------

            const groupingStyleDefault = [
                {level: 1, color: '#FFFFFF'},
                {level: 2, color: '#3f51b51f'},
                {level: 3, color: '#3d50b33b'},
                {level: 4, color: '#3d50b359'},
                {level: 5, color: '#3d50b385'},
                {level: 6, color: '#3d50b3ba'},
                {level: 7, color: '#FFFFFF'},
                {level: 8, color: '#FFFFFF'},
                {level: 9, color: '#FFFFFF'},
                {level: 10, color: '#FFFFFF'},
            ];

            const defaultConfig = {
                groupingBackgroundDisplayMode: true,
                columnMenu: true,
                systemColor: false,
                rowClass: 'medium-row',
                rowHeight: 22
            };

            const defaultStyle = {};

            // User Config (local Storage and Cloud)--------------------------------------------------------------

            // const gridConfigBackUp = action.payload.gridConfig;
            // const groupingStyleBackUp = action.payload.groupingStyle;
            // const layoutStyleBackUp = action.payload.layoutStyle;

            // const gridConfig =  localStorage.getItem('configuration');
            // const groupingStyle = localStorage.getItem('groupingStyle');
            // const layoutStyle = localStorage.getItem('style');

            // if (gridConfig === undefined || gridConfig === null) {
            //     if (gridConfigBackUp && gridConfigBackUp !== 'undefined') {
            //         localStorage.setItem('configuration', JSON.stringify(gridConfigBackUp));
            //     } else {
            //         localStorage.setItem('configuration', JSON.stringify(defaultConfig));
            //     } 
            // }

            // if (groupingStyle === undefined || groupingStyle === null) {
            //     if (groupingStyleBackUp && groupingStyleBackUp !== 'undefined') {
            //         localStorage.setItem('groupingStyle', groupingStyleBackUp);
            //     } else {
            //         localStorage.setItem('groupingStyle', JSON.stringify(groupingStyleDefault));
            //     }
            // }

            // if (layoutStyle === undefined || layoutStyle === null) {
            //     if (layoutStyleBackUp && layoutStyleBackUp !== 'undefined') {
            //         localStorage.setItem('style', layoutStyleBackUp);
            //     } else {
            //         localStorage.setItem('style', JSON.stringify(defaultStyle));
            //     }
            // } else {
            //     if (layoutStyleBackUp && layoutStyleBackUp !== 'undefined') {
            //         // Merging cloud style over the user local style
            //         const localLayoutStyle_obj = JSON.parse(layoutStyle);
            //         const layoutStyleBackUp_obj =  JSON.parse(layoutStyleBackUp);

            //         const resultMergeObj = Object.assign(localLayoutStyle_obj,layoutStyleBackUp_obj);
            //         localStorage.setItem('style', JSON.stringify(resultMergeObj));
            //     }
            // }

            // User/system Cloud style config ------------------------------------------------------------------

            
            // const userGridConfig_cloud = action.payload.gridConfig && JSON.parse(action.payload.gridConfig) || defaultConfig;
            // const userGroupingStyle_cloud = action.payload.groupingStyle && JSON.parse(action.payload.groupingStyle) || groupingStyleDefault;
            // const userLayoutStyle_cloud = action.payload.layoutStyle && JSON.parse(action.payload.layoutStyle) || null;
            // const systemStyle_cloud = action.payload.systemStyle && JSON.parse(action.payload.systemStyle.columnStyle) || null;

            // removed json parse to avoid clashing with upated json files in M: drive

            let userGridConfig_cloud;
            if (action.payload.gridConfig) {
                try {
                    userGridConfig_cloud = action.payload.gridConfig
                } catch (error) {
                    console.log('parsing user grid config failed', error);
                    userGridConfig_cloud = defaultConfig
                }
            } else {
                userGridConfig_cloud = defaultConfig
            }

            let userGroupingStyle_cloud;
            if (action.payload.groupingStyle) {
                try {
                    userGroupingStyle_cloud = action.payload.groupingStyle
                } catch (error) {
                    console.log('parsing user grouping style failed', error);
                    userGroupingStyle_cloud = groupingStyleDefault;
                }
            } else {
                userGroupingStyle_cloud = groupingStyleDefault;
            }

            let userLayoutStyle_cloud;
            if (action.payload.layoutStyle) {
                try {
                    userLayoutStyle_cloud = action.payload.layoutStyle
                } catch (error) {
                    console.log('parsing user layout style failed', error);
                    userLayoutStyle_cloud = null;
                }
            } else {
                userLayoutStyle_cloud = null;
            }

            let systemStyle_cloud;
            if (action.payload.systemStyle && action.payload.systemStyle.columnStyle) {
                try {
                    systemStyle_cloud = action.payload.systemStyle.columnStyle;
                } catch (error) {
                    console.log('parsing user layout style failed', error);
                    systemStyle_cloud = null;
                }
            } else {
                systemStyle_cloud = null;
            }



            // Static Layout Style Config -----------------------------------------------------------------------

            const staticLayoutConfigAndStyleRaw = action.payload.staticStyle || undefined;
            const staticLayoutConfigAndStyle: any = {}
            if (staticLayoutConfigAndStyleRaw) {
                // staticLayoutConfigAndStyle['gridConfig'] = staticLayoutConfigAndStyleRaw['gridConfig'] && JSON.parse(staticLayoutConfigAndStyleRaw['gridConfig']);
                // staticLayoutConfigAndStyle['groupingStyle'] = staticLayoutConfigAndStyleRaw['groupingStyle'] && JSON.parse(staticLayoutConfigAndStyleRaw['groupingStyle']);
                // staticLayoutConfigAndStyle['layoutStyle'] = staticLayoutConfigAndStyleRaw['layoutStyle'] && JSON.parse(staticLayoutConfigAndStyleRaw['layoutStyle']);
                try {
                    staticLayoutConfigAndStyle['gridConfig'] = JSON.parse(staticLayoutConfigAndStyleRaw['gridConfig']);
                } catch (error) {
                    console.log('parsing static layout grid config failed', error);
                    staticLayoutConfigAndStyle['gridConfig'] = defaultConfig;
                }

                try {
                    staticLayoutConfigAndStyle['groupingStyle'] = JSON.parse(staticLayoutConfigAndStyleRaw['groupingStyle']);
                } catch (error) {
                    console.log('parsing static layout grouping style failed', error);
                    staticLayoutConfigAndStyle['groupingStyle'] = groupingStyleDefault;
                }

                try {
                    staticLayoutConfigAndStyle['layoutStyle'] = JSON.parse(staticLayoutConfigAndStyleRaw['layoutStyle']);
                } catch (error) {
                    console.log('parsing static layout style failed', error);
                    staticLayoutConfigAndStyle['layoutStyle'] = null;
                }
            }

            return {
                ...state,
                userLayoutAndConfigLoading: false,
                userLayoutAndConfigLoaded: true,
                userLayoutAndConfigError: null,

                staticLayoutConfigAndStyle: staticLayoutConfigAndStyle,
                userGridConfig: userGridConfig_cloud,
                userGroupingStyle: userGroupingStyle_cloud,
                userLayoutStyle: userLayoutStyle_cloud,
                systemStyle: systemStyle_cloud
            }
        }

        case fromActions.LayoutActionTypes.LOAD_CONFIG_AND_STYLE_FAILED: {
            return {
                ...state,
                userLayoutAndConfigLoading: false,
                userLayoutAndConfigLoaded: false,
                userLayoutAndConfigError: action.payload
            }
        }


        // --------------------------------------------------------------------------

        case fromActions.LayoutActionTypes.BACKUP_ALL_CONFIG_STYLE: {
            return {
                ...state,
                userLayoutAndConfigSavePending: true,
                userLayoutAndConfigSaveComplete: false,
                userLayoutAndConfigSaveError: null
            }
        }

        case fromActions.LayoutActionTypes.BACKUP_ALL_CONFIG_STYLE_COMPLETE: {
            return {
                ...state,
                userLayoutAndConfigSavePending: false,
                userLayoutAndConfigSaveComplete: true,
                userLayoutAndConfigSaveError: null
            }
        }

        case fromActions.LayoutActionTypes.BACKUP_ALL_CONFIG_STYLE_FAILED: {
            return {
                ...state,
                userLayoutAndConfigSavePending: false,
                userLayoutAndConfigSaveComplete: false,
                userLayoutAndConfigSaveError: action.payload
            }
        }

        // ---------------------------------------------------------------------------


        case fromActions.LayoutActionTypes.UPDATE_GRID_CONFIG: {
            const newUserGridConfig = action.payload;

            return {
                ...state,
                userGridConfig: Object.assign({}, newUserGridConfig)
            }
        }

        case fromActions.LayoutActionTypes.UPDATE_GROUPING_STYLE: {
            const newUserGroupingStyle = action.payload;

            return {
                ...state,
                userGroupingStyle: [...newUserGroupingStyle]
            }
        }

        case fromActions.LayoutActionTypes.UPDATE_LAYOUT_STYLE: {
            const newUserLayoutStyle = action.payload.style;
            const targetLayout = action.payload.layout

            return {
                ...state,
                userLayoutStyle: Object.assign({}, state.userLayoutStyle, {[targetLayout]: newUserLayoutStyle})
            }
        }

        case fromActions.LayoutActionTypes.UPDATE_GRID_CONFIG_LAYOUT_STYLE_FAILED: {
            const error = action.payload;

            return {
                ...state,
                updateUserLayoutAndConfigError: error
            }
        }


        default: {
            return state;
        }
    }
}

export const getUserSelectedCommonGrouping = (state: State) => state.userSelectedCommonGrouping;
export const getActiveLayout = (state: State) => state.activeLayout;
export const getLayoutGroupingAlertEntity = (state: State) => state.layoutGroupingAlertEntity;
export const getSelectedLayouts = (state: State) => state.selectedLayouts;

export const getStaticLayouts = (state: State) => state.staticLayouts;
export const getStaticLayoutsLoading = (state: State) => state.staticLayoutsLoading;
export const getStaticLayoutsLoaded = (state: State) => state.staticLayoutsLoaded;
export const getStaticLayoutsError = (state: State) => state.staticLayoutsError;
export const getStaticLayoutConfigAndStyle = (state: State) => state.staticLayoutConfigAndStyle;


export const getUserLayouts = (state: State) => state.userLayouts;
export const getUserLayoutsLoading = (state: State) => state.userLayoutsLoading;
export const getUserLayoutsLoaded = (state: State) => state.userLayoutsLoaded;
export const getUserLayoutsError = (state: State) => state.userLayoutsError;

export const getUserLayoutSaving = (state: State) => state.userLayoutSaving;
export const getUserLayoutSaved = (state: State) => state.userLayoutSaved;
export const getUserLayoutSaveError = (state: State) => state.userLayoutSaveError;

export const getUserLayoutDeleting = (state: State) => state.userLayoutDeleting;
export const getUserLayoutDeleted = (state: State) => state.userLayoutDeleted;
export const getUserLayoutDeleteError = (state: State) => state.userLayoutDeleteError;



export const getUserLayoutAndConfigLoading = (state: State) => state.userLayoutAndConfigLoading;
export const getUserLayoutAndConfigLoaded = (state: State) => state.userLayoutAndConfigLoaded;
export const getUserLayoutAndConfigError = (state: State) => state.userLayoutAndConfigError;

export const getUserGridConfigCloud = (state: State) => state.userGridConfig;
export const getUserGroupingStyleCloud = (state: State) => state.userGroupingStyle;
export const getUserLayoutStyleCloud = (state: State) => state.userLayoutStyle;
export const getSystemStyleCloud = (state: State) => state.systemStyle;