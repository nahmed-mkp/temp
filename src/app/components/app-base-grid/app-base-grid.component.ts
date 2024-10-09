import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy  } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColDef, ColGroupDef, Column, RowNode } from 'ag-grid-community';
import { ColumnState } from 'ag-grid-community/dist/lib/columnController/columnController';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { AppGridLayoutManagementComponent } from '../app-grid-layout-management/app-grid-layout-management.component';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppCustomColorPickerComponent } from '../app-custom-color-picker/app-custom-color-picker.component';
import { AppGridGroupingBackgroundConfigurationComponent } from '../app-grid-grouping-background-configuration/app-grid-grouping-background-configuration.component';

@Component({
  selector: 'app-base-grid',
  templateUrl: './app-base-grid.component.html',
  styleUrls: ['./app-base-grid.component.scss'],
})
export class AppBaseGridComponent implements OnInit, OnChanges, OnDestroy {

  @Input() gridItems: any[];
  @Input() columnDefs: ColDef[];           // colDefs might comes in later after the data is load
  @Input() customGridOption: GridOptions;
  @Input() extraOption: any;
  @Input() customGridCallBack: any;
  @Input() colDefs: ColGroupDef[] = [];
  @Input() currentLayoutName: string;
  @Input() targetLayout: any;
  @Input() getNonlinearDataPath: any = undefined;
  @Input() getNonlinearDataPathAdvance: any = undefined;
  @Input() mode = 'basic';
  @Input() primaryGroupingNameIdMaping: any;
  @Input() pageName: string = '';

  @Input() userGridConfig: any;
  @Input() userGroupingStyle: any;
  @Input() userLayoutStyle: any;
  @Output() updateUserGridConfig = new EventEmitter<any>();
  @Output() updateUserGroupingStyle = new EventEmitter<any>();
  @Output() updateUserLayoutStyle = new EventEmitter<any>();

  @Output() saveColumnState = new EventEmitter<{type: string; columnStates: ColumnState[]}>();
  @Output() updateUserLayoutList = new EventEmitter<boolean>();
  @Output() togglePeriodicPullingStatus = new EventEmitter<boolean>();
  @Output() backupGridSetting = new EventEmitter<boolean>();
  @Output() openSecurityEditor = new EventEmitter<RowNode>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private pendingTaskUntilChartReady: any[] = [];
  private dialogRef: MatDialogRef<AppGridLayoutManagementComponent>;
  private dialogRefColorPicker: MatDialogRef<AppCustomColorPickerComponent>;
  private dialogRefGroupingBackgroud: MatDialogRef<AppGridGroupingBackgroundConfigurationComponent>;
  private subscriptions: Subscription[] = [];


  private gridConfig: any = localStorage.getItem('configuration') ? JSON.parse(localStorage.getItem('configuration')) : {
    groupingBackgroundDisplayMode: true,
    columnMenu: true,
    rowClass: 'medium-row',
    rowHeight: 22
  };

  private groupingBackgroundDisplayMode = this.gridConfig['groupingBackgroundDisplayMode'] !== undefined ? this.gridConfig['groupingBackgroundDisplayMode'] : true;

  private groupingStyleDefault = [
    {level: 1, color: '#FFFFFF'},
    {level: 2, color: '#3f51b51f'},
    {level: 3, color: '#3d50b33b'},
    {level: 4, color: '#3d50b359'},
    {level: 5, color: '#3d50b385'},
    {level: 6, color: '#3d50b3ba'},
    {level: 7, color: '#FFFFFF'},
    {level: 8, color: '#FFFFFF'},
    {level: 9, color: '#FFFFFF'},
    {level: 10, color: '#FFFFFF'},
  ];

  private groupingStyle = localStorage.getItem('groupingStyle') !== null && localStorage.getItem('groupingStyle') !== 'undefined'  ?
  JSON.parse(localStorage.getItem('groupingStyle')) : this.groupingStyleDefault;

  public gridOptions: GridOptions = {
    rowData: [],
    // Default column setup
    defaultColDef: {
        cellStyle: params => {
            return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
        },
        valueFormatter: params => {
            if (typeof params.value === 'number') {
                if (params.colDef.field && params.colDef.field.toLowerCase().includes('rate')) {
                    return params.value.toLocaleString(undefined, {maximumFractionDigits: 10});
                } else {
                    return  params.value.toLocaleString(undefined, {maximumFractionDigits: 0});
                }
            }
            if (typeof params.value === 'string' && params.colDef.field && (params.colDef.field.toLowerCase().includes('date')) ) {
                return params.value.split('T')[0];
            }
        },
        filter: 'agSetColumnFilter',
    },

    // columns functional feature
    enableSorting: true,
    enableColResize: true,
    enableFilter: true,

    // rows functional feature
    enableRangeSelection: true,
    rowSelection: 'single',

    // Event handling
    onGridReady: this.onGridReady.bind(this),
    onFirstDataRendered: this.reSizeColumns.bind(this),

    // Misc
    tooltipShowDelay: 100,

     // Basic Context Menu Setup
    getContextMenuItems: (params: any) => {

        const context = this;

        const highlightColumn = {
            name: 'Highlight Column',
            subMenu: [
                {name: 'Blue', action: () => {this.colorChanger(params.column, params.api, '#0032ff38'); }, icon: '<span class="color-icon color-icon-blue"></span>'},
                {name: 'Yellow', action: () => {this.colorChanger(params.column, params.api, '#ffff0040'); }, icon: '<span class="color-icon color-icon-yellow"></span>'},
                {name: 'Red', action: () => {this.colorChanger(params.column, params.api, '#ff000042'); }, icon: '<span class="color-icon color-icon-red"></span>'},
                {name: 'Green', action: () => {this.colorChanger(params.column, params.api, '#00800024'); }, icon: '<span class="color-icon color-icon-green"></span>'},
                {name: 'Purple', action: () => {this.colorChanger(params.column, params.api, '#8000803d'); }, icon: '<span class="color-icon color-icon-purple"></span>'},
                {name: 'Reset', action: () => {this.colorChanger(params.column, params.api, 'initial'); }, icon: '<i class="material-icons small-menu-icon">format_color_reset</i>'},
                {name: 'Custom', action: () => {this.openColorPicker(params.column, params.api); }, icon: '<i class="material-icons small-menu-icon">color_lens</i>'},
            ],
            icon: '<i class="material-icons small-menu-icon">brush</i>',
        };

        const groupingBackground = {
            name: 'Grouping Background',
            subMenu: [
                {name: 'Turn On Background', action: () => this.manageGroupingBackground('on'), icon: `<i class="material-icons small-menu-icon ${context.userGridConfig && context.userGridConfig.groupingBackgroundDisplayMode === true && 'small-menu-icon-highlight'}">visibility</i>`},
                {name: 'Turn Off Background', action: () => this.manageGroupingBackground('off'), icon: `<i class="material-icons small-menu-icon ${context.userGridConfig && context.userGridConfig.groupingBackgroundDisplayMode === false && 'small-menu-icon-highlight'}">visibility_off</i>`},
                {name: 'Custom Background', action: () => this.openGroupingBackgroundManagement(), icon: '<i class="material-icons small-menu-icon">color_lens</i>'},
            ],
            icon: '<i class="material-icons small-menu-icon">group_work</i>',
        };

        // function colorChanger(color: string) {
        //     params.column.colDef = Object.assign({}, params.column.colDef, {cellClass: `column-highlight-${color}`});
        //     params.api.refreshCells({columns: [params.column.colId], force: true});
        // }

        const adjustFontSize = {
            name: 'Display Mode',
            subMenu: [
                {name: 'Large', action: () => {changeFontFize('big'); }, icon: context.userGridConfig && context.userGridConfig.rowClass === 'big-row' && '<span class="color-icon color-icon-blue"></span>'},
                {name: 'Medium', action: () => {changeFontFize('medium'); }, icon: context.userGridConfig && context.userGridConfig.rowClass === 'medium-row' && '<span class="color-icon color-icon-blue"></span>'},
                {name: 'Compact', action: () => {changeFontFize('small'); }, icon: context.userGridConfig && context.userGridConfig.rowClass === 'small-row' && '<span class="color-icon color-icon-blue"></span>'},
            ],
            icon: '<i class="material-icons small-menu-icon">format_size</i>',
        };

        function changeFontFize(size: string) {
            // const gridConfig: any = localStorage.getItem('configuration') ? JSON.parse(localStorage.getItem('configuration')) : {};

            const newUserGridConfig = Object.assign({}, context.userGridConfig);

            if (size === 'big') {
                context.gridOptions.rowHeight = 28;
                context.gridOptions.getRowClass = () => 'big-row';
                newUserGridConfig.rowHeight = 28;
                newUserGridConfig.rowClass = 'big-row';
            }
            if (size === 'medium') {
                context.gridOptions.rowHeight = 22;
                context.gridOptions.getRowClass = () => 'medium-row';
                newUserGridConfig.rowHeight = 22;
                newUserGridConfig.rowClass = 'medium-row';
              }
            if (size === 'small') {
                context.gridOptions.rowHeight = 16;
                context.gridOptions.getRowClass = () => 'small-row';
                newUserGridConfig.rowHeight = 16;
                newUserGridConfig.rowClass = 'small-row';
            }
            context.gridOptions.rowClass = undefined;
            params.api.redrawRows();
            params.api.resetRowHeights();
            // localStorage.setItem('configuration', JSON.stringify(context.gridConfig));
            // context.backupGridSetting.emit(true);

            context.updateUserGridConfig.emit(newUserGridConfig);
        }

        const saveLayout = {
            name: 'Save Layout As',
            action: () => this.saveColumnState.emit({type: 'save', columnStates: params.columnApi.getColumnState()}),
            icon: '<i class="material-icons small-menu-icon">table_chart</i>',
        };

        const updateLayout = {
            name: 'Update Layout',
            action: () => this.saveColumnState.emit({type: 'update', columnStates: params.columnApi.getColumnState()}),
            icon: '<i class="material-icons small-menu-icon">save</i>',
        };

        const layoutConfiguration = {
            name: 'Layout Configuration',
            icon: '<i class="material-icons small-menu-icon">table_chart</i>',
            action: () => {
                this.openLayoutManagement(params.columnApi, this.colDefs);
            }
        };

        const getNonlinearDataPath = {
            name: 'Get Nonlinear Data Path (Dev)',
            icon: '<i class="material-icons small-menu-icon">construction</i>',
            action: () => {
                let path = this.getNonlinearDataPath(params.node, context.primaryGroupingNameIdMaping);
                path = path.join('      ');

                let advancePath = this.getNonlinearDataPathAdvance(params.node);
                advancePath = advancePath.join('      ');

                console.log('what is my path like', path, params);
                setTimeout(() => alert('Nonlinear Data Path is: ' + path + '\nColId/Field: ' + params.column.colId + '\n' +
                '           Advance Path is: ' + advancePath), 100);
            }
        };

        const nonhighlightClass = 'material-icons small-menu-icon';
        const highlightClass = 'material-icons small-menu-icon small-menu-icon-highlight';
        const columnMenuToggle = {
            name: 'Column Menu',
            icon: '<i class="material-icons small-menu-icon">menu</i>',
            subMenu: [
                {name: 'Show', icon: `<i class="${context.userGridConfig && context.userGridConfig.columnMenu === true ? highlightClass : nonhighlightClass}">visibility</i>`, action: () => this.toggleColumMenu(true)},
                {name: 'Hide', icon: `<i class="${context.userGridConfig && context.userGridConfig.columnMenu === false ? highlightClass : nonhighlightClass}">visibility_off</i>`, action: () => this.toggleColumMenu(false)}
            ]
        };

        const systemColorToggle = {
            name: 'System color',
            icon: '<i class="material-icons small-menu-icon">menu</i>',
            subMenu: [
                {name: 'Show', icon: `<i class="${context.userGridConfig && context.userGridConfig.systemColor === true ? highlightClass : nonhighlightClass}">visibility</i>`, action: () => this.toggleSystemColor(true)},
                {name: 'Hide', icon: `<i class="${context.userGridConfig && context.userGridConfig.systemColor === false ? highlightClass : nonhighlightClass}">visibility_off</i>`, action: () => this.toggleSystemColor(false)}
            ]
        };

        const openSecurityEditor = {
            name: 'Security Editor',
            icon: '<i class="material-icons small-menu-icon">search</i>',
            action: () => {
                this.openSecurityEditor.emit(params.node);
            }
        };

        const viewFundingCharges = {
            name: 'View Funding Charges',
            icon: '<i class="material-icons small-menu-icon">search</i>',
            action: () => {
                // this.openSecurityEditor.emit(params.node);
            }
        };


        let contextMenu;
        if (this.mode === 'advance') {
            contextMenu = ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator',
                highlightColumn, adjustFontSize, groupingBackground,  columnMenuToggle, systemColorToggle, 'separator', 
                layoutConfiguration, 'separator', viewFundingCharges
            ];
            
            // if (!environment.production && this.getNonlinearDataPath) {
            if (this.getNonlinearDataPath) {
                contextMenu.push('separator');
                contextMenu.push(getNonlinearDataPath);
            }

            if (params.node.group === false) {
                contextMenu.push('separator');
                contextMenu.push(openSecurityEditor);
            }

        } else {
            if (this.pageName === 'pricing') {
                contextMenu = ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator',
                    highlightColumn, adjustFontSize, 'separator', openSecurityEditor, 'separator'];
            } else {
                contextMenu = ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport'];
            }
        }
        return contextMenu;
    },

    // Grid style

    getRowStyle: params => {
        let style;
        if (this.mode === 'advance' && this.userGridConfig['groupingBackgroundDisplayMode'] ) {
            // if (params.node.level === 1) {
            //     style = {background: '#3f51b51f'};
            // } else if (params.node.level === 2) {
            //     style = {background: '#3d50b33b'};
            // } else if (params.node.level === 3) {
            //     style = {background: '#3d50b359'};
            // } else if (params.node.level === 4) {
            //     style = {background: '#3d50b385'};
            // } else if (params.node.level === 5) {
            //     style = {background: '#3d50b3ba', 'color': 'white'};
            // }
            // if (params.node.group) {
            //     if (params.node.aggData && params.node.aggData['BenchMarkMissing'] >= 1) {
            //         style = Object.assign({}, style, {color: 'red'});
            //     }
            // } else {
            //     if (params.data && params.data['BenchMarkMissing'] >= 1) {
            //         style = Object.assign({}, style, {color: 'red'});
            //     }
            // }
            const targetlevel = params.node.level;
            style = this.userGridConfig['systemColor'] ? {background: 'initial'} : {background: this.userGroupingStyle[targetlevel].color};
            return style;
        } 
        else {
            return {};
        }
    },
  };

    constructor( private dialog: MatDialog) {
        this.renderData = this.renderData.bind(this);
        this.renderCols = this.renderCols.bind(this);
        this.reSizeColumns = this.reSizeColumns.bind(this);
        this.openLayoutManagement = this.openLayoutManagement.bind(this);
        this.manageGroupingBackground = this.manageGroupingBackground.bind(this);
        this.openGroupingBackgroundManagement = this.openGroupingBackgroundManagement.bind(this);
        this.colorChanger = this.colorChanger.bind(this);
        this.toggleColumMenu = this.toggleColumMenu.bind(this);
        this.toggleSystemColor = this.toggleSystemColor.bind(this);
        this._saveStyle = this._saveStyle.bind(this);
    }

    ngOnInit(): void {
        this.gridOptions = Object.assign(this.gridOptions, this.customGridOption);
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.columnDefs && changes.columnDefs.currentValue) {
            if (this.gridApi) {
                this.renderCols();
            } else {
                this.pendingTaskUntilChartReady.push(this.renderCols);
            }
        }

        if (changes.gridItems && changes.gridItems.currentValue) {
            if (this.gridApi) {
                this.renderData();
                this.reSizeColumns();
            } else {
                this.pendingTaskUntilChartReady.push(this.renderData);
                this.pendingTaskUntilChartReady.push(this.reSizeColumns);
            }
        }
    }

    ngOnDestroy() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(sub => sub.unsubscribe());
        }
    }

    onGridReady(params) {
        // this will expose the gridApi and the gridColumnApi to the component scope
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.pendingTaskUntilChartReady.forEach(task => task());
        this.reSizeColumns();

        if (this.gridItems) {
            this.renderData();
        }

        if (this.customGridCallBack) { this.customGridCallBack(params); }
    }

    renderData() {
        // this.gridApi.setColumnDefs(this.createDynamicGridColumn());
        this.gridApi.setRowData(this.gridItems);
    }

    renderCols() {
        this.gridOptions.api.setColumnDefs(this.columnDefs);
        this.reSizeColumns();
    }

    reSizeColumns() {
        if (this.extraOption.sizeColumnsToFit) { this.gridApi.sizeColumnsToFit(); }
        if (this.extraOption.autoSizeColumns) {
        const allColumnIds = [];
        const allColumns = this.gridColumnApi.getAllColumns();
        if (allColumns) {
            allColumns.forEach((column: any) => {
                allColumnIds.push(column.colId);
            });
        }
        this.gridColumnApi.autoSizeColumns(allColumnIds);
        }
    }

    openLayoutManagement(columnApi: ColumnApi, colDefs: ColDef[]) {
        this.togglePeriodicPullingStatus.emit(true);
        this.dialogRef = this.dialog.open(AppGridLayoutManagementComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '65rem',
            height: '50rem',
            data: {
                columnApi: columnApi,
                colDefs: colDefs,
                targetLayout: this.targetLayout,
                // currentLayoutName: (this.targetLayout && this.targetLayout.layoutName) || undefined,
                // default:  (this.targetLayout && this.targetLayout.default) || false
            }
        });

        this.subscriptions.push(this.dialogRef.afterClosed().subscribe(result => {
                this.togglePeriodicPullingStatus.emit(false);
                if (result) {
                    this.updateUserLayoutList.emit(result);
                }
            })
        );
    }

    private openColorPicker(targetColumn: any, gridApi: GridApi) {
        this.dialogRefColorPicker = this.dialog.open(AppCustomColorPickerComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '16rem',
            height: '25.5rem',
        });

        this.subscriptions.push(this.dialogRefColorPicker.afterClosed().subscribe(result => {
                if (result) {
                    targetColumn.colDef = Object.assign({}, targetColumn.colDef, {cellStyle: {
                        ...targetColumn.colDef.cellStyle,
                        'background': result
                    }});
                    gridApi.refreshCells({columns: [targetColumn.colId], force: true});

                    if (this.targetLayout !== undefined) {
                        // this.saveStyle(this.targetLayout.layoutName, targetColumn.colId, {'background': result});
                        this._saveStyle(targetColumn.colId, {'background': result});
                    }
                }
            })
        );
    }

    private colorChanger(targetColumn: any, gridApi: GridApi, color: string) {

        targetColumn.colDef = Object.assign({}, targetColumn.colDef, {cellStyle: {
            ...targetColumn.colDef.cellStyle,
            'background': color
        }});
        gridApi.refreshCells({columns: [targetColumn.colId], force: true});

        if (this.targetLayout !== undefined) {
            // this._saveStyle(this.targetLayout.layoutName, targetColumn.colId, {'background': color});
            this._saveStyle(targetColumn.colId, {'background': color});


        }
    }

    private _saveStyle(colId, style) {

        // let layoutStyle: any = localStorage.getItem('style');
        // if (layoutStyle === null) {
        //     layoutStyle = {};
        // } else {
        //     layoutStyle = JSON.parse(layoutStyle);
        // }

        // if (layoutStyle[layoutName] === undefined) {
        //     layoutStyle[layoutName] = {};
        // }

        // if (style.background === 'initial') {
        //     delete layoutStyle[layoutName]
        // } else {
        //     layoutStyle[layoutName] = Object.assign(layoutStyle[layoutName], {[colId]: style});
        // }

        // const updateLayoutString = JSON.stringify(layoutStyle);
        // localStorage.setItem('style', updateLayoutString);
        // this.backupGridSetting.emit(true);
        let newLayoutStyle = JSON.parse(JSON.stringify(this.userLayoutStyle));
        newLayoutStyle = Object.assign({}, newLayoutStyle, {[colId]: style});
        this.updateUserLayoutStyle.emit(newLayoutStyle);
    }

    private manageGroupingBackground(mode: string) {

        this.userGridConfig = Object.assign({}, this.userGridConfig);

        // const userGridConfig: any = localStorage.getItem('configuration') ? JSON.parse(localStorage.getItem('configuration')) : {};
        if (mode === 'on') {
            console.log('turn on background color');
            // this.groupingBackgroundDisplayMode = true;
            this.userGridConfig['groupingBackgroundDisplayMode'] = true;
            this.gridApi.redrawRows();
        } else if (mode === 'off') {
            // this.groupingBackgroundDisplayMode = false;
            this.userGridConfig['groupingBackgroundDisplayMode'] = false;
            this.gridApi.redrawRows();
        }
        // localStorage.setItem('configuration', JSON.stringify(this.gridConfig));
        // this.backupGridSetting.emit(true);
        this.updateUserGridConfig.emit(this.userGridConfig);
    }

    private openGroupingBackgroundManagement() {
        this.dialogRefGroupingBackgroud = this.dialog.open(AppGridGroupingBackgroundConfigurationComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '13rem',
            height: '21rem',
            data: {
                customStyle: JSON.parse(JSON.stringify(this.userGroupingStyle)),
                defaultStyle: JSON.parse(JSON.stringify(this.groupingStyleDefault))
            }
        });

        this.subscriptions.push(this.dialogRefGroupingBackgroud.afterClosed().subscribe(result => {
            if (result) {
                this.userGroupingStyle = result;
                this.gridApi.redrawRows();
            }
            // this.saveGroupingStyle(result);
            this.updateUserGroupingStyle.emit(this.userGroupingStyle);
        }));
    }

    // private saveGroupingStyle(style) {
    //     if (typeof style === 'object') {
    //         style = JSON.stringify(style);
    //         localStorage.setItem('groupingStyle', style);
    //     }
    //     this.backupGridSetting.emit(true);
    // }

    private toggleColumMenu(mode: boolean) {

        this.userGridConfig = Object.assign({}, this.userGridConfig);
        this.userGridConfig['columnMenu'] = mode;
        this.updateUserGridConfig.emit(this.userGridConfig);

        // this.gridConfig['columnMenu'] = mode;
        // localStorage.setItem('configuration', JSON.stringify(this.gridConfig));
        // this.backupGridSetting.emit(true);


        setTimeout(() => alert('Reload the page to activate the change'), 100);
    }

    private toggleSystemColor(mode: boolean) {
        this.userGridConfig = Object.assign({}, this.userGridConfig);
        this.userGridConfig['systemColor'] = mode;
        this.updateUserGridConfig.emit(this.userGridConfig);
        setTimeout(() => this.gridApi.refreshCells({force: true}), 500);
        setTimeout(() => this.gridApi.redrawRows(), 1000);
    }
}
