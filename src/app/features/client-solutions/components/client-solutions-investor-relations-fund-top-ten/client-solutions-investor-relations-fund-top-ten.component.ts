import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-cs-investor-fund-top-10-list',
    templateUrl: './client-solutions-investor-relations-fund-top-ten.component.html',
    styleUrls: ['./client-solutions-investor-relations-fund-top-ten.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsInvestorRelationsFundTop10Component implements OnInit {

    @Input() top10List: any[];

    public extraOption = {sizeColumnsToFit: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        columnDefs: [
            { headerName: 'Name', field: 'InvestorName', cellClass: 'txtColumn' },
            { headerName: 'Type', field: 'InvestorType', suppressSizeToFit: true, cellStyle: { textAlign: 'center' }, cellClass: 'txtColumn' },
            { headerName: 'Gross AUM (%)', field: 'PctGrossAUM', suppressSizeToFit: true, valueFormatter: this.decimalFormatter, cellClass: 'pctColumn'},
        ],
        excelStyles: [{
            id: 'header',
            interior: {
                color: '#df8e35',
                pattern: 'Solid'
            },
            font: {
                fontName: 'Arial Helvetica',
                size: 10,
                bold: true,
            },
            borders: {
                borderBottom: {
                    color: '#000000',
                    lineStyle: 'Continuous',
                    weight: 1
                },
                borderLeft: {
                    color: '#000000',
                    lineStyle: 'Continuous',
                    weight: 1
                },
                borderRight: {
                    color: '#000000',
                    lineStyle: 'Continuous',
                    weight: 1
                },
                borderTop: {
                    color: '#000000',
                    lineStyle: 'Continuous',
                    weight: 1
                }
            }
        }, {
            id: 'pctColumn',
            numberFormat: {
                format: '0.00%'
            },
            font: {
                fontName: 'Arial Helvetica',
                size: 9
            }
        }, {
            id: 'txtColumn',
            font: {
                fontName: 'Arial Helvetica',
                size: 9
            }
        }]
    };

    decimalFormatter(params) {
        return `${(params.value * 100).toFixed(2)}%`;
    }

    constructor(private fb: UntypedFormBuilder, private store: Store<fromStore.State> ) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

}
