import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import * as _ from 'lodash';

import * as fromModels from '../../models';
import { GridCellDatePickerComponent } from 'src/app/components';

@Component({
    selector: 'app-blotter-dividend-allocation-viewer',
    templateUrl: './blotter-dividend-allocation-viewer.component.html',
    styleUrls: ['./blotter-dividend-allocation-viewer.component.scss']
})
export class BlotterDividendAllocationViewerComponent implements OnInit, OnChanges {

    @Input() data: fromModels.DividendAllocationInfo[];
    @Input() loading: boolean;

    @Output() getSaveDataHandler = new EventEmitter<any>()

    public extraOption = {sizeColumnsToFit: true};
    private gridApi: GridApi;
    public dataCopy: any[];
    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agSetColumnFilter',
            cellStyle: params => {
                return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
            },
        },
        columnDefs: [
            {headerName: 'AsOfDate', field: 'AsOfDate', 
                cellEditor: 'GridCellDatePickerComponent', editable: true, cellClass: 'yellow-background'},
            {headerName: 'FundName', field: 'FundName'},
            {headerName: 'RCPMFundId', field: 'RCPMFundId'},
            {headerName: 'OffShorePct', field: 'OffShorePct', editable: true, cellClass: 'yellow-background'},
            {headerName: 'WithholdingPct', field: 'WithholdingPct', editable: true, cellClass: 'yellow-background'},
        ],

        frameworkComponents: {
            'GridCellDatePickerComponent': GridCellDatePickerComponent
        }
    };


    constructor() { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
        this.getGridData = this.getGridData.bind(this);
    }

    ngOnInit() {
        this.getSaveDataHandler.emit(this.getGridData);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue && changes.data.currentValue.length && changes.data.currentValue.length > 0) {
            this.dataCopy = JSON.parse(JSON.stringify(this.data));
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
    }

    getGridData() {
        const originDataDict = _.keyBy(this.data, 'RCPMFundId');
        const modifiedDataDict =  _.keyBy(this.dataCopy, 'RCPMFundId');

        const saveData = [];

        Object.keys(originDataDict).map(key => {
            const originData_string = JSON.stringify(originDataDict[key]);
            const modifiedData_string = JSON.stringify(modifiedDataDict[key]);
            if (originData_string !== modifiedData_string) {
                saveData.push(modifiedDataDict[key]);
            }
        });
        return saveData;
    }

}
