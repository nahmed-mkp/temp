import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';

import * as fromServices from '../../services/';
import * as fromActions from '../actions';
import * as fromStore from '../reducers';
import * as fromSelector from '../selectors';
import { AuthService } from 'src/app/services';

@Injectable()
export class LayoutEffects {

    @Effect()
    BackupLayout$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LayoutActionTypes.BACKUP_ALL_LOCAL_LAYOUT),
            switchMap(() => {
                return this.layoutService.loadLayouts()
                    .pipe(
                        map((res) => new fromActions.LoadLayoutComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadLayoutFailed(err)))
                    );
            })
        );

    @Effect()
    BackupAllConfigAndStyle$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LayoutActionTypes.BACKUP_ALL_CONFIG_STYLE),
            switchMap(() => {
                const gridConfig = localStorage.getItem('configuration') || undefined;
                const layoutStyle = localStorage.getItem('style') || undefined;
                const groupingStyle = localStorage.getItem('groupingStyle') || undefined;

                if (gridConfig && layoutStyle) {

                    const metaPayload = {
                        gridConfig: gridConfig,
                        layoutStyle: layoutStyle,
                        groupingStyle: groupingStyle,
                    };
                    return this.layoutService.saveLayoutStyle(metaPayload)
                        .pipe(
                            map((res) => new fromActions.BackupAllConfigAndStyleComplete()),
                            catchError((err: string) => of(new fromActions.BackupAllConfigAndStyleFail(err)))
                        );
                } else {
                    // no backup needed
                    return empty();
                }
            })
        );







    @Effect()
    LoadAllConfigAndStyle$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LayoutActionTypes.LOAD_CONFIG_AND_STYLE),
            switchMap(() => {
                return this.layoutService.loadLayoutStyle()
                    .pipe(
                        map((res) => {
                            if (res) {
                                return new fromActions.LoadConfigAndStyleComplete(res);
                            } else {
                                return new fromActions.LoadConfigAndStyleComplete({
                                    gridConfig: undefined,
                                    groupingStyle: undefined,
                                    layoutStyle: undefined
                                });
                            }
 
                        }),
                        catchError((err: string) => of(new fromActions.LoadConfigAndStyleFailed(err)))
                    );
            })
        );

    
    @Effect()
    UpdateAllConfigAndStyle$: Observable<Action> = this.actions$
        .pipe(
            ofType(
                fromActions.LayoutActionTypes.UPDATE_GRID_CONFIG,
                fromActions.LayoutActionTypes.UPDATE_GROUPING_STYLE,
                fromActions.LayoutActionTypes.UPDATE_LAYOUT_STYLE,
            ),
            withLatestFrom(
                this.store.select(fromSelector.getUserGridConfigCloud),
                this.store.select(fromSelector.getUserGroupingStyleCloud),
                this.store.select(fromSelector.getUserLayoutStyleCloud),
            ),
            switchMap(([payload, newUserGridConfig, newUserGroupingStyle, newUserLayoutStyle]) => {

                const metaPayload = {
                    gridConfig: newUserGridConfig,
                    groupingStyle: newUserGroupingStyle,
                    layoutStyle: newUserLayoutStyle
                }

                return this.layoutService.saveLayoutStyle(metaPayload)
                    .pipe(
                        switchMap((res) => empty()),
                        catchError((err: string) => of(new fromActions.BackupAllConfigAndStyleFail(err)))
                    );
            })
        );
    










    @Effect()
    loadLayouts$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LayoutActionTypes.LOAD_LAYOUT),
            switchMap(() => {
                return this.layoutService.loadLayouts()
                    .pipe(
                        map((res) => {
                            res.private = res.private.map(item => {
                                const targetKey = Object.keys(item)[0];
                                return item[targetKey];
                            });
                            res.shared = res.shared.map(item => {
                                const targetKey = Object.keys(item)[0];
                                return item[targetKey];
                            });

                            const layoutCollection: any[] = [];
                            res.private.forEach(layout => {
                                layoutCollection.push(layout);
                            });
                            res.shared.forEach(layout => {
                                layoutCollection.push(layout);
                            });
                            const userName = this.authService.getUser();
                            return new fromActions.LoadLayoutComplete({data: layoutCollection, userName: userName});
                        }),
                        catchError((err: string) => of(new fromActions.LoadLayoutFailed(err)))
                    );
            })
        );


    @Effect()
    saveLayout$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LayoutActionTypes.SAVE_LAYOUT),
            map((action: fromActions.SaveLayout) => action.payload),
            switchMap(payload => {
                return this.layoutService.saveLayout(payload)
                    .pipe(
                        switchMap((res) => {
                            if (payload.creationTimestamp === undefined) {
                                // meaning this is a newly created layout, update the store with the server return rich info
                                return [new fromActions.SaveLayoutComplete(res)];
                            } else {
                                // meaning this is a existed layout, no need to update the store
                                return [];
                            }
                        }),
                        catchError((err: string) => of(new fromActions.SaveLayoutFailed(err)))
                    );
            })
        );


    @Effect()
    deleteLayout$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LayoutActionTypes.DELETE_LAYOUT),
            map((action: fromActions.DeleteLayout) => action.payload),
            switchMap(payload => {
                if (payload.creationTimestamp) {
                    return this.layoutService.deleteLayout(payload)
                    .pipe(
                        map((res) => new fromActions.DeleteLayoutComplete(res)),
                        catchError((err: string) => of(new fromActions.DeleteLayoutFailed(err)))
                    );
                } else {
                    return [];
                }

            })
        );


    @Effect()
    loadStaticLayouts$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LayoutActionTypes.LOAD_STATIC_LAYOUT),
            switchMap(() => {
                return this.layoutService.loadStaticLayouts()
                    .pipe(
                        map(res => new fromActions.LoadStaticLayoutComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadStaticLayoutFailed(err)))
                    );
            })
        );




    // @Effect()
    // loadLayoutStyle$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.LayoutActionTypes.LOAD_LAYOUT_STYLE),
    //         switchMap(() => {
    //             return this.layoutService.loadLayoutStyle()
    //                 .pipe(
    //                     map((res) => new fromActions.LoadLayoutStyleComplete(res)),
    //                     catchError((err: string) => of(new fromActions.LoadLayoutStyleFailed(err)))
    //                 );
    //         })
    //     );


    // @Effect()
    // saveLayoutStyle$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.LayoutActionTypes.SAVE_LAYOUT_STYLE),
    //         map((action: fromActions.SaveLayoutStyle) => action.payload),
    //         switchMap(payload => {
    //             return this.layoutService.saveLayoutStyle(payload)
    //                 .pipe(
    //                     map((res) => new fromActions.SaveLayoutStyleComplete(res)),
    //                     catchError((err: string) => of(new fromActions.SaveLayoutStyleFailed(err)))
    //                 );
    //         })
    //     );


    // @Effect()
    // deleteLayoutStyle$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.LayoutActionTypes.DELETE_LAYOUT_STYLE),
    //         map((action: fromActions.DeleteLayoutStyle) => action.payload),
    //         switchMap(payload => {
    //             return this.layoutService.deleteLayoutStyle(payload)
    //                 .pipe(
    //                     map((res) => new fromActions.DeleteLayoutStyleComplete(res)),
    //                     catchError((err: string) => of(new fromActions.DeleteLayoutStyleFailed(err)))
    //                 );
    //         })
    //     );








    // @Effect()
    // loadLayoutGroupingStyle$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.LayoutActionTypes.LOAD_LAYOUT_GROUPING_STYLE),
    //         switchMap(() => {
    //             return this.layoutService.loadLayoutGroupingStyle()
    //                 .pipe(
    //                     map((res) => new fromActions.LoadLayoutGroupingStyleComplete(res)),
    //                     catchError((err: string) => of(new fromActions.LoadLayoutGroupingStyleFailed(err)))
    //                 );
    //         })
    //     );


    // @Effect()
    // saveLayoutGroupingStyle$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.LayoutActionTypes.SAVE_LAYOUT_GROUPING_STYLE),
    //         map((action: fromActions.SaveLayoutGroupingStyle) => action.payload),
    //         switchMap(payload => {
    //             return this.layoutService.saveLayoutGroupingStyle(payload)
    //                 .pipe(
    //                     map((res) => new fromActions.SaveLayoutGroupingStyleComplete(res)),
    //                     catchError((err: string) => of(new fromActions.SaveLayoutGroupingStyleFailed(err)))
    //                 );
    //         })
    //     );


    // @Effect()
    // deleteLayoutGroupingStyle$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.LayoutActionTypes.DELETE_LAYOUT_GROUPING_STYLE),
    //         map((action: fromActions.DeleteLayoutGroupingStyle) => action.payload),
    //         switchMap(payload => {
    //             return this.layoutService.deleteLayoutGroupingStyle(payload)
    //                 .pipe(
    //                     map((res) => new fromActions.DeleteLayoutGroupingStyleComplete(res)),
    //                     catchError((err: string) => of(new fromActions.DeleteLayoutGroupingStyleFailed(err)))
    //                 );
    //         })
    //     );




    constructor(
        private actions$: Actions,
        private layoutService: fromServices.LayoutService,
        private store: Store<fromStore.State>,
        private authService: AuthService,
    ) {}
}