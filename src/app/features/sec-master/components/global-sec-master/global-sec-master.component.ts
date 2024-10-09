import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, SimpleChanges, Input, ViewChild, OnDestroy } from '@angular/core';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UntypedFormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import * as fromModels from './../../models/sec-master-global.models';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-global-sec-master',
    templateUrl: './global-sec-master.component.html',
    styleUrls: ['./global-sec-master.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalSecMasterComponent implements OnInit, OnDestroy, OnChanges {

    @ViewChild('sidenav') sidenav: MatSidenav;

    @Input() assetClassFieldMap: fromModels.IAssetClassFieldMap[];
    @Input() assetClassFieldMapLoading: boolean;
    @Input() assetClassFieldMapLoaded: boolean;
    @Input() assetClassFieldMapError: string;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private isChanged = false;

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false
        },
        getRowNodeId: data => data.mapId,
        deltaRowDataMode: false,
        columnDefs: [
            {
                headerName: 'Asset Class MapType',
                field: 'assetClassMapType'
            },
            {
                headerName: '[SM] AssetClass',
                field: 'assetClass'
            },
            {
                headerName: '[CRD] Asset Class',
                field: 'crdAssetClass'
            },
            {
                headerName: 'Bloomberg Field Name',
                field: 'bbgFieldName'
            },
            {
                headerName: 'MKP Field Name',
                field: 'mkpFieldName'
            },
            {
                headerName: 'Priority',
                field: 'priority'
            },
            {
                headerName: 'AssetClassMapTypeId',
                field: 'assetClassMapTypeId',
                editable: false
            },
            {
                headerName: '[SM] AssetClassId',
                field: 'assetClassId',
                editable: false
            },
            {
                headerName: '[CRD] AssetClassId',
                field: 'crdAssetClassId',
                editable: false
            },
            {
                headerName: 'MKPFieldId',
                field: 'mkpFieldId',
                editable: false
            },
            {
                headerName: 'BBGFieldId',
                field: 'bbgFieldId',
                editable: false
            },
            {
                headerName: 'MapId',
                field: 'mapId',
                editable: false
            },
        ],
        getRowStyle: params => {
            if (params.data['isChanged']) {
                return {
                    'font-weight': 'bolder',
                    'color': '#6e8eeccc',
                    'font-style': 'italic',
                };
            }
        },
    };

    date = new UntypedFormControl(new Date());
    serializedDate = new UntypedFormControl((new Date()).toISOString());

    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.assetClassFieldMap && this.gridApi) {
            this.gridApi.setRowData(changes.assetClassFieldMap.currentValue);
            this.gridApi.refreshCells();
        }
    }

    ngOnDestroy(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        if (this.assetClassFieldMap.length > 0) { this.gridApi.setRowData(this.assetClassFieldMap); }
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    onSearch(searchCriteria: string): void {
        this.gridApi.setQuickFilter(searchCriteria);
    }

    onChanges(): void {
    }
}
