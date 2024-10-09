import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromModels from './../../models/subscription.models';
import * as fromActions from './../actions/subscription.actions';
import * as fromServices from './../../services/subscription-service';
import { of } from 'rxjs';

@Injectable()
export class SubscriptionEffects {

    @Effect()
    subscribeToPositions$ = this.action$
        .pipe(
            ofType(fromActions.SubscriptionActionTypes.SUBSCRIBE_TO_POSITIONS),
            map((action: fromActions.SubscribeToPositions) => action.payload),
            switchMap((payload: fromModels.IPositionSubscriptionRequest) => {
                return this.service$.subscribeToPositions(payload)
                    .pipe(
                        map(data => new fromActions.SubscribeToPositionsComplete(data)),
                        catchError(error => of(new fromActions.SubscribeToPositionsFailed(error)))
                    );
            })
        );

    constructor(private action$: Actions,
        private service$: fromServices.SubscriptionService) { }
}
