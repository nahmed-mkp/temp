import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as fromModels from '../models';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable()
export class SSNCFeedService {

    constructor(private client: HttpClient) { }

    public loadSummary(fromDate: string, toDate: String) {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/ssn_feed_master/feed_summary/${fromDate}/${toDate}`)
            .pipe(catchError((error: HttpErrorResponse) => Observable.throw(error.error.message)));
    }

    // public loadFailedTrades(date: string) {
    //     return this.client
    //         .get<any>(`http://prizm-map.mkpcap.com/api/v1/ssn_feed_master/failed_trades/${date}`)
    //         .pipe(catchError((error: HttpErrorResponse) => Observable.throw(error.error.message)));
    // }

    public loadFeed(payload: fromModels.ISSNCFeedReq) {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/ssn_feed_master/feed_data`, payload)
            .pipe(catchError((error: HttpErrorResponse) => Observable.throw(error.error.message)));
    }

    public loadAdditionalFeedData(client_ref: string) {
        return this.client
            .get(`api/v1/ssn_feed_master/ack_detail_by_client_reference/${client_ref}`)
            .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

    // public downloadTradeFile(payload: { clientReference: string; tradeDate: string}) {
    //     return this.client
    //         .post(`api/v1/ssn_feed_master/feed_file_name`, payload)
    //         .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    // }

    // public downloadAckFile(payload: { clientReference: string; tradeDate: string}) {
    //     return this.client
    //         .post(`api/v1/ssn_feed_master/ack_file_name`, payload)
    //         .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    // }

    public downloadTradeFile(payload: { clientReference: string; tradeDate: string}) {
        const headers = new HttpHeaders({
            'Content-Type':  'application/json'
        });

        return this.client
            .post('api/v1/ssn_feed_master/feed_file_name', payload, {headers: headers, observe: 'response', responseType: 'blob' })
            .subscribe(
                (response: any) => { // download file
                    let fileName = response.headers.get('Content-Disposition').split(';')[1].split('=')[1];
                    fileName = fileName.replaceAll('\"', '');
                    saveAs(response.body, fileName);
                },
                (error: any) => {
                    console.error(`Error: ${error.message}`);
                }
            );
    }

    public downloadAckFile(payload: { clientReference: string; tradeDate: string}) {
        const headers = new HttpHeaders({
            'Content-Type':  'application/json'
        });

        return this.client
            .post('api/v1/ssn_feed_master/ack_file_name', payload, {headers: headers, observe: 'response', responseType: 'blob' })
            .subscribe(
                (response: any) => { // download file
                    let fileName = response.headers.get('Content-Disposition').split(';')[1].split('=')[1];
                    fileName = fileName.replaceAll('\"', '');
                    saveAs(response.body, fileName);
                },
                (error: any) => {
                    console.error(`Error: ${error.message}`);
                }
            );
    }
}
