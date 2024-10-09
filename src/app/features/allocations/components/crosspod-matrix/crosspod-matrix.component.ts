import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';
import { UtilityService } from 'src/app/services';
import { CrossPodMatrixCellRendererComponent } from '../renderer-components/crosspod-matrix-cell-renderer.component';

import * as fromModels from './../../models/capitals.models';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CapitalsCrosspodEditorDialogComponent, CapitalsFundEditorDialogComponent } from '../../containers';

@Component({
    selector: 'app-crosspod-matrix',
    templateUrl: './crosspod-matrix.component.html',
    styleUrls: ['./crosspod-matrix.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrossPodMatrixComponent implements OnInit, OnDestroy, OnChanges {

    @Input() asOfDate: string;
    @Input() mode: 'readonly' | 'editable' | 'diff';
    @Input() funds: string[];
    @Input() showPct: boolean;
    @Input() fundComplex: string;
    @Input() capitalMatrix: any[];
    @Input() originalCapitalMatrix: any[];
    @Input() guid: string;

    // @Output() capitalMatrixChanged: EventEmitter<fromModels.ICapitalMatrixChange> = new EventEmitter<fromModels.ICapitalMatrixChange>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private columnDefs: any[];
    private callBackInitialized = false;

    public customGridOption: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('CrossPodName') === false ?
                    { 'justify-content': 'flex-end' } : {};
            },
            sortable: false,
            suppressMenu: true
        },

        sideBar: false,
        suppressColumnVirtualisation: true,
        rowSelection: 'single',
        floatingFilter: false,
        stopEditingWhenGridLosesFocus: true,
        deltaRowDataMode: true,
        context: this,
        skipHeaderOnAutoSize: true,
        enableSorting: false,
        suppressHorizontalScroll: true,

        onCellValueChanged: this.onCellValueChanged,

        getRowNodeId: data => data.CrossPodName,

        statusBar: {
            statusPanels: [
                {
                    statusPanel: 'agAggregationComponent',
                    statusPanelParams: {
                        aggFuncs: ['sum']
                    }
                },
                {
                    statusPanel: 'AppGridCustomStatusBarCellValueComponent',
                    statusPanelParams: {
                        fractionDigits: this.getFractionDigits()
                    }
                },
            ],
        },

        frameworkComponents: {
            'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
            'CrossPodMatrixCellRendererComponent': CrossPodMatrixCellRendererComponent
        },
    };

    public extraOption = {
        sizeColumnsToFit: true
    };

    constructor(private utilities: UtilityService, private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() { }

    ngOnDestroy() { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.gridApi && changes.capitalMatrix && changes.capitalMatrix.currentValue) {
            if (this.gridApi) {
                this.columnDefs = this.getColumnDefs(this.capitalMatrix);
                this.gridApi.setColumnDefs(this.columnDefs);

                const data = [...changes.capitalMatrix.currentValue];
                this.gridApi.setRowData(data);
                this.gridApi.refreshCells();

                this.gridApi.sizeColumnsToFit();
            }
        }
    }

    getColumnDefs(capitalMatrix: any[]): any {

        if (capitalMatrix.length === 0) {
            return [];
        }

        const editable = this.mode === 'editable' ? true : false;
        const colDefs: any[] = [];

        const funds = Object.keys(capitalMatrix[0]).filter((key) => key !== 'Date' &&
            key !== 'CrossPodName' && key !== this.fundComplex && key !== 'Overage' && key !== 'Total').sort();

        colDefs.push({
            headerName: 'CrossPodName', field: 'CrossPodName', editable: false, width: 115,
            cellStyle: (params) => {
                return params.context.getCellStyle(this.mode, params.data['CrossPodName'], this.fundComplex, 'alpha', 'CrossPodName');
            },
            valueFormatter: param => {
                if (param.value === 'Fund Capital') {
                    return 'Levered Fund Capital';
                }
            }
        });

        funds.map((fund) => {
            colDefs.push({
                headerName: fund,
                field: fund,
                sortable: false,
                width: fund === 'Enhanced Opp' ? 70 : 60,
                valueParser: this.numberParser,
                cellStyle: (params) => {
                    return params.context.getCellStyle(this.mode, params.data['CrossPodName'], this.fundComplex, 'numeric', 'Fund');
                },
                valueFormatter: (params) => {
                    if (params.data['CrossPodName'] === 'Fund Leverage') {
                        return (params.data[fund].toFixed(2));
                    } else if (params.data['CrossPodName'] === 'Overage') {
                        return (params.data[fund].toFixed(5));
                    } else {
                        if (this.showPct) {
                            return (params.value * 100).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + '%';
                        }

                        if (params.context.isPctColumn(params.data['CrossPodName'])) {
                            return (params.data[fund] * 100).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + '%';
                        } else {
                            return (params.data[fund] / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + 'm';
                        }
                    }
                },
                onCellDoubleClicked: params => {
                    const targetLeverageData = params.context.originalCapitalMatrix.filter(element => element.CrossPodName.toLowerCase().includes('leverage'))[0];
                    const targetFundData = params.context.originalCapitalMatrix.filter(element => element.CrossPodName.toLowerCase().includes('unlevered'))[0];

                    const targetCellStyle = params.context.getCellStyle(this.mode, params.data['CrossPodName'], this.fundComplex, 'numeric', 'Fund');
                    if (params.context.mode === 'editable' && targetCellStyle['background-color'] === '#fafbdd') {
                        params.context.onOpenFundEditor({
                            targetLeverageData,
                            targetFundData,
                        }, params);
                        params.api.clearFocusedCell();
                    }

                }
            });
        });

        colDefs.push({
            headerName: 'Total',
            field: 'Total',
            sortable: false,
            width: 60,
            singleClickEdit: false,
            valueParser: this.numberParser,
            cellStyle: (params) => {
                return params.context.getCellStyle(this.mode, params.data['CrossPodName'], this.fundComplex, 'numeric', 'Total');
            },
            valueFormatter: (params) => {
                if (params.data['CrossPodName'] === 'Fund Leverage' ||
                    params.data['CrossPodName'] === 'Overage') {
                    return '';
                } else if (this.showPct) {
                    return (params.data['Total'] * 100).toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 }) + '%';
                } else {
                    if (params.context.isPctColumn(params.data['CrossPodName'])) {
                        return (params.data['Total'] * 100).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + '%';
                    } else {
                        return (params.data['Total'] / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + 'm';
                    }
                }
            },
            onCellDoubleClicked: params => {
                const targetCellStyle = params.context.getCellStyle(this.mode, params.data['CrossPodName'], this.fundComplex, 'numeric', 'Total');
                if (params.context.mode === 'editable' && targetCellStyle['background-color'] === '#fafbdd') {
                    params.context.onOpenCrossPodEditor(params.data);
                    params.api.clearFocusedCell();
                }
            }
        });

        return colDefs;
    }

    private isPctColumn(crossPodName: string): boolean {
        return crossPodName.endsWith('(%)');
    }

    private getCellStyle(mode, crossPodName, fundComplex, colType, colName): any {
        let result = {};

        if (crossPodName === 'Unlevered Fund Capital' ||
            crossPodName === 'Fund Leverage' ||
            crossPodName === 'Fund Capital' ||
            crossPodName === 'Total Pod Capital') {
            result = { 'font-weight': 'bold', 'background-color': '#dcfcc9'};
            if (colName !== 'CrossPodName') {
                result['justify-content'] = 'flex-end';
            }
            if (mode === 'editable' && crossPodName !== 'Fund Capital'
                && crossPodName !== 'Total Pod Capital' && !(colName === 'Total' || colName === 'CrossPodName') && this.showPct !== true) {
                result['background-color'] = '#fafbdd';
            }
            if (mode === 'editable' && colName === 'Total' && crossPodName === 'Fund Leverage') {
                result['background-color'] = '#dcfcc9';
            }
            return result;
        }

        if (crossPodName === 'Overage') {
            result = { 'font-weight': 'bold', 'background-color': '#fedab3' };
            if (colName !== 'CrossPodName') {
                result['justify-content'] = 'flex-end';
            }
            if (mode === 'editable' && this.funds && this.funds.indexOf(colName) >= 0) {
                result['background-color'] = '#fafbdd';
            }
            return result;
        }

        if (this.isPctColumn(crossPodName) || crossPodName === fundComplex) {
            result = { 'font-weight': 'bold', 'background-color': '#dcfcc9' };
        } else if (mode === 'editable') {
            if (colName === 'CrossPodName') {
                result = { 'font-weight': 'bold' };
            } else if (colName === 'Fund') {
                // NOOP
            } else {
                if (this.showPct === true) {
                    result = { 'font-weight': 'bold', 'background-color': 'white' };
                } else {
                    result = { 'font-weight': 'bold', 'background-color': '#fafbdd' };
                }
            }
        } else if (mode === 'delta' && colName === 'FundComplex') {
            result = { 'font-weight': 'bold', 'background-color': '#dcfcc9' };
        } else {
            if (colName !== 'Fund' && (mode === 'delta' || mode === 'readonly')) {
                result = { 'font-weight': 'bold' };
            }
        }

        if (colType === 'numeric') {
            result['justify-content'] = 'flex-end';
        }

        if (colName === 'Fund') {
            result['background-color'] = '#d1f8ff';
        }

        // if (this.showPct) {
        //     if (colName !== 'Total') {
        //         result['background-color'] = '#dcfcc9';
        //     } else {
        //         result['background-color'] = 'white';
        //     }
        // }
        return result;
    }

    private canEditCell(crossPodName, editable) {
        if (editable) {
            // tslint:disable-next-line: triple-equals
            if (this.isPctColumn(crossPodName) || crossPodName == this.fundComplex) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        if (this.capitalMatrix && this.capitalMatrix.length > 0) {
            this.columnDefs = this.getColumnDefs(this.capitalMatrix);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.capitalMatrix);
            // setTimeout(() => {
            // }, 200);
        }
    }

    public numberParser(params) {
        if (params.newValue.toLowerCase().endsWith('m')) {
            params.newValue = Number(params.newValue.replace('m', '')) * 1000000;
        } else if (params.newValue.toLowerCase().endsWith('k')) {
            params.newValue = Number(params.newValue.replace('k', '')) * 1000;
        } else if (params.newValue.toLowerCase().endsWith('b')) {
            params.newValue = Number(params.newValue.replace('b', '')) * 1000000000;
        }
        const newVal = Number(params.newValue);
        return isNaN(newVal) ? params.oldValue : newVal;
    }

    onCellValueChanged(event): void {
        const fundName = event.column.getId();
        const crossPodName = event.data.CrossPodName;
        if (!isNaN(event.newValue) && (event.newValue !== event.oldValue)) {
            event.context.capitalMatrixChanged.emit({
                'fundName': fundName,
                'crossPodName': crossPodName,
                'oldValue': event.oldValue,
                'newValue': event.newValue,
                'matrix': event.context.capitalMatrix
            });
        }
    }

    private getFractionDigits(): number {
        return this.showPct ? 5 : 2;
    }

    private onOpenCrossPodEditor(rowData: any) {
        if (this.showPct) {
            return ;
        }
        this.dialog.open(CapitalsCrosspodEditorDialogComponent,  {
            hasBackdrop: false,
            panelClass: ['event-analysis-pop-up-panel'],
            width: '30rem',
            height: '25rem',
            data: {
                rowData: rowData,
                guid: this.guid,
            }
        });
    }

    private onOpenFundEditor(rowData: any, params: any) {
        if (this.showPct) {
            return ;
        }
        this.dialog.open(CapitalsFundEditorDialogComponent,  {
            hasBackdrop: false,
            panelClass: ['event-analysis-pop-up-panel'],
            width: '30rem',
            height: '32rem',
            data: {
                asOfDate: this.asOfDate,
                rowData: rowData,
                guid: this.guid,
                params: params      
            }
        });
    }
}
