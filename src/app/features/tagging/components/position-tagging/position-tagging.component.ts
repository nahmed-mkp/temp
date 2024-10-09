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
    selector: 'app-position-tagging',
    templateUrl: './position-tagging.component.html',
    styleUrls: ['./position-tagging.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionTaggingComponent implements OnInit, OnDestroy, OnChanges {

    @Input() tagTypes: any[];
    public positionTagList: any[];

    @Input() positionTags: any[];
    @Input() positionTagsLoading: boolean;
    @Input() positionTagsLoaded: boolean;
    @Input() positionTagsError: string;
    @Input() positionTagsUpdateResult: any[];

    @Input() lookups: any;

    @Output () onUpdatePositionTag = new EventEmitter<fromModels.IPositionTagChangesAdvance[]>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public changes: any = {};
    public origValues: any = {};

    public sidePane = 'newposition';
    public editable = false;

    public originalTags: any[];
    
    private selectedRow: any = {};

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            editable: true
        },
        getRowNodeId: (data) => {
            return `${data.FundID}|${data.PodID}|${data.TID}|${data.SID}`;
        },
        deltaRowDataMode: false,
        rowSelection: 'multiple',
        suppressRowClickSelection: true,
        context: this,
        columnDefs: [
            {
                headerName: 'Fund',
                minWidth: 250,
                field: 'FundName',
                sortable: true,
                editable: false,
                checkboxSelection: true,
                cellStyle: (params) => {
                    return params.context.getCellStyle('text', '#fbc19b');
                }
            },
            {
                headerName: 'Pod',
                minWidth: 200,
                field: 'PodName',
                sortable: true,
                sort: 'asc',
                sortedAt: 1,
                editable: false,
                cellStyle: (params) => {
                    return params.context.getCellStyle('text', '#fbc19b');
                }
            },
            {
                headerName: 'TradeName',
                minWidth: 250,
                field: 'TradeName',
                sort: 'asc',
                sortedAt: 0,
                sortable: true,
                editable: false,
                cellStyle: (params) => {
                    return params.context.getCellStyle('text', '#fbc19b');
                }
            },
            {
                headerName: 'Security',
                field: 'SecurityName',
                minWidth: 300,
                sortable: true,
                editable: false,
                cellStyle: (params) => {
                    return params.context.getCellStyle('text', '#fbc19b');
                }
            },
            {
                headerName: 'SortTag1',
                field: 'SortTag1',
                minWidth: 200,
                sortable: false,
                cellStyle: (params) => {
                    return params.context.getCellStyle('text', '#fffeee');
                },
                onCellValueChanged: (params) => {
                    return params.context.updatePositionTag(params, 'SortTag1');
                }
            },
            {
                headerName: 'SpecOrHedge',
                field: 'SpecOrHedge',
                minWidth: 250,
                sortable: false,
                cellStyle: (params) => {
                    return params.context.getCellStyle('text', '#fffeee');
                },
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: (params) => {
                    return {
                        'values': [null, 'Spec', 'Hedge']
                    };
                },
                onCellValueChanged: (params) => {
                    return params.context.updatePositionTag(params, 'SpecOrHedge');
                }
            },
            {
                headerName: 'ZeroRisk',
                field: 'ZeroRisk',
                minWidth: 150,
                sortable: false,
                type: 'boolean',
                cellRenderer: 'CheckboxCellRendererComponent',
                cellStyle: (params) => {
                    return params.context.getCellStyle('boolean', '#fffeee');
                },
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: (params) => {
                    return {
                        'values': [null, true, false]
                    };
                },
                onCellValueChanged: (params) => {
                    return params.context.updatePositionTag(params, 'ZeroRisk');
                }
            },
            {
                headerName: 'Long/Short',
                field: 'LongShortPosition',
                minWidth: 150,
                sortable: false,
                cellStyle: (params) => {
                    return params.context.getCellStyle('text', '#fffeee');
                },
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: (params) => {
                    return {
                        'values': [null, 'Long', 'Short']
                    };
                },
                onCellValueChanged: (params) => {
                    return params.context.updatePositionTag(params, 'LongShortPosition');
                }
            },
            {
                headerName: 'Long/Short (Risk)',
                field: 'LongShortRiskPosition',
                minWidth: 150,
                sortable: false,
                cellStyle: (params) => {
                    return params.context.getCellStyle('text', '#fffeee');
                },
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: (params) => {
                    return {
                        'values': [null, 'Long', 'Short']
                    };
                },
                onCellValueChanged: (params) => {
                    return params.context.updatePositionTag(params, 'LongShortRiskPosition');
                }
            },
            {
                headerName: 'MaxSizeApproved',
                field: 'MaxSizeApproved',
                minWidth: 150,
                sortable: false,
                type: 'number',
                cellStyle: (params) => {
                    return params.context.getCellStyle('text', '#fffeee');
                },
                onCellValueChanged: (params) => {
                    return params.context.updatePositionTag(params, 'MaxSizeApproved');
                }
            }
        ],
        frameworkComponents: {
            'TagLookupEditorComponent': TagLookupEditorComponent,
            'CheckboxCellRendererComponent': CheckboxCellRendererComponent
        },
        getRowStyle: params => {
            if (params.data['isChanged']) {
                return {
                    'font-weight': 'bolder',
                    'color': '#6e8eeccc',
                    'font-style': 'italic',
                };
            }
        },

        onRowSelected: params => {
            if (params.node.isSelected()) {
                this.selectedRow[params.node.id] = params.node.data;
            } else {
                delete this.selectedRow[params.node.id];
            }
            console.log('selected row', this.selectedRow);
        }
    };

    constructor(private utilities: UtilityService, private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.tagTypes && changes.tagTypes.currentValue && changes.tagTypes.currentValue['PositionTags']) {
            this.positionTagList = [...changes.tagTypes.currentValue['PositionTags']];
        }

        if (changes.positionTags && changes.positionTags.currentValue && this.gridApi) {
            this.gridApi.setRowData(changes.positionTags.currentValue);
            this.gridApi.refreshCells();
        }

        if (changes.positionTagsUpdateResult && changes.positionTagsUpdateResult.currentValue) {
            this.gridApi.applyTransaction({update: this.positionTagsUpdateResult});
        }
    }

    ngOnDestroy(): void {
        // NOOP
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        if (this.positionTags.length > 0) { this.gridApi.setRowData(this.positionTags); }
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    onSearch(searchCriteria: string): void {
        this.gridApi.setQuickFilter(searchCriteria);
    }

    getCellStyle(type: string, color: string): any {
        const result = {};
        result['background-color'] = color;
        if (type === 'boolean') {
            result['justify-content'] = 'center';
        } else if (type !== 'text') {
            result['justify-content'] = 'flex-end';
        }
        return result;
    }

    getLookupValues(propertyName: string): string[] {
        let result = [];
        if (this.lookups !== undefined && this.lookups !== null) {
            const tradeTags = this.lookups['TradeTags'] || {};
            if (tradeTags[propertyName] !== undefined) {
                result = tradeTags[propertyName];
            }
        }
        return result;
    }

    updatePositionTag(params: any, propertyName: string) {
        const newValue = params.newValue;
        const allSelectedRow = Object.keys(this.selectedRow).map(key => this.selectedRow[key]);
        if (allSelectedRow.length > 0) {
            const payload = this.getTagUpdateRequestPayload(newValue, propertyName);
            this.updateSelectedRowTagValue(newValue, propertyName);
            this.onUpdatePositionTag.emit(payload);
            console.log('payload', payload);
        } else {
            const positionTagListDict = _.keyBy(this.positionTagList, 'TagName');
            const payload = this.getTagUpdateForRow(params.data, propertyName, newValue, positionTagListDict);
            this.onUpdatePositionTag.emit([payload]);
            console.log('payload', payload);
        }
    }

    private getTagUpdateRequestPayload(value, propertyName: string): fromModels.IPositionTagChangesAdvance[] {
        const positionTagListDict = _.keyBy(this.positionTagList, 'TagName');
        const allSelectedRow = Object.keys(this.selectedRow).map(key => this.selectedRow[key]);
        const updatePayload = allSelectedRow.map(row => {
            return this.getTagUpdateForRow(row, propertyName, value, positionTagListDict);
        });
        return updatePayload;
    }

    private getTagUpdateForRow(row: any, propertyName: string, value: any, positionTagListDict: any): fromModels.IPositionTagChangesAdvance {
        const updateTagValue: fromModels.IPositionTagChangesAdvance = {
            fundid: row['FundID'],
            podid: row['PodID'],
            tid: row['TID'],
            sid: row['SID'],

            tagName: propertyName,
            tagValue: value,
            tagType: positionTagListDict[propertyName] && positionTagListDict[propertyName].TagType || 'str',
            action: (value !== undefined && value !== '' && value !== null) ? 'update' : 'delete',
        };
        return updateTagValue;
    }

    private updateSelectedRowTagValue(value, propertyName) {
        const allSelectedRow = Object.keys(this.selectedRow).map(key => this.selectedRow[key]);
        allSelectedRow.forEach(row => {
            row[propertyName] = value;
        });

        this.gridApi.applyTransaction({
            update: [...allSelectedRow]
        });
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
        return {};
    }

}
