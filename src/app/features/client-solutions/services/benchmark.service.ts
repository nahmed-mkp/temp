import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromModels from '../models';


@Injectable()
export class BenchmarkService {
    constructor(private httpClient: HttpClient) { }

    public getBenchmarks(): Observable<fromModels.IBenchmark[]> {
        return this.httpClient
            .get<fromModels.IBenchmark[]>(`http://prizm-map.mkpcap.com/api/v1/investor/benchmarks`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getBenchmark(code: string): Observable<fromModels.IBenchmark> {
        return this.httpClient
            .get<fromModels.IBenchmark>(`http://prizm-map.mkpcap.com/api/v1/investor/benchmarks/${code}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public addBenchmark(benchmark: fromModels.IBenchmark): Observable<fromModels.IBenchmark> {
        return this.httpClient
            .post<fromModels.IBenchmark>(`http://prizm-map.mkpcap.com/api/v1/investor/benchmarks`, benchmark)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public updateBenchmark(benchmark: fromModels.IBenchmark): Observable<fromModels.IBenchmark> {
        return this.httpClient
            .put<fromModels.IBenchmark>(`http://prizm-map.mkpcap.com/api/v1/investor/benchmarks/${benchmark.code}`, {
                description: benchmark.description,
                rcpmMDID: benchmark.rcpmMDID
            })
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public deleteBenchmark(benchmark: fromModels.IBenchmark): Observable<fromModels.IBenchmark> {
        return this.httpClient
            .delete<fromModels.IBenchmark>(`http://prizm-map.mkpcap.com/api/v1/investor/benchmarks/${benchmark.code}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public updateAllBenchmarkReturns(): Observable<string> {
        return this.httpClient
            .post<string>(`http://prizm-map.mkpcap.com/api/v1/investor/benchmarks/updateReturns`, null)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public updateBenchmarkReturns(benchmark: fromModels.IBenchmark): Observable<string> {
        return this.httpClient
            .post<string>(`http://prizm-map.mkpcap.com/api/v1/investor/benchmarks/${benchmark.code}/updateReturns`, null)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
