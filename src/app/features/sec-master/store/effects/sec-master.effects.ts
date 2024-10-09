import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromModels from '../../models/sec-master.models';
import * as fromServices from '../../services/sec-master.service';
import * as fromActions from '../actions/sec-master.actions';

@Injectable()
export class SecMasterEffects {

    @Effect()
    searchSecurities$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterActionTypes.SEARCH_SECURITIES),
            map((action: fromActions.SearchSecurities) => action.payload),
            switchMap((payload: fromModels.ISecMasterSearch) => {
                return this.service$
                    .searchSecurities(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.SearchSecuritiesComplete(res)),
                        catchError((err: string) => of(new fromActions.SearchSecuritiesFailed(err)))
                    );
            })
        );

    @Effect()
    loadRecentSecurities$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterActionTypes.LOAD_RECENT_SECURITIES),
            switchMap(() => {
                return this.service$
                    .loadRecentSecurities()
                    .pipe(
                        map((res: any[]) => new fromActions.LoadRecentSecuritiesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadRecentSecuritiesFailed(err)))
                    );
            })
        );

    @Effect()
    loadSecurityTags$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterActionTypes.LOAD_SECURITY_TAGS),
            switchMap(() => {
                return this.service$
                    .loadSecurityTags()
                    .pipe(
                        map((res: any[]) => new fromActions.LoadSecurityTagsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSecurityTagsFailed(err)))
                    );
            })
        );

    @Effect()
    updateSecurityTag$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterActionTypes.UPDATE_SECURITY_TAG),
            map((action: fromActions.UpdateSecurityTag) => action.payload),
            switchMap(payload => {
                return this.service$
                    .updateSecurityTag(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateSecurityTagComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateSecurityTagFailed(err)))
                    );
            })
        );

    @Effect()
    loadSecurity$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterActionTypes.LOAD_SECURITY),
            map((action: fromActions.LoadSecurity) => action.payload),
            switchMap((sid: number) => {
                return this.service$
                    .loadSecurity(sid)
                    .pipe(
                        map((res: fromModels.ISecurity) => new fromActions.LoadSecurityComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSecurityFailed(err)))
                    );
            })
        );

    @Effect()
    loadSecurityMarketData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterActionTypes.LOAD_SECURITY_MARKET_DATA),
            map((action: fromActions.LoadSecurityMarketData) => action.payload),
            switchMap((sid: number) => {
                return this.service$
                    .loadSecurityMarketData(sid)
                    .pipe(
                        map((res: fromModels.IMarketData[]) => new fromActions.LoadSecurityMarketDataComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSecurityMarketDataFailed(err)))
                    );
            })
        );

    @Effect()
    loadMarketDataPoints$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterActionTypes.LOAD_MARKET_DATA_POINTS),
            map((action: fromActions.LoadMarketDataPoints) => action.payload),
            switchMap((mdid: number) => {
                return this.service$
                    .loadMarketDataPoints(mdid)
                    .pipe(
                        map((res: any) => new fromActions.LoadMarketDataPointsComplete(this.dataService$.csvToObjectArrayWithColumnHeaders(res['data'], 'date'))),
                        catchError((err: string) => of(new fromActions.LoadMarketDataPointsFailed(err)))
                    );
            })
        );

    @Effect()
    saveSecurity$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterActionTypes.SAVE_SECURITY),
            map((action: fromActions.SaveSecurity) => action.payload),
            switchMap((payload: fromModels.ISecurity) => {
                return this.service$
                    .saveSecurity(payload)
                    .pipe(
                        map((res: fromModels.ISecurity) => new fromActions.SaveSecurityComplete(res)),
                        catchError((err: string) => of(new fromActions.SaveSecurityFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private service$: fromServices.SecMasterService,
        private dataService$: HighchartsDataService
    ) { }
}

