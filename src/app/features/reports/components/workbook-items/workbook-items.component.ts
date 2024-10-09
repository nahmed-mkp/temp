import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

import * as fromModels from '../../models';

@Component({
    selector: 'app-ext-workbook-items',
    templateUrl: './workbook-items.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkbookItemsComponent implements OnInit {

    @Input() workbooks: fromModels.Workbook[];

    @Output() onUpdateWorkbook: EventEmitter<fromModels.Workbook> = new EventEmitter<fromModels.Workbook>();
    @Output() onDeleteWorkbook: EventEmitter<fromModels.Workbook> = new EventEmitter<fromModels.Workbook>();
    @Output() onToggleFavorite: EventEmitter<fromModels.Workbook> = new EventEmitter<fromModels.Workbook>();

    constructor() { }

    ngOnInit() { }

    updateWorkbook(workbook: fromModels.Workbook): void {
        this.onUpdateWorkbook.emit(workbook);
    }

    deleteWorkbook(workbook: fromModels.Workbook): void {
        this.onDeleteWorkbook.emit(workbook);
    }

    toggleFavorite(workbook: fromModels.Workbook): void {
        this.onToggleFavorite.emit(workbook);
    }
}
