import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/euro-rate.models';

@Injectable()
export class EuroRatesService {

    constructor(private http: HttpClient) {}
    // private socketIoService: SocketIoService

    getEuroRatesFileList(): Observable<fromModels.EuroRateFile[]> {
        return this.http
            .get<fromModels.EuroRateFile[]>('http://prizm-map.mkpcap.com/api/v1/eurorates/')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
        // return of(this.euroRateFiles)
    }

    downloadFiles(payload: fromModels.requestFilesDownloadPayload[]): Observable<any> {
        return this.http
            .post<any>('http://prizm-map.mkpcap.com/api/v1/eurorates/download', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    unQueueDownloadingFile(payload: number): Observable<fromModels.EuroRateFile[]> {
        return this.http
            .delete<fromModels.EuroRateFile[]>(`http://prizm-map.mkpcap.com/api/v1/eurorates/download/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    getFileDownloadProgress(payload: number[]): Observable<any> {
        return this.http
            .post<any>('http://prizm-map.mkpcap.com/api/v1/eurorates/monitor', {queueIds: payload})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    resetStatusToNotDownloaded(payload: number[]): Observable<fromModels.EuroRateFile[]> {
        return this.http
            .post<fromModels.EuroRateFile[]>('http://prizm-map.mkpcap.com/api/v1/eurorates/reset_file_status', {requestIds: payload})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }



    // Realtime connection ------------------------------------------------------------

    // createEuroRateRealTimeConnection() {
    //     this.socketIoService.createSubConnection('/euro-rate');
    // }

    // removeEuroRateRealTimeConnection() {
    //     // this won't physically disconnect euro rate connection, but it will remove all euro rate related event listener
    //     // and terminate some backend process if needed 
    //     this.socketIoService.unListenAllEventStreamForNamespace('/euro-rate')
    //     // this.socketIoService.disconnectSubConnection('/euro-rate');
    // }

    // updateFileDownloadProgress(): Observable<number> {
    //     return this.socketIoService.listenEventStream('euro_rate_heart_process_update', '/euro-rate', true);
    // }

    // listenEuroRateGeneralEvent(): Observable<string> {
    //     return this.socketIoService.listenEventStream('euro_rate_general_event', '/euro-rate');
    // }

    // listenChangeFileOrder(): Observable<string> {
    //     return this.socketIoService.listenEventStream('euro_rate_file_order', '/euro-rate');
    // }

    // changeFileOrder(payload: any): Observable<any> {
    //     return this.http
    //         .post<any>('http://prizm-map.mkpcap.com/api/v1/eurorates/fileorder', payload)
    //         .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    // }
}