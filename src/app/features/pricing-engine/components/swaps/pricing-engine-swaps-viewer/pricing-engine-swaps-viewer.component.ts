import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, GridOptions, CellValueChangedEvent, CellClassParams, RowNode } from 'ag-grid-community';
import { UtilityService as GlobalUtilService}  from 'src/app/services';

import * as moment from 'moment';

import * as fromModels from '../../../models';
import { SecurityEditorGeneralDialogComponent } from 'src/app/features/security-editor/containers';
import { PricingEngineUtilityService } from '../../../services';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-pricing-engine-swaps-viewer',
    templateUrl: './pricing-engine-swaps-viewer.component.html',
    styleUrls: ['./pricing-engine-swaps-viewer.component.scss']
})
export class PricingEngineSwapsViewerComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() loading: boolean;
    @Input() mode: 'live' | 'close'

    @Output() onSwapSelected = new EventEmitter<number>();
    @Output() onSwapUpdate = new EventEmitter<{payload: fromModels.SwapUpdateReq, field: string}>();
    @Output() onEditing = new EventEmitter<boolean>();

    private gridApi: GridApi;
    public extraOption = {};

    private mutualExclusivieFields = ['MarkAtPrice', 'MarkAtSpread', 'MarkAtYield', 'CurveShift'];

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 80,
            valueFormatter: params => {
                if (!params.colDef.field.toLocaleLowerCase().includes('id') && !isNaN(params.value)) {
                    return this.globalUtilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4)(params);
                }
            },
            cellStyle: (params) => this.pricingEngineUtilityService.generateStyles(params)
        },
        columnDefs: [

            {
                headerName: 'TradeName', field: 'TradeName', width: 180, pinned: 'left', filter: 'agSetColumnFilter'
            },
            {headerName: 'Security Type', field: 'SecurityType', width: 100, pinned: 'left', filter: 'agSetColumnFilter'},
            {
                headerName: 'Name', 
                field: 'SecurityName', 
                filter: 'agSetColumnFilter',  
                width: 300, 
                pinned: 'left', 
                cellRenderer: params => this.pricingEngineUtilityService.pricedByPrizmCellRenderer(params)
            },
            {headerName: 'MarkAtPrice', field: 'MarkAtPrice', editable: true, cellClass: 'column-highlight-yellow'},
            // {headerName: 'CarryForward', field: 'CarryForward'},
            {headerName: 'Price', field: 'Price'},
            {headerName: 'FullPrice', field: 'FullPrice'},
            {headerName: 'Price Delta', field: 'DeltaPrice', valueGetter: params => {
                return parseFloat(params.data['Price']) - parseFloat(params.data['LastClosePrice']);
            }},
            {headerName: 'LastClosePrice', field: 'LastClosePrice'},
            {headerName: 'MarkAtYield', field: 'MarkAtYield', editable: true, cellClass: 'column-highlight-yellow'},
            {headerName: 'Yield', field: 'Yield'},
            {headerName: 'LastCloseYield', field: 'LastCloseYield'},
            {headerName: 'Yield Delta', field: 'DeltaYield', valueGetter: params => {
                return parseFloat(params.data['Yield']) - parseFloat(params.data['LastCloseYield']);
            }},

            { headerName: 'MarkAtSpread', field: 'MarkAtSpread', editable: true, cellClass: 'column-highlight-yellow'},
            {headerName: 'Spread', field: 'Spread'},
            {headerName: 'SpreadDur', field: 'SpreadDur'},
            {headerName: 'SpotStartYield', field: 'SpotStartYield'},
            {headerName: 'DV01', field: 'DV01'},
            {headerName: 'Parent', field: 'Parent'},
            {headerName: 'GenericSwapName', field: 'GenericSwapName'},
            {headerName: 'CurveShift', field: 'CurveShift', editable: true, cellClass: 'column-highlight-yellow'},
            {headerName: 'CarryCurveShift', field: 'CarryCurveShift'},
            {headerName: 'BBGSpreadTicker', field: 'BenchmarkName', editable: true, cellClass: 'column-highlight-yellow'},
            {headerName: 'BlbgSpread', field: 'BlbgSpread'},

            {headerName: 'Duration', field: 'Duration', editable: true, cellClass: 'column-highlight-yellow'},
            {headerName: 'DurationAdjusted', field: 'DurationAdjusted'},
            {headerName: 'InflationDuration', field: 'InflationDuration'},
            {headerName: 'Convexity', field: 'Convexity'},
            {headerName: 'AccruedPrice', field: 'AccruedPrice'},

            {headerName: '3M KrDur', field: 'KrDur3M'},
            {headerName: '6M KrDur', field: 'KrDur6M' },
            {headerName: '1Y KrDur', field: 'KrDur1Y'},
            {headerName: '2Y KrDur', field: 'KrDur2Y'},
            {headerName: '3Y KrDur', field: 'KrDur3Y'},
            {headerName: '5Y KrDur', field: 'KrDur5Y'},
            {headerName: '10Y KrDur', field: 'KrDur10Y'},
            {headerName: '20Y KrDur', field: 'KrDur20Y'},
            {headerName: '30Y KrDur', field: 'KrDur30Y'},

            {headerName: 'TotalFirmPosition', field: 'TotalFirmPosition'},
            {headerName: 'SwapStartDate', field: 'SwapStartDate', cellStyle: params => {
                return { ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'flex-start'};
            }},
            {
                headerName: 'Last Update', 
                field: 'LastUpdated', 
                pinned: 'right', 
                width: 80, 
                cellStyle: params => {
                    return { ...this.pricingEngineUtilityService.generateStyles(params),'justify-content': 'end'};
                },
                valueFormatter: params => {
                    return moment(params.data['LastUpdated'].replace(' ', 'T')).format('h:mm A');
                }
            },
            {headerName: 'PriceSource', field: 'PriceSource', cellStyle: params => {
                return { ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'flex-start'};
            }},
            {headerName: 'CurveName', field: 'CurveName', filter: 'agSetColumnFilter', cellStyle: params => {
                return { ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'flex-start'};
            }},
            {headerName: 'Currency', field: 'Currency', filter: 'agSetColumnFilter',  cellStyle: params => {
                return { ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'flex-start'};
            }},
            {headerName: 'SwapSortName', field: 'SwapSortName', cellStyle: params => {
                return { ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'flex-start'};
            }},

            {headerName: 'Notional', field: 'Notional'},
            {headerName: 'Premium', field: 'Premium'},
            {headerName: 'SID', field: 'SID',  filter: 'agSetColumnFilter', cellStyle: params => {
                return { ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'flex-start'};
            }},
            { headerName: 'InPosition', field: 'InPosition', sort: 'desc', hide: true},
            { headerName: 'PricedByPrizm', field: 'PricedByPrizm', filter: 'agSetColumnFilter'},

            // {headerName: 'Adjust%', field: 'Adjust%'},
            // {headerName: 'Adjusted', field: 'Adjusted'},
            // {headerName: 'InflationDur', field: 'InflationDur'},
        ],

        rowSelection: 'single',
        getRowNodeId: data => data['SID'] + data['TradeName'],
        deltaRowDataMode: true,
        onRowSelected: params => {
            if (params.node.isSelected()) {
                this.onSwapSelected.emit(params.data['SID']);
            }
        },

        // Event ---------------------------------------------
        onCellValueChanged: params => {
            const payload = this._getUpdatePayload(params);
            payload['carryField'] = params.colDef.field;
            const fieldMap = this.fieldMap(params.colDef.field);
            this.onSwapUpdate.emit({payload: payload, field: fieldMap});
        },
        onCellEditingStarted: params => {
            this.onEditing.emit(true);
        },
        onCellEditingStopped: params => {
            this.onEditing.emit(false);
        },

        // UI ---------------------------------------------
        rowClass: 'medium-row',
        rowHeight: 22,
        groupHeaderHeight: 24,
        headerHeight: 24,
        floatingFiltersHeight: 28,
    }

    constructor(private globalUtilityService: GlobalUtilService, private dialog: MatDialog, private pricingEngineUtilityService: PricingEngineUtilityService) {
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
                    colId: 'TradeName',
                    sort: 'asc',
                    sortedAt: 2
                },
                {
                    colId: 'SID',
                    sort: 'asc',
                    sortedAt: 3
                },
                {
                    colId: 'SecurityType',
                    sort: 'desc',
                    sortedAt: 4
                }
            ];

            this.gridApi.setSortModel(sort);
        }
    }

    fieldMap(field: string){
        switch(field){
            case 'MarkAtPrice':
                return 'mark_at_price';
            case 'MarkAtYield':
                return 'mark_at_yield';
            case 'MarkAtSpread':
                return 'mark_at_spread';
            case 'CurveShift':
                return 'curve_shift';
            case 'BGGSpread':
                return 'bbg_spread';
            case 'Duration':
                return 'duration'
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

    private _getUpdatePayload(params: CellValueChangedEvent): fromModels.SwapUpdateReq {
        const targetData = params.data;
        const editedField = params.colDef.field;

        if (this.mutualExclusivieFields.includes(editedField)) {
            const forceNullFields = this.mutualExclusivieFields.filter(field => field !== editedField);
            forceNullFields.forEach(field => {
                targetData[field] = null;
            });
        }

        const updatePayload: fromModels.SwapUpdateReq = {
            mark_at_price:  parseFloat(targetData['MarkAtPrice']) || null,
            name: targetData['SecurityName'],
            mark_at_spread: parseFloat(targetData['MarkAtSpread']) || null,
            mark_at_yield: parseFloat(targetData['MarkAtYield']) || null,
            benchmark_name: targetData['BenchmarkName'] || null,
            sid: targetData['SID'],
            curve_shift: parseFloat(targetData['CurveShift']) || null,
            securityType: targetData['SecurityType'] || null,
            assetClass: 'swaps'
        };

        return updatePayload;
    }
}
