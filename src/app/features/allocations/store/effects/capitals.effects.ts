import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromModels from '../../models/capitals.models';
import * as fromServices from '../../services/capitals.service';
import * as fromActions from '../actions/capitals.actions';

@Injectable()
export class CapitalsEffects {

    @Effect()
    loadFundComplexes$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalsActionTypes.LOAD_FUND_COMPLEXES),
            switchMap(() => {
                return this.capitalsService$
                    .loadFundComplexes()
                    .pipe(
                        map((res: string[]) => new fromActions.LoadFundComplexesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadFundComplexesFailed(err))
                        ));
            })
        );

    @Effect()
    loadLatestCapitalMatrix$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalsActionTypes.LOAD_LATEST_CAPITAL_MATRIX),
            switchMap(() => {
                return this.capitalsService$
                    .getLatestCapitalMatrix()
                    .pipe(
                        map((res: fromModels.ICapitalMatrix) => new fromActions.LoadLatestCapitalMatrixComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadLatestCapitalMatrixFailed(err))
                        ));
            })
        );

    @Effect()
    loadCapitalMatrix$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalsActionTypes.LOAD_CAPITAL_MATRIX),
            map((action: fromActions.LoadCapitalMatrix) => action.payload),
            switchMap((payload: fromModels.ICapitalInput) => {
                return this.capitalsService$
                    .getCapitalMatrix(payload)
                    .pipe(
                        map((res: fromModels.ICapitalMatrix) => new fromActions.LoadCapitalMatrixComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadCapitalMatrixFailed(err))
                        ));
            })
        );

    @Effect()
    loadFundCapitalFlows$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalsActionTypes.LOAD_FUND_CAPITAL_FLOWS),
            map((action: fromActions.LoadFundCapitalFlows) => action.payload),
            switchMap((payload: fromModels.ICapitalFlowInput) => {
                return this.capitalsService$
                    .loadFundCapitalFlows(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadFundCapitalFlowsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadFundCapitalFlowsFailed(err))
                        ));
            })
        );

    @Effect()
    loadPodCapitalFlows$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalsActionTypes.LOAD_POD_CAPITAL_FLOWS),
            map((action: fromActions.LoadPodCapitalFlows) => action.payload),
            switchMap((payload: fromModels.ICapitalFlowInput) => {
                return this.capitalsService$
                    .loadPodCapitalFlows(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadPodCapitalFlowsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPodCapitalFlowsFailed(err))
                        ));
            })
        );

    @Effect()
    loadFundCapitalHistory$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalsActionTypes.LOAD_FUND_CAPITAL_HISTORY),
            map((action: fromActions.LoadFundCapitalHistory) => action.payload),
            switchMap((payload: fromModels.ICapitalHistoryInput) => {
                return this.capitalsService$
                    .loadFundCapitalHistory(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadFundCapitalHistoryComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadFundCapitalHistoryFailed(err))
                        ));
            })
        );

    @Effect()
    loadPodCapitalHistory$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalsActionTypes.LOAD_POD_CAPITAL_HISTORY),
            map((action: fromActions.LoadPodCapitalHistory) => action.payload),
            switchMap((payload: fromModels.ICapitalHistoryInput) => {
                return this.capitalsService$
                    .loadPodCapitalHistory(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadPodCapitalHistoryComplete({'fundID': payload.fundId, 'history': res})),
                        catchError((err: string) => of(new fromActions.LoadPodCapitalHistoryFailed(err))
                        ));
            })
        );



    // ====================================

    @Effect()
    UpdateCrosspodCapital$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalsActionTypes.UPDATE_CROSSPOD_CAPITAL),
            map((action: fromActions.UpdateCrosspodCapital) => action.payload),
            switchMap((payload: fromModels.ICrossPodCapitalChange) => {
                return this.capitalsService$
                    .updateCrossPodCapital(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateCrosspodCapitalComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateCrosspodCapitalFailed(err))
                    ));
            })
        );

    @Effect()
    UpdateFundCapital$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalsActionTypes.UPDATE_FUND_CAPITAL),
            map((action: fromActions.UpdateFundCapital) => action.payload),
            switchMap((payload: fromModels.IFundCapitalChange) => {
                return this.capitalsService$
                    .updateFundCapital(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateFundCapitalComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateFundCapitalFailed(err))
                    ));
            })
    );

    @Effect()
    ResetCapitalChanges$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalsActionTypes.RESET_CAPITAL_CHANGES),
            map((action: fromActions.ResetCapitalChanges) => action.payload),
            switchMap((payload: fromModels.ICapitalInput) => {
                return this.capitalsService$
                    .resetCapitalChanges(payload)
                    .pipe(
                        map((res: any) => new fromActions.ResetCapitalChangesComplete(res)),
                        catchError((err: string) => of(new fromActions.ResetCapitalChangesFailed(err))
                        ));
            })
        );

    @Effect()
    PreviewCapitalChanges$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalsActionTypes.PREVIEW_CAPITAL_CHANGES),
            map((action: fromActions.PreviewCapitalChanges) => action.payload),
            switchMap((payload: fromModels.ICapitalInput) => {
                return this.capitalsService$
                    .previewCapitalChanges(payload)
                    .pipe(
                        map((res: any) => new fromActions.PreviewCapitalChangesComplete(res)),
                        catchError((err: string) => of(new fromActions.PreviewCapitalChangesFailed(err))
                        ));
            })
        );

    @Effect()
    SaveCapitalChanges$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalsActionTypes.SAVE_CAPITAL_CHANGES),
            map((action: fromActions.SaveCapitalChanges) => action.payload),
            switchMap((payload: fromModels.ICapitalSaveInput) => {
                return this.capitalsService$
                    .saveCapitalChanges(payload)
                    .pipe(
                        map((res: fromModels.ISaveCapitalResult) => new fromActions.SaveCapitalChangesComplete(res)),
                        catchError((err: string) => {
                            const result = {
                                'guid': payload.guid,
                                'asOfDate': payload.asOfDate,
                                'fundComplex': payload.fundComplex,
                                'isError': true,
                                'message': err};
                            return of(new fromActions.SaveCapitalChangesFailed(result));
                        }
                    ));
            })
        );

    constructor(
        private actions$: Actions,
        private capitalsService$: fromServices.CapitalsService
    ) { }
}
