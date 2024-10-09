import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CellClassParams, CellValueChangedEvent, GridApi, GridOptions, ICellRendererParams, RowNode } from 'ag-grid-community';
import { SecurityEditorGeneralDialogComponent } from 'src/app/features/security-editor/containers';

import * as moment from 'moment';

import { UtilityService } from 'src/app/services';
import { PricingEngineUtilityService } from '../../../services/utility.service';

import * as fromModels from './../../../models';

@Component({
    selector: 'app-pricing-engine-swaptions-viewer',
    templateUrl: './pricing-engine-swaptions-viewer.component.html',
    styleUrls: ['./pricing-engine-swaptions-viewer.component.scss']
})
export class PricingEngineSwaptionsViewerComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() loading: boolean;
    @Input() mode: 'live' | 'close';

    @Output() onSwaptionSelected = new EventEmitter<number>();
    @Output() onSwaptionUpdate = new EventEmitter<{ payload: fromModels.SwaptionUpdateReq, field: string}>();
    @Output() onEditing = new EventEmitter<boolean>();

    private gridApi: GridApi;
    public extraOption = {};

    private mutualExclusivieFields = ['MarkAtPrice', 'MarkAtNVol', 'NVolShift'];

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 80,
            cellStyle: (params) => this.pricingEngineUtilityService.generateStyles(params),
            valueFormatter: params => {
                if (!params.colDef.field.toLocaleLowerCase().includes('id') && !isNaN(params.value)) {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4)(params);
                }
            }
        },
        columnDefs: [
            { headerName: 'Curve', field: 'Curve', pinned: 'left', width: 80, filter: 'agSetColumnFilter'},
            {
                headerName: 'Payer/Receiver', field: 'PayReceive', width: 50, pinned: 'left', filter: 'agSetColumnFilter',
                valueGetter: (params) => {
                    if(params.data['PayReceive'] === 'CAP' || params.data['PayReceive'] === 'FLOOR'){
                        return params.data['PayReceive'];
                    } else {
                        return params.data['PayReceive'] === 'REC' ? 'Receiver' : 'Payer';
                    }
                    
                }
            },
            { headerName: 'Name', field: 'SecurityName', filter: 'agSetColumnFilter', width: 300, pinned: 'left' , cellRenderer: (params: ICellRendererParams) => this.pricingEngineUtilityService.pricedByPrizmCellRenderer(params)},
            { headerName: 'FirstTradeName', field: 'TradeName', width: 200, filter: 'agSetColumnFilter'},

            { headerName: 'Normal', field: 'NormalModel'},
            { headerName: 'MarkAtPrice', field: 'MarkAtPrice', editable: true, cellClass: 'column-highlight-yellow'},
            { headerName: 'Price', field: 'Price'},

            { headerName: 'Input Correlation', field: 'InputCorrelation',  editable: true, cellClass: 'column-highlight-yellow'},         
            { headerName: 'Correlation', field: 'Correlation'},

            { headerName: 'Prev. Close', field: 'LastClosePrice'},
            {
                headerName: 'Price Delta', 
                field: 'Px', 
                valueGetter: params => {
                    return parseFloat(params.data['Price']) - parseFloat(params.data['LastClosePrice']);
                }
            },
            { headerName: 'Yield Shift', field: 'YieldShift', editable: true, cellClass: 'column-highlight-yellow'},
            { headerName: 'Yield', field: 'Yield'},
            { headerName: 'LastCloseYield', field: 'LastCloseYield'},
            {
                headerName: 'Yield Diff',
                field: 'yieldDiff', 
                valueGetter: params => {
                    return parseFloat(params.data['Yield']) - parseFloat(params.data['LastCloseYield']);
                }
            },
            { headerName: 'Yield (USD CSA)', field: 'USDCSAYield'},

            { headerName: 'I/OTM', field: 'InTheMoney'},
            { headerName: 'ATM Vol', field: 'ATM Vol'},         
            { headerName: 'NVolShift', field: 'NVolShift', editable: true, cellClass: 'column-highlight-yellow'},    
            { headerName: 'NormalVolCal', field: 'BpsVolCal'},
            { headerName: 'NormalVol', field: 'BpsVol'},
            { headerName: 'Vol', field: 'Vol'},               
            { headerName: 'MarkAtNVol', field: 'MarkAtNVol', editable: true, cellClass: 'column-highlight-yellow'},    
            { headerName: 'YdVol', field: 'YdVol'},
            { headerName: 'PriceMethod', field: 'PriceMethod'},

            { headerName: 'VolDuration', field: 'VolDuration'},
            { headerName: 'Const Normal Delta', field: 'ConstNormalVolDelta'},
            { headerName: 'Tangent Normal Delta', field: 'NormalVolDelta'},
         

            { headerName: 'DV01', field: 'DV01'},                    
            { headerName: 'InModeDuration', field: 'InModeDuration'},              

            { headerName: 'Tangent Black Delta', field: 'BlackVolDelta'},
            { headerName: 'Const Black Delta', field: 'ConstBlackVolDelta'},
            { headerName: 'SABR Delta', field: 'SABRDelta'},
            { headerName: 'Modified SABR Delta', field: 'ModifiedSABRDelta'},
            { headerName: 'Duration', field: 'Duration'},
            { headerName: 'BondEquivDuration', field: 'BondEquivDuration'},
            { headerName: 'Convexity', field: 'Convexity'},
            { headerName: 'Gamma', field: 'Gamma'},
            { headerName: 'Gamma01', field: 'Gamma01'},
            { headerName: 'UnderlyingDuration', field: 'UnderlyingDuration'},
            { headerName: 'UnderlyingPrice', field: 'UnderlyingPrice'},

            { headerName: '3M PDur', field: 'KrDur3M'},
            { headerName: '6M PDur', field: 'KrDur6M'},
            { headerName: '1Y PDur', field: 'KrDur1Y'},
            { headerName: '2Y PDur', field: 'KrDur2Y'},
            { headerName: '3Y PDur', field: 'KrDur3Y'},
            { headerName: '5Y PDur', field: 'KrDur5Y'},
            { headerName: '10Y PDur', field: 'KrDur10Y' },
            { headerName: '20Y PDur', field: 'KrDur20Y'},
            { headerName: '30Y PDur', field: 'KrDur30Y'},

            { headerName: 'Expiry Date', field: 'ExpirationDate'},
            { headerName: 'Expiry Time', field: 'ExpiryTime'},
            { headerName: 'Swap Start', field: 'SwapStartDate'},
            { headerName: 'Maturity', field: 'MaturityDate'},

            { headerName: 'InPosition', field: 'InPosition', sort: 'desc', hide: true, filter: 'agSetColumnFilter'},
            {
                headerName: 'Last Update',
                field: 'LastUpdated',
                pinned: 'right',
                width: 80,
                cellStyle: params => {
                    return { 'justify-content': 'end', 'border-left': '0.2px dotted #d7d7d7;' };
                },
                valueFormatter: params => {
                    return moment(params.data['LastUpdated'].replace(' ', 'T')).format('h:mm A');
                }
            },

            { headerName: 'Price Source', field: 'PriceSource'},
            { headerName: 'PricedByPrizm', field: 'PricedByPrizm'},
        ],

        rowSelection: 'single',
        deltaRowDataMode: true,
        getRowNodeId: data => data['SID'] + data['TradeName'],

        // Event --------------------------------------------------------

        onRowSelected: params => {
            if (params.node.isSelected()) {
                this.onSwaptionSelected.emit(params.data['SID']);
            }
        },

        onCellValueChanged: params => {
            // console.log('onCellValueChanged', params);
            const payload = this._getUpdatePayload(params);
            const colField = params.colDef.field;
            payload['carryField'] = colField;
            const fieldMap = this.fieldMap(colField)
            this.onSwaptionUpdate.emit({payload: payload, field: fieldMap});
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
                    colId: 'SecurityName',
                    sort: 'asc',
                    sortedAt: 2
                },
            ];

            this.gridApi.setSortModel(sort);
        }
    }

    fieldMap(field: string){
        switch(field){
            case 'MarkAtPrice':
                return 'mark_at_price';
            case 'YieldShift':
                return 'curve_shift';
            case 'NVolShift':
                return 'nvol_shift';
            case 'MarkAtNVol':
                return 'mark_at_nvol';
        }
        return ''
    }

    customGridCallBack(params) {
        this.gridApi = params.api;

        if (this.data && this.data.length > 0) {
            this.gridApi.setRowData(this.data);
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

    private _getUpdatePayload(params: CellValueChangedEvent): fromModels.SwaptionUpdateReq {
        const targetData = params.data;
        const editedField = params.colDef.field;

        if (this.mutualExclusivieFields.includes(editedField)) {
            const forceNullFields = this.mutualExclusivieFields.filter(field => field !== editedField);
            forceNullFields.forEach(field => {
                targetData[field] = null;
            });
        }

        const updatePayload: fromModels.SwaptionUpdateReq = {
            mark_at_price: parseFloat(targetData['MarkAtPrice']) || null,
            curve_shift: parseFloat(targetData['YieldShift']) || null,
            nvol_shift: parseFloat(targetData['NVolShift']) || null, 
            mark_at_nvol: parseFloat(targetData['MarkAtNVol']) || null,
            input_correlation: parseFloat(targetData['InputCorrelation']) || null,
            name: targetData['SecurityName'],
            sid: targetData['SID'],
            assetClass: 'swaptions',
            securityType: 'Swaption'
        };

        return updatePayload;
    }

}
