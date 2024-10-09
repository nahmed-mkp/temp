import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { GridApi, GridOptions, RowNode } from 'ag-grid-community';
import moment from 'moment';
import { SecurityEditorGeneralDialogComponent } from 'src/app/features/security-editor/containers';

import { UtilityService } from 'src/app/services';
import { PricingEngineUtilityService } from '../../../services';

@Component({
    selector: 'app-pricing-engine-equitites-viewer',
    templateUrl: './pricing-engine-equitites-viewer.component.html',
    styleUrls: ['./pricing-engine-equitites-viewer.component.scss']
})
export class PricingEngineEquititesViewerComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() loading: boolean;
    @Input() mode: 'live' | 'close';

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
            {headerName: 'Security Type', field: 'SecurityType', pinned: 'left', sortedAt: 1, width: 70, filter: 'agSetColumnFilter'},
            {headerName: 'Name', field: 'SecurityName', pinned: 'left', filter: 'agSetColumnFilter',  width: 250, cellRenderer: (params) => this.pricingEngineUtilityService.pricedByPrizmCellRenderer(params)},
            {headerName: 'CompanyName', field: 'CompanyName', pinned: 'left', width: 250,  filter: 'agSetColumnFilter'},
            {
                headerName: 'Price',
                field: 'Price',
                editable: false,
                pinned: 'left',
                filter: 'agNumberColumnFilter',
                width: 80,
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2)
            },
            {
                headerName: 'MarkAtPrice',
                field: 'MarkAtPrice',
                editable: true,
                cellClass: 'column-highlight-yellow',
                filter: 'agNumberColumnFilter',
                width: 80,
                pinned: 'left'
            },
            {
                headerName: 'LastClosePrice',
                field: 'LastClosePrice',
                filter: 'agNumberColumnFilter',
                width: 80,
                cellStyle: params => {
                  return {...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'end'};
              }
            },
            {
                headerName: 'Δ%',
                field: 'delta%',
                width: 60,
                filter: 'agNumberColumnFilter',
                cellStyle: params => {
                    if ((params.data['Price']) - parseFloat(params.data['LastClosePrice']) > 0) {
                        return { 
                                ...this.pricingEngineUtilityService.generateStyles(params), 
                                'color': '#3ab528', 
                                'justify-content': 'end', 
                              };
                    } else if ((params.data['Price']) - parseFloat(params.data['LastClosePrice']) < 0) {
                        return { 
                                ...this.pricingEngineUtilityService.generateStyles(params), 
                                'color': '#e81540', 
                                'justify-content': 'end',
                              };
                    }
                    return { 
                            ...this.pricingEngineUtilityService.generateStyles(params), 
                            'justify-content': 'end', 
                          };
                },
                valueGetter: params => {
                    return (parseFloat(params.data['Price']) - parseFloat(params.data['LastClosePrice'])) / parseFloat(params.data['LastClosePrice']) * 100;
                },
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(2)(params) + '%';
                }
            },
            {
                headerName: 'Δ',
                field: 'delta',
                width: 60,
                filter: 'agNumberColumnFilter',
                cellStyle: params => {
                    if ((params.data['Price']) - parseFloat(params.data['LastClosePrice']) > 0) {
                        return { 
                                ...this.pricingEngineUtilityService.generateStyles(params),
                                'color': '#3ab528', 
                                'justify-content': 'end', 
                              };
                    } else if ((params.data['Price']) - parseFloat(params.data['LastClosePrice']) < 0) {
                        return { 
                                ...this.pricingEngineUtilityService.generateStyles(params),
                                'color': '#e81540', 
                                'justify-content': 'end', 
                              };
                    }
                    return { 
                            'justify-content': 'end', 
                            'border-left': '0.2px dotted #d7d7d7;' 
                          };
                },
                valueGetter: params => {
                    return parseFloat(params.data['Price']) - parseFloat(params.data['LastClosePrice']);
                },
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(2)(params);
                }
            },
            {
                headerName: 'Last Update',
                field: 'LastUpdated',
                width: 80,
                pinned: 'right',
                cellStyle: params => {
                    return {  ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'end' };
                },
                valueFormatter: params => {
                    return moment(params.data['LastUpdated'].replace(' ', 'T')).format('h:mm A');
                }
            },
            {
                headerName: 'Benchmark Security',
                field: 'BenchmarkName',
                width: 200
            },
            {
                headerName: 'Benchmark Type',
                field: 'BenchmarkType',
                width: 150
            },
            {
                headerName: 'Ratio',
                field: 'Ratio',
                filter: 'agNumberColumnFilter',
                width: 100,
                cellStyle: params => {
                    return { ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'end' };
                },
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(5)(params);
                }
            },
            {
                headerName: 'Benchmark Price',
                field: 'BenchmarkLastClosePrice',
                filter: 'agNumberColumnFilter',
                width: 100,
                cellStyle: params => {
                    return {  ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'end' };
                },
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(5)(params);
                }
            },
            {
                headerName: 'Benchmark Last Price',
                field: 'BenchmarkPrice',
                filter: 'agNumberColumnFilter',
                width: 100,
                cellStyle: params => {
                    return {  ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'end' };
                },
                valueFormatter: params => {
                    return this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(5)(params);
                }
            },
            {
                headerName: 'Bloomberg Ticker',
                field: 'BBGTicker',
                width: 120,
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Bloomberg Field',
                field: 'MarketDataPriceBBGField',
                filter: 'agSetColumnFilter',
                width: 120,
            },
            { headerName: 'InPosition', field: 'InPosition', sort: 'desc', hide: true},
            { headerName: 'PricedByPrizm', field: 'PricedByPrizm', filter: 'agSetColumnFilter', hide: true},
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

        // UI ---------------------------------------------
        rowClass: 'medium-row',
        rowHeight: 22,
        groupHeaderHeight: 24,
        headerHeight: 24,
        floatingFiltersHeight: 28,
    }

    constructor(private utilityService: UtilityService,   private dialog: MatDialog, private pricingEngineUtilityService: PricingEngineUtilityService) { 
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
}
