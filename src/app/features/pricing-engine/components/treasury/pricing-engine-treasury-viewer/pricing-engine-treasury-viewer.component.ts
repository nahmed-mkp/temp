import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { CellClassParams, CellValueChangedEvent, ColumnApi, GridApi, GridOptions, RowNode } from 'ag-grid-community';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import moment from 'moment';
import * as fromModels from 'src/app/features/pricing-engine/models';

import { UtilityService } from 'src/app/services';
import { SecurityEditorGeneralDialogComponent } from 'src/app/features/security-editor/containers';
import { PricingEngineUtilityService } from '../../../services';
import { PricingEngineBVALAutocompleteCellRendererComponent } from '../renderers/autocomplete-dropdown/autocomplete-dropdown.component';

@Component({
    selector: 'app-pricing-engine-treasury-viewer',
    templateUrl: './pricing-engine-treasury-viewer.component.html',
    styleUrls: ['./pricing-engine-treasury-viewer.component.scss']
})
export class PricingEngineTreasuryViewerComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() asOfDate: Date;
    @Input() loading: boolean;
    @Input() mode: 'live' | 'close';

    @Output() onRowSelected = new EventEmitter<number>();
    @Output() onTreasuryUpdate = new EventEmitter<{payload: fromModels.TreasuryUpdateReq, field: string}>();

    @Output() onBVALProxySelected = new EventEmitter<fromModels.IBVALProxyReq>();
    @Output() onEditing = new EventEmitter<boolean>();

    private gridApi: GridApi;
    public extraOption = {};

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 150,
            cellStyle: (params: CellClassParams) => this.pricingEngineUtilityService.generateStyles(params),
            valueFormatter: params => {
                if (!params.colDef.field.toLocaleLowerCase().includes('id') && !isNaN(params.value)) {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4)(params);
                }
            }
        },
        columnDefs: [
            { headerName: 'Security Type', field: 'SecurityType', pinned: 'left', width: 80, filter: 'agSetColumnFilter'},
            { headerName: 'Name', field: 'SecurityName', filter: 'agSetColumnFilter', pinned: 'left', width: 200, cellRenderer: params => this.pricingEngineUtilityService.pricedByPrizmCellRenderer(params)},
            { 
                headerName: 'PriceTicks',
                field: 'PriceTicks',
                width: 80,
                cellStyle: params => {
                  return {...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'end'};
                }
            },
            { headerName: 'Input Price',
                field: 'InputPrice',
                editable: true,
                width: 80,
                cellClass: 'column-highlight-yellow',
                cellStyle: params => {
                    return {...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'end'};
                }
            },
            {
                headerName: 'Δ',
                field: 'DeltaPriceTicks',
                width: 60,
                filter: 'agNumberColumnFilter',
                cellStyle: params => {
                    const value = params.data['DeltaPriceTicks'];
                    if (value) {
                        const lower = value.startsWith('(');
                        if (lower) {
                            return { 'justify-content': 'end', 'border-left': '0.2px dotted #d7d7d7;', 'color': '#e81540' };
                        } else if (value !== '0-0') {
                            return { 'justify-content': 'end', 'border-left': '0.2px dotted #d7d7d7;', 'color': '#3ab528' };
                        }
                    }
                    return { 'justify-content': 'end', 'border-left': '0.2px dotted #d7d7d7;' };
                }
            },
            {
                headerName: 'Yield',
                field: 'Yield',
                filter: 'agNumberColumnFilter',
                width: 60,
            },
            {
                headerName: 'Input Yld',
                field: 'InputYield',
                filter: 'agNumberColumnFilter',
                editable: true,
                cellClass: 'column-highlight-yellow',
                width: 70,
            },
            {
                headerName: 'Prev Yld',
                field: 'LastCloseYield',
                filter: 'agNumberColumnFilter',
                width: 70,
            },
            {
                headerName: 'Yld Δ',
                field: 'YieldDelta',
                filter: 'agNumberColumnFilter',
                width: 60,
                valueGetter: params => {
                    if (params.data['LastCloseYield']) {
                        return parseFloat(params.data['Yield']) - parseFloat(params.data['LastCloseYield']);
                    } else {
                        return null;
                    }
                }
            },
            {
                headerName: 'BVAL Proxy',
                field: 'BVALProxySecurityName',
                filter: 'agSetColumnFilter',
                editable: true,
                cellClass: 'column-highlight-yellow',
                width: 180,
                cellRenderer: 'PricingEngineBVALAutocompleteCellRendererComponent', 
                cellStyle: null,
                cellRendererParams: params => {
                    return {
                        name: params.data['BVALProxySecurityName'],
                        field: 'BVALProxySecurityName',
                        onSecuritySelected: this.selectBVALProxy,
                        onSecurityCleared: this.clearBVALProxy,
                        cellParams: params,
                        onFocus: params => {
                            this.onEditing.emit(true);
                        },
                        onBlur: params => {
                            this.onEditing.emit(false);
                        },
                        onInputChange: params => {
                            this.onEditing.emit(false);
                        },
                        cellClass: 'yellow-cell',
                    }
                }
            },
            {
                headerName: 'BVAL Proxy Price',
                field: 'BVALProxyPrice',
                filter: 'agNumberColumnFilter',
                editable: true,
                width: 100,
            },
            {
                headerName: 'BVAL Proxy Yield',
                field: 'BVALProxyYield',
                filter: 'agNumberColumnFilter',
                editable: true,
                width: 100,
            },
            {
                headerName: 'Input Spread',
                field: 'InputSpread',
                filter: 'agNumberColumnFilter',
                editable: true,
                cellClass: 'column-highlight-yellow',
                width: 100,
            },
            {
                headerName: 'DiscountMargin',
                field: 'DiscountMargin',
                editable: true,
                width: 80,
                cellClass: 'column-highlight-yellow'
            },
            {
                headerName: 'Auction Date',
                field: 'AuctionDate',
                filter: 'agDateColumnFilter',
                editable: true,
                width: 100,
                cellClass: 'column-highlight-yellow',
                valueFormatter: params => {
                    if (params.data['AuctionDate']) { 
                        return moment(params.data['AuctionDate']).format('MM/DD/YYYY');
                    }                    
                },
            },
            {
                headerName: 'IssueDate',
                field: 'IssueDate',
                width: 80,
                filter: 'agDateColumnFilter',
                valueFormatter: params => {
                    return moment(params.data['IssueDate']).format('MM/DD/YYYY');
                },
            },
            {
                headerName: 'MaturityDate',
                field: 'MaturityDate',
                filter: 'agDateColumnFilter',
                width: 90,
                valueFormatter: params => {
                    return moment(params.data['MaturityDate']).format('MM/DD/YYYY');
                },

            },
            {
                headerName: 'FirstCouponDate',
                field: 'FirstCouponDate',
                width: 80,
                valueFormatter: params => {
                    return moment(params.data['FirstCouponDate']).format('MM/DD/YYYY');
                },
            },
            {
                headerName: 'CPI Ratio',
                field: 'CPI Ratio',
                filter: 'agNumberColumnFilter',
                width: 100,
            },
            {
                headerName: 'CPI Ratio Last',
                field: 'CPI Ratio Last',
                filter: 'agNumberColumnFilter',
                width: 100,
            },
            {
                headerName: 'TotalPositionAbs (k)',
                field: 'Notional',
                filter: 'agNumberColumnFilter',
                valueGetter: params => {
                    const targetValue = params.data['Notional'];
                    if (targetValue === 0) {
                        return '';
                    } else if (targetValue !== null && targetValue !== undefined && targetValue !== '') {
                        return (targetValue / 1000).toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
                    }
                    return '';
                },
                cellStyle: params => {
                    return { 'justify-content': 'end', 'border-left': '0.2px dotted #d7d7d7;' };
                },
                width: 100,
            },
            {
                headerName: 'Duration',
                field: 'Duration',
                filter: 'agNumberColumnFilter',
                width: 60,
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
                }
            },
            {
                headerName: 'AdjustedDuration',
                field: 'AdjustedDuration',
                filter: 'agNumberColumnFilter',
                width: 60,
                cellStyle: { 'justify-content': 'end', 'border-left': '0.2px dotted #d7d7d7;' },
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
                }
            },
            {
                headerName: 'Convexity',
                field: 'Convexity',
                filter: 'agNumberColumnFilter',
                width: 60,
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
                }
            },
            {
                headerName: '3M PDur', field: 'KrDur3M',
                filter: 'agNumberColumnFilter',
                width: 60,
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
                }
            },
            {
                headerName: '6M PDur', field: 'KrDur6M',
                filter: 'agNumberColumnFilter',
                width: 60,

                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
                }
            },
            {
                headerName: '1Y PDur', field: 'KrDur1Y',
                filter: 'agNumberColumnFilter',
                width: 60,
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
                }
            },
            {
                headerName: '2Y PDur', field: 'KrDur2Y',
                filter: 'agNumberColumnFilter',
                width: 60,
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
                }
            },
            {
                headerName: '3Y PDur', field: 'KrDur3Y',
                filter: 'agNumberColumnFilter',
                width: 60,

                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
                }
            },
            {
                headerName: '5Y PDur', field: 'KrDur5Y',
                filter: 'agNumberColumnFilter',
                width: 60,
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
                }
            },
            {
                headerName: '10Y PDur', field: 'KrDur10Y',
                filter: 'agNumberColumnFilter',
                width: 60,
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
                }
            },
            {
                headerName: '20Y PDur', field: 'KrDur20Y',
                filter: 'agNumberColumnFilter',
                width: 60,
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
                }
            },
            {
                headerName: '30Y PDur', field: 'KrDur30Y',
                filter: 'agNumberColumnFilter',
                width: 60,
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
                }
            },
            {
                headerName: 'Price',
                field: 'Price',
                filter: 'agNumberColumnFilter',
                width: 70,
            },
            {
                headerName: 'AccruedPrice',
                field: 'AccruedPrice',
                filter: 'agNumberColumnFilter',
                width: 70,
            },
            {headerName: 'OTRType', field: 'OtrType', width: 100, filter: 'agSetColumnFilter'},
            {
                headerName: 'Last Update',
                field: 'LastUpdated', 
                width: 80,
                cellStyle: params => {
                    return {  ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'end'};
                },
                pinned: 'right',
                valueFormatter: params => {
                    return moment(params.data['LastUpdated'].replace(' ', 'T')).format('h:mm A');
                }
            },
            {headerName: 'Price Source', field: 'PriceSource', width: 80},
            {headerName: 'SecTypePlusCurrency', field: 'SecurityTypePlusCurrency', width: 80, filter: 'agSetColumnFilter'},
            { headerName: 'InPosition', field: 'InPosition', sort: 'desc', hide: true},
            { headerName: 'PricedByPrizm', field: 'PricedByPrizm', filter: 'agSetColumnFilter', hide: true },
        ],

        rowSelection: 'single',
        deltaRowDataMode: true,
        getRowNodeId: data => data['SID'],


        // Event --------------------------------------------------------
        onRowSelected: params => {
            if (params.node.isSelected()) {
                this.onRowSelected.emit(params.data['SID']);
            }
        },

        onCellValueChanged: params => {
            const colField = params.colDef.field;
            const fieldMap = this.fieldMap(colField)
            if (colField === "InputPrice" || colField === "InputYield" || colField == "InputSpread") {
                const payload = this._getUpdatePayload(params);
                payload['carryField'] = colField;
                this.onTreasuryUpdate.emit({payload: payload, field: fieldMap});
            }
        },

        frameworkComponents: {
            'PricingEngineBVALAutocompleteCellRendererComponent': PricingEngineBVALAutocompleteCellRendererComponent,
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
        this.selectBVALProxy = this.selectBVALProxy.bind(this);
        this.clearBVALProxy = this.clearBVALProxy.bind(this);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0) {
            if (this.gridApi) {
                const model = this.gridApi.getFilterModel();
                this.gridApi.setRowData([]);
                this.gridApi.setRowData(this.data);
                this.gridApi.setFilterModel(model);
            
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
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        if (this.data && this.data.length > 0) {
            const model = this.gridApi.getFilterModel();
            this.gridApi.setRowData(this.data);
            this.gridApi.setFilterModel(model);
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

    private _getUpdatePayload(params: CellValueChangedEvent): fromModels.TreasuryUpdateReq {
        const targetData = params.data;
        const colField = params.colDef.field;
        
        let input_price = parseFloat(targetData['InputPrice']) || null;
        let input_yield = parseFloat(targetData['InputYield']) || null;
        let input_spread = parseFloat(targetData['InputSpread']) || null;

        const updatePayload: fromModels.TreasuryUpdateReq = {
            as_of_date: moment(this.asOfDate).format('MM-DD-YYYY'),
            input_price: input_price,
            input_yield: input_yield,
            mark_at_spread: input_spread,
            name: targetData['SecurityName'],
            sid: targetData['SID'],
            assetClass: 'govt'
        };
        return updatePayload;
    }

    private selectBVALProxy(value: fromModels.IBVALSuggestion, params: any) {  
        params.node.setDataValue(params.colDef.field, value.name);
        const payload: fromModels.IBVALProxyReq = {
          asOfDate: moment(this.asOfDate).format("MM-DD-YYYY"),
          mode: this.mode.toLowerCase(),
          sid: params.node.data['SID'],
          bval_proxy_sid: value.sid
        }
        this.onBVALProxySelected.emit(payload);
    };

     private clearBVALProxy(params: any) {  
        params.node.setDataValue(params.colDef.field, null);
        params.node.setDataValue('BVALProxyPrice', null);
        params.node.setDataValue('BVALProxyYield', null);
        const payload: fromModels.IBVALProxyReq = {
          asOfDate: moment(this.asOfDate).format("MM-DD-YYYY"),
          mode: this.mode.toLowerCase(),
          sid: params.node.data['SID'],
          bval_proxy_sid: null
        }
        this.onBVALProxySelected.emit(payload);
    };

    fieldMap(field: string){
        switch(field){
            case 'InputPrice':
                return 'input_price';
            case 'InputYield':
                return 'input_yield';
            case 'InputSpread':
                return 'mark_at_spread';
            default:
                return field;
        }
    }


}
