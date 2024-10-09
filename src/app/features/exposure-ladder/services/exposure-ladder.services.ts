import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExposureLadderService {

    constructor(private client: HttpClient) {}

    loadExposureAsOfDates(): Observable<string[]> {
        return this.client
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/fx/dates')
            .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

    loadExposureLadder(): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/position/exposure_ladder`)
            .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

}

