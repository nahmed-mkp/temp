import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ColumnApi, GridApi, GridOptions, ColDef } from 'ag-grid-community';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { UtilityService } from 'src/app/services';
import { AppCustomGridCellCheckboxComponent } from 'src/app/components';

import * as fromModels from './../../models/agency-dials.models';
import { DialNameDialogComponent } from '../dial-name-dialog/dial-name-dialog.component';
import { Subscription } from 'rxjs';
import { DialDeleteDialogComponent } from '../dial-delete-dialog/dial-delete-dialog.component';


@Component({
    selector: 'app-agency-dials-viewer',
    templateUrl: './dials-viewer.component.html',
    styleUrls: ['./dials-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialsViewerComponent implements OnInit, OnChanges, OnDestroy {

    @Input() dialId: string;
    @Input() dialDetail: fromModels.IDialDetail;
    @Input() dialLoading: boolean;
    @Input() dialLoaded: boolean;
    @Input() dialError: string;
    
    @Output() createDial: EventEmitter<fromModels.INewDialDetail> = new EventEmitter<fromModels.INewDialDetail>();
    @Output() updateDial: EventEmitter<fromModels.IDialDetail> = new EventEmitter<fromModels.IDialDetail>();
    @Output() cloneDial: EventEmitter<fromModels.IClonedDialDetail> = new EventEmitter<fromModels.IClonedDialDetail>();
    @Output() deleteDial: EventEmitter<fromModels.IDialDetail> = new EventEmitter<fromModels.IDialDetail>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private columnDefs: ColDef[];
    private callBackInitialized = false;

    private subscriptions$: Subscription[] = [];

    public customGridOption: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                const value = params.value;
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return result;
            },
            minWidth: 75,
            sortable: false,
            suppressMenu: true
        },

        sideBar: false,
        suppressColumnVirtualisation: true,
        rowSelection: "single",
        floatingFilter: true,
        immutableData: false,
        context: this,
        skipHeaderOnAutoSize: true,
        enableSorting: true,

        getRowNodeId: data => {
            return data['dial'];
        },
        frameworkComponents: {
            'AppCustomGridCellCheckboxComponent': AppCustomGridCellCheckboxComponent
        }
    };

    public extraOption = {
        sizeColumnsToFit: true
    };

    constructor(private utilities: UtilityService, private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnDestroy(): void {
        this.subscriptions$.forEach((subscription) => {
            subscription.unsubscribe();
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.dialDetail && changes.dialDetail.currentValue) { 
            if (this.gridApi) {
                this.columnDefs = this.getColumnDefs(changes.dialDetail.currentValue);
                this.gridApi.setColumnDefs(this.columnDefs);
                this.gridApi.setRowData(this.dialsToRows(changes.dialDetail.currentValue));
                this.gridApi.sizeColumnsToFit();
            }
        } else { 
            this.gridApi.setRowData([]);
            this.gridApi.sizeColumnsToFit();
        }
    }

    ngOnInit() { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        if (this.dialDetail) {
            this.columnDefs = this.getColumnDefs(this.dialDetail);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.dialsToRows(this.dialDetail));
        }
    }

    public onSave(e: any): void { 
        if (this.dialDetail.dialId === 'default') { 
            const dialogRef = this.dialog.open(DialNameDialogComponent, {
                hasBackdrop: true,
                disableClose: true,
                panelClass: 'event-analysis-pop-up-panel',
                width: '40rem',
                height: '12rem',
                data: {
                    mode: 'new'
                }
            });
            this.subscriptions$.push(dialogRef.afterClosed()
                .subscribe((result) => {
                    if (result) { 
                        const newDetail: fromModels.INewDialDetail = Object.assign({}, this.dialDetail, {newName: result});
                        this.createDial.emit(newDetail);
                    }
                }));
        } else {
            this.updateDial.emit(this.dialDetail);
        }
    }

    public onClone(e: any): void { 
        const dialogRef = this.dialog.open(DialNameDialogComponent, {
            hasBackdrop: true,
            disableClose: true,
            panelClass: 'event-analysis-pop-up-panel',
            width: '40rem',
            height: '12rem'
        });
        this.subscriptions$.push(dialogRef.afterClosed()
            .subscribe((result) => {
                if (result) {
                    const clonedDetail: fromModels.IClonedDialDetail = Object.assign({}, this.dialDetail, { cloneName: result });
                    this.cloneDial.emit(clonedDetail);
                }
            }));        
    }

    public onDelete(e: any): void {
        const dialogRef = this.dialog.open(DialDeleteDialogComponent, {
            hasBackdrop: true,
            disableClose: true,
            panelClass: 'event-analysis-pop-up-panel',
            width: '40rem',
            height: '12rem',
            data: {
                dialName: this.dialDetail.dialName
            }
        });
        this.subscriptions$.push(dialogRef.afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.deleteDial.emit(this.dialDetail);
                }
            }));
    }

    private getColumnDefs(dialDetail: fromModels.IDialDetail): ColDef[] {
        const result: ColDef[] = [{
            field: 'dial',
            headerName: 'Dial',
            cellStyle: params => {
                const value = params.value;
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return result;
            },
            sortable: true
        }];
        if (dialDetail) { 
            Object.keys(dialDetail['dials']).forEach((key) => {
                result.push({
                    field: key,
                    headerName: key, 
                    maxWidth: 80,
                    cellStyle: params => {
                        const value = params.value;
                        let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                        return result;
                    },
                    editable: true,
                    type: 'numericColumn',
                    sortable: false,
                    valueSetter: (params) => {
                        const dialType = params.colDef.field;
                        const dialName = params.data['dial'];
                        const dialDetail = {...params.context.dialDetail};

                        let valToUpdate = dialDetail['dials'][dialType][dialName];
                        if (valToUpdate.hasOwnProperty('value')) { 
                            valToUpdate['value'] = parseFloat(params.newValue);
                        } else { 
                            dialDetail['dials'][dialType][dialName] = parseFloat(params.newValue);
                        }
                        params.data[dialType] = parseFloat(params.newValue);
                        // console.log(this.dialsToRows(dialDetail));
                        this.dialDetail = {...dialDetail};
                        return true;
                    }
                })

            });
        }
        return result;
    }

    private dialsToRows(dialDetail: fromModels.IDialDetail): any[] { 
        const columns: string[] = [];
        const reversePropMap: {[id: string]: string[]} = {};
        const result: any[] = [];
        if (dialDetail) { 
            const dials = dialDetail['dials'];
            Object.keys(dials).forEach((key) => {
                columns.push(key);
                Object.keys(dials[key]).forEach((dial) => {
                    if (reversePropMap[dial] === undefined) { 
                        reversePropMap[dial] = [];
                    }
                    reversePropMap[dial].push(key);
                })
            });

            Object.keys(reversePropMap).forEach((prop: string) => {
                let row = {'dial': prop};
                reversePropMap[prop].forEach((col: string) => {
                    let objVal = dials[col][prop];
                    if (objVal.hasOwnProperty('value')) { 
                        row[col] = objVal['value'];
                    } else { 
                        row[col] = objVal;
                    }
                });
                result.push(row);
            })
        }
        return result;
    }
}
