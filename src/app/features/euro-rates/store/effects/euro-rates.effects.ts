import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, takeUntil } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services/euro-rates.service';
import * as fromRootService from './../../../../services';
import * as fromModels from './../../models/euro-rate.models';
import { NotificationService } from 'src/app/factories';

@Injectable()
export class EuroRatesEffects {

    @Effect()
    loadEuroRatesFileList$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EuroRatesActionTypes.LOAD_EURO_RATES_FILE_LIST),
            mergeMap(() => {
                return this.euroRatesService$
                    .getEuroRatesFileList()
                    .pipe(
                        map((res: fromModels.EuroRateFile[]) => new fromActions.LoadEuroRatesFileListComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadEuroRatesFileListFailed(err))
                    ));
            })
        );

    @Effect()
    downloadEuroRatesFiles$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EuroRatesActionTypes.DOWNLOAD_FILES),
            map((action: fromActions.DownloadFiles) => action.payload),
            mergeMap((payload: fromModels.requestFilesDownloadPayload[]) => {
                return this.euroRatesService$
                    .downloadFiles(payload)
                    .pipe(
                        map((res: fromModels.EuroRateFile[]) => new fromActions.DownloadFilesComplete(res)),
                        catchError((err: string) => of(new fromActions.DownloadFilesFailed(err))
                    ));
            })
        );

    @Effect()
    unqueueDownloadingFile$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EuroRatesActionTypes.UNQUEUE_DOWNLOADING_FILE),
            map((action: fromActions.UnqueueDownloadingFile) => action.payload),
            mergeMap((payload: number) => {
                return this.euroRatesService$
                    .unQueueDownloadingFile(payload)
                    .pipe(
                        map((res: fromModels.EuroRateFile[]) => new fromActions.UnqueueDownloadingFileComplete(res)),
                        catchError((err: string) => of(new fromActions.UnqueueDownloadingFileFailed(err))
                    ));
            })
        );

    @Effect()
    getFileDownloadProgress$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EuroRatesActionTypes.GET_FILE_DOWNLOAD_PROGRESS),
            map((action: fromActions.GetFileDownloadProgress) => action.payload),
            mergeMap((payload: number[]) => {
                return this.euroRatesService$
                    .getFileDownloadProgress(payload)
                    .pipe(
                        map((res) => {
                            if(res === null) return new fromActions.GetFileDownloadProgress(payload)
                            else return new fromActions.GetFileDownloadProgressComplete(res)
                        }),
                        catchError((err: string) => of(new fromActions.GetFileDownloadProgressFailed(err))
                    ));
            })
        );

    @Effect()
    resetFileStatus$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EuroRatesActionTypes.RESET_FILE_STATUS),
            map((action: fromActions.ResetFileStatus) => action.payload),
            mergeMap((payload: number[]) => {
                return this.euroRatesService$
                    .resetStatusToNotDownloaded(payload)
                    .pipe(
                        map((res) =>  new fromActions.ResetFileStatusComplete(res)),
                        catchError((err: string) => of(new fromActions.ResetFileStatusFailed(err))
                    ));
            })
        );


    // @Effect()
    // createEuroRateRealTimeConnection$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.EuroRatesActionTypes.CREATE_EURO_RATE_REAL_TIME_CONNECTION),
    //         switchMap(() => {
    //             this.euroRatesService$.createEuroRateRealTimeConnection()
    //             return empty();
    //         })
    //     );

    // @Effect()
    // removeEuroRateRealTimeConnection$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.EuroRatesActionTypes.REMOVE_EURO_RATE_REAL_TIME_CONNECTION),
    //         switchMap(() => {
    //             this.euroRatesService$.removeEuroRateRealTimeConnection()
    //             return empty();
    //         })
    //     );

    // @Effect()
    // updateFileDownloadProgress$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.EuroRatesActionTypes.UPDATE_FILE_DOWNLOAD_PROGRESS),
    //         mergeMap(() => {
    //             console.log('try to listen to file download progress streaming event')
    //             return this.euroRatesService$
    //                 .updateFileDownloadProgress()
    //                 .pipe(
    //                     takeUntil(this.actions$.pipe(ofType(fromActions.EuroRatesActionTypes.REMOVE_EURO_RATE_REAL_TIME_CONNECTION))),
    //                     map((res: number) => new fromActions.UpdateFileDownloadProgressReceive(res))
    //                 )
    //         })
    //     )

    // @Effect()
    // listenEuroRateGeneralEvent$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.EuroRatesActionTypes.UPDATE_FILE_DOWNLOAD_PROGRESS),
    //         switchMap(() => {
    //             console.log('try to listen to general euro rate event')
    //             return this.euroRatesService$
    //                 .listenEuroRateGeneralEvent()
    //                 .pipe(
    //                     takeUntil(this.actions$.pipe(ofType(fromActions.EuroRatesActionTypes.REMOVE_EURO_RATE_REAL_TIME_CONNECTION))),
    //                     map((res: string) => {
    //                         this.notificationService.openNotification(res);
    //                         return new fromActions.ListenEuroRateGeneralEventPayloadReceive(res)
    //                     })
    //                 )
    //         })
    //     )

    
    // @Effect()
    // changeFileOrder$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.EuroRatesActionTypes.CHANGE_FILE_ORDER),
    //         map((action: fromActions.changeFileOrder) => action.payload),
    //         mergeMap((payload: any) => {
    //             return this.euroRatesService$
    //                 .changeFileOrder(payload)
    //                 .pipe(
    //                     map((res: any) => new fromActions.changeFileOrderReceive(res)),
    //                 );
    //         })
    //     );

    
    // @Effect()
    // listenChangeFileOrder$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.EuroRatesActionTypes.LISTEN_CHANGE_FILE_ORDER),
    //         switchMap(() => {
    //             console.log('try to listen to change file order event')
    //             return this.euroRatesService$
    //                 .listenChangeFileOrder()
    //                 .pipe(
    //                     takeUntil(this.actions$.pipe(ofType(fromActions.EuroRatesActionTypes.REMOVE_EURO_RATE_REAL_TIME_CONNECTION))),
    //                     map((res: string) => {
    //                         return new fromActions.listenToChangeFileOrderPayloadReceive(res)
    //                     })
    //                 )
    //         })
    //     ) 

    
    

    

    constructor(
        private actions$: Actions,
        private euroRatesService$: fromServices.EuroRatesService,
        private notificationService: NotificationService
    ){}
}