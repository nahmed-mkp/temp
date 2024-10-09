import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { GridOptions, GridApi, CellValueChangedEvent, RowNode } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

import * as moment from 'moment';

import * as fromModels from './../../../models';
import { PricingEngineUtilityService } from '../../../services';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { SecurityEditorGeneralDialogComponent } from 'src/app/features/security-editor/containers';

@Component({
    selector: 'app-pricing-engine-fx-viewer',
    templateUrl: './pricing-engine-fx-viewer.component.html',
    styleUrls: ['./pricing-engine-fx-viewer.component.scss']
})
export class PricingEngineFxViewerComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() loading: boolean;
    @Input() mode: 'live' | 'close';

    @Output() onFxForwardSelected = new EventEmitter<number>();
    @Output() onFxForwardUpdate = new EventEmitter<fromModels.FxForwardUpdateReq>();
    @Output() onEditing = new EventEmitter<boolean>();

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
            {
                headerName: 'Security Type',
                field: 'SecurityType',
                filter: 'agSetColumnFilter',
                width: 90
            },
            {
                headerName: 'Name',
                field: 'SecurityName',
                filter: 'agSetColumnFilter',
                width: 150,
                cellRenderer: (params) => this.pricingEngineUtilityService.pricedByPrizmCellRenderer(params)
            },
            {
                headerName: 'Price',
                field: 'Price',
                filter: 'agNumberColumnFilter',
                editable: false,
                width: 100
            },
            {
                headerName: 'Underlying Spot Price',
                field: 'UnderlyingSpotPrice',
                width: 150
            },
            {
                headerName: 'MarkAtPrice',
                field: 'MarkAtPrice',
                editable: true,
                filter: 'agNumberColumnFilter',
                width: 100,
                cellClass: 'column-highlight-yellow'
            },
            {
                headerName: 'Price Source',
                field: 'Price Source',
                width: 150
            },
            {
                headerName: 'NdfFixing',
                field: 'NdfFixing',
                width: 150,
                cellStyle: params => {
                    return {  ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'flex-end', 'border-right': '0.2px dotted #d7d7d7;' };
                }
            },
            {
                headerName: 'Last Update',
                field: 'LastUpdated',
                editable: false,
                width: 80,
                cellStyle: params => {
                    return {  ...this.pricingEngineUtilityService.generateStyles(params), 'justify-content': 'end'};
                },
                valueFormatter: params => {
                    return moment(params.data['LastUpdated'].replace(' ', 'T')).format('h:mm A');
                }
            },
            { headerName: 'InPosition', field: 'InPosition', sort: 'desc', hide: true},
            { headerName: 'PricedByPrizm', field: 'PricedByPrizm', filter: 'agSetColumnFilter', hide: true },
        ],

        rowSelection: 'single',
        deltaRowDataMode: true,
        getRowNodeId: data => data['SID'],

        // Event --------------------------------------------------------

        onRowSelected: params => {
            if (params.node.isSelected()) {
                this.onFxForwardSelected.emit(params.data['SID']);
            }
        },

        onCellValueChanged: params => {
            const payload = this._getUpdatePayload(params);
            payload['carryField'] = params.colDef.field;
            this.onFxForwardUpdate.emit(payload);
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
    }

    constructor(private utilityService: UtilityService, private dialog: MatDialog, private pricingEngineUtilityService: PricingEngineUtilityService) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
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

    ngOnInit() {}

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

    private _getUpdatePayload(params: CellValueChangedEvent): fromModels.FxForwardUpdateReq {
        const targetData = params.data;
        const editedField = params.colDef.field;
        const updatePayload: fromModels.FxForwardUpdateReq = {
            mark_at_price: parseFloat(targetData['MarkAtPrice']) || null,
            name: targetData['SecurityName'],
            sid: targetData['SID'],
            assetClass: 'fx',
            securityType: 'fxfrd'
        };

        return updatePayload;
    }

}
