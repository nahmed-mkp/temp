import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GridOptions, Column } from 'ag-grid-community';

@Component({
    selector: 'app-tbareports-timeseries-table',
    templateUrl: './timeseries-table.component.html',
    styleUrls: ['./timeseries-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesTableComponent implements OnInit {

    @Input() data: any;
    @Input() columns: any[];

    public customGridOption: GridOptions = {}
    public extraOption = {
        sizeColumnsToFit: true
    }

    constructor() { }

    ngOnInit() {
        this.data.forEach(element => {
            element.Date = element.Date.toLocaleDateString();
        });
        this.customGridOption.columnDefs = this.columns.map(column => {
            return {
                headerName: column.caption,
                field: column.dataField,
                sort: column.caption === 'Date' ? 'desc' : undefined,
                comparator: (valueA, valueB, nodeA, nodeB) => {
                    if(column.caption === 'Date') {
                        let dateA = new Date(valueA);
                        let dateB = new Date(valueB);
                        return dateA.getTime() - dateB.getTime()
                    } else {
                        return valueA - valueB;
                    }
                } 
            }
        });

        this.customGridOption.defaultColDef = {
            valueFormatter: params => {
                if(typeof params.value === 'number') return params.value.toFixed(1);
            },
            cellStyle: params => {
                if(typeof params.value === 'number') return {textAlign: "right"}
            },
        }
     }
}
