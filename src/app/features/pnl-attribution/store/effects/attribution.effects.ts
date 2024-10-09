import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HighchartsDataService } from 'src/app/factories';

import * as fromActions from './../actions';
import * as fromServices from './../../services/attribution.service';
import * as fromModels from './../../models/attribution.models';
import * as fromStore from '../reducers';
import * as fromSelector from '../selectors'

@Injectable()
export class AttributionEffects {


    @Effect()
    loadCustomGroupingAttribute$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_CUSTOM_GROUPING_ATTRIBUTES),
            switchMap(() => {
                return this.attributionService$
                    .loadCustomGroupingAttributes()
                    .pipe(
                        map((res: any[]) => new fromActions.LoadCustomGroupingAttributesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadCustomGroupingAttributesFailed(err))
                    ));
            })
        );

        
    @Effect()
    loadPnlAttribution$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION),
            map((action: fromActions.LoadPnlAttribution) => action.payload),
            withLatestFrom(
                this.store.select(fromSelector.getActiveLayout),
                this.store.select(fromSelector.getLayoutEntity),
                this.store.select(fromSelector.getActiveGuidAdvance)
            ),
            switchMap(([payload, layoutName, layoutInfo, guid]) => {
                const layoutGrouping = layoutInfo[layoutName] && layoutInfo[layoutName].grouping || [];
                let request = payload.request;
                // request = {...request, grouping: layoutGrouping, guid: guid};
                request = {...request, grouping: layoutGrouping};   // dont send guid back even if it existed for now
                return this.attributionService$
                    .loadAttributionAdvance(request)
                    .pipe(
                        switchMap((res: any) => {
                            return [
                                new fromActions.LoadPnlAttributionComplete({result: res, layoutName: layoutName, grouping: layoutGrouping}),
                                new fromActions.SetGuid({layoutName: layoutName, guid: res.guid})
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadPnlAttributionFailed({result: err, layoutName: layoutName}))
                    ));
            })
        );


    @Effect()
    loadPnlAttributionWithGuid$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTOIN_WITH_GUID),
            map((action: fromActions.LoadPnlAttributionWithGuid) => action.payload),
            withLatestFrom(
                this.store.select(fromSelector.getActiveLayout),
            ),
            switchMap(([payload, layoutName]) => {
                return this.attributionService$
                    .loadAttributionWithGuid(payload)
                    .pipe(
                        switchMap((res: any) => {

                            const params = res.params || null;
                            const grouping: string = res.params && res.params.grouping || '';
                            const layoutGrouping: string[] = grouping.split('|');
                            layoutGrouping.pop();
                            layoutGrouping.unshift('FirmName');

                            return [
                                new fromActions.LoadPnlAttributionComplete({result: res, layoutName: layoutName, grouping: layoutGrouping}),
                                new fromActions.SetGuid({layoutName: layoutName, guid: res.guid}),
                                new fromActions.UpdateLayoutGrouping({layoutName: layoutName, grouping: layoutGrouping}),
                                new fromActions.SetAttributionRequest({layoutName: layoutName, request: params})
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadPnlAttributionFailed({result: err, layoutName: layoutName}))
                    ));
            })
        );

    @Effect()
    loadPositionAttribution: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_POSITION_PNL_ATTRIBUTION),
            map((action: fromActions.LoadPositionPnlAttribution) => action.payload),
            mergeMap((payload: fromModels.IPositionAttributionRequest) => {
                return this.attributionService$
                    .loadPositionAttribution(payload)
                    .pipe(
                        map((res: any) => {
                            return new fromActions.LoadPositionPnlAttributionComplete({guid: payload.guid, id: payload.id, data: res});
                        }),
                        catchError((err: string) => of(new fromActions.LoadPositionPnlAttributionFailed({guid: payload.guid, id: payload.id, err: err}))
                    ));
            })
        );









    @Effect()
    loadPnlAttributionTimeseriesAdvance$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES_ADVANCE),
            map((action: fromActions.LoadPnlAttributionDailyTimeseriesAdvance) => action.payload),
            switchMap(payload => of(payload).pipe(
                withLatestFrom(
                    this.store.select(fromSelector.getGuidByLayoutName(payload)),
                    this.store.select(fromSelector.getActiveNodeIdByLayoutName(payload)),
                    this.store.select(fromSelector.getAttributionTimeseriesLoadedStatusByLayoutName(payload)),
                )
            )),
            switchMap(([payload, guid, id, loaded]) => {
                if (guid !== undefined && id !== undefined && loaded !== true) {
                    return [new fromActions.LoadPnlAttributionDailyTimeseries({guid, id})]
                } else {
                    return []
                }
            })
        );
    @Effect()
    loadPnlAttributionTimeseries$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES),
            map((action: fromActions.LoadPnlAttributionDailyTimeseries) => action.payload),
            switchMap((payload: fromModels.IAttributionDailyTimeseriesRequest) => {
                return this.attributionService$
                    .loadAttributionDailyTimeseries(payload)
                    .pipe(
                        map((res: any) => {
                            return new fromActions.LoadPnlAttributionDailyTimeseriesComplete({ guid: payload.guid, id: payload.id, data: res });
                        }),
                        catchError((err: string) => of(new fromActions.LoadPnlAttributionDailyTimeseriesFailed({ guid: payload.guid, id: payload.id, err: err }))
                    ));
            })
        );





    @Effect()
    loadPnlAttributionDetailsAdvance$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DETAILS_ADVANCE),
            map((action: fromActions.LoadPnlAttributionDetailsAdvance) => action.payload),
            switchMap(payload => of(payload).pipe(
                withLatestFrom(
                    this.store.select(fromSelector.getGuidByLayoutName(payload)),
                    this.store.select(fromSelector.getActiveNodeCellWithMonthYearByLayoutName(payload)),
                    this.store.select(fromSelector.getAttributionDetailLoadedStatusByLayoutName(payload))
                )
            )),
            switchMap(([payload, guid, combineId, loaded]) => {
                if (guid !== undefined && combineId !== undefined && loaded !== true) {
                    const [id, month, year] = combineId.split('|');
                    const newPayload = {guid, id, month, year};
                    return [new fromActions.LoadPnlAttributionDetails({guid, id, month, year, combineId})]
                } else {
                    return []
                }
                // if (guid !== undefined && combineId !== undefined) {
                //     const [id, month, year] = combineId.split('|');
                //     const newPayload = {guid, id, month, year};
    
                //     return this.attributionService$
                //         .loadAttributionDetails(newPayload)
                //         .pipe(
                //             map((res: any) => {
                //                 return new fromActions.LoadPnlAttributionDetailsComplete({ guid: guid, combineId: combineId, data: res });
                //             }),
                //             catchError((err: string) => of(new fromActions.LoadPnlAttributionDetailsFailed({ guid: guid, combineId: combineId, err: err }))
                //         ));
                // } else {
                //     return []
                // }
            })
        );
    @Effect()
    loadPnlAttributionDetails$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DETAILS),
            map((action: fromActions.LoadPnlAttributionDetails) => action.payload),
            switchMap((payload: fromModels.IAttributionDetailsRequest) => {
                return this.attributionService$
                    .loadAttributionDetails(payload)
                    .pipe(
                        map((res: any) => {
                            return new fromActions.LoadPnlAttributionDetailsComplete({ guid: payload.guid, combineId: payload.combineId, data: res });
                        }),
                        catchError((err: string) => of(new fromActions.LoadPnlAttributionDetailsFailed({ guid: payload.guid, combineId: payload.combineId, err: err }))
                    ));
            })
        );
    











    @Effect()
    loadPnlAttributionReport$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_REPORT),
            map((action: fromActions.LoadPnlAttributionReport) => action.payload),
            switchMap((payload: fromModels.IAttributionReportRequest) => {
                return this.attributionService$
                    .loadAttributionReport(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadPnlAttributionReportComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPnlAttributionReportFailed(err))
                    ));
            })
        );


    @Effect()
    loadPnlAttributionCapitalReport$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_REPORT),
            map((action: fromActions.LoadPnlAttributionCapitalReport) => action.payload),
            switchMap((payload: fromModels.IAttributionReportRequest) => {
                return this.attributionService$
                    .loadAttributionCapitalReport(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadPnlAttributionCapitalReportComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPnlAttributionCapitalReportFailed(err))
                    ));
            })
        );


    @Effect()
    loadPnlAttributionPodCapitalReport$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_REPORT),
            map((action: fromActions.LoadPnlAttributionPodCapitalReport) => action.payload),
            switchMap((payload: fromModels.IAttributionReportRequest) => {
                return this.attributionService$
                    .loadAttributionPodCapitalReport(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadPnlAttributionPodCapitalReportComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPnlAttributionPodCapitalReportFailed(err))
                    ));
            })
        );

    @Effect()
    loadPnlAttributionCapitalEomReport$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_EOM_REPORT),
            map((action: fromActions.LoadPnlAttributionCapitalEomReport) => action.payload),
            switchMap((payload: fromModels.IAttributionReportRequest) => {
                return this.attributionService$
                    .loadAttributionCapitalReportEOM(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadPnlAttributionCapitalEomReportComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPnlAttributionCapitalEomReportFailed(err))
                    ));
            })
        );

    @Effect()
    loadPnlAttributionPodCapitalEomReport$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_EOM_REPORT),
            map((action: fromActions.LoadPnlAttributionPodCapitalEomReport) => action.payload),
            switchMap((payload: fromModels.IAttributionReportRequest) => {
                return this.attributionService$
                    .loadAttributionPodCapitalReportEOM(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadPnlAttributionPodCapitalEomReportComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPnlAttributionPodCapitalEomReportFailed(err))
                    ));
            })
        );


    constructor(
        private actions$: Actions,
        private attributionService$: fromServices.PnlAttributionService,
        private dataService$: HighchartsDataService,
        private store: Store<fromStore.PnlAttributionState>
    ) { }
}
