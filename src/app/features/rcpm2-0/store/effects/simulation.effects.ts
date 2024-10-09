import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import * as fromServices from '../../services/simulation.service';
import * as fromActions from '../actions/simulation.actions';
import * as fromModels from './../../models/position.models';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

@Injectable()
export class SimulationEffects {

    @Effect()
    LoadDailySimulations$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SimulationActionTypes.LOAD_DAILY_SIMULATION),
            map((action: fromActions.LoadDailySimulations) => action.payload),
            switchMap((payload: fromModels.DataPath) => {
                payload.grouping = payload.grouping.split('|').join('_');
                return this.simulationService.loadDailySimulations(payload)
                    .pipe(
                        map((res) => {
                            const parseData = this.dataService.csvToObjectArrayWithColumnHeaders(res, 'SimulationDate');
                            // console.log('parseDate', parseData)
                            return new fromActions.LoadDailySimulationsComplete({layout: payload.layout, data: parseData});
                        }),
                        catchError((err: string) => of(new fromActions.LoadDailySimulationsFailed({layout: payload.layout, error: err})))
                    );
            })
        );

    @Effect()
    LoadMonthlySimulations$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SimulationActionTypes.LOAD_MONTHLY_SIMULATION),
            map((action: fromActions.LoadMonthlySimulations) => action.payload),
            switchMap((payload: fromModels.DataPath) => {
                payload.grouping = payload.grouping.split('|').join('_');
                return this.simulationService.loadMonthlySimulations(payload)
                    .pipe(
                        map((res) => {
                            const parseData = this.dataService.csvToObjectArrayWithColumnHeaders(res, 'SimulationDate');
                            return new fromActions.LoadMonthlySimulationsComplete({layout: payload.layout, data: parseData});
                        }),
                        catchError((err: string) => of(new fromActions.LoadMonthlySimulationsFailed({layout: payload.layout, error: err})))
                    );
            })
        );

    @Effect()
    LoadQuarterlySimulations$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SimulationActionTypes.LOAD_QUARTERLY_SIMULATION),
            map((action: fromActions.LoadQuarterlySimulations) => action.payload),
            switchMap((payload: fromModels.DataPath) => {
                payload.grouping = payload.grouping.split('|').join('_');
                return this.simulationService.loadQuarterlySimulations(payload)
                    .pipe(
                        map((res) => {
                            const parseData = this.dataService.csvToObjectArrayWithColumnHeaders(res, 'SimulationDate');
                            return new fromActions.LoadQuarterlySimulationsComplete({layout: payload.layout, data: parseData});
                        }),
                        catchError((err: string) => of(new fromActions.LoadQuarterlySimulationsFailed({layout: payload.layout, error: err})))
                    );
            })
        );
    constructor(
        private actions$: Actions,
        private simulationService: fromServices.SimulationService,
        private dataService: HighchartsDataService,
    ) { }
}
