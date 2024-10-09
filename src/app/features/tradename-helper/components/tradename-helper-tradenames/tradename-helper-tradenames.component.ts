import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';

import * as moment from 'moment';

import { AppCustomGridCellCheckboxComponent } from 'src/app/components';
import { UtilityService } from 'src/app/services';
import { TradeNameReinstateConfirmationDialogComponent } from '../tradename-reinstate-confirmation/tradename-reinstate-confirmation.component';
import { TradeNameRenameConfirmationDialogComponent } from '../tradename-rename-confirmation/tradename-rename-confirmation.component';

import * as fromModels from './../../models';

@Component({
    selector: 'app-tradename-helper-tradenames',
    templateUrl: './tradename-helper-tradenames.component.html',
    styleUrls: ['./tradename-helper-tradenames.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeNameHelperTradeNamesComponent implements OnInit, OnChanges {

    @Input() tradeNames: fromModels.ITradeName[];
    @Input() tradeNamesLoading: boolean;
    @Input() tradeNamesLoaded: boolean;
    @Input() tradeNamesError: string;

    @Output() reinstateTradeName: EventEmitter<fromModels.ITradeName> = new EventEmitter<fromModels.ITradeName>();
    @Output() changeTradeName: EventEmitter<fromModels.ITradeName> = new EventEmitter<fromModels.ITradeName>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            editable: false,
            flex: 1
        },
        floatingFilter: true,
        getRowNodeId: data => data.TID,
        getContextMenuItems: (params: any) => {

            const context = this;

            const reinstateTradeName = {
                name: 'Reinstate Tradename (in CRD)',
                action: () => {
                    this.reinstate(this.getTradeName(params.node));
                }
            };

            const changeTradeName = {
                name: 'Change Tradename',
                action: () => {
                    this.rename(this.getTradeName(params.node));
                }
            };

            const tradeName = this.getTradeName(params.node);
            const contextMenu: any[] = ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator'];
            if (tradeName.ExistsInCRD === false) {
                contextMenu.push(reinstateTradeName);
            }
            contextMenu.push(changeTradeName);
            return contextMenu;
        },
        columnDefs: [
            {
                colId: 'CRDPrefix',
                headerName: 'CRDPrefix',
                maxWidth: 150,
                field: 'CRDPrefix',
                filter: true
            },
            {
                colId: 'TradeID',
                headerName: 'TradeID',
                width: 150,
                field: 'TradeID',
                filter: true
            },
            {
                colId: 'TradeName',
                headerName: 'TradeName',
                width: 350,
                field: 'TradeName',
                filter: true
            },
            {
                colId: 'DateAdded',
                headerName: 'DateAdded',
                width: 100,
                field: 'DateAdded',
                valueFormatter: (params) => {
                    return this.formatDate(params.value);
                },
                hide: false
            },
            {
                colId: 'ModelStrategy',
                headerName: 'ModelStrategy',
                width: 100,
                field: 'ModelStrategy',
                hide: false
            },
            {
                colId: 'PortfolioManager',
                headerName: 'PortfolioManager',
                width: 100,
                field: 'PortfolioManager',
                hide: false
            },
            {
                colId: 'IsFxHedged',
                headerName: 'IsFxHedged',
                width: 100,
                field: 'IsFxHedged',
                filter: true,
                cellRenderer: 'AppCustomGridCellCheckboxComponent',
                cellRendererParams: { key: 'IsFxHedged', editable: false },
                hide: false,
                cellStyle: { 'justify-content': 'center' }
            },
            {
                colId: 'ExistsInCRD',
                headerName: 'ExistsInCRD',
                width: 100,
                field: 'ExistsInCRD',
                filter: true,
                cellRenderer: 'AppCustomGridCellCheckboxComponent',
                cellRendererParams: { key: 'ExistsInCRD', editable: false },
                hide: false,
                cellStyle: { 'justify-content': 'center' }
            },
            {
                colId: 'CreateName',
                headerName: 'CreateName',
                width: 100,
                field: 'CreateName',
                hide: false
            },
            {
                colId: 'CreateDate',
                headerName: 'CreateDate',
                width: 100,
                field: 'CreateDate',
                hide: false,
                valueFormatter: (params) => {
                    return this.formatDate(params.value);
                }
            },
            {
                colId: 'UpdateName',
                headerName: 'UpdateName',
                width: 100,
                field: 'UpdateName',
                hide: false
            },
            {
                colId: 'UpdateDate',
                headerName: 'UpdateDate',
                width: 100,
                field: 'UpdateDate',
                hide: false,
                valueFormatter: (params) => {
                    return this.formatDate(params.value);
                }
            }
        ],
        frameworkComponents: {
            AppCustomGridCellCheckboxComponent: AppCustomGridCellCheckboxComponent
        },
    };

    constructor(private utilities: UtilityService, private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngOnInit(): void { }


    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }

    private formatDate(dateValue: string): string {
        const date_parts = dateValue.split('T');
        const date_part = date_parts[0];
        const time_part = date_parts[1].replace('Z', '').split('.')[0];
        return moment(date_part).format('MM/DD/YYYY') + ' ' + time_part;
    }

    private getTradeName(node: any): fromModels.ITradeName {
        return node.data;
    }

    private reinstate(tradeName: fromModels.ITradeName): void {
        if (tradeName) {
            const dialogRef = this.dialog.open(TradeNameReinstateConfirmationDialogComponent, {
                hasBackdrop: true,
                width: '45rem',
                height: '10rem',
                data: { 'tradename': tradeName }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result === true) {
                    this.reinstateTradeName.emit(tradeName);
                }
            });
        }
    }

    private rename(tradeName: fromModels.ITradeName): void {
        if (tradeName) {
            const dialogRef = this.dialog.open(TradeNameRenameConfirmationDialogComponent, {
                hasBackdrop: true,
                width: '45rem',
                height: '12rem',
                data: { 'tradename': tradeName }
            });
            dialogRef.afterClosed().subscribe(newTradeName => {
                if (newTradeName !== null) {
                    this.changeTradeName.emit(newTradeName);
                }
            });
        }
    }
}
