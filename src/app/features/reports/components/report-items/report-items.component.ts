import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

import * as fromModels from '../../models';

@Component({
    selector: 'app-ext-report-items',
    templateUrl: './report-items.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportItemsComponent implements OnInit {

    @Input() reports: fromModels.Report[];
    @Input() editable: boolean;

    @Output() onAddReport: EventEmitter<fromModels.Report> = new EventEmitter<fromModels.Report>();
    @Output() onUpdateReport: EventEmitter<fromModels.Report> = new EventEmitter<fromModels.Report>();
    @Output() onDeleteReport: EventEmitter<fromModels.Report> = new EventEmitter<fromModels.Report>();
    @Output() onToggleFavorite: EventEmitter<fromModels.Report> = new EventEmitter<fromModels.Report>();

    constructor() { }

    ngOnInit() { }

    addReport(report: fromModels.Report): void {
        this.onAddReport.emit(report);
    }

    updateReport(report: fromModels.Report): void {
        this.onUpdateReport.emit(report);
    }

    deleteReport(report: fromModels.Report): void {
        this.onDeleteReport.emit(report);
    }

    toggleFavorite(report: fromModels.Report): void {
        this.onToggleFavorite.emit(report);
    }
}
