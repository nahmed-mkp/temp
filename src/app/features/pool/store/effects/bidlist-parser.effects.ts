import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';


import * as fromModels from '../../models/bidlist-parser.models';
import * as fromActions from '../actions/bidlist-parser.actions';
import * as fromServices from '../../services/bidlist-parser.service';

@Injectable()
export class BidlistParserEffects {

    @Effect()
    loadExpressions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BidlistParserActionTypes.LOAD_EXPRESSIONS),
            switchMap(() => {
                return this.bidlistParserService$
                    .loadExpressions()
                    .pipe(
                        map((res: fromModels.IBidlistParserExpression[]) => new fromActions.LoadBidlistParserExpressionsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadBidlistParserExpressionsFailed(err))
                    ));
            })
        );


    @Effect()
    parserUserInput$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BidlistParserActionTypes.PARSE_USER_INPUT),
            map((action: fromActions.ParseUserInput) => action.payload),
            switchMap((payload: fromModels.IBidlistParserRequest) => {
                return this.bidlistParserService$
                    .parseUserInput(payload)
                    .pipe(
                        map((res: fromModels.IBidlistParserResult[]) => new fromActions.ParseUserInputComplete(res)),
                        catchError((err: string) => of(new fromActions.ParseUserInputFailed(err))
                        ));
            })
        );

    constructor(
        private actions$: Actions,
        private bidlistParserService$: fromServices.BidlistParserService
    ) { }
}
