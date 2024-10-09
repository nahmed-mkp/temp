import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';
import * as _ from 'lodash';

import * as moment from 'moment';
import { Store } from '@ngrx/store';

import * as fromModels from '../../models';

import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

@Component({
    selector: 'app-cs-snapshots-correlmatrix',
    templateUrl: './client-solutions-snapshot-correlmatrix.component.html',
    styleUrls: ['./client-solutions-snapshot-correlmatrix.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsSnapshotsCorrelationMatrixComponent implements OnInit, OnChanges {

    @Input() entitiesMap: any;
    @Input() param: fromModels.ISnapshotParameter;
    @Input() correlationMatrix: any[];
    @Input() correlationMatrixLoading: boolean;
    @Input() correlationMatrixLoaded: boolean;
    @Input() correlationMatrixError: string;

    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions;
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private dynamicColDefs: ColDef[];

    constructor(private utilityService: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
        this.customGridOption = this._createGridOption();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.correlationMatrix && changes.correlationMatrix.currentValue && changes.correlationMatrix.currentValue.length > 0) {
            this.dynamicColDefs = this._createDynamicColumns(this.correlationMatrix);
            if (this.gridApi) {
                this.gridApi.setColumnDefs(this.dynamicColDefs);
            }
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        if (this.dynamicColDefs) {
            this.gridApi.setColumnDefs(this.dynamicColDefs);
        }
    }

    onDownloadData() {
        this.gridApi.exportDataAsCsv({
            fileName: `${this.param.fund.code}_BenchmarkCorrelations`
        });
    }

    // Utility -----

    private _createGridOption(): GridOptions {
        return {
            defaultColDef: {
                suppressMenu: true,
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2),
                cellStyle: params => {
                    return typeof params.value === 'number' ? { 'justify-content': 'flex-end' } : {};
                },
                cellClass: 'right-border-light',
                headerClass: 'ag-header-wrap'
            },
            columnDefs: [],
            getRowClass: params => {
                if (params.node.rowIndex % 2 === 0) {
                    return ['even-row-shaded-effect', 'ultra-small-row'];
                } else {
                    return ['ultra-small-row'];
                }
            },

            rowHeight: 18,
            sideBar: false,
            showToolPanel: false,
            headerHeight: 50,

            statusBar: {
                statusPanels: [
                    { statusPanel: 'agAggregationComponent' },
                    { statusPanel: 'AppGridCustomStatusBarCellValueComponent' },
                ],
            },

            frameworkComponents: {
                'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
            },
            suppressColumnVirtualisation: true,
        };
    }

    private _createDynamicColumns(data: any): ColDef[] {
        const colDefs: ColDef[] = data.map(element => {
            if (element.code.startsWith('MKP')) {
                return {
                    headerName: this.entitiesMap && this.entitiesMap[element.code]['Description'],
                    headerClass: ['ag-header-wrap', 'yellow-header'],
                    field: element.code,
                    valueGetter: `data.corr['${element.code}']`,
                    cellClass: 'yellow-cell'
                };
            } else {
                return {
                    headerName: this.entitiesMap && this.entitiesMap[element.code]['Description'],
                    field: element.code,
                    valueGetter: `data.corr['${element.code}']`,
                    cellClass: (params) => {
                        if (params.node.rowIndex === 0) {
                            return 'yellow-cell';
                        }
                    }
                };
            }
        });
        colDefs.unshift({
            headerName: 'Benchmark',
            field: 'code',
            width: 300,
            suppressSizeToFit: true,
            valueFormatter: params => {
                return this.entitiesMap && this.entitiesMap[params.value]['Description'] || params.value;
            },
            cellClass: (params) => {
                if (params.node.rowIndex === 0) {
                    return 'yellow-cell';
                }
            }
        });
        return colDefs;
    }
}
