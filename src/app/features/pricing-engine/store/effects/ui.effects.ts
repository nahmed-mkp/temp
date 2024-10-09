import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class UiEffects {

    @Effect()
    loadLatestPortfolioDate$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.UiActionTypes.GET_LATEST_PORTFOLIO_DATE),
            switchMap( () => {
                return this.service$
                    .loadLatestPortfolioDate()
                    .pipe(
                        map((res: any) => {
                          if(res!== null){
                            let date = res[Object.keys(res)[0]]
                            return new fromActions.GetLatestPortfolioDateComplete(date);
                          }
                        }),
                        catchError((err: string) => of(new fromActions.GetLatestPortfolioDateFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService,
        private dataService: HighchartsDataService,
    ) { }
}

