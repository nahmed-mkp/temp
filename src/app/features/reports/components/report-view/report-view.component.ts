import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as fromModels from '../../models';

@Component({
    selector: 'app-ext-report',
    templateUrl: './report-view.component.html'
})
export class ReportViewComponent implements OnInit {

    @Input() report: fromModels.Report;
    @Input() editable: boolean;

    @Output() onUpdateReport: EventEmitter<fromModels.Report> = new EventEmitter<fromModels.Report>();
    @Output() onDeleteReport: EventEmitter<fromModels.Report> = new EventEmitter<fromModels.Report>();
    @Output() onToggleFavorite: EventEmitter<fromModels.Report> = new EventEmitter<fromModels.Report>();

    public editMode = false;

    constructor() { }

    ngOnInit() { }

    updateReport(report: fromModels.Report): void {
        this.onUpdateReport.emit(report);
    }

    deleteReport(report: fromModels.Report): void {
        this.onDeleteReport.emit(report);
    }

    toggleFavorite(e: any): void {
        this.onToggleFavorite.emit(this.report);
        e.preventDefault();
    }

    toggleEditMode(): void {
        this.editMode = !this.editMode;
    }
}
