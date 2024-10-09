import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-commissions-upload-dialog',
    templateUrl: 'commissions-upload-progress.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommissionsUploadProgressDialogComponent {

    public fileName: string;
    public formData: FormData;
    public uploadProgress: number;
    public uploadSubscription: Subscription;

    constructor(
        public dialogRef: MatDialogRef<CommissionsUploadProgressDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private http: HttpClient) {
            this.fileName = data.fileName;
            this.formData = new FormData();
            this.formData.append('commissions', data.file);

            this.upload();
    }

    upload(): void {
        const upload$ = this.http.post('http://prizm-map.mkpcap.com/api/v1/commissions/download', this.formData, {
            reportProgress: true,
            observe: 'events'
        })
        .pipe(
            finalize(() => this.reset())
        );

        this.uploadSubscription = upload$.subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.uploadProgress = Math.round(100 * (event.loaded / event.total));
            }
        });
    }

    cancelUpload() {
        this.uploadSubscription.unsubscribe();
        this.reset();
    }

    reset() {
        this.uploadProgress = null;
        this.uploadSubscription = null;
        this.dialogRef.close();
    }

}
