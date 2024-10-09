import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CellValueChangedEvent, ColumnApi, GridApi, GridOptions, RowNode } from 'ag-grid-community';
import * as moment from 'moment';
import { SecurityEditorGeneralDialogComponent } from 'src/app/features/security-editor/containers';

import { UtilityService } from 'src/app/services';
import { PricingEngineUtilityService } from '../../../services';

import * as fromModels from './../../../models';

@Component({
  selector: 'app-pricing-engine-options-viewer',
  templateUrl: './pricing-engine-options-viewer.component.html',
  styleUrls: ['./pricing-engine-options-viewer.component.scss']
})
export class PricingEngineOptionsViewerComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() loading: boolean;
    @Input() mode: 'live' | 'close';
    @Input() selectedDate: any;

    @Output() onOptionSelected = new EventEmitter<number>();
    @Output() onRowSelected = new EventEmitter<number>();
    @Output() onOptionUpdate = new EventEmitter<{payload: fromModels.OptionUpdateReq, field: string}>();
    @Output() onOptionPriceMethodUpdate = new EventEmitter<{ payload: fromModels.OptionPriceMethodUpdateReq, field: string}>();
    @Output() onEditing = new EventEmitter<boolean>();

    private gridApi: GridApi;
    public extraOption = {};
    public priceMethods = ['VannaVolga' , 'InputPrice' , 'ForceCalcMid' , 'LastTrade' , 'InputVol', 'InputCorrel', 'BlackScholesFX'];

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            cellStyle: params => this.pricingEngineUtilityService.generateStyles(params),
            valueFormatter: params => {
                if (!params.colDef.field.toLocaleLowerCase().includes('id') && !isNaN(params.value)) {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4)(params);
                }
                if (typeof params.value === 'number'){
                    return parseFloat(params.value.toFixed(6));
                }
            }
        },
        suppressColumnVirtualisation: true,
        columnDefs: [
            {headerName: 'Security Type', field: 'SecurityType', width: 90, pinned: 'left', filter: 'agSetColumnFilter'},
            {headerName: 'Name', field: 'SecurityName', width: 250, filter: 'agSetColumnFilter', pinned: 'left', cellRenderer: params => this.pricingEngineUtilityService.pricedByPrizmCellRenderer(params)},
            {headerName: 'Price', field: 'Price', pinned: 'left',width: 80 },
            {headerName: 'Input Price', field: 'InputPrice', editable: true, cellClass: 'column-highlight-yellow', pinned: 'left', width: 80 },
            {headerName: 'Price Diff', field: 'PriceDiff', pinned: 'left', width: 80 },
            {headerName: 'ClosingPriceMethod', field: 'ClosingPriceMethod', cellEditor: 'agRichSelectCellEditor', width: 140, editable: true, cellEditorParams: { values:this.priceMethods }, cellClass: 'column-highlight-yellow', pinned: 'left',filter: 'agSetColumnFilter' },
            { headerName: 'IntradayPriceMethod', field: 'IntradayPriceMethod', cellEditor: 'agRichSelectCellEditor', width: 140, editable: true, cellEditorParams: { values: this.priceMethods }, cellClass: 'column-highlight-yellow', pinned: 'left', filter: 'agSetColumnFilter' },
            // {headerName: 'PriceAdj', field: 'PriceAdj'},
            //  {headerName: 'Input Price Adj', field: 'InputPriceAdj', editable: true, cellClass: 'column-highlight-yellow', width: 100},
            {headerName: 'Correl.', field: 'Correlation', editable: false, width: 60},
            {headerName: 'Input Correl.', field: 'InputCorrelation', editable: true,  width: 90, cellClass: 'column-highlight-yellow' },
            {headerName: 'UnderlyingTicker', field: 'UnderlyingTicker',  width: 120, filter: 'agSetColumnFilter' },
            // {headerName: 'RefFuture', field: 'RefFuture'},
            // {headerName: 'EFP', field: 'efp'},
            // {headerName: 'RollSpread', field: 'RollSpread'},
            {headerName: 'Strike', field: 'Strike',  width: 80 },
            {headerName: 'Und Fwd', field: 'UnderlyingPrice',  width: 80 },
            // {headerName: 'Ref Future Price', field: 'RefFuturePrice'},
            {headerName: 'Und Spot', field: 'UnderlyingSpotPrice',  width: 80 },
            {headerName: 'I/OTM', field: 'InTheMoney',  width: 80 },
            // {headerName: 'InputAtmPrice', field: 'InputAtmPrice'},
            {headerName: 'PxVol', field: 'PxVol',  width: 80},
            {headerName: 'Input Vol', field: 'InputPxVol',  width: 120, editable: true, cellClass: 'column-highlight-yellow', headerTooltip: 'Input Vol should be bpVol for options set to use Normal model ex: IR FUT OPT; Px Vol for options set to use LogNormal model' },
            {headerName: 'PxVol Diff', field: 'PxVolDiff',  width: 120, },
            {headerName: 'InputPxVolAdj', field: 'InputPxVolAdj',  width: 120, editable: true, cellClass: 'column-highlight-yellow'},

            { headerName: 'RefFuture', field: 'RefFuture', editable: true, cellClass: 'column-highlight-yellow', width: 80 },
            { headerName: 'RefFuturePrice', field: 'RefFuturePrice' },
            { headerName: 'RollSpread', field: 'RollSpread', editable: true, cellClass: 'column-highlight-yellow', width: 80 },
            { headerName: 'InputDivYield', field: 'InputDivYield', editable: true, cellClass: 'column-highlight-yellow', width: 80 },

            // {headerName: 'Skew', field: 'Skew'},
            {headerName: 'Implied Dividends', field: 'IDividends',  width: 120 },
            {headerName: 'Projected Dividends', field: 'PDividends', width: 120  },
            {headerName: 'Discount Factor', field: 'DiscountFactor',  width: 120 },
            //  {headerName: 'MixingFraction', field: 'MixingFraction'},
            {headerName: 'BloombergTicker', field: 'BBGTicker',  filter: 'agSetColumnFilter' },
            {headerName: 'BlbgLast', field: 'LastTrade', width: 100 },
            {headerName: 'BlbgBid', field: 'BidPrice',width: 100 },
            {headerName: 'BlbgAsk', field: 'AskPrice',  width: 100 },
            {headerName: 'ImplVol', field: 'ImplVol',width: 100, headerTooltip: 'Blbg ImplVol' },
            {headerName: 'BlbgImplVol', field: 'BlbgImpliedVol',width: 100, headerTooltip: 'When priced via normal model, converts ImplVol to NormalVol. Otherwise same as Blbg ImplVol.'},
            {headerName: 'MKPImplVol', field: 'MKPImpliedVol',width: 100, headerTooltip: 'ImplVol value based on our internal curve'},
            {headerName: 'Delta', field: 'Delta', width: 100 },
            {headerName: 'SmileDelta', field: 'SmileDelta',width: 100  },
            {headerName: 'Gamma', field: 'Gamma',  width: 80 },
            {headerName: 'Gamma01', field: 'Gamma01',  width: 80 },
            {headerName: 'Theta', field: 'Theta',  width: 80},
            {headerName: 'Vega', field: 'Vega'},
            {headerName: 'Rho', field: 'Rho', width: 80 },
            {headerName: 'UnderlyingDuration', width: 100, field: 'UnderlyingDuration'},
            {headerName: 'Duration', field: 'Duration' },
            {headerName: 'DurationAdjusted', width: 100, field: 'DurationAdjusted' },
            {headerName: 'UnderlyingSpreadDuration', field: 'UnderlyingSpreadDuration'},
            {headerName: 'SpreadDur', field: 'SpreadDur', width: 100 },
            {headerName: 'Expiry Date', field: 'ExpiryDate',width: 100,  filter: 'agSetColumnFilter' },
            {headerName: 'Expiry Time', field: 'ExpiryTime', width: 100,},
            {headerName: 'AnnualBpVol', field: 'AnnualBpVol',width: 100  },
            {headerName: 'DailyBpVol', field: 'DailyBpVol',width: 100  },
            {headerName: 'RiskFreeRate', field: 'RiskFreeRate', width: 100},
            {headerName: 'ForwardDelta', field: 'ForwardDelta', width: 100 },
            {
                headerName: 'Last Update',
                field: 'LastUpdated',
                pinned: 'right',
                width: 80,
                cellStyle: params => {
                    return {  ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'end'};
                },
                valueFormatter: params => {
                    return moment(params.data['LastUpdated'].replace(' ', 'T')).format('h:mm A');
                }
            },
            {headerName: 'Price Source', field: 'PriceSource' },
            { headerName: 'InPosition', field: 'InPosition', sort: 'desc', hide: true},
            { headerName: 'PricedByPrizm', field: 'PricedByPrizm', filter: 'agSetColumnFilter'},
        ],

        rowSelection: 'single',
        deltaRowDataMode: true,
        getRowNodeId: data => data['SID'],

        onRowSelected: params => {
            if (params.node.isSelected()) {
                this.onOptionSelected.emit(params.data['SID']);
            }
        },


        onCellValueChanged: params => {
            const colField = params.colDef.field;
            const fieldMap = this.fieldMap(colField)
            if (colField === "InputPrice" || colField === "InputVol" || colField === "InputPxVol" || colField === "InputCorrelation"
                || colField === "RefFuture" || colField === "RefFuturePrice" || colField === "RollSpread" || colField === "InputDivYield") {
                const payload = this._getUpdatePayload(params);
                payload['carryField'] = colField;
                this.onOptionUpdate.emit({payload: payload, field: fieldMap});
            } else if (colField === "ClosingPriceMethod" || colField === "IntradayPriceMethod") {
                const payload = this._getUpdatePriceMethodPayload(params);
                payload['carryField'] = colField;
                this.onOptionPriceMethodUpdate.emit({payload: payload, field: fieldMap});
            }
            // if (this.priceMethods.includes(params.data.ClosingPriceMethod) || this.priceMethods.includes(params.data.IntradayPriceMethod)) {
            //     const payload = this._getUpdatePriceMethodPayload(params);
            //     this.onOptionPriceMethodUpdate.emit(payload);
            // } else {
            //     const payload = this._getUpdatePayload(params);
            //     this.onOptionUpdate.emit(payload);
            // }
        },


        // UI ---------------------------------------------
        rowClass: 'medium-row',
        rowHeight: 22,
        groupHeaderHeight: 24,
        headerHeight: 24,
        floatingFiltersHeight: 28,
    };

    constructor(private utilityService: UtilityService,private dialog: MatDialog, private pricingEngineUtilityService: PricingEngineUtilityService) { 
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

    customGridCallBack(params) {
        this.gridApi = params.api;

        if (this.data && this.data.length > 0) {
            this.gridApi.setRowData(this.data);
        }
    }

    fieldMap(field: string){
        switch(field){
            case 'InputPrice':
                return 'input_price';
            case 'InputVol':
                return 'input_vol';
            case 'InputPxVol':
                return 'input_px_vol';
            case 'ClosingPriceMethod':
                return 'close_price_method';
            case 'IntradayPriceMethod':
                return 'intraday_price_method'
            case 'RefFuture':
                return 'ref_future';
            case 'RollSpread':
                return 'roll_spread';
            case 'InputDivYield':
                return 'input_div_yield';
            default:
                return field;
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

    private _getUpdatePayload(params: CellValueChangedEvent): fromModels.OptionUpdateReq {
        const targetData = params.data;
        const colField = params.colDef.field;
        
        let input_price = parseFloat(targetData['InputPrice']) || null;
        let input_px_vol = parseFloat(targetData['InputPxVol']) || null;

        // if (colField === "InputPrice") { 
        //     input_px_vol = null;
        // } else if (colField === "InputVol") { 
        //     input_price = null;
        // }        

        const updatePayload: fromModels.OptionUpdateReq = {
            securityType: targetData['SecurityType'] || null,
            as_of_date: moment(this.selectedDate).format('MM-DD-YYYY'),
            input_price: input_price,
            close_price_method: targetData['ClosingPriceMethod'] || null,
            input_price_adj: parseFloat(targetData['InputPriceAdj']) || null,
            input_px_vol: input_px_vol,
            input_px_vol_adj: parseFloat(targetData['InputPxVolAdj']) || null,
            intraday_price_method: targetData['IntradayPriceMethod'] || null,
            input_correlation: parseFloat(targetData['InputCorrelation']) || null,
            correlation: parseFloat(targetData['Correlation']) || null,
            
            ref_future: targetData['RefFuture'] || null,
            roll_spread: parseFloat(targetData['RollSpread']) || null,
            input_div_yield: parseFloat(targetData['InputDivYield']) || null,

            name: targetData['SecurityName'],
            sid: targetData['SID'],
            assetClass: 'options'
        };
        return updatePayload;
    }

    private _getUpdatePriceMethodPayload(params: CellValueChangedEvent): fromModels.OptionPriceMethodUpdateReq {
        const targetData = params.data;
        const updatePayload: fromModels.OptionPriceMethodUpdateReq = {
            as_of_date: moment(this.selectedDate).format('MM-DD-YYYY'),
            close_price_method: targetData['ClosingPriceMethod'] || null,
            intraday_price_method: targetData['IntradayPriceMethod'] || null,
            name: targetData['SecurityName'],
            sid: targetData['SID'],
            assetClass: 'options'
        };
        return updatePayload;
    }
}
