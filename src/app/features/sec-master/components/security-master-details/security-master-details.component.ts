import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import * as fromModels from './../../models/sec-master.models';
import { GridApi, GridOptions, RowNode } from 'ag-grid-community';
import { AppGridCustomCellAutocompleteDropdownComponent, AppGridCustomCellMultiTypesEditorComponent } from 'src/app/components';

@Component({
    selector: 'app-sec-master-details',
    templateUrl: './security-master-details.component.html',
    styleUrls: ['./security-master-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecMasterDetailsComponent implements OnInit, OnChanges {

    @Input() selectedSID: number;
    @Input() selectedSecurity: fromModels.ISecurity;
    @Input() securityLoading: boolean;
    @Input() securityLoaded: boolean;
    @Input() securityError: string;

    @Input() securityTags: any[];

    @Output() saveSecurity = new EventEmitter<fromModels.ISecurity>();
    @Output() updateTags = new EventEmitter<fromModels.ISecurityTagUpdateReq[]>();

    private gridApi: GridApi;
    public extraOption = { sizeColumnsToFit: true };

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true
        },
        // getRowNodeId: data => data.futures_id,
        rowSelection: 'single',
        columnDefs: [
            // {headerName: 'createDate', field: 'createDate'},
            // {headerName: 'createName', field: 'createName'},
            // {headerName: 'dateModified', field: 'dateModified'},
            {headerName: 'Tag Name', field: 'tagName', 
                editable: params => params.data['status'] === 'new',
                cellClass: params => params.data['status'] === 'new' && 'column-highlight-yellow',
                cellEditor: 'AppGridCustomCellAutocompleteDropdownComponent',
                cellEditorParams: params => {
                    return {
                        targetField: 'TagName',
                        dropDownData: this.securityTags
                    }
                },
                onCellValueChanged: params => {
                    params.data['tagName'] = params.newValue['TagName'];
                    params.data['tagType'] = params.newValue['TagType'];
                    let node: RowNode = params.node;
                    this.gridApi.redrawRows({rowNodes: [node]})
                }
            },
            {headerName: 'Tag Type', field: 'tagType'},
            {headerName: 'Tag Value', field: 'tagValue', editable: true,
                cellClass: 'column-highlight-yellow',
                cellEditor: 'AppGridCustomCellMultiTypesEditorComponent',
                cellEditorParams: params => {
                    if (params.data['tagType'] === 'str') return {type: 'string'};
                    if (params.data['tagType'] === 'number') return {type: 'number'};
                    if (params.data['tagType'] === 'bit') return {type: 'boolean'};
                },

                onCellValueChanged: params => {
                    if (params.oldValue !== params.newValue) {
                        params.data['status'] = params.data['status'] === 'new' ? 'new' : 'edit' 
                    }
                }
            },
            {headerName: 'Update Name', field: 'updateName'},
            {headerName: 'Update Date', field: 'updateDate'},

            // {headerName: 'sid', field: 'sid'},
            // {headerName: 'userID', field: 'userID'},
        ],

        frameworkComponents: {
            'AppGridCustomCellAutocompleteDropdownComponent': AppGridCustomCellAutocompleteDropdownComponent,
            'AppGridCustomCellMultiTypesEditorComponent': AppGridCustomCellMultiTypesEditorComponent
        }

    }




    constructor() { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.selectedSecurity && changes.selectedSecurity.currentValue) {
            if (this.gridApi && this.selectedSecurity.tags) {
                this.gridApi.setRowData(this.selectedSecurity.tags);
            }
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        if (this.selectedSecurity && this.selectedSecurity.tags) {
            this.gridApi.setRowData(this.selectedSecurity.tags);
        }
    }

    public onAddNewTag() {
        const newTag = this._createNewLineItem();
        this.gridApi.setRowData([newTag, ...this.selectedSecurity.tags]);
    }

    public onSave() {
        const collectUpdatedRow = [];
        this.gridApi.forEachNode(node => {
            if (node.data['status'] === 'new' || node.data['status'] === 'edit') {
                collectUpdatedRow.push(node.data);
            }
        });
        const formattedReq: fromModels.ISecurityTagUpdateReq[] = collectUpdatedRow.map(rowData => {
            return {
                sid: rowData['sid'],
                tagValue: rowData['tagValue'],
                tagType: rowData['tagType'],
                tagName: rowData['tagName']
            }
        });
        console.log('formattedReq', formattedReq);
        this.updateTags.emit(formattedReq);
    }



    // utitlity 

    private _createNewLineItem(): fromModels.ISecurityTagUpdateReq {
        return {
            sid: this.selectedSecurity.sid,
            tagType: null,
            tagName: null,
            tagValue: null,
            status: 'new'
        }
    }
}
