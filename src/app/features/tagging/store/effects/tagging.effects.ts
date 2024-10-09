import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';

import * as fromActions from './../actions';
import * as fromServices from './../../services';
import * as fromModels from './../../models/tagging.models';

@Injectable()
export class TaggingEffects {

    constructor(private action$: Actions,
        private service$: fromServices.TaggingService) { }

    @Effect()
    loadTagTypes$ = this.action$.pipe(
        ofType(fromActions.TaggingActionTypes.LOAD_TAG_LIST),
        switchMap(() => {
            return this.service$.getTagsList()
                .pipe(
                    map(data => new fromActions.LoadTagListComplete(data)),
                    catchError(error => of(new fromActions.LoadTagListFailed(error)))
                );
        })
    );

    @Effect()
    loadTaggingLookups$ = this.action$.pipe(
        ofType(fromActions.TaggingActionTypes.LOAD_TAGGING_LOOKUPS),
        switchMap(() => {
            return this.service$.getLookupValues()
                .pipe(
                    map(data => new fromActions.LoadTaggingLookupsComplete(data)),
                    catchError(error => of(new fromActions.LoadTaggingLookupsFailed(error)))
                );
        })
    );

    @Effect()
    loadSecurityTags$ = this.action$.pipe(
        ofType(fromActions.TaggingActionTypes.LOAD_SECURITY_TAGS),
        map((action: fromActions.LoadSecurityTags) => action.payload),
        switchMap((payload: fromModels.IDateRange) => {
            return this.service$.loadSecurityTags(payload)
                .pipe(
                    map(data => new fromActions.LoadSecurityTagsComplete(data)),
                    catchError(error => of(new fromActions.LoadSecurityTagsFailed(error)))
                );
        })
    );

    @Effect()
    updateSecurityTags$ = this.action$.pipe(
        ofType(fromActions.TaggingActionTypes.UPDATE_SECURITY_TAGS),
        map((action: fromActions.UpdateSecurityTags) => action.payload),
        switchMap((payload: fromModels.ISecurityTagChanges) => {
            return this.service$.updateSecurityTags(payload)
                .pipe(
                    map(data => new fromActions.UpdateSecurityTagsComplete(data)),
                    catchError(error => of(new fromActions.UpdateSecurityTagsFailed(error)))
                );
        })
    );

    /**
     * TradeName Tags
     */


    @Effect()
    loadTradeNameTags$ = this.action$.pipe(
        ofType(fromActions.TaggingActionTypes.LOAD_TRADE_NAME_TAGS),
        map((action: fromActions.LoadTradeNameTags) => action.payload),
        switchMap((payload: fromModels.IDateRange) => {
            return this.service$.loadTradeNameTags(payload)
                .pipe(
                    map(data => new fromActions.LoadTradeNameTagsComplete(data)),
                    catchError(error => of(new fromActions.LoadTradeNameTagsFailed(error)))
                );
        })
    );

    @Effect()
    updateTradeNameTags$ = this.action$.pipe(
        ofType(fromActions.TaggingActionTypes.UPDATE_TRADE_NAME_TAGS),
        map((action: fromActions.UpdateTradeNameTags) => action.payload),
        mergeMap((payload: fromModels.ITradeNameTagChanges) => {
            return this.service$.updateTradeNameTags(payload)
                .pipe(
                    map(data => new fromActions.UpdateTradeNameTagsComplete(data || [])),
                    catchError(error => of(new fromActions.UpdateTradeNameTagsFailed(error)))
                );
        })
    );


    /**
     * Position Tags
     */

    @Effect()
    loadPositionTags$ = this.action$.pipe(
        ofType(fromActions.TaggingActionTypes.LOAD_POSITION_TAGS),
        map((action: fromActions.LoadPositionTags) => action.payload),
        switchMap((payload: fromModels.IDateRange) => {
            return this.service$.loadPositionTags(payload)
                .pipe(
                    map(data => new fromActions.LoadPositionTagsComplete(data)),
                    catchError(error => of(new fromActions.LoadPositionTagsFailed(error)))
                );
        })
    );

    @Effect()
    updatePositionTagsAdvance$ = this.action$.pipe(
        ofType(fromActions.TaggingActionTypes.UPDATE_POSITION_TAGS),
        map((action: fromActions.UpdatePositionTags) => action.payload),
        mergeMap((payload: fromModels.IPositionTagChangesAdvance[]) => {
            return this.service$.updatePositionTags(payload)
                .pipe(
                    map(data => new fromActions.UpdatePositionTagsComplete(data || [])),
                    catchError(error => of(new fromActions.UpdatePositionTagsFailed(error)))
                );
        })
    );
}
