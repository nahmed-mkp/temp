import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services/portfolio-analysis.service';
import * as fromModels from './../../models/portfolio-analysis.models';
import * as fromSelector from '../selectors';
import * as fromStore from '../reducers';


@Injectable()
export class PortfolioAnalysisEffects {

    @Effect()
    LoadPortfolioAnalysisSecurityList$: Observable<Action> = this.action$
        .pipe(
            ofType(fromActions.PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS_SECURITY_LIST),
            mergeMap(() => {
                return this.portfolioAnalysisService$
                .getPortfolioAnalysisSecurityList()
                .pipe(
                    map((res: fromModels.PortfolioAnalysisSecurity[]) => new fromActions.LoadPortfolioAnalysisSecurityListComplete(res)),
                    catchError((err: string) => of(new fromActions.LoadPortfolioAnalysisSecurityListFailed(err)))
                )
            })
        );

    @Effect()
    LoadPortfolioAnalysis$: Observable<Action> = this.action$
        .pipe(
            ofType(fromActions.PortfolioAnalysisActionTypes.LOAD_PORTFOLIO_ANALYSIS),
            map((action: fromActions.LoadPortfolioAnalysis) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getAgencyAnalyticsPortfolioAnalysisResponsesIds)),
            mergeMap(([request, existedRequestIds]) => {
                // if(existedRequestIds.indexOf(request.id) === -1) {
                    return this.portfolioAnalysisService$
                    .getPortfolioAnalysis(request)
                    .pipe(
                        map((res: fromModels.PortfolioAnalysisResponse) => new fromActions.LoadPortfolioAnalysisComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPortfolioAnalysisFailed(err)))
                    )
                // } else return [];
            })
        );

    constructor(
        private action$: Actions,
        private portfolioAnalysisService$: fromServices.PortfolioAnalysisService,
        private store: Store<fromStore.state>
    ){}
}