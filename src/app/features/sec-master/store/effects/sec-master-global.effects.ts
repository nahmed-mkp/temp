import { Injectable } from '@angular/core';
import { Observable, of, merge, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom, delay } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromModels from '../../models/sec-master-global.models';
import * as fromServices from '../../services/sec-master-global.service';
import * as fromActions from '../actions/sec-master-global.actions';
import { NotificationService } from 'src/app/factories';

@Injectable()
export class SecMasterGlobalEffects {

    @Effect()
    loadAssetClassFieldMap$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.LOAD_ASSET_CLASS_FIELD_MAP),
            switchMap(() => {
                return this.service$
                    .loadAssetClassFieldMap()
                    .pipe(
                        map((res: fromModels.IAssetClassFieldMap[]) => new fromActions.LoadAssetClassFieldMapComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadAssetClassFieldMapFailed(err)))
                    );
            })
        );

    @Effect()
    loadSecMasterLookups$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.LOAD_SEC_MASTER_LOOKUPS),
            switchMap(() => {
                return this.service$
                    .loadSecMasterLookups()
                    .pipe(
                        map((res: any) => new fromActions.LoadSecMasterLookupsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSecMasterLookupsFailed(err)))
                    );
            })
        );




    @Effect()
    loadUserActivity$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.LOAD_USER_ACTIVITY),
            switchMap(() => {
                return this.service$
                    .loadUserActivity()
                    .pipe(
                        switchMap((res: fromModels.IUserActivity[]) => {
                            // const actionCollection: any[] = [new fromActions.LoadUserActivityComplete(res)];
                            const isAllActivityFinished = res.every(element => {
                                return element.isProcessed === true || element.isErrored === true;
                            });
                            if (isAllActivityFinished === false) {
                                return merge(
                                    of(new fromActions.LoadUserActivityComplete(res)),
                                    of(new fromActions.LoadUserActivity).pipe(delay(10000))
                                );
                            } else {
                                // return [new fromActions.LoadUserActivityComplete(res)];
                                return merge(
                                    of(new fromActions.LoadUserActivityComplete(res)),
                                    of(new fromActions.LoadUserActivity).pipe(delay(10000))
                                );
                            }

                        }),
                        catchError((err: string) => of(new fromActions.LoadUserActivityFailed(err)))
                    );
            })
        );

    @Effect()
    loadSecurityViewerDynamicTabDict$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_VIEWER_DYNAMIC_TAB_DICT),
            switchMap(() => {
                return this.service$
                    .loadSecurityViewerDynamicTabDict()
                    .pipe(
                        map((res: any) => new fromActions.LoadSecurityViewerDynamicTabDictComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSecurityViewerDynamicTabDictFailed(err)))
                    );
            })
        );

    @Effect()
    loadSecuritDetail$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL),
            map((action: fromActions.LoadSecurityDetail) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSecurityDetail(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadSecurityDetailComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSecurityDetailFailed({request_id: payload, error: err})))
                    );
            })
        );




    @Effect()
    createNewSecurity$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.CREATE_NEW_SECURITY),
            map((action: fromActions.CreateNewSecurity) => action.payload),
            switchMap((payload: fromModels.INewSecurity) => {
                return this.service$
                    .createNewSecurity(payload)
                    .pipe(
                        map((res: any) => new fromActions.CreateNewSecurityComplete(res)),
                        catchError((err: string) => of(new fromActions.CreateNewSecurityFailed(err)))
                    );
            })
        );

    @Effect()
    retryCreateNewSecurity$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.RETRY_CREATE_NEW_SECURITY),
            map((action: fromActions.RetryCreateNewSecurity) => action.payload),
            switchMap((payload: string) => {
                return this.service$
                    .retryCreateNewSecurity(payload)
                    .pipe(
                        map((res: any) => new fromActions.RetryCreateNewSecurityComplete(res)),
                        catchError((err: string) => of(new fromActions.RetryCreateNewSecurityFailed(err)))
                    );
            })
        );



    @Effect()
    loadMarketDataMap$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.LOAD_MARKET_DATA_DEFAULTS),
            switchMap(() => {
                return this.service$
                    .loadMarketDataMap()
                    .pipe(
                        map((res: any) => new fromActions.LoadMarketDataDefaultsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadMarketDataDefaultsFailed(err)))
                    );
            })
        );


    @Effect()
    LoadSecuritySearchResult$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_SEARCH_RESULT),
            map((action: fromActions.LoadSecuritySearchResult) => action.payload),
            switchMap((payload: fromModels.ISecuritySearchReq) => {
                return this.service$
                    .loadSecuritySearchResult(payload)
                    .pipe(
                        map((res: fromModels.ISecuritySearchResult[]) => new fromActions.LoadSecuritySearchResultComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSecuritySearchResultFailed(err)))
                    );
            })
        );

    @Effect()
    loadSecuritDetailFromSearch$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL_FROM_SEARCH),
            map((action: fromActions.LoadSecurityDetailFromSearch) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSecurityDetailFromSearch(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadSecurityDetailFromSearchComplete({id: payload.id, data: res})),
                        catchError((err: string) => of(new fromActions.LoadSecurityDetailFromSearchFailed({id: payload.id, error: err})))
                    );
            })
        );

    @Effect()
    UpdateSecuritDetailFromSearch$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.UPDATE_SECURITY_DETAIL),
            map((action: fromActions.UpdateSecurityDetail) => action.payload),
            switchMap(payload => {
                // return this.service$
                //     .UpdateSecurityDetail(payload)
                //     .pipe(
                //         map((res: any) => new fromActions.UpdateSecurityDetailComplete(res)),
                //         catchError((err: string) => of(new fromActions.UpdateSecurityDetailFailed(err)))
                //     );
                return empty();
            })
        );



    @Effect()
    LoadeSecurityForDelete$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_FOR_DELETE),
            map((action: fromActions.LoadSecurityForDelete) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSecurityForDelete(payload)
                    .pipe(
                        map((res: any) => {
                            if (res && res.length && res.length > 0) {
                                return new fromActions.LoadSecurityForDeleteComplete(res[0]);
                            } else {
                                return new fromActions.LoadSecurityForDeleteComplete(null);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadSecurityForDeleteFailed(err)))
                    );
            })
        );

    @Effect()
    DeleteSecurity$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.DELETE_SECURITY),
            map((action: fromActions.DeleteSecurity) => action.payload),
            switchMap(payload => {
                return this.service$
                    .deleteSecurity(payload)
                    .pipe(
                        map((res: any) => {
                            this.notificationService.openNotificationCenter_green('Security Deleted!');
                            return new fromActions.DeleteSecurityComplete(res);
                        }),
                        catchError((err: string) => {
                            this.notificationService.openNotificationCenter('Can not delete security, there are orders associated with this security !');
                            return of(new fromActions.DeleteSecurityFailed(err));
                        })
                    );
            })
        );

    @Effect()
    loadSecuritDoNotUpdateFlagList$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_DO_NOT_UPDATE_FLAG_LIST),
            switchMap(() => {
                return this.service$
                    .loadDoNotUpdateFlagSecurity()
                    .pipe(
                        map((res: any) => new fromActions.LoadSecurityDoNotUpdateFlagListComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSecurityDoNotUpdateFlagListFailed(err)))
                    );
            })
        );

    @Effect()
    SetSecuritDoNotUpdateFlag$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterGlobalActionTypes.SET_SECURITY_DO_NOT_UPDATE_FLAG),
            map((action: fromActions.SetSecurityDoNotUpdateFlag) => action.payload),
            switchMap(payload => {
                return this.service$
                    .setDoNotUpdateFlag(payload)
                    .pipe(
                        switchMap((res: any) => [
                            new fromActions.SetSecurityDoNotUpdateFlagComplete(res),
                            new fromActions.LoadSecurityDoNotUpdateFlagList
                        ]),
                        catchError((err: string) => of(new fromActions.SetSecurityDoNotUpdateFlagFailed(err)))
                    );
            })
        );

    @Effect()
    ManualSetSecuritDoNotUpdateFlag$: Observable<Action> = this.actions$
        .pipe(
            ofType(
                fromActions.SecMasterGlobalActionTypes.MANUAL_SET_SECURITY_DO_NOT_UPDATE_FLAG),
            map((action: fromActions.ManualSetSecurityDoNotUpdateFlag) => action.payload),
            switchMap(payload => {
                return this.service$
                    .manualSetDoNotUpdateFlag(payload)
                    .pipe(
                        switchMap((res: any) => [
                            new fromActions.ManualSetSecurityDoNotUpdateFlagComplete(res),
                            new fromActions.LoadSecurityDoNotUpdateFlagList
                        ]),
                        catchError((err: string) => of(new fromActions.ManualSetSecurityDoNotUpdateFlagFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private service$: fromServices.SecMasterGlobalService,
        private notificationService: NotificationService,
    ) { }
}

