import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { GridApi, ColumnApi, GridOptions, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileItemStatus } from 'src/app/components';

import { UtilityService } from 'src/app/services';
import { PrizmSEIPnlRecViewerComponent } from '../prizm-sei-pnl-rec-viewer/prizm-sei-pnl-rec-viewer.component';


@Component({
    selector: 'app-prizm-sei-active-rec-builder',
    templateUrl: './prizm-sei-active-rec-builder.component.html',
    styleUrls: ['./prizm-sei-active-rec-builder.component.scss']
})
export class PrizmSEIActiveRecBuilderComponent implements OnInit, OnChanges {

    @Input() funds$: Observable<string[]>;

    @Input() data$: Observable<any[]>;
    @Input() filesUploading$: Observable<boolean>;
    @Input() filesUploaded$: Observable<boolean>;
    @Input() filesUploadError$: Observable<string>;

    @Input() recData$: Observable<any[]>;
    @Input() recRunning$: Observable<boolean>;
    @Input() recRan$: Observable<boolean>;
    @Input() recError$: Observable<string>;

    @Input() fundsInDB$: Observable<string[]>;
    @Input() fundsInDBError$: Observable<string>;

    @Input() reconciliations: any[];
    @Input() reconciliationsLoading: boolean;
    @Input() reconciliationsLoaded: boolean;
    @Input() reconciliationsError: string;

    @Output() uploadFiles: EventEmitter<string[]> = new EventEmitter<string[]>();
    @Output() uploadFunds: EventEmitter<string[]> = new EventEmitter<string[]>();
    @Output() loadFromDatabase: EventEmitter<void> = new EventEmitter<void>();
    @Output() loadRec: EventEmitter<string> = new EventEmitter<string>();

    public mode: 'file' | 'database' = 'file';
    public files = {};
    public fileList = [];
    public files$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public selectedFiles = new UntypedFormControl();
    public selectedFunds = new UntypedFormControl();

    public fundSelectedForRec: string;

    constructor(private utilityService: UtilityService, private snackbar: MatSnackBar) {

    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngOnInit() { }

    public uploadSuccess(status: FileItemStatus): void {
        const fileName = status.file;
        if (Object.keys(this.files).indexOf(fileName) < 0) {
            const fundName = fileName.split('Summary')[0].trim().replace('MKP ', '');
            this.files[fileName] = fundName;
            this.fileList.push({'fileName': fileName, 'fundName': fundName});
            this.files$.next([...this.fileList]);
        }
        this.mode = 'file';
    }

    public uploadFailure(status: FileItemStatus): void {
        this.snackbar.open(`Failed to upload file - ${status.status.replace(/\"/g, '')}`, null, { 'duration': 3000 });
    }

    public uploadSelectedFiles(selectedFiles: string[]): void {
        this.uploadFiles.emit(selectedFiles);
    }

    public uploadSelectedFunds(selectedFunds: string[]): void {
        this.uploadFunds.emit(selectedFunds);
    }

    public switchMode(mode: 'file' | 'database'): void {
        this.mode = mode;
        this.loadFromDatabase.emit();
    }

    public fundSelected(fund: string): void {
        this.fundSelectedForRec = fund;
        this.loadRec.emit(fund);
    }

}
