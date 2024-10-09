import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services/sizing.service';
import * as fromModels from './../../models/sizing.models';

@Injectable()
export class SizingEffects {

    @Effect()
    loadSizingSheetItems$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SizingActionTypes.LOAD_SIZING_SHEET_ITEMS),
            mergeMap(() => {
                return this.sizingService$
                    .getSizingSheetItems()
                    .pipe(
                        map((res: fromModels.SizingResponse) => new fromActions.LoadSizingSheetItemsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSizingSheetItemsFailed(err))
                    ));
            })
        );

    @Effect()
    RefreshSizingSheetItems$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SizingActionTypes.REFRESH_SIZING_SHEET_ITEMS),
            mergeMap(() => {
                return this.sizingService$
                    .refreshSizingSheetItems()
                    .pipe(
                        map((res: fromModels.SizingResponse) => new fromActions.RefreshSizingSheetItemsComplete(res)),
                        catchError((err: string) => of(new fromActions.RefreshSizingSheetItemsFailed(err))
                    ));
            })
        );

    @Effect()
    loadSizingCapitals$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SizingActionTypes.LOAD_SIZING_CAPITALS),
            mergeMap(() => {
                return this.sizingService$
                    .getSizingCapitals()
                    .pipe(
                        map((res: fromModels.SizingCapital[]) => new fromActions.LoadSizingCapitalsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSizingCapitalsFailed(err))
                    ));
            })
        );

    @Effect()
    loadSizingSecurities$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SizingActionTypes.LOAD_SIZING_SECURITIES),
            mergeMap(() => {
                return this.sizingService$
                    .loadSecurities()
                    .pipe(
                        map((res: fromModels.SizingSecurity[]) => new fromActions.LoadSizingSecuritiesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSizingSecuritiesFailed(err))
                        ));
            })
        );

    @Effect()
    addSizingSecurities$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SizingActionTypes.ADD_SIZING_SECURITY),
            map((action: fromActions.AddSizingSecurity) => action.payload),
            mergeMap((payload: fromModels.SizingSecurity) => {
                return this.sizingService$
                    .addSecurity(payload)
                    .pipe(
                        switchMap((res: fromModels.SizingSecurity[]) => {
                            return [
                                new fromActions.AddSizingSecurityComplete(res),
                                new fromActions.LoadSizingSecurities
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.AddSizingSecurityFailed(err))
                    ));
            })
        );

    @Effect()
    updateSizingSecurities$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SizingActionTypes.UPDATE_SIZING_SECURITY),
            map((action: fromActions.UpdateSizingSecurity) => action.payload),
            mergeMap((payload: fromModels.SizingSecurity) => {
                return this.sizingService$
                    .updateSecurity(payload)
                    .pipe(
                        switchMap((res: fromModels.SizingSecurity[]) => {
                            return [
                                new fromActions.UpdateSizingSecurityComplete(res),
                                new fromActions.LoadSizingSecurities
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.UpdateSizingSecurityFailed(err))
                    ));
            })
        );

    @Effect()
    deleteSizingSecurities$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SizingActionTypes.DELETE_SIZING_SECURITY),
            map((action: fromActions.DeleteSizingSecurity) => action.payload),
            mergeMap((payload: fromModels.SizingSecurity) => {
                return this.sizingService$
                    .deleteSecurity(payload)
                    .pipe(
                        switchMap((res: fromModels.SizingSecurity[]) => {
                            return [
                                new fromActions.DeleteSizingSecurityComplete(res),
                                new fromActions.LoadSizingSecurities
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.DeleteSizingSecurityFailed(err))
                    ));
            })
        );


    @Effect()
    SaveSizingSecurities$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SizingActionTypes.SAVE_SIZING_SECURITIES),
            map((action: fromActions.SaveSizingSecurities) => action.payload),
            switchMap((payload: fromModels.SizingSecurity[]) => {
                if (payload.length > 0) {
                    const targetItem = payload.shift();
                    if (targetItem.status === 'added') {
                        return this.sizingService$
                        .addSecurity(targetItem)
                        .pipe(
                            map((res: fromModels.SizingSecurity[]) => new fromActions.SaveSizingSecurities(payload)),
                            catchError((err: string) => of(new fromActions.SaveSizingSecuritiesFailed(err))
                        ));
                    } else if (targetItem.status === 'edited') {
                        return this.sizingService$
                        .updateSecurity(targetItem)
                        .pipe(
                            map((res: fromModels.SizingSecurity[]) => new fromActions.SaveSizingSecurities(payload)),
                            catchError((err: string) => of(new fromActions.SaveSizingSecuritiesFailed(err))
                        ));
                    } else if (targetItem.status === 'deleted') {
                        return this.sizingService$
                        .deleteSecurity(targetItem)
                        .pipe(
                            map((res: fromModels.SizingSecurity[]) => new fromActions.SaveSizingSecurities(payload)),
                            catchError((err: string) => of(new fromActions.SaveSizingSecuritiesFailed(err))
                        ));
                    }
                } else {
                    // meaning we finish all the CRUD
                    return [
                        new fromActions.SaveSizingSecuritiesComplete,
                        new fromActions.LoadSizingSecurities,
                        new fromActions.RefreshSizingSheetItems,
                    ]
                }
            })
        );











    @Effect()
    loadDefaultCapitals$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SizingActionTypes.LOAD_DEFAULT_CAPITALS),
            mergeMap(() => {
                return this.sizingService$
                    .getDefaultCapitals()
                    .pipe(
                        map((res: fromModels.DefaultSizingCapital[]) => new fromActions.LoadDefaultCapitalsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDefaultCapitalsFailed(err))
                        ));
            })
        );

    @Effect()
    addDefaultCapital$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SizingActionTypes.ADD_DEFAULT_CAPITAL),
            map((action: fromActions.AddDefaultCapital) => action.payload),
            mergeMap((payload: fromModels.DefaultSizingCapital) => {
                return this.sizingService$
                    .addDefaultCapital(payload)
                    .pipe(
                        map((res: fromModels.DefaultSizingCapital[]) => new fromActions.AddDefaultCapitalComplete(res)),
                        catchError((err: string) => of(new fromActions.AddDefaultCapitalFailed(err))
                        ));
            })
        );

    @Effect()
    updateDefaultCapital$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SizingActionTypes.UPDATE_DEFAULT_CAPITAL),
            map((action: fromActions.UpdateDefaultCapital) => action.payload),
            mergeMap((payload: fromModels.DefaultSizingCapital) => {
                return this.sizingService$
                    .updateDefaultCapital(payload)
                    .pipe(
                        map((res: fromModels.DefaultSizingCapital[]) => new fromActions.UpdateDefaultCapitalComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateDefaultCapitalFailed(err))
                        ));
            })
        );

    @Effect()
    deleteDefaultCapital$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SizingActionTypes.DELETE_DEFAULT_CAPITAL),
            map((action: fromActions.DeleteDefaultCapital) => action.payload),
            mergeMap((payload: fromModels.DefaultSizingCapital) => {
                return this.sizingService$
                    .updateDefaultCapital(payload)
                    .pipe(
                        map((res: fromModels.DefaultSizingCapital[]) => new fromActions.DeleteDefaultCapitalComplete(res)),
                        catchError((err: string) => of(new fromActions.DeleteDefaultCapitalFailed(err))
                        ));
            })
        );
    

    constructor(
        private actions$: Actions,
        private sizingService$: fromServices.SizingService
    ){}
}