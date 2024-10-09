import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import * as fromModels from './../../models';
import * as fromServices from '../../services/';
import * as fromActions from '../actions';

@Injectable()
export class LeverageEffects {

    @Effect()
    loadLeverageDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LeverageActionTypes.LOAD_LEVERAGE_DATE),
            switchMap(() => {
                return this.leverageService.loadSupportedDates()
                    .pipe(
                        map((res: any) => new fromActions.LoadLeverageDateComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadLeverageDateFailed(err)))
                    );
            })
        );

    @Effect()
    loadSupportedGroupings$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LeverageActionTypes.LOAD_SUPPORTED_GROUPINGS),
            switchMap(() => {
                return this.leverageService.loadSupportedGroupings()
                    .pipe(
                        map((res: string[]) => new fromActions.LoadSupportedGroupingsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSupportedGroupingsFailed(err)))
                    );
            })
        );

    @Effect()
    loadLeverage$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LeverageActionTypes.LOAD_LEVERAGE),
            map((action: fromActions.LoadLeverage) => action.payload),
            switchMap((payload: fromModels.LeverageRequest) => {
                return this.leverageService.loadLeverage(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadLeverageComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadLeverageFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private leverageService: fromServices.LeverageService,
    ) { }
}
