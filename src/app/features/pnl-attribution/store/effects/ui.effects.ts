import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services/attribution.service';
import * as fromStore from '../reducers';
import * as fromSelector from '../selectors';
import { AuthService } from 'src/app/services';

@Injectable()
export class UiEffects {
    @Effect()
    loadLayouts$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionUiActionTypes.LOAD_LAYOUTS),
            withLatestFrom(this.store.select(fromSelector.getReadOnlyMode)),
            switchMap(([payload, readOnlyMode]) => {
                if (readOnlyMode === false) {
                    return this.attributionService$
                    .loadLayouts()
                    .pipe(
                        switchMap((res) => {
                            const actionCollection = [];
                            const sharedlayouts = res.shared && res.shared.map(obj => {
                                const key = Object.keys(obj)[0];
                                return obj[key];
                            }) || [];
                            const privateLayouts = res.private && res.private.map(obj => {
                                const key = Object.keys(obj)[0];
                                return obj[key];
                            }) || [];
                            const layoutsCollection = [...sharedlayouts, ...privateLayouts];
                            actionCollection.push(new fromActions.LoadLayoutComplete(layoutsCollection));

                            const userName = this.authService.getUser();
                            const defaultLayoutNames = layoutsCollection.filter(layout => layout['createdBy'] === userName && layout['default']).map(layout => layout['layoutName']);
                            if (defaultLayoutNames.length > 0) {
                                const activeLayoutName = defaultLayoutNames[0];
                                actionCollection.push(new fromActions.SetActiveLayout(activeLayoutName));
                                actionCollection.push(new fromActions.SetInitialSelectedLayouts(defaultLayoutNames));
                            }
                            return actionCollection;
                        }),
                        catchError((err: string) => of(new fromActions.LoadLayoutFailed(err))
                    ));
                } else {
                    return [];
                }
            })
        );


    @Effect()
    saveLayout$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionUiActionTypes.SAVE_LAYOUT_CLOUD),
            map((action: fromActions.SaveLayoutCloud) => action.payload),
            switchMap(payload => of(payload).pipe(
                withLatestFrom(
                    this.store.select(fromSelector.getLayoutInfoByLayoutName(payload)),
                    this.store.select(fromSelector.getGridDisplayModeByLayoutName(payload))
                )
            )),
            switchMap(([payload, completeLayoutInfo, gridDisplayMode]) => {
                completeLayoutInfo.layoutName = payload;
                completeLayoutInfo.gridDisplayMode = gridDisplayMode;
                const layoutInfoFormatted = {
                    config: completeLayoutInfo
                };
                return this.attributionService$
                    .saveLayout(layoutInfoFormatted)
                    .pipe(
                        map((res) => new fromActions.SaveLayoutCloudComplete(res)),
                        catchError((err: string) => of(new fromActions.SaveLayoutCloudFailed(err))
                    ));
            })
        );


    @Effect()
    deleteLayout$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionUiActionTypes.DELETE_LAYOUT),
            map((action: fromActions.DeleteLayout) => action.payload),
            switchMap(payload => of(payload).pipe(
                withLatestFrom(
                    this.store.select(fromSelector.getLayoutInfoByLayoutName(payload))
                )
            )),
            switchMap(([payload, completeLayoutInfo]) => {
                const layoutInfoFormatted = {
                    config: completeLayoutInfo
                };
                return this.attributionService$
                    .deleteLayout(layoutInfoFormatted)
                    .pipe(
                        map((res) => new fromActions.DeleteLayoutComplete(payload)),
                        catchError((err: string) => of(new fromActions.DeleteLayoutFailed(err))
                    ));
            })
        );


    @Effect()
    loadDefaultGroupings$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PnlAttributionUiActionTypes.LOAD_DEFAULT_GROUPINGS),
            switchMap(() => {
                return this.attributionService$
                    .loadDefaultGroupings()
                    .pipe(
                        map((res) => new fromActions.LoadDefaultGroupingsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDefaultGroupingsFailed(err))
                    ));
            })
        );

    constructor(
        private actions$: Actions,
        private attributionService$: fromServices.PnlAttributionService,
        private store: Store<fromStore.PnlAttributionState>,
        private authService: AuthService
    ) { }
}