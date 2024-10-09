import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators"
import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromSelectors from '../selectors';
import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { Store } from "@ngrx/store";
import { empty, of } from "rxjs";
import moment from "moment";

@Injectable()
export class PnlAdjustmentsEffects {
    
    loadPnlAdjustments$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.loadPnlAdjustments, fromActions.uploadAdjustmentAttachmentsComplete, fromActions.changeStartDate, fromActions.changeEndDate),
        withLatestFrom(
            this.store.select(fromSelectors.getStartDate),
            this.store.select(fromSelectors.getEndDate),
        ),
        switchMap(([action, startDate, endDate]) => {
            return this.pnlAdjustmentsService$.loadAdjustments({
              startDate: startDate,
              endDate: endDate
            }).pipe(
                map((res: fromModels.IPnlAdjustment[]) => {
                    return fromActions.loadPnlAdjustmentsComplete(res);
                }),
                catchError(error => {
                    return of(fromActions.loadPnlAdjustmentsFailed(error));
                })
            )
        }
        )
    ));

    downloadAdjustmentAttachments$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.downloadAdjustmentAttachments),
        switchMap(({payload}) => {
            this.pnlAdjustmentsService$.downloadAttachments(payload)
            return empty()
        })
    ));

    constructor(
        private store: Store<fromStore.PnlAdjustmentsState>,
        private actions$: Actions,
        private pnlAdjustmentsService$: fromServices.PnlAdjustmentsService,
    ) { }    
}