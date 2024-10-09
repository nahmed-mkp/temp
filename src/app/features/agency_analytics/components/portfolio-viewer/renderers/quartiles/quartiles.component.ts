import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';

import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

import { IBond, IQuartile } from './../../../../models/renderer.models';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { UtilityService } from 'src/app/services';

@Component({
    templateUrl: './quartiles.component.html',
    styleUrls: ['./quartiles.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuartilesComponent implements OnInit {

    public quartiles: IQuartile[];
    public bond: IBond;

    public Highcharts = Highcharts;

    public customGridOption: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' ? { 'justify-content': 'flex-end' } : {};
            },
            sortable: false,
            suppressMenu: true
        },

        sideBar: false,
        suppressColumnVirtualisation: true,
        floatingFilter: false,
        deltaRowDataMode: true,
        context: this,
        skipHeaderOnAutoSize: true,
        enableSorting: true,

        getRowNodeId: data => {
            return data['id']
        },

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


    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private columnDefs: any[];

    constructor(private dialogRef: MatDialogRef<QuartilesComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any, private utilities: UtilityService) {
        this.quartiles = this.data.quartiles;
        this.bond = this.data.bond;
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    onCloseClick(e: any): void {
        this.dialogRef.close();
    }

    public customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        if (this.quartiles && this.quartiles.length > 0) {
            this.columnDefs = this.getColumnDefs();
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.quartiles);
        }
    }

    private getColumnDefs(): ColDef[] {
        const result: ColDef[] = [{
            headerName: 'Quartile',
            field: 'loanSizeLow',
            headerTooltip: 'Quartile',
            valueGetter: params => {
                const rowIndex = params.node.rowIndex;
                switch (rowIndex) { 
                    case 0:
                        return '0-25%'
                    case 1:
                        return '25%-50%'
                    case 2:
                        return '50%-75%'
                    case 3:
                        return '75%-100%'
                }
            }
        }, {
            headerName: 'Loan Size (Low)',
            field: 'loanSizeLow',
            headerTooltip: 'Loan Size (Low)',
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0)
        }, {
            headerName: 'Loan Size (High)',
            field: 'loanSizeHigh',
            headerTooltip: 'Loan Size (High)',
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0)
        }, {
            headerName: 'Loan Level SATO (Low)',
            headerTooltip: 'Loan level Spread at Origination (Low)',
            field: 'loanLevelSATOLow'
        }, {
            headerName: 'Loan Level SATO (High)',
            headerTooltip: 'Loan level Spread at Origination (High)',
            field: 'loanLevelSATOHigh'
        }, {
            headerName: 'Loan Level WAC (Low)',
            field: 'loanLevelWACLow',
            headerTooltip: 'Loan level Weighted Average Coupon (Low)',
        }, {
            headerName: 'Loan Level WAC (High)',
            field: 'loanLevelWACHigh',
            headerTooltip: 'Loan level Weighted Average Coupon (High)',
        }, {
            headerName: 'WAC (Low)',
            field: 'waclow',
            headerTooltip: 'Weighted Average Coupon (Low)',
        }, {
            headerName: 'WAC (High)',            
            field: 'wachigh',
            headerTooltip: 'Weighted Average Coupon (High)',
        }, {
            headerName: 'DTI % (Low)',
            field: 'percentDTILow',
            headerTooltip: 'Debt to Income Ratio (%) (Low)',
            valueFormatter: (params) => {
                return params.value && params.value.toFixed(0) + '%' || '';
            }
        }, {
            headerName: 'DTI % (High)',
            field: 'percentDTIHigh',
            headerTooltip: 'Debt to Income Ratio (%) (High)',
            valueFormatter: (params) => {
                return params.value && params.value.toFixed(0) + '%' || '';
            }
        }, {
            headerName: 'Credit Score % (Low)',
            field: 'creditScoreLow'
        }, {
            headerName: 'Credit Score % (High)',
            field: 'creditScoreHigh'
        }, {
            headerName: 'LTV % (Low)',
            field: 'ltvlow',
            headerTooltip: 'Loan to Value Ratio (%) (Low)',
            valueFormatter: (params) => {
                return params.value && params.value.toFixed(0) + '%' || '';
            }
        }, {
            headerName: 'LTV % (High)',
            field: 'ltvhigh',
            headerTooltip: 'Loan to Value Ratio (%) (High)',
            valueFormatter: (params) => {
                return params.value && params.value.toFixed(0) + '%' || '';
            }
        }, {
            headerName: 'Origination Year (Low)',
            field: 'originationYearLow',
            valueGetter: (params) => {
                return params.data && moment(params.data[params.colDef.field], "YYYYMMDD").format('MMM [\']YY')
            }
        }, {
            headerName: 'Origination Year (High)',
            field: 'originationYearHigh',
            valueGetter: (params) => {
                return params.data && moment(params.data[params.colDef.field], "YYYYMMDD").format('MMM [\']YY')
            }
        }];
        return result;
    }
}
