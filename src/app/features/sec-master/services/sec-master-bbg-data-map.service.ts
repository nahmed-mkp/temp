import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/sec-master-global.models';


@Injectable()
export class SecMasterBbgDataMapService {

    constructor(private http: HttpClient) { }

    loadBbgDataMapService(): Observable<fromModels.IBbgDataMap[]> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/secmaster/bbg_data_map`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
