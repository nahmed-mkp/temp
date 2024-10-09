import { ChangeDetectionStrategy, Component, Inject, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as _ from 'lodash';

import * as fromModels from './../../models/timeseries-exporter.models';
import { SecuritySearchCellEditorComponent } from '../security-search-cell-editor/security-search-cell-editor.component';
import { MarketDataTypeCellEditorComponent } from '../market-data-type-cell-editor/market-data-type-cell-editor.component';
import { MatLegacyDialogRef as MatDialogRef, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { TimeseriesExporterNewMonitorCreateDialogComponent } from '../../containers';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';

@Component({
    selector: 'app-timeseries-exporter-editor',
    templateUrl: './timeseries-exporter-editor.component.html',
    styleUrls: ['./timeseries-exporter-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesExporterEditorComponent implements OnInit, OnChanges {

    @Input() monitor: fromModels.IMonitor;
    @Input() mode: 'edit' | 'create';
    @Input() existedMonitorNames: string[];

    @Output() cancel = new EventEmitter<boolean>();
    @Output() deleteList = new EventEmitter<string>();
    @Output() applyChanges = new EventEmitter<fromModels.ISaveMonitorRequest>();
    @Output() monitorSelected: EventEmitter<string> = new EventEmitter<string>();
    @Output() runTempList: EventEmitter<any> = new EventEmitter<any>();
    

    @Input() monitors: fromModels.IMonitor[];
    @Input() monitorsLoading: boolean;
    @Input() monitorsLoaded: boolean;
    @Input() monitorsError: string;

    private dialogRef: MatDialogRef<TimeseriesExporterNewMonitorCreateDialogComponent>;

    public filteredMonitors$: Observable<fromModels.IMonitor[]>;
    public monitorCtrl = new UntypedFormControl();

    public marketDataList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    private marketDataListOrigin: fromModels.IMonitorMarketData[] = [];
    public marketDataListCurrent: fromModels.IMonitorMarketData[] = [];
    // public monitorName: string;

    public duplicationAlertMessage = {
        visiable: false,
        text: null,
    };
    public monitorNameAlertMessage = {
        visiable: false,
        text: null,
    };

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            // editable: true
        },
        // getRowNodeId: data => data.mdid,
        getRowStyle: params => {
            if (params.data['edited'] === true && params.data['editStatus'] === 'added') {
                return { 'background-color': '#eef7db', 'font-style': 'italic'};
            } else if (params.data['edited'] === true && params.data['editStatus'] === 'modified') {
                return { 'background-color': '#fffbc6', 'font-style': 'italic' };
            } else if (params.data['edited'] === true && (params.data['editStatus'] === 'deleted')) {
                return { 'background-color': '#ffe1e1', 'font-style': 'italic' };
            }
        },
        columnDefs: [
            {
                colId: 'securityName',
                headerName: 'Security Name',
                field: 'securityName',
                editable: true,
                checkboxSelection: true,
                rowDrag: true,
                width: 250,
                cellEditor: 'SecuritySearchCellEditorComponent',
                onCellValueChanged: (params) => {
                    if (!params.data['editStatus']) {
                        params.data['editStatus'] = 'modified';
                    }
                    params.data['edited'] = true;
                    this.gridApi.refreshCells({
                        rowNodes: [params.node],
                        columns: ['editStatus']
                    });
                    this.editRow(params.data);
                    return true;
                },
            },
            {
                colId: 'marketDataType',
                headerName: 'Type',
                field: 'marketDataType',
                editable: true,
                width: 120,
                cellEditor: 'MarketDataTypeCellEditorComponent',
                onCellValueChanged: (params) => {
                    if (!params.data['editStatus']) {
                        params.data['editStatus'] = 'modified';
                    }
                    params.data['edited'] = true;
                    this.gridApi.refreshCells({
                        rowNodes: [params.node],
                        columns: ['editStatus']
                    });
                    this.editRow(params.data);
                    return true;
                }
            },
            {
                colId: 'displayName',
                headerName: 'Display Name',
                field: 'displayName',
                editable: true,
                width: 120,
                onCellValueChanged: (params) => {
                    if (!params.data['editStatus']) {
                        params.data['editStatus'] = 'modified';
                    }
                    params.data['edited'] = true;
                    this.gridApi.refreshCells({
                        rowNodes: [params.node],
                        columns: ['editStatus']
                    });
                    this.editRow(params.data);
                    return true;
                }
            },
            {
                colId: 'mdid',
                headerName: 'MDID',
                width: 60,
                field: 'mdid',
            },
            {
                colId: 'listOrder',
                headerName: 'Order',
                width: 60,
                field: 'listOrder',
                sort: 'asc'
            },
            {
                colId: 'editStatus',
                headerName: 'Status',
                width: 60,
                field: 'editStatus',
            },
        ],
        // onRowValueChanged: (params) => {
        //     var data = params.data;
        //     const list = this.monitor.marketData.filter(marketData => marketData.mdid !== data.mdid);
        //     list.push(data);
        //     this.marketDataList$.next(list);
        // },


        // Event ////////////////////////////////////////////////////////////
        // Update/Create ---------------
        // onRowEditingStopped: params => {
        //     console.log('onRowEditingStopped', params);
        //     const editedNode = params.node;
        //     const targetIndex = params.node.rowIndex;
        //     let targetValue = editedNode.data['displayName'];
        //     if (typeof targetValue === 'object') {
        //         targetValue = Object.assign({}, editedNode.data, targetValue);
        //     }
        //     this.marketDataListCurrent[targetIndex] = targetValue;
        //     this.marketDataList$.next([...this.marketDataListCurrent]);
        //     this._checkDuplication(this.marketDataListCurrent);
        // },

        // Change order ------------------
        onRowDragEnd: params => {
            const nodeDataCollection = [];
            params.api.forEachNode(node => {
                nodeDataCollection.push(node.data);
            });
            nodeDataCollection.forEach((data, index) => {
                data['listOrder'] = index;
            });
            this.marketDataListCurrent = nodeDataCollection;
            this.marketDataList$.next(this.marketDataListCurrent);
        },

        onCellEditingStopped: params => {
            const currentField = params.colDef.field;
            const currentRowIndex = params.rowIndex;
            if (currentField !== 'displayName') {
                if (currentField === 'securityName') {
                    params.api.startEditingCell({
                        rowIndex: currentRowIndex,
                        colKey: 'marketDataType'
                    });
                } else if (currentField === 'marketDataType') {
                    params.api.startEditingCell({
                        rowIndex: currentRowIndex,
                        colKey: 'displayName'
                    });
                } 
            }
        },

        onRowSelected: params => {
            if (params.node.isSelected()) {
                const targetData = params.data;
                if (targetData['securityName']) {
                    this.store.dispatch(new fromStore.SetActiveSecurityName(targetData['securityName']));
                }
            }
        },

        // Behavior -------------------------------------------------------------
        rowSelection: 'multiple',
        rowDragManaged: true,
        enableMultiRowDragging: true,
        suppressMoveWhenRowDragging: true,
        // editType: 'fullRow',

        frameworkComponents: {
            'SecuritySearchCellEditorComponent': SecuritySearchCellEditorComponent,
            'MarketDataTypeCellEditorComponent': MarketDataTypeCellEditorComponent
        },
    };

    constructor(private fb: UntypedFormBuilder, private dialog: MatDialog, private store: Store<fromStore.TimeseriesExporterState>) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void {
        // this.mode = data && data.mode ? data.mode: 'add';
        // this.monitor = data && data.monitor ? data.monitor : null;
        // if (this.monitor) {
        //     // this.timeseriesListForm.setValue({'name': this.monitor.name, 'marketData': this.monitor.marketData});
        //     this.marketDataList$.next(this.monitor.marketData);
        // }

        // this.timeseriesListForm.get('name').valueChanges
        //     .subscribe((val) => {
        //         if (this.mode === 'edit') {
        //             this.monitor = Object.assign({}, this.monitor, { newName: val });
        //         } else {
        //             const marketData = this.monitor && this.monitor.marketData ? this.monitor.marketData : [];
        //             this.monitor = Object.assign({}, this.monitor, { newName: val, name: val, marketData: marketData });
        //         }
        //     });
        this.filteredMonitors$ = this.monitorCtrl.valueChanges
        .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value && value.name),
            map(name => name ? this._filter(name) : this.monitors.slice())
        );
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.monitor && changes.monitor.currentValue) {
            this.marketDataListOrigin = changes.monitor.currentValue.marketData;
            this.marketDataListCurrent = JSON.parse(JSON.stringify(changes.monitor.currentValue.marketData));   // creating a clone of the market data for manupliation later
            this.marketDataList$.next(this.marketDataListCurrent);
            // this.monitorName = this.monitor.name;
        }

        if (changes.mode && changes.mode.currentValue === 'add') {
            this.marketDataListOrigin = [];
            this.marketDataListCurrent = [];
            this.marketDataList$.next(this.marketDataListCurrent);
        }
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }


    // Event -----------------------------------------------------

    public onCancel(): void {
        // this.dialogRef.close(null);
        this.cancel.emit(true);
    }

    public onResetList(): void {
        const clonedList = JSON.parse(JSON.stringify(this.marketDataListOrigin));
        this.marketDataListCurrent = JSON.parse(JSON.stringify(this.marketDataListOrigin));
        this.marketDataList$.next(clonedList);
    }

    public onDeleteList(): void {
        this.deleteList.emit(this.monitor.name);
    }

    public onApplyAndSaveChanges(): void {
        const updatePackage = this._createUpdatePackage();
        if (this.monitor) {
            const isThereDuplicate = this._checkDuplication(this.marketDataListCurrent);
            if (isThereDuplicate) {
                return;
            }
            if (this.mode === 'edit') {
                this.applyChanges.emit({name: this.monitor.name, newList: false, ...updatePackage});
            } else if (this.mode === 'create')  {
                this.applyChanges.emit({name: this.monitor.name, newList: true, ...updatePackage});
            }
        } else {
            // create new Monitor List since user did not select any monitor
            const newMonitorName = this.monitorCtrl.value;
            this.dialogRef = this.dialog.open(TimeseriesExporterNewMonitorCreateDialogComponent, {
                hasBackdrop: false,
                panelClass: ['event-analysis-pop-up-panel'],
                width: '30rem',
                height: '17rem',
                data: newMonitorName
            });
            this.dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.applyChanges.emit({name: result, newList: true, ...updatePackage});
                }
            });
        }

    }

    // onMonitorNameChange(): void {
    //     if (this.mode === 'create') {
    //         this._validateMonitorName();
    //     }
    // }

    public onMonitorSelected(val: fromModels.IMonitor): void {
        this.monitor = val;
        this.monitorSelected.emit(val.name);
    }

    public onRunTempList(): void {
        const list = [...this.marketDataListCurrent];
        list.sort((itemA, itemB) => itemA.listOrder - itemB.listOrder);
        const mdidList = list.map(item => item.mdid);

        list.forEach(item => {
            item['label'] = item['displayName'] || item['securityName'];
        });
        this.runTempList.emit({
            mdidList: mdidList,
            fullList: list
        });
    }

    public onResetPanel(): void {
        this.monitorSelected.emit(null);
        this.marketDataListCurrent = [];
        this.marketDataListOrigin = [];
        this.marketDataList$.next([]);
        this.monitorCtrl.setValue(null);
    }

    // Utility Function -------------------------------------------------------

    public addRow(): void {
        const newEmptyRow: fromModels.IMonitorMarketData = {
            mdid: null,
            displayType: null,
            displayName: null,
            label: null,
            listOrder: this.marketDataListCurrent.length,
            editStatus: 'added'
        };

        this.marketDataListCurrent = [...this.marketDataListCurrent, newEmptyRow];
        this.marketDataList$.next(this.marketDataListCurrent);

        setTimeout(() => {
            this.gridApi.startEditingCell({
                rowIndex: this.marketDataListCurrent.length - 1,
                colKey: 'securityName'
            });
        }, 500)

    }

    public editRow(row: any): void {
        const newSet = this.marketDataListCurrent.filter(lineItem => {
            return row !== lineItem;
        });
        this.marketDataListCurrent = [...newSet, row];
        // this.marketDataList$.next(this.marketDataListCurrent);
    }

    public removeRow(): void {
        const selectedRows = this.gridApi.getSelectedRows();
        const newSet = this.marketDataListCurrent.filter(lineItem => {
            return selectedRows.every(selectedRow => selectedRow !== lineItem);
        });
        const selectedRows_withoutAddedRow = selectedRows.filter(row => row['editStatus'] !== 'added');
        selectedRows_withoutAddedRow.forEach((row) => {
            row['editStatus'] = 'deleted';
            row['edited'] = true;
        });

        this.marketDataListCurrent = [...newSet, ...selectedRows_withoutAddedRow];
        this.marketDataList$.next(this.marketDataListCurrent);
        this._checkDuplication(this.marketDataListCurrent);
    }


    private _createUpdatePackage() {
        const marketDataListOriginMapping: any = {};
        const marketDataListCurrentMapping: any = {};
        this.marketDataListOrigin.forEach(data => {
            marketDataListOriginMapping[data.mdid] = data;
        });
        this.marketDataListCurrent.forEach(data => {
            marketDataListCurrentMapping[data.mdid] = data;
        });


        const newLineItems = [];
        const updatedLineItems = [];
        const deletedLineItems = [];
        this.marketDataListCurrent.forEach(data => {
            // if (marketDataListOriginMapping[data.mdid] === undefined) {
            //     newLineItems.push(data);
            // }

            if (data['editStatus'] === 'added') {
                newLineItems.push(data);
            }

            if (data['editStatus'] === 'deleted') {
                deletedLineItems.push(data);
            }
        });

        this.marketDataListOrigin.forEach(data => {
            if (marketDataListCurrentMapping[data.mdid] !== undefined) {
                // check if it need update
                const oldData = data;
                const newData = marketDataListCurrentMapping[data.mdid];
                if (_.isEqual(oldData, newData) === false) {
                    updatedLineItems.push(marketDataListCurrentMapping[data.mdid]);
                }
            } 
            // else {
            //     deletedLineItems.push(data);
            // }
        });
        return {
            add: newLineItems,
            update: updatedLineItems,
            delete: deletedLineItems,
        };
    }

    private _checkDuplication(data) {
        const checker: any = {};
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (checker[element.mdid] === undefined) {
                checker[element.mdid] = true;
            } else {

                this.duplicationAlertMessage.visiable = true;
                this.duplicationAlertMessage.text = 'Please remove duplicate line item before saving';
                return true;
                break;
            }
        }
        this.duplicationAlertMessage.visiable = false;
        this.duplicationAlertMessage.text = null;

        return false;
    }

    // private _validateMonitorName() {
    //     if (this.existedMonitorNames.includes(this.monitorName)) {
    //         this.monitorNameAlertMessage.visiable = true;
    //         this.monitorNameAlertMessage.text = 'Monitor name already exists, please use another name';
    //     } else {
    //         this.monitorNameAlertMessage.visiable = false;
    //         this.monitorNameAlertMessage.text = null;
    //     }
    // }

    private _filter(name: string): fromModels.IMonitor[] {
        const filterValue = name.toLowerCase();
        return this.monitors.filter(monitor => monitor.name.toLowerCase().indexOf(filterValue) === 0);
    }

    public displayMonitor(monitor: fromModels.IMonitor): string {
        return monitor && monitor.name ? monitor.name : '';
    }
}



// function customTimeseriesValidator(ctrl: FormControl): any {
//     const form = ctrl.parent;
//     if (!form) {
//         return null;
//     }
//     const marketData = form.get('marketData');

//     if (marketData !== null && marketData.value.length === 0) {
//         return { 'noMarketData': true };
//     }
//     return null;
// }
