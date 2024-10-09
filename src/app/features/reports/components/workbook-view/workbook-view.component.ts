import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

import * as fromModels from '../../models';

@Component({
    selector: 'app-ext-workbook',
    templateUrl: './workbook-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkbookComponent implements OnInit {

    @Input() workbook: fromModels.Workbook;

    @Output() onUpdateWorkbook: EventEmitter<fromModels.Workbook> = new EventEmitter<fromModels.Workbook>();
    @Output() onDeleteWorkbook: EventEmitter<fromModels.Workbook> = new EventEmitter<fromModels.Workbook>();
    @Output() onToggleFavorite: EventEmitter<fromModels.Workbook> = new EventEmitter<fromModels.Workbook>();

    public editMode: boolean;

    constructor() { }

    ngOnInit() { }

    updateWorkbook(e: any): void {
        this.onUpdateWorkbook.emit(this.workbook);
        e.preventDefault();
    }

    deleteWorkbook(e: any): void {
        this.onDeleteWorkbook.emit(this.workbook);
        e.preventDefault();
    }

    toggleFavorite(e: any): void {
        this.onToggleFavorite.emit(this.workbook);
        e.preventDefault();
    }

    toggleEditMode(): void {
        this.editMode = !this.editMode;
    }
}
