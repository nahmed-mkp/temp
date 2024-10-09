import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import * as fromServices from '../../services/';
import * as fromActions from '../actions';

@Injectable()
export class PnlRecEffects {

    @Effect()
    LoadPnlRecData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPMPnlRecActionTypes.LOAD_PNL_REC_DATA),
            map((action: fromActions.LoadPnlRecData) => action.payload),
            switchMap(payload => {
                return this.pnlRecService.loadPnlRecData(payload)
                    .pipe(
                        map(res => new fromActions.LoadPnlRecDataComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPnlRecDataFailed(err)))
                    );
            })
        );

    @Effect()
    LoadCRDPosRecData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPMPnlRecActionTypes.LOAD_CRD_POS_REC_DATA),
            map((action: fromActions.LoadCRDPosRecData) => action.payload),
            switchMap(payload => {
                return this.pnlRecService.loadPosRecData(payload)
                    .pipe(
                        map(res => new fromActions.LoadCRDPosRecDataComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadCRDPosRecDataFailed(err)))
                    );
            })
        );


    @Effect()
    LoadPricerRecData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RCPMPnlRecActionTypes.LOAD_PRICER_REC_DATA),
            map((action: fromActions.LoadPricerRecData) => action.payload),
            switchMap(payload => {
                return this.pnlRecService.loadPricerRecData(payload)
                    .pipe(
                        map(res => new fromActions.LoadPricerRecDataComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPricerRecDataFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private pnlRecService: fromServices.RCPMPnlRecService,
    ) {}
}
