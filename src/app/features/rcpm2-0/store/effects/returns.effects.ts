import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import * as fromServices from '../../services/returns.service';
import * as fromActions from '../actions/returns.actions';
import * as fromModels from '../../models/returns.models';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

@Injectable()
export class ReturnsEffects {

    @Effect()
    LoadReturns$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ReturnsActionTypes.LOAD_RETURNS),
            map((action: fromActions.LoadReturns) => {
                return {payload: action.payload, layout: action.layout};
            }),
            switchMap((param: {payload: fromModels.IReturnsRequest, layout: string}) => {
                return this.returnsService.loadReturns(param.payload)
                    .pipe(
                        map((res: any) => {
                            if (res !== null && res !== undefined) {
                                const result = {};
                                const returns = res['returns'];
                                const parsedReturns = this.dataService.csvToObjectArrayWithColumnHeaders(returns, 'SimulationDate');

                                result['returns'] = parsedReturns;
                                result['fundCapitals'] = [];
                                result['crossPodCapitals'] = [];
                                result['podCapitals'] = [];

                                const capitals = res['capitals'];
                                if (capitals !== null && capitals !== undefined) {
                                    const fundCapitals = capitals['fundCapitals'];
                                    result['fundCapitals'] = this.dataService.csvToObjectArrayWithColumnHeaders(fundCapitals, 'Date');
                                    const crossPodCapitals = capitals['crossPodCapitals'];
                                    result['crossPodCapitals'] = this.dataService.csvToObjectArrayWithColumnHeaders(crossPodCapitals, 'Date');
                                    const podCapitals = capitals['podCapitals'];
                                    result['podCapitals'] = this.dataService.csvToObjectArrayWithColumnHeaders(podCapitals, 'Date');
                                }
                                return new fromActions.LoadReturnsComplete(result, param.layout);
                            } else {
                                return new fromActions.LoadReturnsComplete([], param.layout);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadReturnsFailed(err, param.layout)))
                    );
            })
        );

    // @Effect()
    // LoadCapitals$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.ReturnsActionTypes.LOAD_CAPITALS),
    //         map((action: fromActions.LoadCapitals) => action.year),
    //         switchMap((year: number) => {
    //             return this.returnsService.loadCapitals(year)
    //                 .pipe(
    //                     map((res: any) => {

    //                         const fundCapitals = {};
    //                         const crossPodCapitals = {};
    //                         const podCapitals = {};

    //                         if (res !== undefined && res !== null) {
    //                             Object.keys(res['fundCapitals']).forEach(key => {
    //                                 fundCapitals[key] = this.dataService.csvToObjectArrayWithColumnHeaders(res['fundCapitals'][key], 'Date');
    //                             });
    //                             Object.keys(res['crossPodCapitals']).forEach(key => {
    //                                 crossPodCapitals[key] = this.dataService.csvToObjectArrayWithColumnHeaders(res['crossPodCapitals'][key], 'Date');
    //                             });
    //                             Object.keys(res['podCapitals']).forEach(key => {
    //                                 podCapitals[key] = this.dataService.csvToObjectArrayWithColumnHeaders(res['podCapitals'][key], 'Date');
    //                             });
    //                         }

    //                         return new fromActions.LoadCapitalsComplete({
    //                             'fundCapitals': fundCapitals,
    //                             'crossPodCapitals': crossPodCapitals,
    //                             'podCapitals': podCapitals}, year);
    //                     }),
    //                     catchError((err: string) => of(new fromActions.LoadCapitalsFailed(err, year)))
    //                 );
    //         })
    //     );

    constructor(
        private actions$: Actions,
        private returnsService: fromServices.ReturnsService,
        private dataService: HighchartsDataService
    ) {}
}
