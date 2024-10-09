import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import * as fromModels from '../../models';

@Component({
    selector: 'app-ext-project-form',
    templateUrl: './project-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFormComponent implements OnInit {

    @Input() updateStatus: string;
    @Input() error: string;

    @Output() onAddProject: EventEmitter<fromModels.Project> = new EventEmitter<fromModels.Project>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

    projectForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.projectForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            shortCode: ['', [Validators.required]]
        });
    }

    ngOnInit() { }

    submitForm(event: any): void {
        if (this.projectForm.valid) {
            this.onAddProject.emit(event.value);
        }
    }

    cancel(e: any): void {
        this.onCancel.emit();
    }
}
