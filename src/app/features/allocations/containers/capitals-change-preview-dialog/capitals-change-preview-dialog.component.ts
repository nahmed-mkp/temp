import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, Inject } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as moment from 'moment';

import * as fromStore from './../../store';
import * as fromModels from './../../models';

@Component({
    selector: 'app-capitals-change-preview-dialog',
    templateUrl: './capitals-change-preview-dialog.component.html',
    styleUrls: ['./capitals-change-preview-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapitalsChangePreviewDialogComponent implements OnInit, OnDestroy {

    public fundCapitalChangePreview$: Observable<any[]>;
    public podCapitalChangePreview$: Observable<any[]>;

    public previewCapitalChangesLoading$: Observable<boolean>;
    public previewCapitalChangesLoaded$: Observable<boolean>;
    public previewCapitalChangesError$: Observable<string>;

    public saveCapitalChangesLoading$: Observable<boolean>;
    public saveCapitalChangesLoaded$: Observable<boolean>;
    public saveCapitalChangesResult$: Observable<fromModels.ISaveCapitalResult>;

    public dateSelected = false;
    public selectedDate: string;
    public inputPayload: fromModels.ICapitalInput;

    public commentary: string;

    public resultSubscription$: Subscription;

    constructor(private store: Store<fromStore.AllocationsState>,
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<CapitalsChangePreviewDialogComponent>,
        private snackbar: MatSnackBar) {

        this.fundCapitalChangePreview$ = this.store.select(fromStore.getFundCapitalChangesPreview);
        this.podCapitalChangePreview$ = this.store.select(fromStore.getPodCapitalChangesPreview);

        this.previewCapitalChangesLoading$ = this.store.select(fromStore.getPreviewCapitalChangesLoading);
        this.previewCapitalChangesLoaded$ = this.store.select(fromStore.getPreviewCapitalChangesLoaded);
        this.previewCapitalChangesError$ = this.store.select(fromStore.getPreviewCapitalChangesError);

        this.saveCapitalChangesLoading$ = this.store.select(fromStore.getSaveCapitalChangesLoading);
        this.saveCapitalChangesLoaded$ = this.store.select(fromStore.getSaveCapitalChangesLoaded);
        this.saveCapitalChangesResult$ = this.store.select(fromStore.getSaveCapitalChangesResult);

        this.saveCapitalChangesResult$.subscribe((result) => {
            if (result) {
                const ref = this.snackbar.open(result.message, 'Close');
                ref.onAction().subscribe((action) => {
                    this.onClose();
                });
            }
        });
    }

    ngOnInit(): void {
        if (this.data.payload) {
            this.inputPayload = this.data.payload;
            this.store.dispatch(new fromStore.PreviewCapitalChanges(this.data.payload));
        }
    }

    ngOnDestroy(): void {
        if (this.resultSubscription$) {
            this.resultSubscription$.unsubscribe();
        }
    }

    onCommentaryChanged(commentary: string): void {
        this.commentary = commentary.trim();
    }

    onSave() {
        const payload = Object.assign({}, this.inputPayload, {'saveForDate': this.selectedDate, 'commentary': this.commentary});
        this.store.dispatch(new fromStore.SaveCapitalChanges(payload));
    }

    onClose() {
        this.dialogRef.close(false);
        this.snackbar.dismiss();
        this.store.dispatch(new fromStore.ResetCapitalChangesResult());
    }

    public getInputDate(): string {
        if (this.inputPayload) {
            return moment(this.inputPayload.asOfDate).format('MM/DD/YYYY');
        }
        return null;
    }

    public changeDate(e: MatDatepickerInputEvent<Date>): void {
        this.dateSelected = true;
        this.selectedDate = e.value.toLocaleString('en-US', {
            year: 'numeric', month: '2-digit',
            day: '2-digit', hour: '2-digit', hour12: false }).split(',')[0];
    }
}
