import { Component, OnInit, Inject, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyTabGroup as MatTabGroup, MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GridApi, ColumnApi, GridOptions, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';

import * as fromModels from '../../models';


@Component({
    selector: 'app-benchmark-trades',
    templateUrl: './benchmark-trades.component.html',
    styleUrls: ['./benchmark-trades.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BenchmarkTradesComponent implements OnInit, OnChanges {

    // @ViewChild('tabs') tabGroup: MatTabGroup;

    @Input() fxTrades: fromModels.IFXTrade[];
    @Input() fxTradesLoading: boolean;
    @Input() fxTradesLoaded: boolean;
    @Input() fxTradesError: string;

    @Output() activeTabChange = new EventEmitter<string>();
    @Output() onSelectedBatchId = new EventEmitter<string>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    // private activeTab = 'FX';

    public customGridOption: GridOptions = {
        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                        params.colDef.field.toLowerCase().includes('id') === false ?
                        {'justify-content': 'flex-end'} : { };
            },
            filter: 'agNumberColumnFilter',
            valueFormatter: this.regularRoundOff(2),
        },

        columnDefs: [
            {headerName: 'status', field: 'status', cellStyle: params => params.value === 'SUCCESS' && {'color': '#01c601'}, checkboxSelection: false},
            {headerName: 'tradeDate', field: 'tradeDate'},
            {headerName: 'sendToCRD', field: 'sendToCRD'},
            {headerName: 'settleDate', field: 'settleDate'},
            {headerName: 'transType', field: 'transType'},

            {headerName: 'Custodian', field: 'custodian'},
            {headerName: 'CcyPair1', field: 'ccyPair1'},
            {headerName: 'CcyPair2', field: 'ccyPair2'},
            {headerName: 'price', field: 'price', valueFormatter: this.regularRoundOff(4)},
            {headerName: 'spotRate', field: 'spotRate', valueFormatter: this.regularRoundOff(4)},
            {headerName: 'exposureLocal', field: 'exposureLocal'},
            {headerName: 'exposureUSD', field: 'exposureUSD'},
            {headerName: 'roundAmt', field: 'roundAmt', valueGetter: this.thousandRoundOff, cellStyle: {'justify-content': 'flex-end'}},

            {headerName: 'loadTime', field: 'loadTime', valueGetter: params => (new Date(params.data['loadTime']).toLocaleDateString().split('/').join('-'))},
            {headerName: 'maturityDate', field: 'maturityDate'},

            {headerName: 'Dealer', field: 'dealer'},
            {headerName: 'trader', field: 'trader'},
            {headerName: 'pm', field: 'pm'},

            {headerName: 'Allocations', field: 'allocations'},
            {headerName: 'id', field: 'id', valueFormatter: this.regularRoundOff(0, false)},
            {headerName: 'podId', field: 'podId', valueFormatter: this.regularRoundOff(0, false)},
            {headerName: 'BatchId', field: 'batchId', valueFormatter: this.regularRoundOff(0, false)},
            {headerName: 'CRDOrderId', field: 'cRDOrderId', valueFormatter: this.regularRoundOff(0, false)},
            {headerName: 'CRDTradeId', field: 'cRDTradeId', valueFormatter: this.regularRoundOff(0, false)},
            {headerName: 'tid', field: 'tid', valueFormatter: this.regularRoundOff(0, false)},
            {headerName: 'fundId', field: 'fundId', valueFormatter: this.regularRoundOff(0, false)},

            {headerName: 'fileName', field: 'fileName'},
            {headerName: 'message', field: 'message'},
        ],

        getContextMenuItems: params => {
            const deselect = {
                name: 'Deselect All',
                action: () => params.api.deselectAll(),
                // icon: '<i class="material-icons small-menu-icon">table_chart</i>',
            };

            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator', deselect];
        },

        sideBar: true,
        suppressColumnVirtualisation: true,
        rowMultiSelectWithClick: true,
        rowSelection: 'multiple',
        onRowClicked: params => {
            // const targetBatchIds: any = {};
            // const selectedTradeIds: number[] = [];
            // params.api.getSelectedRows().forEach(row => {
            //     targetBatchIds[row['batchId']] = true;
            // });
            // console.log('targetBatchIds', targetBatchIds);
            // params.api.forEachNode(node => {
            //     if (targetBatchIds[node.data['batchId']]) {
            //         node.setSelected(true);
            //         selectedTradeIds.push(node.data['id']);
            //     }
            // });
            // this.onSelectedBatchId.emit(targetBatchIds);

            const targetBatchId = params.node.data['batchId'];
            params.api.forEachNode(node => {
                if (node.data['batchId'] === targetBatchId) {
                    node.setSelected(true);
                } else {
                    node.setSelected(false);
                }
            });
            this.onSelectedBatchId.emit(targetBatchId);
        },
    };

    public extraOption = {
        autoSizeColumns: true
    };

    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.fxTradesLoading && changes.fxTradesLoading.currentValue === true && this.gridApi) {
            this.gridApi.deselectAll();
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();
    }

    regularRoundOff(digit: number, formatRequire: boolean = true) {
        return (params: ValueFormatterParams) => {
            if (typeof params.value === 'number' && formatRequire) {
                const parts =  params.value.toFixed(digit).split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return parts.join('.');
            } else {
                return params.value;
            }
        };
    }

    thousandRoundOff(params: ValueGetterParams) {
        let value = params.data[params.colDef.field];
        console.log('origina value', value);
        value = Math.round(value / 1000);
        value = Math.round(value / 100) * 100;
        console.log('round value', value);
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'k';
    }

    selectedTabChange(event: MatTabChangeEvent) {
        const activeTab = event.tab.textLabel.toLowerCase();
        this.activeTabChange.emit(activeTab);
    }

}
