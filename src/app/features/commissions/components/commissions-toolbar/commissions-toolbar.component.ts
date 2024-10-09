import { HttpClient, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CommissionsUploadProgressDialogComponent } from '../commissions-upload-progress/commissions-upload-progress.component';
import * as fileSaver from 'file-saver';
import * as moment from 'moment';

import * as fromStore from './../../store';
import { Store } from '@ngrx/store';
import { CommissionsInstructionsDialogComponent } from '../commissions-instructions/commissions-instructions.component';

@Component({
    selector: 'app-commissions-toolbar',
    templateUrl: './commissions-toolbar.component.html',
    styleUrls: ['./commissions-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommissionsToolbarComponent implements OnInit {

    constructor(private dialog: MatDialog, private http: HttpClient, private store: Store<fromStore.CommissionsState>) { }

    ngOnInit(): void { }

    downloadCommissions(): any {
        this.store.dispatch(new fromStore.DownloadCommissionsSchedule());
        return this.http.get('http://prizm-map.mkpcap.com/api/v1/commissions/download', { responseType: 'blob' })
            .subscribe(response => {
                const blob: any = new Blob([response], { type: 'text/csv' });
                fileSaver.saveAs(blob, `Commissions_${moment().format('YYYYMMDD')}.csv`);
                this.store.dispatch(new fromStore.DownloadCommissionsScheduleComplete());
            });
    }

    addFiles(e: any): void {
        const files = e.target.files;
        if (files && files.length === 1) {
            const file = files[0];
            this.openProgressUpdate(file);
        }
    }

    openProgressUpdate(file: any): void {
        const uploadProgressDialogRef = this.dialog.open(CommissionsUploadProgressDialogComponent, {
            width: '450px',
            data: {
                fileName: file.name,
                file: file
            }
        });

        uploadProgressDialogRef.afterClosed().subscribe(result => {
            this.store.dispatch(new fromStore.LoadCommissionsSchedule());
        });
    }

    showInstructions(): void {
        this.dialog.open(CommissionsInstructionsDialogComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '35rem',
            height: '40rem',
        });
    }
}
