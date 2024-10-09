import { Component, OnInit, OnDestroy, Input,  Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import uuidv1 from 'uuid/v1';

import * as fromModels from '../../models/agreements.models';
import { GridApi, ColumnApi, GridOptions, RowNode, ColDef } from 'ag-grid-community';
import { AppCustomGridCellCheckboxComponent, AppCustomGridCellCrudOperationComponent } from 'src/app/components';
import { AgreementDeleteConfirmationDialogComponent } from '../agreement-delete-confirmation-dialog/agreement-delete-confirmation-dialog.component';

import { NotificationService } from 'src/app/factories';
import { UtilityService } from 'src/app/services';
import { AgreementResetConfirmationDialogComponent } from '../agreement-reset-confirmation-dialog/agreement-reset-confirmation-dialog.component';


@Component({
    selector: 'app-trade-agreements',
    templateUrl: './agreements.component.html',
    styleUrls: ['./agreements.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeAgreementsComponent implements OnInit, OnDestroy, OnChanges {

    @Input() mode: string;

    @Input() agreements: fromModels.ITradeAgreement[];
    @Input() agreementTypes: fromModels.ITradeAgreementType[] = [];

    @Input() agreementsLoading: boolean;
    @Input() agreementsLoaded: boolean;
    @Input() agreementsError: string;
    @Input() selectedAgreement: string;

    @Output() addAgreement: EventEmitter<fromModels.ITradeAgreement> = new EventEmitter<fromModels.ITradeAgreement>();
    @Output() updateAgreement: EventEmitter<fromModels.ITradeAgreement> = new EventEmitter<fromModels.ITradeAgreement>();
    @Output() deleteAgreement: EventEmitter<fromModels.ITradeAgreement> = new EventEmitter<fromModels.ITradeAgreement>();
    @Output() resetAgreementGrid = new EventEmitter();
    @Output() updateAllocationCache: EventEmitter<void> = new EventEmitter<void>();

    public filteredAgreements: fromModels.ITradeAgreement[];

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private columnDefs: any[];
    private requiredFields: string[] = ['blotterType', 'currency', 'crdBroker', 'tradeAgreement', 'dealer'];
    private duplicationCheckFields: string[] = ['blotterType', 'secType', 'currency', 'underlyingSecType', 'crdBroker'];
    private subscription: Subscription;
    private resetDialogSubscription: Subscription;
    private tempRowData: any;

    public searchCriteria: string = null;

    public customGridOption: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('id') === false ?
                    { 'justify-content': 'flex-end' } : {};
            },
            filter: 'agSetColumnFilter',
            editable: false
        },

        getContextMenuItems: params => {
            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport'];
        },

        sideBar: true,
        suppressColumnVirtualisation: true,
        // rowMultiSelectWithClick: true,
        rowSelection: 'single',
        floatingFilter: true,
        stopEditingWhenGridLosesFocus: true,
        deltaRowDataMode: true,
        context: this,

        onRowClicked: params => {},

        onRowEditingStarted: params => {
            params.context.tempRowData = Object.keys(params.data).reduce((result, key) => {
                if (params.data[key] === null) {
                    return result + '';
                } else {
                    return result + params.data[key];
                }
            }, '');
        },
        onRowEditingStopped: params => {
            const targetData = Object.keys(params.data).reduce((result, key) => {
                if (params.data[key] === null) {
                    return result + '';
                } else {
                    return result + params.data[key];
                }
            }, '');
            if (targetData !== params.context.tempRowData) {
                params.data['_notSave'] = true;
                params.api.redrawRows({rowNodes: [params.node]});
            }
        },

        frameworkComponents: {
            AppCustomGridCellCheckboxComponent: AppCustomGridCellCheckboxComponent,
            AppCustomGridCellCrudOperationComponent: AppCustomGridCellCrudOperationComponent
        },

        getRowNodeId: data => data.recordId,
        getRowStyle: params => {
            if (params.data['_notSave']) {
                return {
                    'font-weight': 'bolder',
                    'color': '#6e8eeccc',
                    'font-style': 'italic',
                };
            }
        },

        editType: 'fullRow'
    };

    public extraOption = {
        autoSizeColumns: true
    };

    constructor(private notificationService: NotificationService, private utilityService: UtilityService, private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() { this.customGridOption.defaultColDef.editable =  this.mode === 'readOnly' ? false : true; }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.agreementsLoading && changes.agreementsLoading.currentValue === true && this.gridApi) {
            this.gridApi.deselectAll();
        }

        if (changes.selectedAgreement && changes.selectedAgreement.currentValue !== undefined) {
            this.filteredAgreements = this.agreements.filter((agreement) => agreement.tradeAgreement === changes.selectedAgreement.currentValue);
        }

        if (changes.agreements && changes.agreements.currentValue && this.gridApi ) {
            // this.gridApi.setRowData(this.agreements);
            if (changes.agreements.previousValue === null) {
                this.gridApi.setRowData(this.agreements);
            } else {
                const oldData = this.getRowData();
                const [updateRows, removeRows, addRows] = this.utilityService.generalGridValueUpdater(changes.agreements.currentValue, oldData, 'recordId');
                this.gridApi.updateRowData({update: updateRows, remove: removeRows, add: addRows});
                this.gridApi.redrawRows();
            }
        }

        if (changes.agreementTypes && changes.agreementTypes.currentValue && changes.agreementTypes.currentValue.length > 0) {
            this.columnDefs = this.getColumnDefs();
            if (this.gridApi) {
                this.gridApi.setColumnDefs([]);
                this.gridApi.setColumnDefs(this.getColumnDefs());
            }
        }
    }

    getColumnDefs(): any {
        const editable = this.mode === 'readOnly' ? false : true;
        const colDefs: any[] = [];
        if (this.mode !== 'readOnly') {
            colDefs.push({ headerName: 'Blotter', field: 'blotterType', editable: editable, pinned: 'left' });
        }
        colDefs.push({ headerName: 'Trade Agreement', field: 'tradeAgreement', editable: editable, pinned: 'left' , sort: 'asc',
            cellEditor: 'agSelectCellEditor', cellEditorParams: {values: this.agreementTypes.map(type => type.code)}});

        if (this.mode !== 'readOnly') {
            colDefs.push({ headerName: 'Dealer', field: 'dealer', editable: editable, pinned: 'left'});
        }
        colDefs.push({ headerName: 'Entity', field: 'entity', editable: editable, pinned: 'left'});

        if (this.mode === 'readOnly') {
            colDefs.push({
                headerName: 'Security Types',
                field: 'secTypes',
                editable: editable,
                resizable: false,
                suppressSizeToFit: true,
                tooltipField: 'secTypes',
                maxWidth: 200
            });
        } else {
            colDefs.push({ headerName: 'Sec Type', field: 'secType', editable: editable});
            colDefs.push({ headerName: 'Inv. Class', field: 'invClass', editable: editable });
            colDefs.push({ headerName: 'UnderlyingSecType', field: 'underlyingSecType', editable: editable });
        }
        colDefs.push({ headerName: 'Excluded Sec. Types',
                       field: 'excludedSecTypes',
                       editable: editable
                    });
        if (this.mode === 'readOnly') {
            colDefs.push({ headerName: 'Underlying Sec. Types', field: 'underlyingSecTypes', editable: editable });
        }
        colDefs.push({ headerName: 'Currency', field: 'currency', editable: editable });

        if (this.mode !== 'readOnly') {
            colDefs.push({ headerName: 'CRD Broker', field: 'crdBroker', editable: editable });
            colDefs.push({ headerName: 'Exec. Platform', field: 'execPlatform', editable: editable });
            colDefs.push({ headerName: 'Aexeo Broder Code', field: 'aexeobrokercode', editable: editable });
        }

        colDefs.push({ headerName: 'Custodian', field: 'custodian', editable: editable });
        
        if (this.mode === 'readOnly') {
            colDefs.push({ headerName: 'Blue Pearl', field: 'bluePearlCanTrade', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'bluePearlCanTrade', editable: false } });
            colDefs.push({ headerName: 'Alpha Port', field: 'alphaPortCanTrade', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'alphaPortCanTrade' , editable: false} });
            colDefs.push({ headerName: 'Opportunity', field: 'opportunityCanTrade', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'opportunityCanTrade' , editable: false} });
            colDefs.push({ headerName: 'Enhanced', field: 'enhancedOppCanTrade', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'enhancedOppCanTrade' , editable: false} });
            // colDefs.push({ headerName: 'MA7', field: 'ma7CanTrade', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'ma7CanTrade' , editable: false} });
            colDefs.push({ headerName: 'GMMK', field: 'gmmkCanTrade', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'gmmkCanTrade', editable: false } });
            
        } else {
            colDefs.push({ headerName: 'Blue Pearl', field: 'bluePearl', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'bluePearl', editable: editable } });
            colDefs.push({ headerName: 'Alpha Port', field: 'alphaPort', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'alphaPort', editable: editable} });
            colDefs.push({ headerName: 'Opportunity', field: 'opportunity', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'opportunity' , editable: editable} });
            colDefs.push({ headerName: 'Enhanced', field: 'enhancedOpp', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'enhancedOpp', editable: editable } });
           // colDefs.push({ headerName: 'MA7', field: 'ma7', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'ma7', editable: editable} });
            colDefs.push({ headerName: 'GMMK', field: 'gmmk', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'gmmk', editable: editable } });            
        }

        if (this.mode !== 'readOnly') {
            colDefs.push({ headerName: 'Id', field: 'id', editable: false });
            colDefs.push({
                headerName: 'Action', pinned: 'right', cellRenderer: 'AppCustomGridCellCrudOperationComponent',
                cellRendererParams: {
                    onSave: this.onSaveRow.bind(this),
                    onDelete: this.onDeleteRow.bind(this),
                    onAdd: this.onAddEmptyNewRow.bind(this),
                    onAddCopy: this.onCopyRow.bind(this)
                },
                editable: false, suppressFilter: true, suppressResize: true, maxWidth: 120
            });
        }

        return colDefs;
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(this.getColumnDefs());

        if (this.agreements) {
            this.gridApi.setRowData(this.agreements)
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        } if (this.resetDialogSubscription) {
            this.resetDialogSubscription.unsubscribe();
        }
    }

    onAddEmptyNewRow(node: RowNode) {
        const rowIndex = node.rowIndex;
        const newRowObject: any = {};
        Object.keys(node.data).forEach(key => {
            newRowObject[key] = undefined;
        });

        // Initialize newly create row
        delete newRowObject.id;
        newRowObject.recordId = uuidv1();
        newRowObject._notSave = true;
        newRowObject['UnderlyingSecType'] = 'NA';
        const recordId = newRowObject.recordId;

        this.agreements.splice(rowIndex + 1, 0, newRowObject);
        this.gridApi.setRowData(this.agreements);

        setTimeout(() => {
            this.gridApi.deselectAll();
            this.gridApi.getRowNode(recordId).setSelected(true);
        }, 100);
    }

    onCopyRow(node: RowNode) {
        const rowIndex = node.rowIndex;
        const newRowObject: any = {};
        Object.keys(node.data).forEach(key => {
            newRowObject[key] = node.data[key];
        });

        // Initialize newly create row
        delete newRowObject.id;
        newRowObject.recordId = uuidv1();
        newRowObject._notSave = true;
        newRowObject['UnderlyingSecType'] = 'NA';
        const recordId = newRowObject.recordId;

        this.agreements.splice(rowIndex + 1, 0, newRowObject);
        this.gridApi.setRowData(this.agreements);

        setTimeout(() => {
            this.gridApi.deselectAll();
            this.gridApi.getRowNode(recordId).setSelected(true);
        }, 100);

    }

    onSaveRow(node: RowNode) {
        const fillOutAllRequireField = this.checkRequiredFields(node.data);
        const duplicationExist = this.checkDuplicate(node.data);

        if (fillOutAllRequireField === false) {
            this.notificationService.openNotification('Must fillout all Required Field before saving (Blotter, currency, CRD Broker, Trade Agreement, Dealer, Security Types/invClass)');
            return;
        }

        if (duplicationExist === true ) {
            this.notificationService.openNotification('Can not save duplication row (Blotter, Security Types, Currency, UnderlyingSecType, CRD Broker)');
            return;
        }

        if (node.data.id === undefined) {
            // console.log('saving a complete empty row', node.data)
            this.onAgreementAdded(node.data);
        } else {
            this.onAgreementUpdated(node.data);
        }

    }

    onDeleteRow(node: RowNode) {
        if (node.data.id !== undefined) {
            const dialogRef = this.dialog.open(AgreementDeleteConfirmationDialogComponent, {
                data: {
                    entity: node.data['entity'],
                    tradeAgreement: node.data['tradeAgreement'],
                    text: 'Are you sure you want to delete the <strong><i>{{data.tradeAgreement}}</i></strong>   Trade Agreement with <strong><i>{{data.entity}}</i></strong>'
                }
            });
            this.subscription = dialogRef.afterClosed().subscribe(result => {
                if (result === true) {
                    this.onAgreementDeleted(node.data);
                }
            });
        } else {
            const targetDeletedRowIndex = this.agreements.indexOf(node.data);
            this.agreements.splice(targetDeletedRowIndex, 1);

            // this.gridApi.updateRowData({remove: [node.data]});
            this.gridApi.setRowData(this.agreements);
        }
    }

    private onAgreementAdded(agreement: fromModels.ITradeAgreement): void {
        this.addAgreement.emit(agreement);
    }

    private onAgreementUpdated(agreement: fromModels.ITradeAgreement): void {
        this.updateAgreement.emit(agreement);
    }

    private onAgreementDeleted(agreement: fromModels.ITradeAgreement): void {
        this.deleteAgreement.emit(agreement);
    }

    private getRowData() {
        const rowData = [];
        this.gridApi.forEachNode(function(node) {
          rowData.push(node.data);
        });
        return rowData;
    }

    onSearch(searchCriteria: string): void {
        this.gridApi.setQuickFilter(searchCriteria);
    }

    onResetGrid() {
        const dialogRef = this.dialog.open(AgreementResetConfirmationDialogComponent)
        this.subscription = dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.resetAgreementGrid.emit();
            }
        });
    }

    private checkRequiredFields(targetRow): boolean {        // true mean pass the requried field test
        let result;
        result = this.requiredFields.every(field => targetRow[field] !== undefined);
        if (targetRow['invClass'] !== undefined && targetRow['secType'] === undefined) {
            targetRow['secType'] = targetRow['invClass'];
        }
        return (targetRow['secType'] !== undefined || targetRow['invClass'] !== undefined) && result;
    }

    private checkDuplicate(targetRow): boolean {            // true mean there is duplication value
        const allValueArray = this.agreements.filter(agreement => agreement.recordId !== targetRow.recordId).map(agreement => {
            return this.duplicationCheckFields.reduce((a, b) => {
                return a + agreement[b];
            }, '');
        });
        const targetRowValue = this.duplicationCheckFields.reduce((a, b) => {
            return a + targetRow[b];
        }, '');
        return allValueArray.includes(targetRowValue);
    }

    onUpdateAllocationCache(e: any): void {
        this.updateAllocationCache.emit();
    }

}
