import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import * as fromServices from '../../services';
import * as fromActions from '../actions';
import * as fromModels from './../../models';

@Injectable()
export class PrizmSEIPnlEffects {

    @Effect()
    uploadFiles$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PrizmSEIPnlRecActionTypes.UPLOAD_FILES),
            map((action: fromActions.UploadFiles) => action.payload),
            switchMap((payload: string[]) => {
                return this.pnlRecService.uploadFiles(payload)
                    .pipe(
                        map((res: fromModels.PrizmSEIRecUpload) => new fromActions.UploadFilesComplete(res)),
                        catchError((err: string) => of(new fromActions.UploadFilesFailed(err)))
                    );
            })
        );


    @Effect()
    loadFundsForRec$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PrizmSEIPnlRecActionTypes.LOAD_FUNDS_FOR_REC),
            switchMap(() => {
                return this.pnlRecService.loadFundsForRec()
                    .pipe(
                        map((res: string[]) => new fromActions.LoadFundsForRecComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadFundsForRecFailed(err)))
                    );
            })
        );


    @Effect()
    uploadFunds$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PrizmSEIPnlRecActionTypes.UPLOAD_FUNDS),
            map((action: fromActions.UploadFunds) => action.payload),
            switchMap((payload: string[]) => {
                return this.pnlRecService.uploadFunds(payload)
                    .pipe(
                        map((res: fromModels.PrizmSEIRecUpload) => new fromActions.UploadFundsComplete(res)),
                        catchError((err: string) => of(new fromActions.UploadFundsFailed(err)))
                    );
            })
    );

    @Effect()
    runReconciliation$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PrizmSEIPnlRecActionTypes.RUN_RECONCILIATION),
            map((action: fromActions.RunReconciliation) => action.payload),
            switchMap((payload: string) => {
                return this.pnlRecService.runReconciliation(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.RunReconciliationComplete(res)),
                        catchError((err: string) => of(new fromActions.RunReconciliationFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private pnlRecService: fromServices.PrizmSEIPnlRecService,
    ) {}
}
