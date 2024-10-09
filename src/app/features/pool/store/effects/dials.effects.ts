import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';


import * as fromModels from './../../models/dials.models';
import * as fromActions from './../actions/dials.actions';
import * as fromServices from './../../services/dials.service';

@Injectable()
export class DialsEffects {

    @Effect()
    loadDialSets$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DialsActionTypes.LOAD_DIALS_SETS),
            switchMap(() => {
                return this.dialsService$
                    .loadDialSets()
                    .pipe(
                        map((res: fromModels.DialsSet[]) => new fromActions.LoadDialsSetsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDialsSetsFailed(err))
                    ));
            })
        );

    @Effect()
    addDialSet$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DialsActionTypes.ADD_DIALS_SET),
            map((action: fromActions.AddDialsSet) => action.payload),
            switchMap((payload: fromModels.NewDialsSet) => {
                return this.dialsService$
                    .addDialSet(payload)
                    .pipe(
                        map((res: fromModels.DialsSet) => new fromActions.AddDialsSetComplete(res)),
                        catchError((err: string) => of(new fromActions.AddDialsSetFailed(err))
                    ));
            })
        );

    @Effect()
    updateDialSet$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DialsActionTypes.UPDATE_DIALS_SET),
            map((action: fromActions.UpdateDialsSet) => action.payload),
            switchMap((payload: fromModels.DialsSet) => {
                return this.dialsService$
                    .updateDialSet(payload)
                    .pipe(
                        map((res: fromModels.DialsSet) => new fromActions.UpdateDialsSetComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateDialsSetFailed(err))
                    ));
            })
        );

    @Effect()
    deleteDialSet$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DialsActionTypes.DELETE_DIALS_SET),
            map((action: fromActions.DeleteDialsSet) => action.payload),
            switchMap((payload: fromModels.DialsSet) => {
                return this.dialsService$
                    .deleteDialSet(payload)
                    .pipe(
                        map((res: fromModels.DialsSet) => new fromActions.DeleteDialsSetComplete(res)),
                        catchError((err: string) => of(new fromActions.DeleteDialsSetFailed(err))
                    ));
            })
        );

    @Effect()
    loadDials$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DialsActionTypes.LOAD_DIALS),
            map((action: fromActions.LoadDials) => action.payload),
            switchMap((payload: fromModels.DialsSet) => {
                return this.dialsService$
                    .loadDials(payload)
                    .pipe(
                        map((res: fromModels.Dial[]) => new fromActions.LoadDialsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDialsFailed(err))
                    ));
            })
        );

    @Effect()
    updateDial$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DialsActionTypes.UPDATE_DIAL),
            map((action: fromActions.UpdateDial) => action.payload),
            switchMap((payload: fromModels.DialUpdate) => {
                return this.dialsService$
                    .updateDial(payload)
                    .pipe(
                        map((res: fromModels.Dial[]) => new fromActions.UpdateDialComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateDialFailed(err))
                    ));
            })
        );

    constructor(
        private actions$: Actions,
        private dialsService$: fromServices.DialsService
    ) {}
}
