import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/portfolio-analysis.models';

@Injectable()
export class PortfolioAnalysisService {
    
    constructor(private http: HttpClient) {}

    getPortfolioAnalysisSecurityList(): Observable<fromModels.PortfolioAnalysisSecurity[]> {
        return this.http
            .get<fromModels.PortfolioAnalysisSecurity[]>('http://prizm-map.mkpcap.com/api/v1/portfolio/security_list')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    getPortfolioAnalysis(payload: fromModels.PortfolioAnalysisRequestWithID): Observable<fromModels.PortfolioAnalysisResponse> {
        return this.http
            .post<fromModels.PortfolioAnalysisResponse>('http://prizm-map.mkpcap.com/api/v1/portfolio/analysis', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }
}