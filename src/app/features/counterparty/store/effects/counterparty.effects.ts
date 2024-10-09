import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromActions from './../actions/counterparty.actions';
import * as fromServices from './../../services/counterparty.service';
import { of } from 'rxjs';


@Injectable()
export class CounterpartyExposureEffects {

    @Effect()
    loadCounterpartyExposure$ = this.action$.pipe(
        ofType(fromActions.CounterpartyExposureActionTypes.LOAD_COUNTERPARTY_CDS_SPREADS),
        switchMap(() => {
            return this.counterpartyExposureService$.loadCounterpartyCDSSpreads()
                .pipe(
                    map((data: any[]) => new fromActions.LoadCounterpartyCDSSpreadsComplete(data)),
                    catchError(error => of(new fromActions.LoadCounterpartyCDSSpreadsFailed(error)))
                );
        })
    );

    constructor(private action$: Actions,
        private counterpartyExposureService$: fromServices.CounterpartyExposureService) { }
}
