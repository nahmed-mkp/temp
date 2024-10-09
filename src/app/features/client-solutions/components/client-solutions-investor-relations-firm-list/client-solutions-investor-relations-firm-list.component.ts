import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-cs-investor-relations-firm-list',
    templateUrl: './client-solutions-investor-relations-firm-list.component.html',
    styleUrls: ['./client-solutions-investor-relations-firm-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsInvestorRelationsFirmListComponent implements OnInit, OnChanges {

    @Input() relationshipList: any[];

    public extraOption = {sizeColumnsToFit: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        columnDefs: [
            { headerName: 'Relationship', field: 'Relationship', cellClass: 'txtColumn', cellStyle: params => this.getCellStyle(params, false, false) },
            { headerName: 'Alpha Port', field: 'MKP Alpha Port', cellClass: 'moneyColumn', cellStyle: params => this.getCellStyle(params, true, false), valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2)},
            { headerName: 'Enhanced Opportunity Offshore', cellClass: 'moneyColumn', field: 'MKP Enhanced Opp Offshore', cellStyle: params => this.getCellStyle(params, false, false), valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2)},
            { headerName: 'Enhanced Opportunity Onshore', cellClass: 'moneyColumn', field: 'MKP Enhanced Opportunity Onshore, LP', cellStyle: params => this.getCellStyle(params, false, false), valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2)},
            { headerName: 'Opportunity Offshore', cellClass: 'moneyColumn', field: 'MKP Opp Offshore', cellStyle: params => this.getCellStyle(params, false, false), valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2) },
            { headerName: 'Opportunity Onshore', cellClass: 'moneyColumn', field: 'MKP Opportunity Onshore, LP', cellStyle: params => this.getCellStyle(params, false, false), valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2) },
            { headerName: 'Everwood', cellClass: 'moneyColumn', field: 'MKP Everwood', cellStyle: params => this.getCellStyle(params, false, false), valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2)},
            { headerName: 'BluePearl', cellClass: 'moneyColumn', field: 'BluePearl MAP I LP', cellStyle: params => this.getCellStyle(params, false, false), valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2)},
            { headerName: 'GMMK', cellClass: 'moneyColumn', field: 'GMMK', cellStyle: params => this.getCellStyle(params, false, false), valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2)},
            { headerName: 'Total', cellClass: 'moneyColumn', field: 'Total', cellStyle: params => this.getCellStyle(params, false, true), valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2)},
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
            id: 'moneyColumn',
            numberFormat: {
                format: '$#,##0'
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

    getCellStyle(params: any, rightAlign: boolean, force: boolean): any {
        let result = {};
        if (params.data['Relationship'].startsWith('TOTAL')) {
            result = Object.assign({}, { backgroundColor: '#add8e6', fontWeight: 'bold' });
        }
        if (rightAlign) {
            result = Object.assign({}, result, { 'justify-content': 'end' });
        }
        if (force) {
            return { backgroundColor: '#add8e6', fontWeight: 'bold', 'justify-content': 'end'};
        }
        return result;
    }

    constructor(private utilityService: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.gridApi && changes.relationshipList) {
            changes.relationshipList.currentValue.map( item => {
                item['MKP Opp Offshore'] = item['MKP Opportunity Offshore, Ltd.'];
                item['MKP Enhanced Opp Offshore'] = item['MKP Enhanced Opportunity Offshore, Ltd.'];
            });
            if (this.gridApi) {
                const data = [...changes.relationshipList.currentValue];
                this.gridApi.setRowData(data);
                this.gridApi.refreshCells();
            }
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        if (this.relationshipList && this.relationshipList.length > 0) {
            this.gridApi.setRowData(this.relationshipList);
        }
    }

}
