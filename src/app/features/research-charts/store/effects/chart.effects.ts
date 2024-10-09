import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError, } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions/chart.actions';
import * as fromServices from './../../services/chart.service';
import * as fromModels from './../../models/chart.models';

@Injectable()
export class ResearchChartsEffects {

    @Effect()
    loadChartPacks$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ResearchChartActionTypes.LOAD_CHART_PACKS),
            switchMap(() => {
                return this.researchChartsService$
                    .loadChartPacks()
                    .pipe(
                        map((chartPacks: fromModels.IChartPack[]) => new fromActions.LoadChartPacksComplete(chartPacks)),
                        catchError((err: string) => of(new fromActions.LoadChartPacksFailed(err))
                        ));
            })
        );

    @Effect()
    loadChartPack$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ResearchChartActionTypes.LOAD_CHART_PACK),
            map((action: fromActions.LoadChartPack) => action.payload),
            switchMap((payload: string) => {
                return this.researchChartsService$
                    .loadChartPack(payload)
                    .pipe(
                        map((charts: fromModels.ISubChart[]) => new fromActions.LoadChartPackComplete(payload, charts)),
                        catchError((err: string) => of(new fromActions.LoadChartPackFailed(payload, err))
                        ));
            })
        );

    constructor(
        private actions$: Actions,
        private researchChartsService$: fromServices.ResearchChartService,
    ) { }
}
