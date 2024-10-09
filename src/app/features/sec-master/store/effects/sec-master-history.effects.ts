import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromModels from '../../models/sec-master-history.models';
import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class SecMasterHistoryEffects {

    @Effect()
    loadCreateHistory$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterHistoryActionTypes.LOAD_CREATE_HISTORY),
            map((action: fromActions.LoadCreateHistory) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadCreateHistory(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadCreateHistoryComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadCreateHistoryFailed(err)))
                    );
            })
        );

    @Effect()
    loadUpdateHistory$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterHistoryActionTypes.LOAD_UPDATE_HISTORY),
            map((action: fromActions.LoadCreateHistory) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadUpdateHistory(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadUpdateHistoryComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadUpdateHistoryFailed(err)))
                    );
            })
        );

    @Effect()
    AddDoNotUpdateFlagFromCreationHistory$: Observable<Action> = this.actions$
        .pipe(
            ofType(
                fromActions.SecMasterHistoryActionTypes.ADD_DO_NOT_UPDATE_FLAG_FROM_CREATION_HISTORY),
            map((action: fromActions.AddDoNotUpdateFlagFromCreationHistory) => action.payload),
            switchMap(payload => {
                return this.doNotUpdateFlagService$
                    .manualSetDoNotUpdateFlag(payload)
                    .pipe(
                        switchMap((res: any) => [
                            new fromActions.AddDoNotUpdateFlagFromCreationHistoryComplete(res),
                            new fromActions.LoadSecurityDoNotUpdateFlagList
                        ]),
                        catchError((err: string) => of(new fromActions.AddDoNotUpdateFlagFromCreationHistoryFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private service$: fromServices.SecMasterHistoryService,
        private doNotUpdateFlagService$: fromServices.SecMasterGlobalService
    ) { }
}

