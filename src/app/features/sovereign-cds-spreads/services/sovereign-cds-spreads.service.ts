import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SovereignCdsSpreadsService {

    constructor(private client: HttpClient) { }

    public loadSovereignCdsSpreadsData(asOfDate: string) {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/counterparty/sovereign-cds-spreads`, {asOfDate: asOfDate})
            .pipe(catchError((error: HttpErrorResponse) => Observable.throw(error.error.message)));
    }

}
