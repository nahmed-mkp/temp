import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

import * as fromModels from './../../models';

@Component({
    selector: 'app-dials',
    templateUrl: './dials.component.html',
    styleUrls: ['./dials.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialsComponent implements OnInit {

    @Input() dials: fromModels.Dial[];
    @Output() editedDial: EventEmitter<fromModels.DialUpdate> = new EventEmitter<fromModels.DialUpdate>();

    // private editedDial: fromModels.DialUpdate;

    public customGridOption: GridOptions = {
        columnDefs: [
            {headerName: 'dialAttributeName', field: 'dialAttributeName', pinned: 'left', cellStyle: {'background-color': '#f5f7f7'}},
            // {headerName: 'yieldBookDialsName', field: 'yieldBookDialsName'},
            // {headerName: 'yieldbookDialsSetId', field: 'yieldbookDialsSetId'},
            {headerName: 'Alt-A', field: 'Alt-A', editable: true, width: 75, cellClass: 'right-border'},
            {headerName: 'ARMs', field: 'arms', editable: true, width: 75, cellClass: 'right-border'},
            {headerName: 'Conventional', field: 'conventional', editable: true, width: 100, cellClass: 'right-border'},
            {headerName: 'GHLC', field: 'ghlc', editable: true, width: 75, cellClass: 'right-border'},
            {headerName: 'GNMA', field: 'gnma', editable: true, width: 75, cellClass: 'right-border'},
            {headerName: 'HELS', field: 'hels', editable: true, width: 75, cellClass: 'right-border'},
            {headerName: 'ManHousing', field: 'manhousing', editable: true, width: 100, cellClass: 'right-border'},
            {headerName: 'WholeLoans', field: 'wholeLoans', editable: true, width: 100, cellClass: 'right-border'},
        ],
        onCellValueChanged: params => {
            // the enter value should be number not string character
            if(params.oldValue !== parseFloat(params.newValue)) {
                console.log('editing', params);
                const editedDial = {
                    dialAttributeName: params.data.dialAttributeName,
                    dialValue: parseFloat(params.newValue),
                    yieldbookDialsSetId: params.data.yieldbookDialsSetId,
                    dialName: params.colDef.field,
                };
                this.editedDial.emit(editedDial);
            }
        }
    }

    constructor() { }

    ngOnInit(): void { }
}
