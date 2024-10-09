import { Component, OnInit, OnDestroy, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import * as fromModels from '../../models';

@Component({
    selector: 'app-ext-workbook-form',
    templateUrl: './workbook-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkbookFormComponent implements OnInit, OnDestroy {

    @Input() updateStatus: string;
    @Input() error: string;
    @Input() project$: Observable<fromModels.Project>;

    @Output() onAddWorkbook: EventEmitter<fromModels.Workbook> = new EventEmitter<fromModels.Workbook>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

    workbookForm: FormGroup;
    public project: fromModels.Project;
    private projectSubscription: Subscription;

    constructor(private fb: FormBuilder) {
        this.workbookForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            shortCode: ['', [Validators.required]],
            projectId: [-1, [Validators.required]],
            projectUrl: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.projectSubscription = this.project$
            .subscribe((project) => {
                if (project) {
                    this.project = project;
                    this.workbookForm.patchValue({projectId: project.id, projectUrl: project.projectUrl});
                }
            });
    }

    ngOnDestroy() {
        this.projectSubscription.unsubscribe();
    }

    submitForm(event: any): void {
        if (this.workbookForm.valid) {
            this.onAddWorkbook.emit(event.value);
        }
    }

    cancel(e: any): void {
        this.onCancel.emit();
    }
}
