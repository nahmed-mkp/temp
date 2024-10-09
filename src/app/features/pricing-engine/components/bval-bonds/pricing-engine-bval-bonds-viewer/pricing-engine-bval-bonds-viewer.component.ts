import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CellValueChangedEvent, GridApi, GridOptions, RowNode } from 'ag-grid-community';
import moment from 'moment';
import { SecurityEditorGeneralDialogComponent } from 'src/app/features/security-editor/containers';
import { UtilityService } from 'src/app/services';
import { PricingEngineUtilityService } from '../../../services';

import * as fromModels from '../../../models';
import { PricingEngineBVALRendererComponent } from '../renderers/pricing-engine-bval-score-renderer.component';

@Component({
    selector: 'app-pricing-engine-bval-bonds-viewer',
    templateUrl: './pricing-engine-bval-bonds-viewer.component.html',
    styleUrls: ['./pricing-engine-bval-bonds-viewer.component.scss']
})
export class PricingEngineBVALBondsViewerComponent implements OnInit, OnChanges {

    @Input() data: fromModels.IBVALBondPriceRes[];
    @Input() asOfDate: string;
    @Input() loading: boolean;
    
    @Output() onRowSelected = new EventEmitter<number>();

    private gridApi: GridApi;
    public extraOption = {
        sizeColumnsToFit: true
    };

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 150,
            // cellStyle: params => this.pricingEngineUtilityService.generateStyles(params),
            valueFormatter: params => {
                if (!params.colDef.field.toLocaleLowerCase().includes('id') && !isNaN(params.value)) {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4)(params);
                }
            }
        },
        columnDefs: [
            {
                headerName: 'Date', 
                field: 'AsOfDate', 
                filter: 'agSetColumnFilter', 
                width: 80, 
                pinned: 'left',                
                cellStyle: (params) => {
                    if (params.data['BVAL_MID_SCORE'] === undefined || params.data['BVAL_MID_SCORE'] === null)
                        return { color: '#d8d8d8', fontStyle: 'italic'};

                    if (params.data['BVAL_MID_SCORE'] < 7) { 
                        return { color: 'red' }
                    }
                }
            },
            {
                headerName: 'BVAL Snapshot', 
                field: 'BvalSnapshot', 
                filter: 'agSetColumnFilter', 
                width: 80, 
                pinned: 'left',                
                cellStyle: (params) => {
                    if (params.data['BVAL_MID_SCORE'] === undefined || params.data['BVAL_MID_SCORE'] === null)
                        return { color: '#d8d8d8', fontStyle: 'italic'};

                    if (params.data['BVAL_MID_SCORE'] < 7) { 
                        return { color: 'red' }
                    }
                }
            },
            {
                headerName: 'Timezone', 
                field: 'SnapshotTimezone', 
                filter: 'agSetColumnFilter', 
                width: 120,
                pinned: 'left',                
                cellStyle: (params) => {
                    if (params.data['BVAL_MID_SCORE'] === undefined || params.data['BVAL_MID_SCORE'] === null)
                        return { color: '#c9c9c9', fontStyle: 'italic'};

                    if (params.data['BVAL_MID_SCORE'] < 7) { 
                        return { color: 'red' }
                    }
                }
            },
            {
                headerName: 'Sec. Type', 
                field: 'SecurityType', 
                filter: 'agSetColumnFilter', 
                width: 80, 
                pinned: 'left',                
                cellStyle: (params) => {
                    if (params.data['BVAL_MID_SCORE'] === undefined || params.data['BVAL_MID_SCORE'] === null)
                        return { color: '#c9c9c9', fontStyle: 'italic'};

                    if (params.data['BVAL_MID_SCORE'] < 7) { 
                        return { color: 'red' }
                    }
                }
            },
            {
                headerName: 'SecurityName', 
                field: 'Name', 
                filter: 'agSetColumnFilter', 
                width: 220, 
                pinned: 'left',                
                cellStyle: (params) => {
                    if (params.data['BVAL_MID_SCORE'] === undefined || params.data['BVAL_MID_SCORE'] === null)
                        return { color: '#c9c9c9', fontStyle: 'italic'};

                    if (params.data['BVAL_MID_SCORE'] < 7) { 
                        return { color: 'red' }
                    }
                },
                cellRenderer:(params) => this.pricingEngineUtilityService.pricedByPrizmCellRenderer(params)
            },
            {
                headerName: 'BB GlobalID', 
                field: 'Identifier', 
                filter: 'agSetColumnFilter', 
                width: 120,                
                cellStyle: (params) => {
                    if (params.data['BVAL_MID_SCORE'] === undefined || params.data['BVAL_MID_SCORE'] === null)
                        return { color: '#c9c9c9', fontStyle: 'italic'};

                    if (params.data['BVAL_MID_SCORE'] < 7) { 
                        return { color: 'red' }
                    }
                }
            },
            {
                headerName: 'Market Sector', 
                field: 'MarketSector', 
                filter: 'agSetColumnFilter', 
                width: 100,                
                cellStyle: (params) => {
                    if (params.data['BVAL_MID_SCORE'] === undefined || params.data['BVAL_MID_SCORE'] === null)
                        return { color: '#c9c9c9', fontStyle: 'italic'};

                    if (params.data['BVAL_MID_SCORE'] < 7) { 
                        return { color: 'red' }
                    }
                }
            },
            {
                headerName: 'Ask Price', 
                headerTooltip: `
                Calculated ask price based on Bloomberg\'s proprietary algorithms, calculated at the time of the BVAL Snapshot (DY801, BVAL_SNAPSHOT), <br />
                and based on specific criteria such as settlement date and expected call date.<br /><br />

                The number above the price represents the BVAL Score for the ask price from the latest BVAL snapshot. The BVAL Score is a measure <br />
                that conveys on a scale of 1 to 10 (10 being the highest) the relative quantity and strength of the market input data used to <br />
                generate the BVAL price. 
                `,
                field: 'BVAL_ASK_PRICE', 
                filter: 'agNumberColumnFilter',
                width: 100,
                cellRenderer: 'PricingEngineBVALRendererComponent',
                cellStyle: { 'justify-content': 'end' },
                cellRendererParams: (params) => {
                    return {                    
                        value: params.node.data['BVAL_ASK_PRICE'],
                        score: params.node.data['BVAL_ASK_SCORE']
                    };
                }
            },
            {
                headerName: 'Bid Price', 
                headerTooltip: `
                Calculated bid price based on Bloomberg\'s proprietary algorithms, calculated at the time of the BVAL Snapshot (DY801, BVAL_SNAPSHOT), <br />
                and based on specific criteria such as settlement date and expected call date.<br /><br />

                The number above the price represents the BVAL Score for the bid price from the latest BVAL snapshot. The BVAL Score is a measure <br />
                that conveys on a scale of 1 to 10 (10 being the highest) the relative quantity and strength of the market input data used to <br />
                generate the BVAL price. 
                `,
                field: 'BVAL_BID_PRICE', 
                filter: 'agNumberColumnFilter',
                width: 100,
                cellRenderer: 'PricingEngineBVALRendererComponent',
                cellStyle: { 'justify-content': 'end' },
                cellRendererParams: (params) => {
                    return {                    
                        value: params.node.data['BVAL_BID_PRICE'],
                        score: params.node.data['BVAL_BID_SCORE']
                    };
                }
            },
            {
                headerName: 'Mid Price', 
                headerTooltip: `
                Calculated mid price based on Bloomberg\'s proprietary algorithms, calculated at the time of the BVAL Snapshot (DY801, BVAL_SNAPSHOT), <br />
                and based on specific criteria such as settlement date and expected call date.<br /><br />

                The number above the price represents the BVAL Score for the mid price from the latest BVAL snapshot. The BVAL Score is a measure <br />
                that conveys on a scale of 1 to 10 (10 being the highest) the relative quantity and strength of the market input data used to <br />
                generate the BVAL price. 
                `,
                field: 'BVAL_MID_PRICE', 
                filter: 'agNumberColumnFilter',
                width: 100,
                cellRenderer: 'PricingEngineBVALRendererComponent',
                cellStyle: { 'justify-content': 'end' },
                cellRendererParams: (params) => {
                    return {                    
                        value: params.node.data['BVAL_MID_PRICE'],
                        score: params.node.data['BVAL_MID_SCORE']
                    };
                }
            },
            {
                headerName: 'Ask Yield', 
                headerTooltip: `
                Calculated ask yield based on Bloomberg\'s proprietary algorithms, calculated at the time of the BVAL Snapshot (DY801, BVAL_SNAPSHOT), <br />
                and based on specific criteria such as settlement date and expected call date.<br /><br />

                The number above the price represents the BVAL Score for the ask yield from the latest BVAL snapshot. The BVAL Score is a measure <br />
                that conveys on a scale of 1 to 10 (10 being the highest) the relative quantity and strength of the market input data used to <br />
                generate the BVAL price. 
                `,
                field: 'BVAL_ASK_YIELD', 
                filter: 'agNumberColumnFilter',
                width: 100,
                cellRenderer: 'PricingEngineBVALRendererComponent',
                cellStyle: { 'justify-content': 'end' },
                cellRendererParams: (params) => {
                    return {                    
                        value: params.node.data['BVAL_ASK_YIELD'],
                        score: params.node.data['BVAL_ASK_SCORE']
                    };
                }
            },
            {
                headerName: 'Bid Yield', 
                headerTooltip: `
                Calculated bid yield based on Bloomberg\'s proprietary algorithms, calculated at the time of the BVAL Snapshot (DY801, BVAL_SNAPSHOT), <br />
                and based on specific criteria such as settlement date and expected call date.<br /><br />

                The number above the price represents the BVAL Score for the bid yield from the latest BVAL snapshot. The BVAL Score is a measure <br />
                that conveys on a scale of 1 to 10 (10 being the highest) the relative quantity and strength of the market input data used to <br />
                generate the BVAL price. 
                `,
                field: 'BVAL_BID_YIELD', 
                filter: 'agNumberColumnFilter',
                width: 100,
                cellRenderer: 'PricingEngineBVALRendererComponent',
                cellStyle: { 'justify-content': 'end' },
                cellRendererParams: (params) => {
                    return {                    
                        value: params.node.data['BVAL_BID_YIELD'],
                        score: params.node.data['BVAL_BID_SCORE']
                    };
                }
            },
            {
                headerName: 'Mid Yield', 
                headerTooltip: `
                Calculated mid yield based on Bloomberg\'s proprietary algorithms, calculated at the time of the BVAL Snapshot (DY801, BVAL_SNAPSHOT), <br />
                and based on specific criteria such as settlement date and expected call date.<br /><br />

                The number above the price represents the BVAL Score for the mid yield from the latest BVAL snapshot. The BVAL Score is a measure <br />
                that conveys on a scale of 1 to 10 (10 being the highest) the relative quantity and strength of the market input data used to <br />
                generate the BVAL price. 
                `,
                field: 'BVAL_MID_YIELD', 
                filter: 'agNumberColumnFilter',
                width: 100,
                cellRenderer: 'PricingEngineBVALRendererComponent',
                cellStyle: { 'justify-content': 'end' },
                cellRendererParams: (params) => {                    
                    return {                    
                        value: params.node.data['BVAL_MID_YIELD'],
                        score: params.node.data['BVAL_MID_SCORE']
                    };
                }
            },
            {
                headerName: 'BVAL Mid Score', 
                headerTooltip: ` 
                The number above the price represents the BVAL Score for the mid price from the latest BVAL snapshot. The BVAL Score is a measure <br />
                that conveys on a scale of 1 to 10 (10 being the highest) the relative quantity and strength of the market input data used to <br />
                generate the BVAL price.                
                `,
                field: 'BVAL_MID_SCORE', 
                filter: 'agNumberColumnFilter',
                width: 100,         
                cellStyle: (params) => {
                    let result = {
                        'justify-content': 'end'
                    };
                    if (params.data['BVAL_MID_SCORE'] < 7) { 
                        result = Object.assign({}, result, { color: 'red' });
                    }
                    return result
                }
            },
            {
                headerName: 'Bid/Ask Spread', 
                headerTooltip: `Bid/Ask Price Spread`,
                field: 'BVAL_MID_SCORE', 
                filter: 'agNumberColumnFilter',
                width: 100,  
                valueGetter: (params) => {
                    if (params.data['BVAL_ASK_PRICE'] && params.data['BVAL_BID_PRICE']) {
                        return params.data['BVAL_ASK_PRICE'] - params.data['BVAL_BID_PRICE'];
                    };
                },  
                valueFormatter: (params) => {
                    if (params.value) { 
                        return params.value.toFixed(4);
                    }
                },
                cellStyle: (params) => {
                    let result = {
                        'justify-content': 'end'
                    };
                    if (params.data['BVAL_MID_SCORE'] < 7) { 
                        result = Object.assign({}, result, { color: 'red' });
                    }
                    return result
                }
            },
            {
                headerName: 'Liquidity Score', 
                headerTooltip: `
                Measured on a scale of 1 to 100 (100 being the most liquid) that summarizes the <br />
                relative liquidity of an instrument in the covered universe.  Liquidity in this <br />
                sense is the ability to sell a security at the lowest cost for a comparable <br />
                range of volumes. <br /><br />

                This field is available as a premium product via Excel API and the Bloomberg BLPAPI. <br />
                For more information about accessing LQA analytics, please contact your <br />
                Bloomberg sales representative.
                `,
                field: 'LQA_LIQUIDITY_SCORE', 
                filter: 'agNumberColumnFilter',
                width: 100,         
                cellStyle: (params) => {
                    let result = { 'background-color': '#fcfbc7', 'justify-content': 'end' };
                    if (params.data['BVAL_MID_SCORE'] < 7) { 
                        result = Object.assign({}, result, { color: 'red' });
                    }
                    return result
                }
            },
            {
                headerName: 'SortOrder', 
                field: 'SortOrder', 
                width: 50, 
                sort: 'desc',                
                hide: true,
                pinned: 'right'
            },
            {
                headerName: 'SID', 
                field: 'SID', 
                width: 50, 
                hide: true,
                pinned: 'right'
            }
        ],
        rowSelection: 'single',
        deltaRowDataMode: true,
        getRowNodeId: data => {
            return data['SID'].toString() + ' ' + data['BvalSnapshot'];
        },        
        frameworkComponents: {
            'PricingEngineBVALRendererComponent': PricingEngineBVALRendererComponent
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
                    colId: 'SortOrder',
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
    
}
