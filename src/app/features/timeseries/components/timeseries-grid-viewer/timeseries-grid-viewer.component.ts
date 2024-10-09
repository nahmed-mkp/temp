import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { CellClickedEvent, CellValueChangedEvent, ColumnApi, GridApi, GridOptions, ICellRendererParams, RowClickedEvent } from 'ag-grid-community';
import * as fromRootStore from '../../../../store';
import * as fromStore from '../../store';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import * as fromModels from '../../models';
import { TimeseriesDeleteCellRendererComponent } from '../cell-renderers/delete-renderer';
import { TimeseriesFavoriteCellRendererComponent } from '../cell-renderers/favorite-renderer';
import { TimeseriesAxisCellRendererComponent } from '../cell-renderers/axis-renderer';
import { TimeseriesVariableCellRendererComponent } from '../cell-renderers/variable-renderer';
import { TimeseriesRegressionCellRendererComponent } from '../cell-renderers/regression-renderer';
import { PortfolioUrlErrorDialogViewerComponent } from '../dialog-viewers/portfolio-url-error-dialog-viewer/portfolio-url-error-dialog-viewer.component';
import { isString } from 'highcharts';

@Component({
    selector: 'app-timeseries-grid-viewer-component',
    templateUrl: './timeseries-grid-viewer.component.html',
    styleUrls: ['./timeseries-grid-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesGridViewerComponent implements OnInit, OnChanges {

    @Input() startDate: string;
    @Input() endDate: string;
    @Input() currTab: fromModels.ITab;
    @Input() loadPortfolioFromUrlError: string;

    @Output() showDataSourceVisibilityHandler = new EventEmitter<boolean>();

    public selectionPayload: fromModels.ITimeseries[] = [];
    public extraOption = {sizeColumnsToFit: true};
    private dialogRef: MatDialogRef<any>;

    public rowData = [];

    public derivedTimeseries: fromModels.IDerivedTimeseries = {
        axis: 'auto',
        expression: null,
        label: null,
        variable: '',
        alias: null,
    }

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions;


    constructor(private rootStore: Store<fromRootStore.RootState>, private dialog: MatDialog, private store: Store<fromStore.TimeseriesState>) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.loadPortfolioFromUrlError && changes.loadPortfolioFromUrlError.currentValue !== null){
            if(this.loadPortfolioFromUrlError){
                this.dialogRef = this.dialog.open(PortfolioUrlErrorDialogViewerComponent, {
                    hasBackdrop: false,
                    panelClass: ['event-analysis-pop-up-panel', 'round-border-radius'],
                    width: '400px',
                    height: '200px',
                });  
            }
        }
        if(changes && changes.currTab && this.gridApi !== undefined){
            if(this.currTab === undefined){
                this.gridApi.setRowData([])
            }
        }
        if(changes && changes.currTab && changes.currTab.currentValue && this.gridApi !== undefined){
            let ts: any = [...this.currTab.portfolio.timeseries];
            if(this.currTab.portfolio.derivedTimeseries){
                ts = ts.concat(this.currTab.portfolio.derivedTimeseries)
            }
    
            ts.push({
                id: -1,
                label: null,
                alias: null,
                timeseriesId: null,
                variable: null,
                expression: null,
                axis: 'auto',
            })
            this.gridApi.setRowData([])
            this.gridApi.setRowData(ts)
        }
    }

    ngOnInit(){
        this.customGridOption = {
            defaultColDef: {
                suppressMenu: true,
                cellClass: 'right-border-light',
                headerClass: 'ag-header-wrap',
                filter: 'agTextColumnFilter',
                editable: false,
                enableCellChangeFlash: false,
                flex: 1
            },
            suppressHorizontalScroll: true,
            suppressNoRowsOverlay: true,
            suppressRowClickSelection: true,
            floatingFilter: true,
            getRowNodeId: data => data.variable,
            singleClickEdit: true,
            rowSelection: 'multiple',
            onRowDoubleClicked: params => this.onRowDoubleClicked(params),
            columnDefs: [
                { 
                    headerName: 'Delete', 
                    field: '', 
                    headerComponentParams: {template: '<span class="material-icons" style="font-size:20px">delete_forever</span>'}, 
                    width: 8, 
                    filter: false, 
                    cellRenderer: 'TimeseriesDeleteCellRendererComponent',
                    cellRendererParams: params => params.data,
                    onCellClicked: (params) => this.onDeleteFromSelection(params),
                    headerTooltip: 'Delete From Selection'
                },
                { 
                    headerName: 'Variable', 
                    field: 'variable', 
                    minWidth: 100, 
                    maxWidth: 100,
                    cellRenderer: 'TimeseriesVariableCellRendererComponent',
                    cellRendererParams: () => {
                        return {
                            chartData: this.currTab.chartData
                        }
                    }
                },
                { 
                    headerName: 'Expression', 
                    field: 'expression', 
                    editable: params => params.data.timeseriesId || (params.data.id >= 0) ? false : true, 
                    cellClassRules: this.expressionCellClassRules, 
                    minWidth: 200, 
                    maxWidth: 200,
                    onCellValueChanged: (params) => this.onExpressionChange(params),
                    cellStyle: params => this.checkForInvalidData(params)
                },
                {
                    headerName: 'Label', 
                    field: 'label',
                    editable: params => params.data.timeseriesId || (params.data.id >= 0) ? false : true, 
                    cellClassRules: this.labelCellClassRules, 
                    onCellValueChanged: (params) => this.onLabelChange(params),
                    cellStyle: params => this.checkForInvalidData(params)
                },
                { 
                    headerName: 'Alias', 
                    field: 'alias', 
                    editable: true, 
                    cellClassRules: this.aliasCellClassRules, 
                    onCellValueChanged: (params) => this.onAliasChange(params),
                    cellStyle: params => this.checkForInvalidData(params)
                },
                { 
                    headerName: 'Id', 
                    field: 'id', 
                    hide: true
                },
                { 
                    headerName: 'Timeseries Id', 
                    field: 'timeseriesId', 
                    hide: true
                },
                { 
                    headerName: 'Axis', 
                    field: 'axis',
                    cellRenderer: 'TimeseriesAxisCellRendererComponent', 
                    filter: false, 
                    minWidth: 160, 
                    maxWidth: 160, 
                    cellRendererParams: { 
                        'axisHandler': this.onAxisChange,
                        'derivedAxisHandler': this.onDerivedAxisChange
                    }
                },
                { 
                    headerName: 'Regression', 
                    field: 'reg', 
                    cellRenderer: 'TimeseriesRegressionCellRendererComponent', 
                    filter: false, 
                    minWidth: 240, 
                    maxWidth: 240, 
                    cellRendererParams: { 
                        'regressionHandler': this.onRegressionChange,
                        'derivedTimeseriesRegressionHandler': this.onDerivedTimeseriesRegressionChange,
                        'timeseries': this.currTab ? this.currTab.portfolio.timeseries : []
                    }
                }
            ],
    
            frameworkComponents: {
                TimeseriesFavoriteCellRendererComponent: TimeseriesFavoriteCellRendererComponent,
                TimeseriesDeleteCellRendererComponent: TimeseriesDeleteCellRendererComponent,
                TimeseriesAxisCellRendererComponent: TimeseriesAxisCellRendererComponent,
                TimeseriesRegressionCellRendererComponent: TimeseriesRegressionCellRendererComponent,
                TimeseriesVariableCellRendererComponent: TimeseriesVariableCellRendererComponent
                
            }
        };
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    expressionCellClassRules = {
        'light-cell': params => !params.data.expression,
        'yellow-cell': params => params.data.id !== -1 && params.data.id !== -2,
        
    }
    
    aliasCellClassRules = {
        'light-cell': params => params.data.id === -1 || params.data.id === -2,
        'yellow-cell': params =>  params.data.id !== -2,
    }

    labelCellClassRules = {
        'yellow-cell': params => params.data.id !== -1 && params.data.id !== -2 && params.data.expression,
    }

    onAliasChange(params: CellValueChangedEvent){
        // if existing derived timeseries
        if(params.data.expression){
            this.store.dispatch(fromStore.updateDerivedTimeseriesAlias({
                aliasVal: params.newValue,
                variable: params.data.variable
            }))
            return
        }

            
        // if regular timeseries
        if(params.data.id >= 0){
            let newVal = params.newValue;
            if(params.newValue === '' || params.newValue === null || params.newValue === undefined){
                newVal = null;
            }
            this.store.dispatch(fromStore.updateTimeseriesAlias({
                aliasVal: newVal,
                timeseriesId: params.data.timeseriesId
            }))
            return
        }
        
        // if new derived timeseries
        if(params.data.id === -1){
            this.derivedTimeseries.alias = params.newValue;
            if(Object.values(this.derivedTimeseries).every(x => x !== null)){
                this.createNewDerivedTimeseries(); 
            }
            return
        }
    }

    onDeleteFromSelection(params: CellClickedEvent){
        if(params.data.timeseriesId){
            let timeseriesId = params.data.timeseriesId;
            this.store.dispatch(fromStore.deleteTimeseriesFromSelection(timeseriesId))      
        } else {
            if(params.data.variable && !params.data.timeseriesId){
                this.store.dispatch(fromStore.deleteDerivedTimeseriesFromSelection(params.data.variable))
            }
        }
    } 

    onAxisChange = (timeseriesId, axisVal) => {            
        this.store.dispatch(fromStore.updateTimeseriesAxis({
            axisVal: axisVal,
            timeseriesId: timeseriesId
        }))
    }

    onDerivedAxisChange = (variable, axisVal) => {
        this.store.dispatch(fromStore.updateDerivedTimeseriesAxis({
            axisVal: axisVal,
            variable: variable
        }))
    }
    
    onExpressionChange = (params: CellValueChangedEvent) => {
        // empty expression not allowed
        if(params.newValue !== null && params.newValue !== undefined && params.newValue !== ''){
            // if new derived timeseries
            if(params.data.id === -1){
                this.derivedTimeseries.expression = params.newValue;
                if(this.derivedTimeseries.label !== null && this.derivedTimeseries.expression !== null){
                    this.createNewDerivedTimeseries();  
                }
            } 
            // if existing derived timeseries
            else {
                this.store.dispatch(fromStore.updateDerivedTimeseriesExpression({
                    expVal: params.newValue,
                    variable: params.data.variable
                }))
            }        
        }
    }

    onLabelChange = (params: CellValueChangedEvent) => {
        // empty label not allowed
        if(params.newValue !== null && params.newValue !== undefined && params.newValue !== ''){
            // if new derived timeseries
            if(params.data.id === -1){
                this.derivedTimeseries.label = params.newValue;
                if(this.derivedTimeseries.label !== null && this.derivedTimeseries.expression !== null){
                    this.createNewDerivedTimeseries();
                }
            } 
            // if existing derived timeseries
            else {
                this.store.dispatch(fromStore.updateDerivedTimeseriesLabel({
                    labelVal: params.newValue,
                    variable: params.data.variable
                }))
            }        
        }
    }

    onRegressionChange = (timeseriesId, regressionVal) => {
        this.store.dispatch(fromStore.updateTimeseriesRegression({
            regressionVal: regressionVal,
            timeseriesId: timeseriesId
        }))
    }

    onDerivedTimeseriesRegressionChange = (variable, regressionVal) => {
        this.store.dispatch(fromStore.updateDerivedTimeseriesRegression({
            regressionVal: regressionVal,
            variable: variable
        }))
    }

    onRowDoubleClicked = (params: RowClickedEvent) => {
        if(params.data.id === -1){
            this.showDataSourceVisibilityHandler.emit(true)
        }
    }

    createNewDerivedTimeseries = () => {
        this.store.dispatch(fromStore.createDerivedTimeseries(this.derivedTimeseries))
    }

    checkForInvalidData(params){
        let chartDataRow = this.currTab.chartData && this.currTab.chartData.length ? this.currTab.chartData[0] : undefined;
        let key = params.data.label ? params.data.label : undefined;

        if(key && chartDataRow){
            if(isString(chartDataRow[key]) && chartDataRow[key].includes('invalid')) {
                return { color: 'red', fontStyle: 'italic'};
            } else {
                return { color: 'black', fontStyle: 'normal'};
            }
        }
    }
    
}


