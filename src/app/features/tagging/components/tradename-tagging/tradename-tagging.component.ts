import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { CheckboxCellRendererComponent } from '../checkbox-renderer/checkbox-renderer.component';
import { TagLookupEditorComponent } from '../tag-lookup-editor/tag-lookup-editor.component';
import * as _ from 'lodash';

import * as fromModels from '../../models';

@Component({
    selector: 'app-tradename-tagging',
    templateUrl: './tradename-tagging.component.html',
    styleUrls: ['./tradename-tagging.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeNameTaggingComponent implements OnInit, OnDestroy, OnChanges {

    @Input() tagTypes: any;

    @Input() tradeNameTags: any[];
    @Input() tradeNameTagsLoading: boolean;
    @Input() tradeNameTagsLoaded: boolean;
    @Input() tradeNameTagsError: string;
    @Input() tradeNameTagsUpdateResult: any[];

    @Input() lookups: any;

    @Output() onUpdateTradeNameTag = new EventEmitter<fromModels.ITradeNameTagChanges>();

    public tradeNameTagList: any[];

    public searchCriteria: string;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public changes: any = {};
    public origValues: any = {};

    public sidePane = 'newTradeName';
    public editable = false;

    public originalTags: any[];

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            editable: true
        },
        getRowNodeId: data => data.TID,
        deltaRowDataMode: false,

        rowSelection: 'multiple',
        suppressRowClickSelection: true,
        context: this,
        columnDefs: [],
        frameworkComponents: {
            'TagLookupEditorComponent': TagLookupEditorComponent,
            'CheckboxCellRendererComponent': CheckboxCellRendererComponent
        },
        getRowStyle: params => {
            if (params.data['edited'] === true) {
                return {
                    'font-weight': 'bolder',
                    'color': '#6e8eeccc',
                    'font-style': 'italic',
                };
            }
        },
    };

    constructor(private utilities: UtilityService, private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.tagTypes && changes.tagTypes.currentValue) {
            // console.log('this.tagTypes', this.tagTypes);
            this.tradeNameTagList = [...changes.tagTypes.currentValue['TradeNameTags']];
        }

        if (changes.tradeNameTags && changes.tradeNameTags.currentValue.length > 0 && this.tradeNameTagList && this.tradeNameTagList.length > 0) {
            this.gridApi.setColumnDefs([]);
            this.gridApi.setColumnDefs(this.getColumnDefs());
            this.gridApi.setRowData(this.tradeNameTags);
            this.gridApi.refreshCells();
        }

        if (changes.tradeNameTagsUpdateResult && changes.tradeNameTagsUpdateResult.currentValue) {
            this.gridApi.applyTransaction({update: this.tradeNameTagsUpdateResult})
        }
    }

    ngOnDestroy(): void {
        // NOOP
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;

        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(this.getColumnDefs());

        if (this.tradeNameTags.length > 0) {
            this.gridApi.setRowData(this.tradeNameTags);
        }
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    onSearch(searchCriteria: string): void {
        this.gridApi.setQuickFilter(searchCriteria);
    }

    getColumnDefs(): any {
        const editable = false;
        const colDefs: any[] = [];

        colDefs.push({
                headerName: 'Active',
                minWidth: 40,
                field: 'Active',
                sortable: false,
                editable: false,
                sort: 'descending',
                type: 'boolean',
                sortedAt: 0,
                cellRenderer: 'CheckboxCellRendererComponent',
                cellStyle: (params) => {
                    return params.context.getCellStyle(params.data['Active'], 'boolean', '#fbc19b');
                }
            });
        colDefs.push({
                headerName: 'Date Added',
                minWidth: 90,
                field: 'DateAdded',
                sortable: false,
                editable: false,
                cellStyle: (params) => {
                    return params.context.getCellStyle(params.data['Active'], 'date', '#fbc19b');
                }
            });
        colDefs.push({
                headerName: 'TID',
                minWidth: 80,
                field: 'TID',
                sortable: true,
                sortedAt: 1,
                editable: false,
                sort: 'descending',
                cellStyle: (params) => {
                    return params.context.getCellStyle(params.data['Active'], 'number', '#fbc19b');
                }
            });
        colDefs.push({
                headerName: 'TradeID',
                minWidth: 80,
                field: 'TradeID',
                sortable: false,
                editable: false,
                cellStyle: (params) => {
                    return params.context.getCellStyle(params.data['Active'], 'text', '#fbc19b');
                }
            });
        colDefs.push({
                headerName: 'Name',
                field: 'TradeName',
                minWidth: 300,
                sortable: false,
                editable: false,
                checkboxSelection: true,
                cellStyle: (params) => {
                    return params.context.getCellStyle(params.data['Active'], 'text', '#fbc19b');
                }
            });
        colDefs.push({
                headerName: 'Trade Group (If Different)',
                field: 'TradeGroupIfDifferent',
                minWidth: 200,
                sortable: false,
                editable: false,
                cellStyle: (params) => {
                    return params.context.getCellStyle(params.data['Active'], 'text', '#fbc19b');
                }
            });

        if (this.tradeNameTagList && this.tradeNameTagList.length > 0) {
            this.tradeNameTagList.forEach(tag => {
                const tagName = tag['TagName'];
                const tagType = tag['TagType'];
                const component = this.getCellEditorComponent(tagName);
                const header = this.getHeaderFromTagName(tagName);
                const normalizedType = this.getCellType(tagType);
                const colDef = {
                    headerName: header,
                    field: tagName,
                    minWidth: 210,
                    sortable: false,
                    cellStyle: (params) => {
                        return params.context.getCellStyle(params.data['Active'], normalizedType, '#fffeee');
                    },
                    cellEditor: component,
                    cellEditorParams: (params) => {
                        return {
                            'values': params.context.getLookupValues(tagName)
                        };
                    },
                    onCellValueChanged: (params) => {
                        // return params.context.updateTradeTag(params, tagName);
                        params.context.updateTradeTag(params, tagName);
                    }
                };
                if (normalizedType === 'boolean') {
                    colDef['cellRenderer'] = 'CheckboxCellRendererComponent';
                }

                colDefs.push(colDef);
            });
        }
        return colDefs;
    }

    getCellStyle(isActive: boolean, type: string, color: string): any {
        const result = {};
        if (isActive) {
            result['background-color'] = color;
        }

        if (type === 'boolean') {
            result['justify-content'] = 'center';
        } else if (type !== 'text') {
            result['justify-content'] = 'flex-end';
        }
        return result;
    }

    getLookupValues(propertyName: string): string[] {
        const result = [''];
        if (this.lookups !== undefined && this.lookups !== null) {
            const tradeTags = this.lookups['TradeTags'] || {};
            if (tradeTags[propertyName] !== undefined) {
                result.push(...tradeTags[propertyName].filter(value => value !== '' && value !== null));
            }
        }
        return result;
    }

    updateTradeTag(params: any, propertyName: string) {
        const tradeNameTagListDict = _.keyBy(this.tradeNameTagList, 'TagName');
        const newValue = params.newValue;
        const oldValue = params.oldValue;

        if (newValue !== oldValue) {
            const updateTagValue: fromModels.ITradeNameTagChanges = {
                tid: params.node.data['TID'],
                tagName: propertyName,
                tagValue: newValue,
                tagType: tradeNameTagListDict[propertyName] && tradeNameTagListDict[propertyName].TagType || 'str',
                action: (newValue !== undefined && newValue !== '') ? 'update' : 'delete',
            };
            this.onUpdateTradeNameTag.emit(updateTagValue);
        }


    }

    resetChanges(): void {
        this.changes = {};
        this.origValues = {};
    }

    isDirty(): boolean {
        const tids = Object.keys(this.changes);
        if (tids.length > 0) {
            return true;
        }
        return false;
    }

    getChanges(): any {
        return this.changes;
    }

    private getHeaderFromTagName(tagName: string): string {
        if (tagName === 'TradeGroup') {
            return 'Trade Group (UserSortTag3)';
        } else if (tagName === 'CustomTag1') {
            return 'UserSortTag1 (By Trade)';
        } else if (tagName === 'CustomTag2') {
            return 'UserSortTag2 (By Trade)';
        } else if (tagName === 'CustomTag4') {
            return 'UserSortTag4 (By Trade)';
        } else if (tagName === 'CustomTag5') {
            return 'UserSortTag5 (By Trade)';
        } else {
            return tagName;
        }
    }

    private getCellType(tagType: string): string {
        if (tagType === 'bit') {
            return 'boolean';
        } else if (tagType === 'int' || tagType === 'float') {
            return 'number';
        } else {
            return 'text';
        }
    }

    private getCellEditorComponent(tagName: string): string {
        if (tagName === 'TradeGroup' || tagName === 'MacroTheme' || tagName === 'CustomTag1'
            || tagName === 'CustomTag2' || tagName === 'CustomTag4' || tagName === 'CustomTag5') {
            return 'TagLookupEditorComponent';
        }
        return 'agRichSelectCellEditor';
    }
}
