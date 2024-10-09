import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';

import * as fromServices from '../../services/';
import * as fromSelector from '../selectors';
import * as fromStore from '../reducers';
import * as fromActions from '../actions';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

@Injectable()
export class CurveEffects {


    @Effect()
    LoadCurvePreProcess$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CurveActionTypes.LOAD_CURVE_PREPROCESS),
            withLatestFrom(
                this.store.select(fromSelector.getSelectedDate),
                this.store.select(fromSelector.getCurves)),
            switchMap(([payload, selectedDate, curvesEntity]) => {
                const dateString = selectedDate.toLocaleDateString().split('/').join('-');
                if ( curvesEntity === null || curvesEntity[dateString] === undefined) {
                    return [new fromActions.LoadCurve]
                } else {
                    return [];
                }
            })
        )

    @Effect()
    LoadCurve$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CurveActionTypes.LOAD_CURVE),
            withLatestFrom(
                this.store.select(fromSelector.getSelectedDate)),
            switchMap(([payload, selectedDate]) => {
                const dateString = selectedDate.toLocaleDateString().split('/').join('-');
                return this.marketDataRatesService.loadCurveData(dateString)
                .pipe(
                    map(res => {
                        const result: any = {};
                        Object.keys(res).forEach(key => {
                            result[key] = {...res[key]};
                            result[key]['data'] = res[key]['data'] && this.dataService.csvToObjectArrayWithColumnHeaders(res[key]['data'], '') || null;
                            // result[key]['timestamp'] =  res[key]['timestamp']
                        })
                        return new fromActions.LoadCurveComplete({
                            result: result,
                            date: dateString
                        })
                    }),
                    catchError((err: string) => of(new fromActions.LoadCurveFailed('Faild to Load Data')))
                )
            })
        )

    constructor(
        private actions$: Actions,
        private store: Store<fromStore.State>,
        private marketDataRatesService: fromServices.MarketDataRatesService,
        private dataService: HighchartsDataService,
    ) { }
}