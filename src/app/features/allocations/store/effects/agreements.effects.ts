import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromModels from './../../models/agreements.models';
import * as fromActions from './../actions/agreements.actions';
import * as fromServices from './../../services/agreements.service';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers';
import { NotificationService } from 'src/app/factories';

@Injectable()
export class AgreementsEffects {

    @Effect()
    loadAgreementTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENT_TYPES),
            switchMap(() => {
                return this.agreementsService$
                    .getTradeAgreementTypes()
                    .pipe(
                        map((res: fromModels.ITradeAgreementType[]) => new fromActions.LoadTradeAgreementTypesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadTradeAgreementTypesFailed(err))
                    ));
            })
    );

    @Effect()
    loadAgreementSecTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENT_SEC_TYPES),
            switchMap(() => {
                return this.agreementsService$
                    .getTradeAgreementSecTypes()
                    .pipe(
                        map((res: fromModels.ITradeAgreementSecType[]) => new fromActions.LoadTradeAgreementSecTypesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadTradeAgreementSecTypesFailed(err)))
                    );
            })
        );

    @Effect()
    loadAgreements$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENTS),
            switchMap(() => {
                return this.agreementsService$
                    .getTradeAgreements()
                    .pipe(
                        switchMap((res: fromModels.ITradeAgreement[]) => {
                            return [
                                new fromActions.LoadTradeAgreementsComplete(res),
                                new fromActions.SaveAgreementGridOriginData(res)
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadTradeAgreementsFailed(err))
                    ));
            })
        );

    @Effect()
    ResetAgreementDataGrid$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgreementActionTypes.RESET_AGREEMENT_GRID),
            withLatestFrom(this.store.select(fromSelector.getAgreementOriginData)),
            map(([undefined, orginAgreementData]) => {
                return new fromActions.LoadTradeAgreementsComplete(orginAgreementData);
            })
        );

    @Effect()
    addAgreements$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgreementActionTypes.ADD_TRADE_AGREEMENT),
            map((action: fromActions.AddTradeAgreement) => action.payload),
            switchMap((payload: fromModels.ITradeAgreement) => {
                const recordId = payload.recordId;             // for ag grid update purpose
                return this.agreementsService$
                    .addTradeAgreement(payload)
                    .pipe(
                        map((res: fromModels.ITradeAgreement) => {
                            res.recordId = recordId;
                            res._notSave = false;
                            return new fromActions.AddTradeAgreementComplete(res);
                        }),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.AddTradeAgreementFailed(err));
                        }
                    ));
            })
        );

    @Effect()
    updateAgreements$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgreementActionTypes.UPDATE_TRADE_AGREEMENT),
            map((action: fromActions.UpdateTradeAgreement) => action.payload),
            switchMap((payload: fromModels.ITradeAgreement) => {
                const recordId = payload.recordId;             // for ag grid update purpose
                return this.agreementsService$
                    .updateTradeAgreement(payload)
                    .pipe(
                        map((res: fromModels.ITradeAgreement[]) => {
                            const targetRow = res[0];
                            targetRow.recordId = recordId;
                            targetRow._notSave = false;
                            return new fromActions.UpdateTradeAgreementComplete(targetRow);
                        }),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.UpdateTradeAgreementFailed(err));
                        }
                    ));
            })
        );


    @Effect()
    deleteAgreements$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgreementActionTypes.DELETE_TRADE_AGREEMENT),
            map((action: fromActions.DeleteTradeAgreement) => action.payload),
            switchMap((payload: fromModels.ITradeAgreement) => {
                const recordId = payload.recordId;
                return this.agreementsService$
                    .deleteTradeAgreement(payload)
                    .pipe(
                        map((res: fromModels.ITradeAgreement) => {
                            res.recordId = recordId;
                            return new fromActions.DeleteTradeAgreementComplete(res);
                        }),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.DeleteTradeAgreementFailed(err));
                        }
                    ));
            })
        );

    @Effect()
    loadTradeAgreementAllocationCache$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENT_ALLOCATION_CACHE),
            switchMap(() => {
                return this.agreementsService$
                    .getTradeAgreementAllocationCache()
                    .pipe(
                        map((res: fromModels.ITradeAgreementAllocationCache[]) => {
                            return new fromActions.LoadTradeAgreementAllocationCacheComplete(res);
                        }),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.LoadTradeAgreementAllocationCacheFailed(err));
                        }
                        ));
            })
        );


    @Effect()
    updateTradeAgreementAllocationCache$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgreementActionTypes.UPDATE_TRADE_AGREEMENT_ALLOCATION_CACHE),
            switchMap(() => {
                return this.agreementsService$
                    .updateTradeAgreementAllocationCache()
                    .pipe(
                        map((res: any) => {
                            this.notificationService.openNotification(res['status']);
                            return new fromActions.UpdateTradeAgreementAllocationCacheComplete(res);
                        }),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.UpdateTradeAgreementAllocationCacheFailed(err));
                        }
                        ));
            })
        );

    constructor(
        private actions$: Actions,
        private agreementsService$: fromServices.TradeAgreementsService,
        private notificationService: NotificationService,
        private store: Store<fromStore.State>
    ) { }
}
