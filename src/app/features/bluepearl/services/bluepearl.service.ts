import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromModels from '../models';

@Injectable()
export class BluePearlService {

    constructor(private client: HttpClient) {}

    loadFunds(): Observable<string[]>{
        return this.client
        .get<string[]>('api/v1/bluepearl/funds')
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)))
    }

    loadSyntheticTrades(): Observable<string[]>{
        return this.client
        .get<string[]>('http://prizm-map.mkpcap.com/api/v1/bluepearl/synthetic-trades')
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

    loadSettlementLadder(payload: fromModels.ISettlementLadderRequest): Observable<string[]>{
        return this.client
        .post<any>('http://prizm-map.mkpcap.com/api/v1/bluepearl/settlement-ladder', payload)
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

}

