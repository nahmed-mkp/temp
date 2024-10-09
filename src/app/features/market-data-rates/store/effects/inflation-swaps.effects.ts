import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';

import * as fromServices from '../../services/';
import * as fromSelector from '../selectors';
import * as fromStore from '../reducers';
import * as fromActions from '../actions';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';
import * as moment from 'moment';


@Injectable()
export class InflationSwapsEffects {

    @Effect()
    LoadInflationSwaps$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InflationSwapsActionTypes.LOAD_INFLATION_SWAPS),
            withLatestFrom(this.store.select(fromSelector.getSelectedDate)),
            switchMap(([payload, selectedDate]) => {
                const dateString = selectedDate.toLocaleDateString().split('/').join('-');
                return this.inflationSwapsService$.loadInflationSwaps(dateString)
                    .pipe(
                        map(res => {
                            return new fromActions.LoadInflationSwapsComplete(res);
                        }),
                        catchError((err: string) => of(new fromActions.LoadInflationSwapsFailed(err)))
                    );

            })
        );


    @Effect()
    LoadInflationSwapsDataPoints$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InflationSwapsActionTypes.LOAD_INFLATION_SWAPS_DATA_POINTS),
            withLatestFrom(this.store.select(fromSelector.getSelectedDate)),
            switchMap(([payload, selectedDate]) => {
                const dateString = selectedDate.toLocaleDateString().split('/').join('-');
                return this.inflationSwapsService$.loadInflationSwapsDataPoints(dateString)
                    .pipe(
                        map(res => new fromActions.LoadInflationSwapsDataPointsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadInflationSwapsDataPointsFailed(err)))
                    );

            })
        );


    constructor(
        private actions$: Actions,
        private store: Store<fromStore.State>,
        private inflationSwapsService$: fromServices.MarketDataRatesService,
        private dataService: HighchartsDataService,
    ) { }
}
