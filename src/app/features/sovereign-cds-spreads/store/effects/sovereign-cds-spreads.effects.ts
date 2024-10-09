import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { empty, of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import * as fromServices from '../../services';
import * as fromStore from '../../store';
import * as fromActions from '../actions';

@Injectable()
export class SovereignCdsSpreadsEffects {
    

    loadSovereignCdsSpreads$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadSovereignSpreadData, fromActions.changeAsOfDate),
        withLatestFrom(this.store.select(fromStore.getAsOfDate)),
        switchMap(([action, asOfDate]) => {
          return this.sovereignCdsSpreadsService$.loadSovereignCdsSpreadsData(asOfDate)
          .pipe(
              map((res) => fromActions.loadSovereignSpreadDataComplete(res)),
              catchError((err: string) => of(fromActions.loadSovereignSpreadDataFailed(err)))    
          )
        })
    ))

    constructor(
        private store: Store<fromStore.SovereignCdsFeedsState>,
        private actions$: Actions,
        private sovereignCdsSpreadsService$: fromServices.SovereignCdsSpreadsService,
    ) { }    
}