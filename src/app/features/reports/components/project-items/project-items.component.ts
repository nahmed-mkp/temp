import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

import * as fromModels from '../../models';

@Component({
    selector: 'app-ext-project-items',
    templateUrl: './project-items.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemsComponent implements OnInit {

    @Input() projects: fromModels.Project[];

    @Output() onUpdateProject: EventEmitter<fromModels.Project> = new EventEmitter<fromModels.Project>();
    @Output() onDeleteProject: EventEmitter<fromModels.Project> = new EventEmitter<fromModels.Project>();
    @Output() onToggleFavorite: EventEmitter<fromModels.Project> = new EventEmitter<fromModels.Project>();

    constructor() { }

    ngOnInit() { }

    updateProject(project: fromModels.Project): void {
        this.onUpdateProject.emit(project);
    }

    deleteProject(project: fromModels.Project): void {
        this.onDeleteProject.emit(project);
    }

    toggleFavorite(project: fromModels.Project): void {
        this.onToggleFavorite.emit(project);
    }
}
