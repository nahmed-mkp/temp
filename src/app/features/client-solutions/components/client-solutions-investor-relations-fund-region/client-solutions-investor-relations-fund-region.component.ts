import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-cs-investor-relations-fund-region',
    templateUrl: './client-solutions-investor-relations-fund-region.component.html',
    styleUrls: ['./client-solutions-investor-relations-fund-region.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsInvestorRelationsFundRegionComponent implements OnInit {

    @Input() regionList: any[];

    public extraOption = {sizeColumnsToFit: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        columnDefs: [
            { headerName: 'Region', field: 'Region', cellStyle: params => this.getCellStyle(params, false), cellClass: 'txtColumn' },
            { 
                headerName: 'Gross AUM (%)', 
                field: 'PctGrossAUM', 
                valueFormatter: this.utilityService.formatPercentNumberAdvance(2), 
                cellStyle: params => this.getCellStyle(params, true), 
                cellClass: 'pctColumn' 
            }
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

    constructor(private utilityService: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    getCellStyle(params: any, rightAlign: boolean): any {
        let result = {};
        if (params.data['Region'].startsWith('TOTAL')) {
            result = Object.assign({}, { backgroundColor: '#add8e6', fontWeight: 'bold' });
        }
        if (rightAlign) {
            result = Object.assign({}, result, { 'justify-content': 'end' });
        }
        return result;
    }

}
