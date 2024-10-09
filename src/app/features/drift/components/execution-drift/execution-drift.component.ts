import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

import { ActualVsDriftRendererComponent } from '../renderers/act_vs_drift-renderer.component';
import { TradenameRendererComponent } from './../renderers/tradename-renderer.component';

import * as fromModels from './../../models/drift.models';

@Component({
    selector: 'app-execution-drift',
    templateUrl: './execution-drift.component.html',
    styleUrls: ['./execution-drift.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExecutionDriftComponent implements OnInit, OnChanges, OnDestroy {

    @Input() drifts: any[];
    @Input() driftsLoading: boolean;
    @Input() driftsLoaded: boolean;
    @Input() driftsError: string;
    @Input() request: fromModels.PositionDriftRequest;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public extraOption = { sizeColumnsToFit: true };

    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            editable: false,
            enableCellChangeFlash: false
        },
        getRowNodeId: data => data.CRTradeID,
        deltaRowDataMode: false,
        rowSelection: 'single',
        columnDefs: [
            {
                headerName: 'TradeDate',
                width: 95,
                field: 'TradeDate'
            }, {
                headerName: 'Security',
                width: 270,
                field: 'SecurityName',
                cellStyle: { 'background-color': '#f8f9e3' }
            }, {
                headerName: 'Fund',
                field: 'FundName',
                width: 120,
                cellStyle: { 'background-color': '#eed39b' }
            }, {
                headerName: 'Pod',
                width: 120,
                field: 'PodName',
                cellStyle: { 'background-color': '#eed39b' }
            }, {
                headerName: 'TradeName',
                width: 220,
                field: 'TradeName',
                cellRenderer: 'TradenameRendererComponent',
                cellStyle: { 'background-color': '#eebb88' }
            }, {
                headerName: 'TradeID',
                width: 90,
                field: 'TradeID',
                cellStyle: { 'background-color': '#eebb88' }
            }, {
                headerName: 'Buy/Sell',
                width: 75,
                field: 'Buy/Sell'
            }, {
                headerName: 'Trader',
                width: 90,
                field: 'Trader'
            }, {
                headerName: 'ExecPrice',
                width: 80,
                field: 'ExecPrice',
                cellStyle: { 'justify-content': 'flex-end' }
            }, {
                headerName: 'TargetQty',
                width: 120,
                field: 'TargetQty',
                valueFormatter: this.utilities.formatNumberWithCommasAndDigit(0),
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#bcf3f2' },
            }, {
                headerName: 'AllocQty',
                width: 120,
                field: 'AllocQty',
                valueFormatter: this.utilities.formatNumberWithCommasAndDigit(0),
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#bcf3f2' },
            }, {
                headerName: 'Drift (%)',
                field: 'Act%',
                width: 200,
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#bcf3f2' },
                cellRenderer: 'ActualVsDriftRendererComponent',
                cellRendererParams: { type: 'Execution' }
            }, {
                headerName: 'AllocReason',
                width: 150,
                field: 'AllocReason'
            }, {
                headerName: 'Trigger',
                width: 80,
                field: 'AllocationTrigger'
            }, {
                headerName: 'AllocStatus',
                width: 120,
                field: 'AllocStatus'
            }, {
                headerName: 'Comments',
                width: 100,
                field: 'Comments'
            }, {
                headerName: 'Broker',
                width: 70,
                field: 'Broker'
            }, {
                headerName: 'Opp Tgt (%)',
                field: 'Opp_Tgt_Pct',
                width: 80,
                valueFormatter: this.utilities.formatPercentNumberAdvance(2),
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#e2feea' },
            }, {
                headerName: 'Enhanced Tgt (%)',
                field: 'EnhancedOpp_Tgt_Pct',
                width: 80,
                valueFormatter: this.utilities.formatPercentNumberAdvance(2),
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#e2feea' },
            }, {
                headerName: 'MA7 Tgt (%)',
                field: 'MA7_Tgt_Pct',
                width: 80,
                valueFormatter: this.utilities.formatPercentNumberAdvance(2),
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#e2feea' },
            }, {
                headerName: 'AlphaPort Tgt (%)',
                field: 'AlphaPort_Tgt_Pct',
                width: 80,
                valueFormatter: this.utilities.formatPercentNumberAdvance(2),
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#e2feea' },
            }, {
                headerName: 'GMMK Tgt (%)',
                field: 'GMMK_Tgt_Pct',
                width: 80,
                valueFormatter: this.utilities.formatPercentNumberAdvance(2),
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#e2feea' },
            }, {
                headerName: 'OrderID',
                width: 80,
                field: 'CROrderID',
                cellStyle: { 'justify-content': 'flex-end'}
            }, {
                headerName: 'TradeID',
                width: 80,
                field: 'CRTradeID',
                cellStyle: { 'justify-content': 'flex-end' }
            },

        ],
        context: { componentParent: this },
        frameworkComponents: {
            ActualVsDriftRendererComponent: ActualVsDriftRendererComponent,
            TradenameRendererComponent: TradenameRendererComponent
        },
    };


    constructor(private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.request && this.gridApi) {
            this.customGridOption.context = { 'request': changes.request.currentValue };
            this.gridApi.setRowData(this.drifts);
            this.gridApi.refreshCells();
        }

        if (changes.drifts && this.gridApi) {
            this.gridApi.setRowData(changes.drifts.currentValue);
            this.gridApi.refreshCells();
        }
    }

    ngOnDestroy(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        if (this.drifts.length > 0) {
            this.gridApi.setRowData(this.drifts);
        }
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

}
