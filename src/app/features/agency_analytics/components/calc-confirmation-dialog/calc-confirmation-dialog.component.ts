import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import * as fromModels from './../../models/agency-analytics.models';
import { ColumnApi, GridApi, GridOptions, ColDef } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { AppCustomGridCellCheckboxComponent } from 'src/app/components';


@Component({
    selector: 'app-agency-calc-confirmation-dialog',
    templateUrl: './calc-confirmation-dialog.component.html',
    styleUrls: ['./calc-confirmation-dialog.component.scss']
})
export class YBCalcConfirmationDialogComponent implements OnInit {

    public portfolio: fromModels.IPortfolio;
    public items: fromModels.ISecurityDetail[] | fromModels.ISecurity[];
    public isPartial: boolean = false;
    public jobType: string;
    public mode: "Live" | "Close";


    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private columnDefs: ColDef[];
    private callBackInitialized = false;

    public customGridOption: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return result;
            },
            minWidth: 75,
            sortable: false,
            suppressMenu: true
        },

        sideBar: false,
        suppressColumnVirtualisation: true,
        rowSelection: "multiple",
        floatingFilter: true,
        deltaRowDataMode: true,
        context: this,
        skipHeaderOnAutoSize: true,
        enableSorting: true,

        getRowNodeId: data => {
            if (this.isPartial) { 
                return data['security']['identifier'];
            } else { 
                return data['identifier'];
            }
            
        },
        frameworkComponents: {
            'AppCustomGridCellCheckboxComponent': AppCustomGridCellCheckboxComponent
        }
    };

    public extraOption = {
        // sizeColumnsToFit: false
    };

    constructor(private utilities: UtilityService,
        public dialogRef: MatDialogRef<YBCalcConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.portfolio = data.portfolio;
        this.items = data.items;
        this.isPartial = data.isPartial;
        this.jobType = data.jobType;
        this.mode = data.mode;
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() { }

    onClose(res?: any) {
        this.dialogRef.close(res);
    }

    onRunAll(): void { 
        this.onClose({
            'confirmType': 'runAll', 
            'items': this.items, 
            'isPartial': this.isPartial, 
            'jobType': this.jobType,
            'portfolio': this.portfolio
        });
    }

    onRunNew(): void { 
        this.onClose({
            'confirmType': 'runAll',
            'items': this.items,
            'isPartial': this.isPartial,
            'jobType': this.jobType,
            'portfolio': this.portfolio
        });
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        if (this.items && this.items.length > 0) {
            this.columnDefs = this.getColumnDefs();
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.items);
        }
    }

    private getColumnDefs(): ColDef[] {
        const result: ColDef[] = [{
            headerName: 'Display Name',
            field: 'security',
            width: 150,
            sort: 'asc',
            pinned: 'left',
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return result;
            },
            valueGetter: (params) => {
                if (this.isPartial) { 
                    return params.node.data['security']['inputName'];
                } else { 
                    return params.node.data['inputName'];
                }                
            }
        }, {
            headerName: 'CUSIP/Identifier',
            field: 'security',
            width: 120,
            maxWidth:120,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return result;
            },
            valueGetter: (params) => {

                if (this.isPartial) {
                    return params.node.data['security']['identifier'];
                } else {
                    return params.node.data['identifier'];
                }
            }
        }, {
            headerName: 'Input Type',
            field: 'security',
            width: 80,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return result;
            },
            valueGetter: (params) => {
                if (this.isPartial) {
                    return params.node.data['security']['inputType'];
                } else {
                    return params.node.data['inputType'];
                }
            }
        }, {
            headerName: 'Input Value',
            field: 'security',
            width: 80,
            maxWidth: 80,
            valueFormatter: (params) => {
                const inputType = params.data['security']['inputType'];
                const inputValue = this.mode === 'Live' ? params.data['security']['inputValueLive'] :
                    params.data['security']['inputValueClose'];
                if (inputType === 'Price') {
                    return this.utilities.decimalToTicks(inputValue);
                } else {
                    return inputValue;
                }
            },
            valueGetter: (params) => {
                const inputValue = this.mode === 'Live' ? params.data['security']['inputValueLive'] :
                    params.data['security']['inputValueClose'];
                return inputValue;
            }
            }, {
                headerName: 'YB Model',
                field: 'modelCode',
                maxWidth: 80,
                valueGetter: (params) => {
                    return params.data['security']['modelCode'];
                }
            }, {
                headerName: 'Price Date',
                field: 'priceDate',
                maxWidth: 80,
                valueGetter: (params) => {
                    return params.data['security']['priceDate'];
                }
            }, {
                headerName: 'Settle Date',
                field: 'settlementDate',
                maxWidth: 80,
                valueGetter: (params) => {
                    return params.data['security']['settlementDate'];
                }
            }, {
                headerName: 'Dials',
                field: 'dial',
                maxWidth: 80,
                valueGetter: (params) => {
                    return params.data['security']['dialName'];
                }
            }, {
                colId: 'includePartialDuration',
                headerName: 'Include Partials',
                field: 'includePartialDuration',
                maxWidth: 50,
                cellEditor: 'agCheckboxCellEditor',
                cellRenderer: 'AppCustomGridCellCheckboxComponent',
                cellRendererParams: { editable: false },                
                valueGetter: (params) => {
                    return params.data['security']['includePartialDuration'];
                },
                valueSetter: (params) => {
                    params.data['security']['includePartialDuration'] = params.newValue;
                    return true;
                }
            }, {
                colId: 'otherDurations',
                headerName: 'Include Additional Duration',
                field: 'otherDurations',                
                maxWidth: 50,
                cellRenderer: 'AppCustomGridCellCheckboxComponent',
                cellRendererParams: { editable: false },
                valueGetter: (params) => {
                    return params.data['security']['otherDurations'];
                },
                valueSetter: (params) => {
                    alert(`otherDurations: ${params.newValue}`);
                    params.data['security']['otherDurations'] = params.newValue;
                    return true;
                }
            }, {
                headerName: 'Partials',
                headerTooltip: 'Partial Durations',
                maxWidth: 150,
                editable: false,
                valueGetter: (params) => {
                    if (params.data['security']['partials'] && params.data['security']['partials'].length > 0) {
                        return params.data['security']['partials'].join(', ');
                    }
                }
            }, 
            {
            headerName: 'Has Results',
            field: 'security',
            maxWidth: 80,
            cellRenderer: 'AppCustomGridCellCheckboxComponent',
            cellRendererParams: { editable: false },
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
            },
            valueGetter: (params) => {
                const jobType = params.context.jobType;
                switch(jobType) { 
                    case "Price/Yield":
                        return params.data.hasPYCalc;
                    case "Scenario":
                        return params.data.hasROR;
                    case "Actual vs. Projected":
                        return params.data.hasActVsProj;
                }
                return false;
            }
        }];
        return result;
    }

}
