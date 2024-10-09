import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { FileItemStatus } from './../../../../components/app-uploader/app-uploader.component';


@Component({
    selector: 'app-benchmark-file-upload',
    templateUrl: './benchmark-file-upload-layout.component.html',
    styleUrls: ['./benchmark-file-upload-layout.component.scss']
})
export class BenchmarkFileUploadLayoutComponent implements OnInit {

    @Output() uploadSucceeded: EventEmitter<fromModels.IFXTrade[]> =
        new EventEmitter<fromModels.IFXTrade[]>();

    constructor(@Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<BenchmarkFileUploadLayoutComponent>,
        private store: Store<fromStore.BenchmarkPortfolioState>) { }

    ngOnInit() {
    }

    onClose() {
        this.dialogRef.close();
    }

    public uploadSuccess(status: FileItemStatus): void {
        this.uploadSucceeded.emit(JSON.parse(status.status));
    }

    public uploadFailure(status: FileItemStatus): void {
        console.log(JSON.stringify(status));
        // this.uploadFailed.emit(status.status.replace(/\"/g, ''));
    }
}
