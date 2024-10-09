import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { AppCustomGridCellCheckboxComponent, AppGridCustomStatusBarCellRangesStatisticComponent, AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

@Component({
    selector: 'app-cs-statements',
    templateUrl: './client-solutions-statements.component.html',
    styleUrls: ['./client-solutions-statements.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsStatementsComponent implements OnInit {

    @Input() statements: any[];
    @Input() statementsLoading: boolean;
    @Input() statementsLoaded: boolean;
    @Input() statementsError: string;

    MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    public extraOption = {sizeColumnsToFit: true, autoSizeColumns: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        defaultColDef: {
            suppressMenu: false,
            sortable: false,
            filter: true,
            resizable: true,
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
        },
        floatingFilter: true,
        sideBar: false,
        context: this,
        statusBar: {
            statusPanels: [
                { statusPanel: 'AppGridCustomStatusBarCellRangesStatisticComponent' },
                { statusPanel: 'AppGridCustomStatusBarCellValueComponent' },
            ]
        },
        columnDefs: [
            {
                headerName: 'Level',
                field: 'Level',
                filter: 'agSetColumnFilter',
                pinned: 'left',
                sortable: false,
                cellStyle: params => this.getCellStyle(params, false)
            },
            {
                headerName: 'Year',
                field: 'Year',
                sortable: false,
                pinned: 'left',
                filter: 'agSetColumnFilter',
                cellStyle: params => this.getCellStyle(params, false)
            },
            {
                headerName: 'Month',
                field: 'Month',
                filter: 'agSetColumnFilter',
                sortable: false,
                pinned: 'left',
                valueGetter: params => this.MONTHS[params.data['Month'] - 1],
                cellStyle: params => this.getCellStyle(params, false) },
            {
                headerName: 'Fund',
                field: 'MKPFundName',
                pinned: 'left',
                filter: 'agSetColumnFilter',
                cellStyle: params => this.getCellStyle(params, false)
            }, {
                headerName: 'Series',
                field: 'SeriesName',
                pinned: 'left',
                filter: 'agSetColumnFilter',
                cellStyle: params => this.getCellStyle(params, false)
            },
            {
                headerName: 'Calculated Mgmt Fee Rate (%)',
                field: 'MgmtFeeRate',
                sortable: false,
                filter: 'agNumberColumnFilter',
                cellStyle: params => this.getCellStyle(params, true),
                valueFormatter: this.utilityService.formatPercentNumberAdvance(3)
            },
            {
                headerName: 'Beg. Gross Capital',
                field: 'BeginningGrossCapital',
                sortable: false,
                filter: 'agNumberColumnFilter',
                cellStyle: params => this.getCellStyle(params, true),
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)
            },
            {
                headerName: 'Beg. Accrued Perf. Fee',
                field: 'BeginningAccruedPerformanceFee',
                sortable: false,
                filter: 'agNumberColumnFilter',
                cellStyle: params => this.getCellStyle(params, true),
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)
            },
            {
                headerName: 'Beg. Net Capital',
                field: 'BeginningNetCapital',
                sortable: false,
                filter: 'agNumberColumnFilter',
                cellStyle: params => this.getCellStyle(params, true),
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)
            },
            {
                headerName: 'BOP Capital Additions',
                field: 'BOPCapitalAdditions',
                sortable: false,
                filter: 'agNumberColumnFilter',
                cellStyle: params => this.getCellStyle(params, true),
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)
            },
            {
                headerName: 'BOP Capital Withdrawals',
                field: 'BOPCapitalWithdrawals',
                sortable: false,
                filter: 'agNumberColumnFilter',
                cellStyle: params => this.getCellStyle(params, true),
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)
            },
            {
                headerName: 'Mgmt Fee ($)',
                field: 'ManagementFee',
                sortable: false,
                filter: 'agNumberColumnFilter',
                cellStyle: params => this.getCellStyle(params, true),
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)
            },
            {
                headerName: 'Curr. Performance Fee',
                field: 'CurrentMonthPerformanceFee',
                sortable: false,
                filter: 'agNumberColumnFilter',
                cellStyle: params => this.getCellStyle(params, true),
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)
            },
            {
                headerName: 'Net Operating Income',
                field: 'NetOperatingIncome',
                sortable: false,
                filter: 'agNumberColumnFilter',
                cellStyle: params => this.getCellStyle(params, true),
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)
            },
            {
                headerName: 'End. Gross Capital',
                field: 'EndingGrossCapital',
                sortable: false,
                filter: 'agNumberColumnFilter',
                cellStyle: params => this.getCellStyle(params, true),
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)
            },
            {
                headerName: 'End. Accrued Perf. Fee',
                field: 'EndingAccruedPerformanceFee',
                sortable: false,
                filter: 'agNumberColumnFilter',
                cellStyle: params => this.getCellStyle(params, true),
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)
            },
            {
                headerName: 'End. Net Capital',
                field: 'EndingNetCapital',
                sortable: false,
                filter: 'agNumberColumnFilter',
                cellStyle: params => this.getCellStyle(params, true),
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)
            },
            { headerName: 'Admin', field: 'Admin', filter: 'agSetColumnFilter' },
        ],
        // Framework
        frameworkComponents: {
            'AppCustomGridCellCheckboxComponent': AppCustomGridCellCheckboxComponent,
            'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
            'AppGridCustomStatusBarCellRangesStatisticComponent': AppGridCustomStatusBarCellRangesStatisticComponent
        }
    };

    decimalFormatter(params) {
        return `${(params.value * 100).toFixed(2)}`;
    }

    constructor(private fb: UntypedFormBuilder, private store: Store<fromStore.State>, private utilityService: UtilityService ) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    dateFormatter(dateVal) {
        const dateAsString = dateVal;
        const dateParts = dateAsString.split('T');
        const datePart = dateParts[0].split('-');
        return `${datePart[1]}/${datePart[2]}/${datePart[0]} ${dateParts[1].split('.')[0]}`;
    }

    getCellStyle(params: any, rightAlign: boolean): any {
        let result = {};
        if (params.data['Level'] === 'MasterFund') {
            result = Object.assign({}, { backgroundColor: '#5cb3ff', 'font-weight': 'bold'});
        } else if (params.data['Level'] === 'Fund') {
            result = Object.assign({}, { backgroundColor: '#82cafa',});
        } else if (params.data['Level'] === 'Series') {
            result = Object.assign({}, { backgroundColor: '#addfff',});
        } else if (params.data['Level'] === 'Investor') {
            result = Object.assign({}, { backgroundColor: '#e6f7ff'});
        }
        if (rightAlign) {
            result = Object.assign({}, result, { 'justify-content': 'end' });
        }
        return result;
    }

}

