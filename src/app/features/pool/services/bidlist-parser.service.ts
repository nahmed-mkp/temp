import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/bidlist-parser.models';

@Injectable()
export class BidlistParserService {

    constructor(private client: HttpClient) { }

    loadExpressions(): Observable<fromModels.IBidlistParserExpression[]> {
        return this.client
            .get<fromModels.IBidlistParserExpression[]>(`http://prizm-map.mkpcap.com/api/v1/bidlist_parser/expressions`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    parseUserInput(payload: fromModels.IBidlistParserRequest): Observable<fromModels.IBidlistParserResult[]> {
        return this.client
            .post<fromModels.IBidlistParserResult[]>(`http://prizm-map.mkpcap.com/api/v1/bidlist_parser/`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
