import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColDef } from 'ag-grid-community';
import { EquitiesColumnRangeCellViewerComponent } from '../equities-column-range-cell-viewer/equities-column-range-cell-viewer.component';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MacroPackageTimeseriesDialogLayoutComponent } from '../../containers';
import { MacroPackageTimeseriesPreviewTooltipComponent } from '../macro-package-timeseries-preview-tooltip/macro-package-timeseries-preview-tooltip.component';

@Component({
    selector: 'app-commodities-analytics',
    templateUrl: './commodities-analytics.component.html',
    styleUrls: ['./commodities-analytics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommoditiesAnalyticsComponent implements OnInit, OnChanges {

    @Input() analytics: any[];
    @Input() loading: boolean;
    @Input() loaded: boolean;
    @Input() error: string;
    @Input() selectedColumnSet: string;
    @Output() viewTimeSeries = new EventEmitter<string>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private columnDefs: ColDef[];

    private dialogRef: MatDialogRef<MacroPackageTimeseriesPreviewTooltipComponent>;
    private currentHover: string;

    public extraOption = { autoSizeColumns: true };
    public customGridOption: GridOptions = {

        columnDefs: [],

        floatingFilter: true,
        sideBar: true,

        getContextMenuItems: (params) => {
            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport'];
        },

        frameworkComponents: {
            EquitiesColumnRangeCellViewerComponent: EquitiesColumnRangeCellViewerComponent
        },
        onGridColumnsChanged: params => {
            params.columnApi.autoSizeAllColumns();
        },
        onCellDoubleClicked: params => {
            this.viewTimeSeries.emit();
            this.dialog.open(MacroPackageTimeseriesDialogLayoutComponent, {
                hasBackdrop: false,
                panelClass: 'event-analysis-pop-up-panel',
                width: '70rem',
                height: '40rem',
                data: {
                    type: 'commodities',
                    displayPropety: params.data['Name']
                }
            });
        },
        onCellMouseOver: this.debounce(this.openTimeseriesPreviewTooltip.bind(this), 500),
        suppressColumnVirtualisation: true,
    };

    constructor(private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.analytics && changes.analytics.currentValue && this.gridApi) {
            this.createDynamicColumns(changes.analytics.currentValue);
        }

        if (changes.selectedColumnSet && changes.selectedColumnSet.currentValue && this.gridApi) {
            this.updateColumnDefs(changes.selectedColumnSet.currentValue);
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
        const columnNames = Object.keys(analytics[0]).filter(name => name !== 'Date' && name !== 'Name'  && name !== 'Close');

        const staticColumnDefs: ColDef[] = [
            // {headerName: 'Date', field: 'Date', pinned: 'left', filter: 'agTextColumnFilter'},
            {headerName: 'Name', field: 'Name', pinned: 'left', filter: 'agTextColumnFilter', cellRenderer: params => {
                if (params.node.group === false) {
                    return `<strong style="color: #00aaf0d1" class="icon-cell">
                                <i class="material-icons">timeline</i>
                                &nbsp;${params.value}
                            </strong>`;
                }
            }},
            {headerName: 'Close', field: 'Close', pinned: 'left', filter: 'agTextColumnFilter'},
        ];

        const dynamicColumnDefs: ColDef[] = [];
        columnNames.forEach(name => {
            dynamicColumnDefs.push({
                headerName: name,
                field: name,
                hide: name.includes('Percentile'),
                filter: 'agTextColumnFilter'
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
                    tooltip: params => {
                        return `
                            Min: ${params.data[minValueLocator].toFixed(2)}   Max: ${params.data[maxValueLocator].toFixed(2)}   Week: ${params.data[weekValueLocator].toFixed(2)}   Spot: ${params.data[spotValueLocator].toFixed(2)}
                        `;
                    },
                    suppressFilter: true
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
                    || column.headerName.includes('Percentile') || column.headerName.includes('Range')) {
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
        if (params.value === this.currentHover) {
            return;
        } else {
            this.currentHover = params.value;
        }
        if (this.dialogRef) {
            this.dialogRef.close();
        }
        if (params.node.group === true) {
            return ;
        }
        if (params.colDef.headerName !== 'Name') {
            return ;
        }
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
                type: 'commodities',
                target: params.data['Name']
            }
        });
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
}
