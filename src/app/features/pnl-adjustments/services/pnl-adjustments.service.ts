import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as fromModels from '../models';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable()
export class PnlAdjustmentsService {

    constructor(private client: HttpClient) { }

    public loadAdjustments(payload: fromModels.IPnlAdjustmentReq) {
        return this.client
            .post<any>('http://prizm-map.mkpcap.com/api/v1/adjustments', payload)
            .pipe(catchError((error: HttpErrorResponse) => Observable.throw(error.error.message)));
    }

    public downloadAttachments(payload: fromModels.IDownloadAdjustmentAttachments) {

      const headers = new HttpHeaders({
        'Content-Type':  'application/json'
      });
    
      return this.client
        .post('api/v1/adjustments/download', payload, {headers: headers, observe: 'response', responseType: 'blob' })
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
