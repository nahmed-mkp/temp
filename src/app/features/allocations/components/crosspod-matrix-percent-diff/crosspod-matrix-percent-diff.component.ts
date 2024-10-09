import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';
import * as _ from 'lodash';

import { UtilityService } from 'src/app/services';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

@Component({
    selector: 'app-crosspod-matrix-percent-diff',
    templateUrl: './crosspod-matrix-percent-diff.component.html',
    styleUrls: ['./crosspod-matrix-percent-diff.component.scss']
})
export class CrosspodMatrixPercentDiffComponent implements OnInit, OnChanges {

    @Input() funds: string[];
    @Input() fundComplex: string;
    @Input() oldCapitalMatrix: any[];
    @Input() newCapitalMatrix: any[];

    public mode = 'readonly';
    public showPct = true;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private columnDefs: any[];
    private callBackInitialized = false;
    private formattedData: any;

    public customGridOption: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('CrossPodName') === false ?
                    { 'justify-content': 'flex-end' } : {};
            },
            sortable: false,
            suppressMenu: true
        },

        sideBar: false,
        suppressColumnVirtualisation: true,
        rowSelection: 'single',
        floatingFilter: false,
        stopEditingWhenGridLosesFocus: true,
        deltaRowDataMode: true,
        context: this,
        skipHeaderOnAutoSize: true,
        enableSorting: false,

        getRowNodeId: data => data.CrossPodName,

        statusBar: {
            statusPanels: [
                {
                    statusPanel: 'agAggregationComponent',
                    statusPanelParams: {
                        aggFuncs: ['sum']
                    }
                },
                {
                    statusPanel: 'AppGridCustomStatusBarCellValueComponent',
                    statusPanelParams: {
                        fractionDigits: 2
                    }
                },
            ],
        },

        frameworkComponents: {
            'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
        },
    };

    public extraOption = {
        sizeColumnsToFit: true
    };

    constructor(private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.newCapitalMatrix && changes.newCapitalMatrix.currentValue) {
            this.columnDefs = this._getColumnDefs(this.newCapitalMatrix);
            this.formattedData = this._calculateDiffPercent(this.oldCapitalMatrix, this.newCapitalMatrix);
            if (this.gridApi) {
                this.gridApi.setColumnDefs(this.columnDefs);
                this.gridApi.setRowData(this.formattedData);
            }
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        if (this.columnDefs && this.formattedData) {
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.formattedData);
        }
    }


    private _getColumnDefs(capitalMatrix: any[]): any {

        if (capitalMatrix.length === 0) {
            return [];
        }

        const editable = this.mode === 'editable' ? true : false;
        const colDefs: any[] = [];

        const funds = Object.keys(capitalMatrix[0]).filter((key) => key !== 'Date' &&
            key !== 'CrossPodName' && key !== this.fundComplex && key !== 'Overage' && key !== 'Total').sort();

        colDefs.push({
            headerName: 'CrossPodName', field: 'CrossPodName', editable: false, width: 115,
            cellStyle: (params) => {
                return params.context.getCellStyle(this.mode, params.data['CrossPodName'], this.fundComplex, 'alpha', 'CrossPodName');
            },
            valueFormatter: param => {
                if (param.value === 'Fund Capital') {
                    return 'Levered Fund Capital';
                }
            }
        });

        funds.map((fund) => {
            colDefs.push({
                headerName: fund,
                field: fund,
                // editable: (params) => {
                //     return params.context.canEditCell(params.data['CrossPodName'], editable);
                // },
                sortable: false,
                width: fund === 'Enhanced Opp' ? 70 : 60,
                valueParser: this._numberParser,
                cellStyle: (params) => {
                    return params.context.getCellStyle(this.mode, params.data['CrossPodName'], this.fundComplex, 'numeric', 'Fund');
                },
                valueFormatter: params => params.value * 100 + '%'
            });
        });

        colDefs.push({
            headerName: 'Total',
            field: 'Total',
            sortable: false,
            // editable: (params) => {
            //     return params.context.canEditCell(params.data['CrossPodName'], editable);
            // },
            width: 60,
            singleClickEdit: false,
            valueParser: this._numberParser,
            cellStyle: (params) => {
                return params.context.getCellStyle(this.mode, params.data['CrossPodName'], this.fundComplex, 'numeric', 'Total');
            },
        });

        return colDefs;
    }

    private _numberParser(params) {
        if (params.newValue.toLowerCase().endsWith('m')) {
            params.newValue = Number(params.newValue.replace('m', '')) * 1000000;
        } else if (params.newValue.toLowerCase().endsWith('k')) {
            params.newValue = Number(params.newValue.replace('k', '')) * 1000;
        } else if (params.newValue.toLowerCase().endsWith('b')) {
            params.newValue = Number(params.newValue.replace('b', '')) * 1000000000;
        }
        const newVal = Number(params.newValue);
        return isNaN(newVal) ? params.oldValue : newVal;
    }

    private getCellStyle(mode, crossPodName, fundComplex, colType, colName): any {
        let result = {};

        if (crossPodName === 'Unlevered Fund Capital' ||
            crossPodName === 'Fund Leverage' ||
            crossPodName === 'Fund Capital' ||
            crossPodName === 'Total Pod Capital') {
            result = { 'font-weight': 'bold', 'background-color': '#dcfcc9'};
            if (colName !== 'CrossPodName') {
                result['justify-content'] = 'flex-end';
            }
            if (mode === 'editable' && crossPodName !== 'Fund Capital'
                && crossPodName !== 'Total Pod Capital' && !(colName === 'Total' || colName === 'CrossPodName') && this.showPct !== true) {
                result['background-color'] = '#fafbdd';
            }
            if (mode === 'editable' && colName === 'Total' && crossPodName === 'Fund Leverage') {
                result['background-color'] = '#dcfcc9';
            }
            return result;
        }

        if (crossPodName === 'Overage') {
            result = { 'font-weight': 'bold', 'background-color': '#fedab3' };
            if (colName !== 'CrossPodName') {
                result['justify-content'] = 'flex-end';
            }
            if (mode === 'editable' && this.funds && this.funds.indexOf(colName) >= 0) {
                result['background-color'] = '#fafbdd';
            }
            return result;
        }

        if (this.isPctColumn(crossPodName) || crossPodName === fundComplex) {
            result = { 'font-weight': 'bold', 'background-color': '#dcfcc9' };
        } else if (mode === 'editable') {
            if (colName === 'CrossPodName') {
                result = { 'font-weight': 'bold' };
            } else if (colName === 'Fund') {
                // NOOP
            } else {
                if (this.showPct === true) {
                    result = { 'font-weight': 'bold', 'background-color': 'white' };
                } else {
                    result = { 'font-weight': 'bold', 'background-color': '#fafbdd' };
                }
            }
        } else if (mode === 'delta' && colName === 'FundComplex') {
            result = { 'font-weight': 'bold', 'background-color': '#dcfcc9' };
        } else {
            if (colName !== 'Fund' && (mode === 'delta' || mode === 'readonly')) {
                result = { 'font-weight': 'bold' };
            }
        }

        if (colType === 'numeric') {
            result['justify-content'] = 'flex-end';
        }

        if (colName === 'Fund') {
            result['background-color'] = '#d1f8ff';
        }

        // if (this.showPct) {
        //     if (colName !== 'Total') {
        //         result['background-color'] = '#dcfcc9';
        //     } else {
        //         result['background-color'] = 'white';
        //     }
        // }
        return result;
    }

    private isPctColumn(crossPodName: string): boolean {
        return crossPodName.endsWith('(%)');
    }

    private _calculateDiffPercent(oldCapitalMatrix, newCapitalMatrix) {
        let oldDataCopy = JSON.parse(JSON.stringify(oldCapitalMatrix));
        let newDataCopy = JSON.parse(JSON.stringify(newCapitalMatrix));

        // Get Percent value;
        oldDataCopy = oldDataCopy.filter(element => element['CrossPodName'] !== 'Fund Leverage' && element['CrossPodName'] !== 'Overage');
        newDataCopy = newDataCopy.filter(element => element['CrossPodName'] !== 'Fund Leverage' && element['CrossPodName'] !== 'Overage');

        oldDataCopy.forEach(element => {
            const totalValue = element['Total'];
            Object.keys(element).forEach(key => {
                if (key !== 'Total' && key !== 'CrossPodName') {
                    element[key] = element[key] / totalValue;
                }
            });
        });
        newDataCopy.forEach(element => {
            const totalValue = element['Total'];
            Object.keys(element).forEach(key => {
                if (key !== 'Total' && key !== 'CrossPodName') {
                    element[key] = element[key] / totalValue;
                }
            });
        });

        // Get the diff percent value;
        const oldDataMap = _.keyBy(oldDataCopy, 'CrossPodName');
        const result = newDataCopy.map(newDataElement => {
            const targetOldData = oldDataMap[newDataElement['CrossPodName']];
            const resultPercentDiff: any = {};
            Object.keys(newDataElement).forEach(key => {
                if (key !== 'Total' && key !== 'CrossPodName') {
                    const oldValue = targetOldData[key];
                    const newValue = newDataElement[key];
                    resultPercentDiff[key] = newValue - oldValue;
                }
            });
            resultPercentDiff['CrossPodName'] = newDataElement['CrossPodName'];
            return resultPercentDiff;
        });
        return result;
    }

}
