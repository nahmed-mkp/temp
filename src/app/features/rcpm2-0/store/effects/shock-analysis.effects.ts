import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import * as fromServices from '../../services';
import * as fromActions from '../actions';


@Injectable()
export class ShockAnalysisEffects {

    @Effect()
    loadShockInfo$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ShockAnalysisActionTypes.LOAD_SHOCK_INFO),
            switchMap(() => {
                return this.shockAnalysisService.loadShocksInfo()
                    .pipe(
                        map((res) => new fromActions.LoadShockInfoComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadShockInfoFailed(err)))
                    );
            })
        );

    @Effect()
    loadShockAssetClass$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ShockAnalysisActionTypes.LOAD_SHOCK_ASSET_CLASS),
            map((action: fromActions.LoadShockAssetClass) => action.payload),
            switchMap(payload => {
                return this.shockAnalysisService.loadShocksAssetClass(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadShockAssetClassComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadShockAssetClassFailed(err)))
                    );
            })
        );


    @Effect()
    hitShockTrigger$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ShockAnalysisActionTypes.HIT_SHOCK_TRIGGER),
            switchMap(() => {
                return this.shockAnalysisService.hitShocksTrigger()
                    .pipe(
                        map((res) => new fromActions.HitShockTriggerComplete(res)),
                        catchError((err: string) => of(new fromActions.HitShockTriggerFailed(err)))
                    );
            })
        );




    constructor(
        private actions$: Actions,
        private shockAnalysisService: fromServices.ShocksAnalysisService,
    ) {}
}