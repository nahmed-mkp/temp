import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { NotificationService } from 'src/app/factories';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';
import * as fromServices from '../../services';
import * as fromSelector from '../../store/selectors';
import * as fromActions from '../actions';
import * as fromStore from '../reducers';
import * as fromModel from './../../models';

import * as fromSockets from './../../../../shared/custom/sockets/services';


@Injectable()
export class RCPM2PositionsEffects {

    isUserSocketAuthenticated: any = false;

    @Effect()
    loadPositionsLookups$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_LOOKUPS),
            switchMap(() => {
                return this.RCPM2PositionService.loadPositionLookups()
                    .pipe(
                        map((res) => new fromActions.LoadPositionLookupsComplete(res)),
                        catchError((err: string) => {
                            const message = err || 'fail to load position lookup data';
                            // this.notificationService.openNotification(message);
                            return  of(new fromActions.LoadPositionLookupsFailed(err));
                        })
                    );
            })
        );

    @Effect()
    laodMissingCloses$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_MISSING_CLOSES),
            switchMap(({payload}) => {
                return this.RCPM2PositionService.loadMissingCloses(payload)
                    .pipe(
                        map((res) => new fromActions.LoadMissingClosesComplete(res)),
                        catchError((err: string) => {
                            const message = err || 'fail to load missing closes';
                            return  of(new fromActions.LoadMissingClosesFailed(err));
                        })
                    );
            })
        );
       
    @Effect()
    loadNonlinearSupportGroupings$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_SUPPORT_GROUPINGS),
            switchMap(payload => {
                return this.RCPM2PositionService.loadNonlinearSupportGrouping()
                    .pipe(
                        map((res) => new fromActions.LoadNonlinearSupportGroupingComplete(res)),
                        catchError((err: string) => {
                            const message = err || 'fail to load nolinear support grouping data';
                            // this.notificationService.openNotification(message);
                            return of(new fromActions.LoadNonlinearSupportGroupingFailed(err));
                        })
                    );
            })
        );

    @Effect()
    loadPositionPresetLayout$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_PRESET_LAYOUT),
            switchMap(payload => {
                return this.RCPM2PositionService.loadPresetLayout()
                    .pipe(
                        map((res: fromModel.PositionLayout) => new fromActions.LoadPresetLayoutComplete(res)),
                        catchError((err: string) => {
                            const message = err || 'fail to load position preset layout data';
                            // this.notificationService.openNotification(message);
                            return of(new fromActions.LoadPresetLayoutFailed(err));
                        })
                    );
            })
        );

    @Effect()
    loadPositionDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_POSITION_DATES),
            switchMap(payload => {
                return this.RCPM2PositionService.loadPositionDates()
                    .pipe(
                        map((res: fromModel.PositionDatesResponse) => new fromActions.LoadPositionDatesComplete(res)),
                        catchError((err: string) => {
                            const message = err || 'fail to load position Dates';
                            // this.notificationService.openNotification(message);
                            return of(new fromActions.LoadPositionDatesFailed(err));
                        })
                    );
            })
        );

    @Effect()
    loadLatestPositionDate$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_LATEST_POSITION_DATE),
            withLatestFrom(
                this.store.select(fromSelector.getLatestAvailableDate),
                this.store.select(fromSelector.getPositionDateLoadToggle)
            ),
            delay(30000),
            switchMap(([payload, latestAvailableDate, toogle]) => {
                return this.RCPM2PositionService.loadLatestPositionDate()
                    .pipe(
                        switchMap((res: any) => {
                            let result;

                            if (toogle === false) {
                                return [];
                            }
                            if (typeof res === 'object') {
                                result = Object.keys(res).map(key => res[key])[0];
                            }
                            // result = '08/21/2020';                                                      // Mock testing
                            if (result !== latestAvailableDate) {
                                return [
                                    new fromActions.LoadPositionDates(),                              // Production
                                    new fromActions.LoadLatestPositionDate(),
                                    // new fromActions.UpdateLatestAvailableDate({1232: {date: result}})   // Mock testing
                                ];
                            } else {
                                return [new fromActions.LoadLatestPositionDate()];
                            }
                            // return [
                            //     new fromActions.LoadLatestPositionDateComplete('08/21/2020'),
                            //     new fromActions.LoadLatestPositionDate(),
                            //     new fromActions.UpdateLatestAvailableDate({1232: {date: '08/21/2020'}})
                            // ];
                        }),
                        catchError((err: string) => {
                            const message = err || 'fail to load lasted Position Date';
                            // this.notificationService.openNotification(message);
                            return of(new fromActions.LoadLatestPositionDateFailed(err));
                        })
                    );
            })
        );

    @Effect()
    loadDataSourcePermission$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_DATA_SOURCE_PERMISSION),
            switchMap(() => {
                return this.RCPM2PositionService.loadDataSourcePermission()
                    .pipe(
                        map((res) => new fromActions.LoadDataSourcePermissionComplete(res)),
                        catchError((err: string) => {
                            const message = err || 'fail to load data source permission';
                            return  of(new fromActions.LoadDataSourcePermissionFailed(err));
                        })
                    );
            })
        );


    // ------------------------------------------------------------------------------------------------------

    @Effect()
    loadPositions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS),
            map((action: fromActions.LoadPositions) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getSpinningActivate)),
            switchMap(([payload, activeSpinningStatus]) => {
                const dataRetrievalMethod = payload.data_retrieval_method;

                if (dataRetrievalMethod === 'socket' /* &&  this.isUserSocketAuthenticated === true */ ) {

                    const formattedDate = moment(payload.asOfDate).format('YYYYMMDD');
                    const formattedMode = payload.mode.charAt(0).toUpperCase() + payload.mode.slice(1);
                    const formattedSource = payload.source === 'RCPM' ? 'Position' : 'Position:Prizm';

                    // console.log(`Fetch Method: Sockets via MKP:${formattedSource}:${formattedMode}:${formattedDate}`);

                    // remove all previous socket subscriptions to prevent overwrite
                    this.socket.unsubscribe(this.socket.getSubscriptions()[0]);
                    this.socket.subscribeToChannel(`MKP:${formattedSource}:${formattedMode}:${formattedDate}`);
                    return this.socket.viewSocketChannelData()
                        .pipe(
                        switchMap((res: any) => {
                                if (res.data) {
                                    res = {
                                        data: res.data,
                                        timestamps: {
                                            latestPositionTs: '',
                                            latestPricingTs: '',
                                            latestTs: new Date()
                                        }
                                    };
                                    const resultActions = [];
                                    const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                    resultActions.push(new fromActions.LoadPositionsComplete({data: parseResult, layout: payload.layout}));
                                    if (res.timestamps) {
                                        resultActions.push(new fromActions.UpdateLatestTimestamp(res.timestamps));
                                    }
                                    return resultActions;
                                } else {
                                    if (activeSpinningStatus) {
                                        return [new fromActions.LoadPositionsComplete({data: [], layout: payload.layout})];
                                    } else {
                                        return [];
                                    }
                                }
                            }),
                            catchError((err: string) => {
                                const message = err || 'fail to load position data';
                                return of(new fromActions.LoadPositionsFailed({error: err, layout: payload.layout}));
                            })
                        );
                }

                if (dataRetrievalMethod === 'http') {
                    // console.log('Fetch Method: HTTP');
                    return this.RCPM2PositionService.loadPositionsCache(payload.asOfDate, payload.mode, payload.source)
                    .pipe(
                        switchMap((res: any) => {
                            if (res.data !== null) {
                                const resultActions = [];
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                resultActions.push(new fromActions.LoadPositionsComplete({data: parseResult, layout: payload.layout}));
                                if (res.timestamps) {
                                    resultActions.push(new fromActions.UpdateLatestTimestamp(res.timestamps));
                                }
                                return resultActions;
                            } else {
                                if (activeSpinningStatus) {
                                    return [new fromActions.LoadPositionsComplete({data: [], layout: payload.layout})];
                                } else {
                                    return [];
                                }
                            }
                        }),
                        catchError((err: string) => {
                            const message = err || 'fail to load position data';
                            return of(new fromActions.LoadPositionsFailed({error: err, layout: payload.layout}));
                        })
                    );
                }

            })
        );

    // @Effect()
    // loadPositions$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS),
    //         map((action: fromActions.LoadPositions) => action.payload),
    //         withLatestFrom(this.store.select(fromSelector.getSpinningActivate)),
    //         switchMap(([payload, activeSpinningStatus]) => {
    //             // console.time('Load position data');
    //             // replace loadPositionsCache with a websocket persisted connection to the socket cluster broker
                // return this.RCPM2PositionService.loadPositionsCache(payload.asOfDate, payload.mode, payload.source)
                //     .pipe(
                //         switchMap((res: any) => {
                //             // console.timeEnd('Load position data')
                //             if (res.data !== null) {
                //                 const resultActions = [];
                //                 // console.time('parse position data');
                //                 const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                //                 // console.timeEnd('parse position data');
                //                 resultActions.push(new fromActions.LoadPositionsComplete({data: parseResult, layout: payload.layout}));
                //                 return resultActions;
                //             } else {
                //                 // empty data is return server, it will either clean the grid or do nothing base on spinning status
                //                 if (activeSpinningStatus) {
                //                     return [new fromActions.LoadPositionsComplete({data: [], layout: payload.layout})];
                //                 } else {
                //                     return [];
                //                 }
                //             }
                //         }),
                //         catchError((err: string) => {
                //             const message = err || 'fail to load position data';
                //             // this.notificationService.openNotification(message);
                //             return of(new fromActions.LoadPositionsFailed({error: err, layout: payload.layout}));
                //         })
                //     );
    //         })
    //     );

    @Effect()
    loadPositionsGroupings$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_GROUPINGS),
            map((action: fromActions.LoadPositionGroupings) => action.payload),
            switchMap(payload => {
                // console.time('load Grouping data');
                return this.RCPM2PositionService.loadPositionGrouping(payload.asOfDate)
                    .pipe(
                        map((res: any) => {
                            // console.timeEnd('load Grouping data');
                            if (res.data !== null) {
                                // console.time('parse grouping data');
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                // console.timeEnd('parse grouping data');
                                return new fromActions.LoadPositionGroupingsComplete({data: parseResult, layout: payload.layout});
                            } else {
                                return new fromActions.LoadPositionGroupingsComplete({data: [], layout: payload.layout});
                            }
                        }),
                        catchError((err: string) => {
                            const message = err || 'fail to load position data';
                            // this.notificationService.openNotification(message);
                            return of(new fromActions.LoadPositionGroupingsFailed({error: err, layout: payload.layout}));
                        })
                    );
            })
        );

    @Effect()
    loadNonlinearAggData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_AGG_DATA),
            map((action: fromActions.LoadNonlinearAggData) => action.payload),
            switchMap(payload => of(payload).pipe(
                withLatestFrom(
                    this.store.select(fromSelector.getLayoutGroupingAlertByLayout(payload.layout)),
                    this.store.select(fromSelector.getNonlinearSupportedLayoutOfRecentDay),
                    this.store.select(fromSelector.getNonlinearSupportedLayoutOfActiveDay)),
                )
            ),
            switchMap(([payload, layoutAlerts, recentSupportedGrouping, supportedGroupings]) => {
                if (supportedGroupings.indexOf(payload.grouping) !== -1) {
                    return this.RCPM2PositionService.loadNonlinearAggData(payload)
                    .pipe(
                        map((res) => new fromActions.LoadNonlinearAggDataComplete({data: res, layout: payload.layout})),
                        catchError((err: string) => {
                            const message = err || 'fail to load nonlinear data';
                            // this.notificationService.openNotification(message);
                            return of(new fromActions.LoadNonlinearAggDataFailed({error: err, layout: payload.layout}));
                        })
                    );
                }

                if (recentSupportedGrouping.indexOf(payload.grouping) !== -1) {
                    return this.RCPM2PositionService.loadNonlinearAggData(payload)
                    .pipe(
                        map((res) => new fromActions.LoadNonlinearAggDataComplete({data: res, layout: payload.layout})),
                        catchError((err: string) => {
                            const message = err || 'fail to load nonlinear data';
                            // this.notificationService.openNotification(message);
                            return of(new fromActions.LoadNonlinearAggDataFailed({error: err, layout: payload.layout}));
                        })
                    );
                } else {
                    // check if the alert has already been displayed for this particular layout
                    if (layoutAlerts.indexOf(payload.grouping) === -1) {
                        const warnMessage = `Warning: Non-linear risks are not supported for ${payload.grouping} Grouping`;
                        this.notificationService.openBottomNotification(warnMessage, 10000);
                        return [
                            new fromActions.SetLayoutGroupingAlert({layout: payload.layout, grouping: payload.grouping})
                        ];
                    } else {
                        return [];
                    }
                }
            })
        );

    @Effect()
    loadNonlinearPnlData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_PNL_DATA),
            map((action: fromActions.LoadNonlinearPnlData) => action.payload),
            switchMap(payload => of(payload).pipe(
                withLatestFrom(
                    this.store.select(fromSelector.getLayoutGroupingAlertByLayout(payload.layout)),
                    this.store.select(fromSelector.getNonlinearSupportedLayoutOfRecentDay),
                    this.store.select(fromSelector.getNonlinearSupportedLayoutOfActiveDay)),
                )
            ),
            switchMap(([payload, layoutAlerts, recentSupportedGrouping, supportedGroupings]) => {
                if (supportedGroupings.indexOf(payload.grouping) !== -1) {
                    return this.RCPM2PositionService.loadNonlinearPnlData(payload)
                    .pipe(
                        map((res) => new fromActions.LoadNonlinearPnlDataComplete({data: res, layout: payload.layout})),
                        catchError((err: string) => {
                            const message = err || 'fail to load nonlinear data';
                            // this.notificationService.openNotification(message);
                            return of(new fromActions.LoadNonlinearPnlDataFailed({error: err, layout: payload.layout}));
                        })
                    );
                }

                if (recentSupportedGrouping.indexOf(payload.grouping) !== -1) {
                    return this.RCPM2PositionService.loadNonlinearPnlData(payload)
                    .pipe(
                        map((res) => new fromActions.LoadNonlinearPnlDataComplete({data: res, layout: payload.layout})),
                        catchError((err: string) => {
                            const message = err || 'fail to load nonlinear data';
                            // this.notificationService.openNotification(message);
                            return of(new fromActions.LoadNonlinearPnlDataFailed({error: err, layout: payload.layout}));
                        })
                    );
                } else {
                    // check if the alert has already been displayed for this particular layout
                    if (layoutAlerts.indexOf(payload.grouping) === -1) {
                        const warnMessage = `Warning: Non-linear risks are not supported for ${payload.grouping} Grouping`;
                        this.notificationService.openBottomNotification(warnMessage, 10000);
                        return [
                            new fromActions.SetLayoutGroupingAlert({layout: payload.layout, grouping: payload.grouping})
                        ];
                    } else {
                        return [];
                    }
                }
            })
        );

    @Effect()
    loadExecutions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_EXECUTIONS),
            map((action: fromActions.LoadExecutions) => action.payload),
            switchMap(payload => of(payload).pipe(
                withLatestFrom(this.store.select(fromSelector.getExecutionModeByLayoutName(payload.layoutName))))
            ),
            switchMap(([payload, mode]) => {

                if (mode === true) {
                    // the execution side panel is open
                    return this.RCPM2PositionService.loadExecutionsCache(payload.date)
                    .pipe(
                        map((res: any) => {
                            if (res.data !== null) {
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                return new fromActions.LoadExecutionsComplete({asOfDate: payload.date, data: parseResult});
                            } else {
                                return new fromActions.LoadExecutionsComplete({asOfDate: payload.date, data: []});
                            }

                        }),
                        catchError((err: string) => {
                            const message = err || 'fail to load execution data';
                            // this.notificationService.openNotification(message);
                            return of(new fromActions.LoadExecutionsFailed({asOfDate: payload.date, error: err}));
                        })
                    );
                } else {
                    // the execution side panel is close
                    return [];
                }

            })
        );

    @Effect()
    loadExecutionsAdvance$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_EXECUTIONS_ADVANCE),
            map((action: fromActions.LoadExecutionsAdvance) => action.payload),
            switchMap(payload => of(payload).pipe(
                withLatestFrom(this.store.select(fromSelector.getExecutionModeByLayoutName(payload.layoutName))))
            ),
            switchMap(([payload, mode]) => {
                if (mode === true) {
                    // the execution side panel is open
                    return this.RCPM2PositionService.loadExecutionsAdvance(payload.req)
                    .pipe(
                        map((res: any) => {
                            if (res.data !== null) {
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                return new fromActions.LoadExecutionsAdvanceComplete({data: parseResult, layoutName: payload.layoutName});
                            } else {
                                return new fromActions.LoadExecutionsAdvanceComplete({data: [], layoutName: payload.layoutName});
                            }
                        }),
                        catchError((err: string) => {
                            const message = err || 'fail to load execution data';
                            // this.notificationService.openNotification(message);
                            return of(new fromActions.LoadExecutionsAdvanceFailed({layoutName: payload.layoutName, error: err}));
                        })
                    );
                } else {
                    // the execution side panel is close
                    return [];
                }

            })
        );

    @Effect()
    loadPositionInfo$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPM2PositionsActionTypes.LOAD_POSITION_INFO),
            map((action: fromActions.LoadPositionInfo) => action.payload),
            switchMap(payload => {
                const targetLayout = payload.layout;
                delete payload.layout;
                return this.RCPM2PositionService.loadPositionInfo(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadPositionInfoComplete({data: res[0], layout: targetLayout})),
                        catchError((err: string) => {
                            const message = err || 'fail to load position info data';
                            return of(new fromActions.LoadPositionInfoFailed({error: err, layout: targetLayout}));
                        })
                    );
            })
        );

    // @Effect()
    // loadUserLockStatus$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.UiActionTypes.LOAD_USER_LOCK_STATUS),
    //         switchMap(() => {
    //             return this.RCPM2PositionService.loadUserLockStatus()
    //                 .pipe(
    //                     map((res) => new fromActions.LoadUserLockStatusComplete(res)),
    //                     catchError((err: string) => {
    //                         const message = err || 'fail to load position lookup data';
    //                         return  of(new fromActions.LoadUserLockStatusFailed(err));
    //                     })
    //                 );
    //         })
    //     );

    constructor(
        private actions$: Actions,
        private RCPM2PositionService: fromServices.RCPM2PositionService,
        private dataService: HighchartsDataService,
        private store: Store<fromStore.RCPM2State>,
        private notificationService: NotificationService,
        private socket: fromSockets.SocketService
    ) {
    //   this.socket.authenticate().subscribe(res => {
    //       this.isUserSocketAuthenticated = res;
    //   });
      this.socket.socketUserAuth();
    }
}
