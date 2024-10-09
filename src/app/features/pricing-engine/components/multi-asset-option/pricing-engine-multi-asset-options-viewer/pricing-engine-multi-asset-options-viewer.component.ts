import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CellValueChangedEvent, GridApi, GridOptions, RowClickedEvent } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { PricingEngineUtilityService } from '../../../services';
import * as fromModels from '../../../models';
import moment from 'moment';
import { RowNode } from 'ag-grid-community';
import { SecurityEditorGeneralDialogComponent } from 'src/app/features/security-editor/containers';



@Component({
  selector: 'app-pricing-engine-multi-asset-options-viewer',
  templateUrl: './pricing-engine-multi-asset-options-viewer.component.html',
  styleUrls: ['./pricing-engine-multi-asset-options-viewer.component.scss']
})
export class PricingEngineMultiAssetOptionViewerComponent implements OnInit, OnChanges {
  
    @Input() data: any[];
    @Input() loading: boolean;
    @Input() mode: 'live' | 'close';
    @Input() selectedDate: any;

    @Output() onMultiAssetOptionSelected = new EventEmitter<number>();
    @Output() onMultiAssetOptionUpdate = new EventEmitter<{payload: fromModels.MultiAssetOptionUpdateReq, field: string}>();
    @Output() onEditing = new EventEmitter<boolean>();

    private gridApi: GridApi;
    public extraOption = { sizeColumnsToFit: true };

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
            {headerName: 'CRD Sec ID', field: 'CRDSecID'},
            {headerName: 'SID', field: 'SID'},
            {headerName: 'Sec Name', field: 'SecName', cellRenderer: 'agGroupCellRenderer', pinned: 'left', width: 500 },
            {headerName: 'Currency', field: 'Currency'},
            {headerName: 'Notional', field: 'Notional'},
            {headerName: 'Price', field: 'Price'},
            {headerName: 'Expiry Date', field: 'ExpiryDate' },
            {headerName: 'Expiry Time', field: 'ExpiryTime' },
            {headerName: 'TimeZone', field: 'TimeZone' },
            {headerName: 'Std Time Zone', field: 'StdTimeZone' },
            {headerName: 'Type', field: 'Type' },
            {headerName: 'Input Correlation', field: 'InputCorrelation', cellClass: 'column-highlight-yellow', editable: true },
            {headerName: 'Correlation', field: 'Correlation'},
            {headerName: 'Theta', field: 'Theta'},
        ],
        masterDetail: true,
        detailRowHeight: 180,
        detailCellRendererParams: (masterGridParams) => ({
            detailGridOptions: {
                context: { 
                    masterGrid: {
                        node: masterGridParams.node.parent, 
                        data: masterGridParams.data 
                    } 
                },
                onCellValueChanged: params => this._getUpdateLegPayload(params),
                columnDefs: [
                    {headerName: 'Underlying SID', field: 'UnderlyingSID', width: 100},
                    {headerName: 'Underlying MDID', field: 'UnderlyingMDID', width: 120},
                    {headerName: 'Underlying Ticker', field: 'UnderlyingTicker', width: 120},
                    {headerName: 'Underlying Sec Name', field: 'UnderlyingSecName', width: 250},
                    {headerName: 'Underlying Sec Type', field: 'UnderlyingSecType', width: 130 },
                    {headerName: 'Underlying Currency', field: 'UnderlyingCurrency', width: 150 },
                    {headerName: 'Underlying Price', field: 'UnderlyingPrice', width: 150 },
                    {headerName: 'Call / Put', field: 'CallPut', width: 90 },
                    {headerName: 'Is Conditional?', field: 'IsConditional', width: 100 },
                    {headerName: 'Strike', field: 'Strike', width: 80 },
                    {headerName: 'Tenor', field: 'Tenor', width: 80},
                    {headerName: 'Input Vol', field: 'InputVol', cellClass: 'column-highlight-yellow', editable: true , width: 80},                    
                    {headerName: 'Input Underlying Price', field: 'InputUnderlyingPrice', cellClass: 'column-highlight-yellow', editable: true, width: 130 },
                    {headerName: 'Ref Future', field: 'RefFuture', width: 100, cellClass: 'column-highlight-yellow', editable: true , },
                    {headerName: 'Ref Future Price', field: 'RefFuturePrice', width: 120 },
                    {headerName: 'Input Roll Spread', field: 'InputRollSpread',  cellClass: 'column-highlight-yellow', editable: true, width: 120 },
                    {headerName: 'Input Div Yield', field: 'InputDivYield',  cellClass: 'column-highlight-yellow', editable: true, width: 120  },
                    
                    {headerName: 'Vol', field: 'Vol', width: 100 },
                    {headerName: 'Spot', field: 'Spot', width: 120 },
                    {headerName: 'Forward', field: 'Forward', width: 120  },
                    {headerName: 'Delta', field: 'Delta', width: 120  },
                    {headerName: 'Gamma', field: 'Gamma', width: 120  },
                    {headerName: 'Vega', field: 'Vega', width: 120  },
                    {headerName: 'Correlation Delta', field: 'CorrelationDelta', width: 120},
                    { headerName: 'PricedByPrizm', field: 'PricedByPrizm', filter: 'agSetColumnFilter'},
                ],
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
                }
            },
            getDetailRowData: (params) => {
                let parent = this.data.find( item => item['SecName'] === params.data['SecName'])
                params.successCallback(parent['Legs']);
              },
        }),
        rowSelection: 'single',
        deltaRowDataMode: true,
        getRowNodeId: data => data['SID'],
        onCellValueChanged: params => this._getUpdatePayload(params),
        rowClass: 'medium-row',
        rowHeight: 22,
        groupHeaderHeight: 24,
        headerHeight: 24,
        floatingFiltersHeight: 28,

        onRowSelected: params => {
            if (params.node.isSelected()) {
                this.onMultiAssetOptionSelected.emit(params.data['SID']);
            }
        },
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
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;

        if (this.data && this.data.length > 0) {
            this.gridApi.setRowData(this.data);
        }
    }

    private _getUpdatePayload(params: CellValueChangedEvent) {
        const targetData = params.data;
        const colField = params.colDef.field;
        const updatePayload: fromModels.MultiAssetOptionUpdateReq = {
            as_of_date: this.selectedDate,
            mode: this.mode === 'live' ? 1 : 0,
            sid: targetData['SID'],
            sec_name: targetData['SecName'],
            market_data_type: colField,
            market_data_value: Number.parseFloat(params.value)
        };
        this.onMultiAssetOptionUpdate.emit({
            field: colField,
            payload: updatePayload
        })
    }

    private _getUpdateLegPayload(params: CellValueChangedEvent) {
        const targetData = params.data;
        let prefix =  params.rowIndex === 0 ? 'Leg1_' : 'Leg2_';
        const colField = params.colDef.field;

        const updatePayload: fromModels.MultiAssetOptionUpdateReq = {
            as_of_date: this.selectedDate,
            mode: this.mode === 'live' ? 1 : 0,
            sid: params.context.masterGrid.data['SID'],
            sec_name: params.context.masterGrid.data['SecName'],
            market_data_type: `${prefix}${colField}`,
            market_data_value: this.generateMDValue(params, colField)
        };
        this.onMultiAssetOptionUpdate.emit({
            field: `${prefix}${colField}`,
            payload: updatePayload
        })
    }

    generateMDValue(params, colField){
        if(params.value === undefined){
            return null
        }
        return (colField === 'RefFuture') ? params.value : Number.parseFloat(params.value)
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
  
}
