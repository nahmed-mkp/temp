import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColDef, CellMouseOverEvent } from 'ag-grid-community';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { EquitiesColumnRangeCellViewerComponent } from '../equities-column-range-cell-viewer/equities-column-range-cell-viewer.component';
import { MacroPackageTimeseriesDialogLayoutComponent } from '../../containers/macro-package-timeseries-dialog-layout/macro-package-timeseries-dialog-layout.component';
import { MacroPackageTimeseriesPreviewTooltipComponent } from '../macro-package-timeseries-preview-tooltip/macro-package-timeseries-preview-tooltip.component';
import { MacroPackageDataTooltipComponent } from '../macro-package-data-tooltip/macro-package-data-tooltip.component';


@Component({
    selector: 'app-equities-analytics',
    templateUrl: './equities-analytics.component.html',
    styleUrls: ['./equities-analytics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquitiesAnalyticsComponent implements OnInit, OnChanges {

    @Input() analytics: any[];
    @Input() loading: boolean;
    @Input() loaded: boolean;
    @Input() error: string;
    @Input() selectedColumnSet: string;
    @Output() viewTimeSeries = new EventEmitter<string>();
    @Output() viewTimeSeriesSector = new EventEmitter<{index: string; sector: string}>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private columnDefs: ColDef[];
    private dialogRef: MatDialogRef<MacroPackageTimeseriesPreviewTooltipComponent>;
    private dialogRefDataSummary: MatDialogRef<MacroPackageDataTooltipComponent>;
    private currentHover: string;


    public extraOption = { autoSizeColumns: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
            },
            valueFormatter: params => {
                if (typeof params.value === 'number') {
                    return params.value.toLocaleString(undefined, {maximumFractionDigits: 2});
                }
            }
        },

        columnDefs: [],
        floatingFilter: true,
        sideBar: true,

        autoGroupColumnDef: {
            pinned: 'left'
        },

        getContextMenuItems: (params) => {
            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator'];
        },

        onCellDoubleClicked: params => {
            const columnBeingClicked = params.colDef.headerName;
            console.log('params', params, columnBeingClicked);
            let data;
            if (columnBeingClicked.includes('High') || columnBeingClicked.includes('Low') || columnBeingClicked.includes('Range')
                || columnBeingClicked.includes('Ticker') || columnBeingClicked.includes('Type') || columnBeingClicked.includes('Utilities')
                || columnBeingClicked.includes('Date') || columnBeingClicked.includes('Description') || columnBeingClicked.includes('Attribute')
                || columnBeingClicked.includes('Spot') ) {
                data =  {
                    type: 'equity',
                    mode: params.data['Type'] === 'Vol' ? 'vols' : 'fundamentals',
                    displayPropety: params.data['Attribute'],
                    targetAssetClass: params.data['Ticker'],
                };
                this.viewTimeSeries.emit(params.data['Ticker']);
            } else {
                data = {
                    type: 'equity',
                    displayPropety: params.data['Attribute'],
                    targetAssetClass: params.data['Ticker'],
                    sector: columnBeingClicked
                }
                this.viewTimeSeriesSector.emit({
                    index: params.node.data['Ticker'],
                    sector: columnBeingClicked
                });
            }
            this.dialog.closeAll();
            this.dialog.open(MacroPackageTimeseriesDialogLayoutComponent, {
                hasBackdrop: false,
                panelClass: 'event-analysis-pop-up-panel',
                width: '70rem',
                height: '40rem',
                data: data
            });
        },
        onCellMouseOver: this.debounce(this.openToolTip.bind(this), 500),
        onGridColumnsChanged: params => {
            params.columnApi.autoSizeAllColumns();
        },
        suppressColumnVirtualisation: true,

        frameworkComponents: {
            EquitiesColumnRangeCellViewerComponent: EquitiesColumnRangeCellViewerComponent,
        },
        onFirstDataRendered: params => params.api.expandAll(),
        rowBuffer: 200
    };

    constructor(private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.analytics && changes.analytics.currentValue && changes.analytics.currentValue.length > 0 && this.gridApi) {
            this.createDynamicColumns(changes.analytics.currentValue);
        }

        if (changes.selectedColumnSet && changes.selectedColumnSet.currentValue && this.gridApi) {
            this.updateColumnDefs(changes.selectedColumnSet.currentValue);
            this.gridApi.expandAll();
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        if (this.analytics && this.analytics.length > 0) {
            this.createDynamicColumns(this.analytics);
        }
    }

    createDynamicColumns(analytics: any) {
        const columnNames = Object.keys(analytics[0])
                            .filter(name => name !== 'Date' && name !== 'Description'  && name !== 'Attribute'  && name !== 'Spot' && name !== '1WkChange');

        const staticColumnDefs: ColDef[] = [
            // {headerName: 'Date', field: 'Date', pinned: 'left', filter: 'agTextColumnFilter'},
            {headerName: 'Description', field: 'Description', pinned: 'left', filter: 'agTextColumnFilter', rowGroup: true, hide: true},
            {headerName: 'Attribute', field: 'Attribute', pinned: 'left', filter: 'agTextColumnFilter', cellRenderer: params => {
                if (params.node.group === false) {
                    return `<strong style="color: #00aaf0d1" class="icon-cell">
                                <i class="material-icons">timeline</i>
                                &nbsp;${params.value}
                            </strong>`;
                }
            }},
            {headerName: 'Spot', field: 'Spot', pinned: 'left', filter: 'agTextColumnFilter'},
            {headerName: '1WkChange', field: '1WkChange', pinned: 'left', filter: 'agTextColumnFilter', cellClass: this.cellClassGenerator}
        ];

        const dynamicColumnDefs = [];
        columnNames.forEach(name => {
            dynamicColumnDefs.push({
                headerName: name,
                field: name,
                hide: name.includes('Percentile'),
                filter: 'agTextColumnFilter',
                rowGroup: name === 'Type' ? true : false,
                pinned: name.includes('Chg'),
                cellClass: name.includes('Chg') && this.cellClassGenerator,
                valueFormatter: params => {
                    if (typeof params.value === 'number') {
                        return params.value.toLocaleString(undefined, {maximumFractionDigits: 2});
                    }
                }
            });
            if (name.includes('Low')) {
                const valueLocator = name.split('Low')[0];
                const minValueLocator = valueLocator + 'PercentileMin1M';
                const maxValueLocator = valueLocator + 'PercentileMax1M';
                const spotValueLocator = valueLocator + 'Percentile';
                const weekValueLocator = valueLocator + 'Percentile1W';

                dynamicColumnDefs.push({
                    headerName: valueLocator + ' Range',
                    cellRenderer: 'EquitiesColumnRangeCellViewerComponent',
                    cellRendererParams: { valueLocator },
                    cellClass: ['left-border', 'right-border'],
                    minWidth: 230,
                    // tooltip: params => {
                    //     if (params.node.group === false) {
                    //         return `
                    //             Min: ${params.data[minValueLocator].toFixed(2)}   Max: ${params.data[maxValueLocator].toFixed(2)}   Week: ${params.data[weekValueLocator].toFixed(2)}   Spot: ${params.data[spotValueLocator].toFixed(2)}
                    //         `;
                    //     }
                    // },
                    suppressFilter: true,
                    valueGetter: params => params.data && (params.data['Ticker'] + params.data['Type'] + params.data['Attribute'] + valueLocator)
                });
            }
        });


        this.columnDefs = staticColumnDefs.concat(dynamicColumnDefs);

        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(this.columnDefs);
    }

    updateColumnDefs(selectedColumnSet) {
        this.gridApi.setColumnDefs([]);
        if (selectedColumnSet === 'all') {
            this.gridApi.setColumnDefs(this.columnDefs);
        } else {
            const displayColumns = this.columnDefs.filter(column => {
                if (column.headerName.includes('High') || column.headerName.includes('Low')
                    || column.headerName.includes('Percentile') || column.headerName.includes('Range')
                    || column.headerName.includes('1Wk%Chg')) {
                    if (column.headerName.includes(selectedColumnSet)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            });
            this.gridApi.setColumnDefs(displayColumns);
        }
    }

    openTimeseriesPreviewTooltip(params) {
        this.dialogRef = this.dialog.open(MacroPackageTimeseriesPreviewTooltipComponent, {
            hasBackdrop: false,
            panelClass: ['event-analysis-pop-up-panel', 'round-border-radius'],
            width: '22rem',
            height: '17rem',
            position: {
                left: params.event.x.toString() + 'px',
                top: params.event.y.toString() + 'px'
            },
            data: {
                type: 'equity',
                ticker: params.data['Ticker'],
                target: params.data['Attribute'],
                mode: params.data['Type'] === 'Vol' ? 'vols' : 'fundamentals',
            }
        });
    }

    openDataSummaryToolTip(params) {
        this.dialogRefDataSummary = this.dialog.open(MacroPackageDataTooltipComponent, {
            hasBackdrop: false,
            panelClass: ['event-analysis-pop-up-panel', 'round-border-radius'],
            width: '12rem',
            height: '7rem',
            position: {
                left: params.event.x.toString() + 'px',
                top: params.event.y.toString() + 'px'
            },
            data: {
                nodeData: params.node.data,
                targetKey: params.colDef.headerName.split(' ')[0],
            }
        });
    }

    openToolTip(params: CellMouseOverEvent) {
        if (params.value === this.currentHover) {
            return;
        } else {
            this.currentHover = params.value;
        }
        if (this.dialogRef || this.dialogRefDataSummary) {
            this.dialog.closeAll();
            // this.dialogRef.close();
        }
        // if (this.dialogRefDataSummary) {
        //     this.dialogRefDataSummary.close();
        // }

        if (params.node.group === true) {
            return ;
        }
        // if (params.colDef.headerName !== 'Attribute' && !params.colDef.headerName.includes('Range')) {
        //     return ;
        // }
        if (params.colDef.headerName === 'Attribute') {
            this.openTimeseriesPreviewTooltip(params);
        } else if (params.colDef.headerName.includes('Range')) {
            this.openDataSummaryToolTip(params);
        }
    }

    onMouseLeave() {
        if (this.dialog) {
            this.dialog.closeAll();
        }
    }

    private debounce(func, timeLimit) {
        let timer;
        return function() {
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(null, args);
            }, timeLimit);
        };
    }

    private cellClassGenerator(params) {
        if (params.value < 0 ) {
            // return {color: 'red', 'font-weight': 'bolder', 'justify-content': 'flex-end'};
            return ['font-red'];
        } else if (params.value > 0) {
            // return {color: '#00d300', 'font-weight': 'bolder', 'justify-content': 'flex-end'};
            return ['font-green'];
        } else {
           //  return {'justify-content': 'flex-end'};
        }
    }
}
