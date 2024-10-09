import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import * as fromModels from '../../models';

@Component({
    selector: 'app-ext-project',
    templateUrl: './project-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {

    @Input() project: fromModels.Project;

    @Output() onUpdate: EventEmitter<fromModels.Project> = new EventEmitter<fromModels.Project>();
    @Output() onDelete: EventEmitter<fromModels.Project> = new EventEmitter<fromModels.Project>();
    @Output() onToggleFavorite: EventEmitter<fromModels.Project> = new EventEmitter<fromModels.Project>();

    public editMode: boolean;

    constructor(private fb: FormBuilder) {
        this.editMode = false;
    }

    ngOnInit() { }

    updateProject(e: any): void {
        this.onUpdate.emit(this.project);
        e.preventDefault();
    }

    deleteProject(e: any): void {
        this.onDelete.emit(this.project);
        e.preventDefault();
    }

    toggleFavorite(e: any): void {
        this.onToggleFavorite.emit(this.project);
        e.preventDefault();
    }

    toggleEditMode(): void {
        this.editMode = !this.editMode;
    }
}
