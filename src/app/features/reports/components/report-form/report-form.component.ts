import { Component, OnInit, OnDestroy, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import * as fromModels from '../../models';

@Component({
    selector: 'app-ext-report-form',
    templateUrl: './report-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFormComponent implements OnInit, OnDestroy {

    @Input() updateStatus: string;
    @Input() error: string;

    @Input() project$: Observable<fromModels.Project>;
    @Input() workbook$: Observable<fromModels.Workbook>;

    @Output() onAddReport: EventEmitter<fromModels.Report> = new EventEmitter<fromModels.Report>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

    reportForm: FormGroup;
    public project: fromModels.Project;
    public workbook: fromModels.Workbook;

    private projectSubscription: Subscription;
    private workbookSubscription: Subscription;

    constructor(private fb: FormBuilder) {
        this.reportForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            shortCode: ['', [Validators.required]],
            workbookId: [-1, [Validators.required]],
            type: ['', [Validators.required]],
            url: ['', [Validators.required]],
            height: ['', [Validators.required]],
            workbookUrl: ['', [Validators.required]],
            reportsUrl: ['', [Validators.required]],
            cssClass: [''],
            isUserSpecific: [false, [Validators.required]]
        });
    }

    ngOnInit() {
        this.projectSubscription = this.project$
            .subscribe((project) => {
                if (project) {
                    this.project = project;
                }
            });

        this.workbookSubscription = this.workbook$
            .subscribe((workbook) => {
                if (workbook) {
                    this.workbook = workbook;
                    this.reportForm.patchValue({workbookId: workbook.id,
                        workbookUrl: workbook.workbookUrl,
                        reportsUrl: workbook.reportsUrl});
                }
            });
    }

    ngOnDestroy() {
        this.projectSubscription.unsubscribe();
        this.workbookSubscription.unsubscribe();
    }

    submitForm(event: any): void {
        if (this.reportForm.valid) {
            this.onAddReport.emit(event.value);
        }
    }

    cancel(e: any): void {
        this.onCancel.emit();
    }
}
