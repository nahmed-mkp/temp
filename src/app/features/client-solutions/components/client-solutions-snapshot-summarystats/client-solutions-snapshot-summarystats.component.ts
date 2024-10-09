import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';
import * as _ from 'lodash';

import * as moment from 'moment';
import { Store } from '@ngrx/store';

import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

@Component({
    selector: 'app-cs-snapshots-summarystats',
    templateUrl: './client-solutions-snapshot-summarystats.component.html',
    styleUrls: ['./client-solutions-snapshot-summarystats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsSnapshotsSummaryStatsComponent implements OnInit {

    @Input() param: fromModels.ISnapshotParameter;
    @Input() summaryStats: any[];
    @Input() summaryStatsLoading: boolean;
    @Input() summaryStatsLoaded: boolean;
    @Input() summaryStatsError: string;

    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions;
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    constructor(private utilityService: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
        this.customGridOption = this._createGridOption();
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    onDownloadData() {
        this.gridApi.exportDataAsCsv({
            fileName: `${this.param.fund.code}_BenchmarkStatistics`
        });
    }

    // Utility -------------------------------

    private _createGridOption(): GridOptions {
        return {
            defaultColDef: {
                suppressMenu: true,
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2),
                cellStyle: params => {
                    return typeof params.value === 'number' ? { 'justify-content': 'flex-end' } : {};
                },
                cellClass: 'right-border-light',
                headerClass: 'ag-header-wrap'
            },

            columnDefs: [
                { headerName: 'Description', field: 'BMOrFundDescription', width: 300, suppressSizeToFit: true },
                { headerName: 'Compound ROR(A)', field: 'AnnReturn', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, { percent: true }) },
                { headerName: 'Cumulative Return', field: 'CumReturn', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, { percent: true }) },
                { headerName: 'Standard Deviation(A)', field: 'AnnStdDev', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, { percent: true }) },
                { headerName: 'Max Drawdown', field: 'MaxDrawdown', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, { percent: true }) },
                { headerName: 'Sharpe Ratio', field: 'SharpeRatio' },
                { headerName: 'Correlation To Fund', field: 'Correlation' },
                { headerName: 'Percent Profitable Period', field: 'PctProfitablePeriods', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, { percent: true }) },
                { headerName: 'Sortino Ratio', field: 'SortinoRatio' },
                { headerName: 'Information Ratio', field: 'informationRatio' },
                { headerName: 'Risk Free Rate', field: 'RiskFreeRate', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, { percent: true }) },
                { headerName: 'Skew', field: 'Skew' },
                { headerName: 'Kurtosis', field: 'Kurtosis' },

                // {headerName: '', field: 'isBenchmark'},
                // {headerName: '', field: 'isError'},
            ],
            getRowClass: params => {
                const rowClass = ['ultra-small-row'];
                if (params.node.rowIndex % 2 === 0) {
                    rowClass.push('even-row-shaded-effect');
                }
                if (params.node.data['description'] === this.param.fund.description) {
                    rowClass.push('yellow-background');
                }
                return rowClass;
            },

            rowHeight: 18,
            sideBar: false,
            showToolPanel: false,

            statusBar: {
                statusPanels: [
                    { statusPanel: 'agAggregationComponent' },
                    { statusPanel: 'AppGridCustomStatusBarCellValueComponent' },
                ],
            },

            frameworkComponents: {
                'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
            },
            suppressColumnVirtualisation: true,
        };
    }
}
