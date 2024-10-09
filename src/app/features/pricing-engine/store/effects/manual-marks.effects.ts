import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromUIActions from '../../store/actions/ui.actions';
import * as fromActions from '../actions';
import * as fromStore from '../../store';
import * as fromModels from '../../models'
import * as fromSelectors from '../selectors';
import moment from 'moment';

@Injectable()
export class ManualMarksEffects {

    loadManualMarks$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadManualMarks), 
        withLatestFrom(this.store.select(fromSelectors.getSelectedDate)),
        switchMap( ( [{},asOfDate]) => {
            return this.service$.loadManualMarksData(moment(asOfDate).format('MM-DD-YYYY'))
            .pipe(
                map( (res) => {
                    if (res !== null) {
                      res.map( (data, idx) => {
                          data['id'] = idx;
                      })
                      return fromActions.loadManualMarksComplete(res);
                    }
                }),
                catchError( (err: string) => of(fromActions.loadManualMarksFailed(err)))
            )
        })
    ))

    constructor(
        private actions$: Actions,
        private store: Store<fromStore.State>,
        private service$: fromServices.PricingEngineService,
        private dataService: HighchartsDataService,
    ) { }
}

