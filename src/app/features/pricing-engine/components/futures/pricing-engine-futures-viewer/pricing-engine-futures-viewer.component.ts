import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CellValueChangedEvent, GridApi, GridOptions, RowNode } from 'ag-grid-community';
import moment from 'moment';
import { SecurityEditorGeneralDialogComponent } from 'src/app/features/security-editor/containers';
import { UtilityService } from 'src/app/services';
import { PricingEngineUtilityService } from '../../../services';

import * as fromModels from './../../../models';

@Component({
    selector: 'app-pricing-engine-futures-viewer',
    templateUrl: './pricing-engine-futures-viewer.component.html',
    styleUrls: ['./pricing-engine-futures-viewer.component.scss']
})
export class PricingEngineFuturesViewerComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() asOfDate: string;
    @Input() loading: boolean;
    @Input() mode: 'live' | 'close';

    @Output() onFuturesUpdate = new EventEmitter<{payload: fromModels.FutureUpdateReq, field: string}>();
    @Output() onRowSelected = new EventEmitter<number>();

    private gridApi: GridApi;
    public extraOption = {};

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 150,
            cellStyle: params => this.pricingEngineUtilityService.generateStyles(params),
            valueFormatter: params => {
                if (!params.colDef.field.toLocaleLowerCase().includes('id') && !isNaN(params.value)) {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4)(params);
                }
            }
        },
        columnDefs: [
            {headerName: 'Security Type', field: 'SecurityType', width: 80, pinned: 'left', filter: 'agSetColumnFilter'},
            { headerName: 'Name', field: 'SecurityName', filter: 'agSetColumnFilter', width: 120, pinned: 'left', cellRenderer:(params) => this.pricingEngineUtilityService.pricedByPrizmCellRenderer(params)},
            { headerName: 'Blbg Ticker', field: 'BBGTicker', width: 100 },
            { headerName: 'BenchmarkSecurityName', field: 'BenchmarkName', width: 120 },
            { headerName: 'BenchmarkType', field: 'BenchmarkType', width: 80 },
            { headerName: 'Roll Spread', field: 'RollSpread', width: 80 },
            { headerName: 'Price', field: 'Price', width: 80 },
            { headerName: 'InputPrice', field: 'InputPrice', editable: true, cellClass: 'column-highlight-yellow', width: 80 },
            { headerName: 'Prev Price', field: 'LastClosePrice', width: 80 },
            {
                headerName: 'Price Δ', 
                width: 60, 
                field: 'delta', 
                valueGetter: params => {
                    let result = parseFloat(params.data['Price']) - parseFloat(params.data['LastClosePrice']);
                    if (Number.isNaN(result)) { 
                        return null;
                    } else {
                        return result;
                    }
                },
                cellStyle: params => {
                    if ((params.data['Price']) - parseFloat(params.data['LastClosePrice']) > 0) {
                        return { 'color': '#3ab528', 'justify-content': 'end', 'border-left': '0.2px dotted #d7d7d7;' };
                    } else if ((params.data['Price']) - parseFloat(params.data['LastClosePrice']) < 0) {
                        return { 'color': '#e81540', 'justify-content': 'end', 'border-left': '0.2px dotted #d7d7d7;' };
                    }
                    return { 'justify-content': 'end', 'border-left': '0.2px dotted #d7d7d7;' };
                },
            },
            { headerName: 'Yield', field: 'Yield', width: 60 },
            { headerName: 'Duration', field: 'Duration', width: 60 },
            { headerName: 'Convexity', field: 'Convexity', width: 60 },
            { headerName: '3M Krd', field: 'KrDur3M', width: 60 },
            { headerName: '6M Krd', field: 'KrDur6M', width: 60 },
            { headerName: '1Y Krd', field: 'KrDur1Y', width: 60 },
            { headerName: '2Y Krd', field: 'KrDur2Y', width: 60 },
            { headerName: '3Y Krd', field: 'KrDur3Y', width: 60 },
            { headerName: '5Y Krd', field: 'KrDur5Y', width: 60 },
            { headerName: '10Y Krd', field: 'KrDur10Y', width: 70 },
            { headerName: '20Y Krd', field: 'KrDur20Y', width: 70 },
            { headerName: '30Y Krd', field: 'KrDur30Y', width: 70 },
            { headerName: 'Model Price', field: 'FutureModelPrice', width: 90 },
            { headerName: 'CTD Implied Repo Rate', field: 'CTDImpliedRepoRate', width: 90 },
            { headerName: 'Invoice Spread', field: 'InvoiceSpread', width: 95 },
            {
                headerName: 'Last Update', 
                field: 'LastUpdated',
                pinned: 'right',
                width: 80,
                valueFormatter: params => {
                    return moment(params.data['LastUpdated'].replace(' ', 'T')).format('h:mm A');
                },
                cellStyle: params => {
                    return { ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'end'};
                }
            },
            {headerName: 'Price Source', field: 'PriceSource', hide: true},
            { headerName: 'InPosition', field: 'InPosition', sort: 'desc', hide: true},
            { headerName: 'PricedByPrizm', field: 'PricedByPrizm', filter: 'agSetColumnFilter', hide: true},
        ],
        rowSelection: 'single',
        deltaRowDataMode: true,
        getRowNodeId: data => data['SID'],
        onCellValueChanged: params => {
            const colField = params.colDef.field;
            const fieldMap = 'input_price';
            const payload = this._getUpdatePayload(params);
            payload['carryField'] = colField;
            this.onFuturesUpdate.emit({payload: payload, field: fieldMap});
        },

        // Event --------------------------------------------------------

        onRowSelected: params => {
            if (params.node.isSelected()) {
                this.onRowSelected.emit(params.data['SID']);
            }
        },

        // UI ---------------------------------------------
        rowClass: 'medium-row',
        rowHeight: 22,
        groupHeaderHeight: 24,
        headerHeight: 24,
        floatingFiltersHeight: 28,
    }

    constructor(private utilityService: UtilityService, private dialog: MatDialog, private pricingEngineUtilityService: PricingEngineUtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0) {
            if (this.gridApi) {
                this.gridApi.setRowData(this.data);
            }

            var sort = [
                {
                    colId: 'InPosition',
                    sort: 'desc',
                    sortedAt: 1
                },
                {
                    colId: 'SecurityType',
                    sort: 'asc',
                    sortedAt: 2
                },
                {
                    colId: 'SecurityName',
                    sort: 'asc',
                    sortedAt: 3
                },
            ];

            this.gridApi.setSortModel(sort);
        }
    }

    public onOpenSecurityEditor(event: RowNode) {
        this.dialog.open(SecurityEditorGeneralDialogComponent, {
            hasBackdrop: false,
            panelClass: ['event-analysis-pop-up-panel'],
            width: '80rem',
            height: '50rem',
            data: {
                sid: event.data['SID'],
                rowData: { 'securityName': event.data['SecurityName'], 'sid': event.data['SID'], 'securityType': event.data['SecurityType']},
            },
        });
    }
    
    customGridCallBack(params) {
        this.gridApi = params.api;

        if (this.data && this.data.length > 0) {
            this.gridApi.setRowData(this.data);
        }
    }
    private _getUpdatePayload(params: CellValueChangedEvent): fromModels.FutureUpdateReq {
        const targetData = params.data;
        const editedField = params.colDef.field;
        const updatePayload: fromModels.FutureUpdateReq = {
            as_of_date: moment(this.asOfDate).format('MM-DD-YYYY'),
            input_price: parseFloat(targetData['InputPrice']) || null,
            name: targetData['SecurityName'],
            sid: targetData['SID'],
            assetClass: 'futures',
        };

        return updatePayload;
    }

}
