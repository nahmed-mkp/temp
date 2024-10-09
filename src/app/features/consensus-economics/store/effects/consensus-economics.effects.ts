import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from '../actions/consensus-economics.actions';
import * as fromServices from '../../services/consensus-economics.service';
import * as fromModels from '../../models';

@Injectable()
export class ConsensusEconomicsEffects {

    @Effect()
    loadExtractionDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ConsensusEconomicsActionTypes.LOAD_EXTRACTION_DATES),
            switchMap(() => {
                return this.consensusEconomicsService$
                    .loadExtractionDates()
                    .pipe(
                        map(res => new fromActions.LoadExtractionDatesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadExtractionDatesFailed(err)))
                    );
            })
        );

    @Effect()
    loadAnnualExtractions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ConsensusEconomicsActionTypes.LOAD_ANNUAL_EXTRACTIONS),
            map((action: fromActions.LoadAnnualExtractions) => action.payload),
            switchMap((payload: fromModels.IExtractionRequest) => {
                return this.consensusEconomicsService$
                    .loadAnnualExtractions(payload)
                    .pipe(
                        map((res: fromModels.IExtractionDataAnnual[]) => new fromActions.LoadAnnualExtractionsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadAnnualExtractionsFailed(err)))
                    );
            })
        );

    @Effect()
    loadQuarterlyExtractions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ConsensusEconomicsActionTypes.LOAD_QUARTERLY_EXTRACTIONS),
            map((action: fromActions.LoadQuarterlyExtractions) => action.payload),
            switchMap((payload: fromModels.IExtractionRequest) => {
                return this.consensusEconomicsService$
                    .loadQuarterlyExtractions(payload)
                    .pipe(
                        map((res: fromModels.IExtractionDataQuarterly[]) => new fromActions.LoadQuarterlyExtractionsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadQuarterlyExtractionsFailed(err)))
                    );
            })
        );


    @Effect()
    loadConstituentDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ConsensusEconomicsActionTypes.LOAD_EXTRACTION_DATES),
            switchMap(() => {
                return this.consensusEconomicsService$
                    .loadConstituentDates()
                    .pipe(
                        map(res => new fromActions.LoadConstituentsDatesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadConstituentsDatesFailed(err)))
                    );
            })
        );

    @Effect()
    loadAnnualConstituents$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ConsensusEconomicsActionTypes.LOAD_ANNUAL_EXTRACTIONS),
            map((action: fromActions.LoadAnnualConstituents) => action.payload),
            switchMap((payload: fromModels.IConstituentRequest) => {
                return this.consensusEconomicsService$
                    .loadAnnualConstituents(payload)
                    .pipe(
                        map((res: fromModels.IConstituentDataAnnual[]) => new fromActions.LoadAnnualConstituentsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadAnnualConstituentsFailed(err)))
                    );
            })
        );

    @Effect()
    loadQuarterlyConstituents$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ConsensusEconomicsActionTypes.LOAD_QUARTERLY_EXTRACTIONS),
            map((action: fromActions.LoadQuarterlyConstituents) => action.payload),
            switchMap((payload: fromModels.IConstituentRequest) => {
                return this.consensusEconomicsService$
                    .loadQuarterlyConstituents(payload)
                    .pipe(
                        map((res: fromModels.IConstituentDataQuarterly[]) => new fromActions.LoadQuarterlyConstituentsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadQuarterlyConstituentsFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private consensusEconomicsService$: fromServices.ConsensusEconomicsService
    ) { }
}
