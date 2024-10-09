import { ChangeDetectionStrategy, Component, Input, OnInit, Output, SimpleChanges, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ColumnApi, GridApi, GridOptions, ColDef, RowSelectedEvent, SelectionChangedEvent, RowNode } from 'ag-grid-community';

import * as moment from 'moment';

import { AppCustomGridCellCheckboxComponent, AppGridCustomStatusBarCellValueComponent } from 'src/app/components';
import { ServicersRendererComponent } from './renderers/servicers/servicers-renderer.component';
import { DelinquenciesRendererComponent } from './renderers/delinquencies/delinquencies-renderer.component';
import { QuartilesRendererComponent } from './renderers/quartiles/quartiles-renderer.component';
import { GeographiesRendererComponent } from './renderers/geographies/geographies-renderer.component';
import { OASPathsRendererComponent } from './renderers/oaspaths/oaspaths-renderer.component';
import { PPMProjectionsRendererComponent } from './renderers/ppmprojections/ppmprojections-renderer.component';
import { ForwardPathsRendererComponent } from './renderers/forwardpaths/forwardpaths-renderer.component';
import { ActVsProjSummaryRendererComponent } from './renderers/act-vs-proj-summary/act-vs-proj-summary-renderer.component';
import { ActVsProjHistoryRendererComponent } from './renderers/act-vs-proj-history/act-vs-proj-history-renderer.component';

import { UtilityService } from 'src/app/services';
import * as fromModels from './../../models/agency-analytics.models';

@Component({
    selector: 'app-portfolio-viewer',
    templateUrl: './portfolio-viewer.component.html',
    styleUrls: ['./portfolio-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioViewerComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() mode$: Observable<'Live' | 'Close'>;
    @Input() lookups: any;
    @Input() portfolio: fromModels.IPortfolio;
    @Input() securityDetails: fromModels.ISecurityDetail[];
    @Input() securityDetailsLoading: boolean;
    @Input() securityDetailsLoaded: boolean; 
    @Input() securityDetailsError: string;

    @Input() selectedItems: fromModels.ISecurityDetail[];

    @Input() selectedViews: fromModels.IGridViews;
    @Output() updateSelectedItems: EventEmitter<fromModels.ISecurityDetail[]> = new EventEmitter<fromModels.ISecurityDetail[]>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private columnDefs: any[];
    private callBackInitialized = false;
    private subscriptions$: Subscription[] = [];

    private columnDefGroups: {[type: string]: ColDef[]} = {};

    public inputTypes: string[] = [];

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
        rowSelection: "multiple",
        floatingFilter: true,
        deltaRowDataMode: true,
        context: this,
        skipHeaderOnAutoSize: true,
        enableSorting: true,

        getRowNodeId: data => {
            return data['security']['rowId'];
        },

        statusBar: {
            statusPanels: [
                {
                    statusPanel: 'agAggregationComponent',
                    statusPanelParams: {
                        aggFuncs: ['sum']
                    }
                },
                {
                    statusPanel: 'AppGridCustomStatusBarCellValueComponent',
                    statusPanelParams: {
                        fractionDigits: 2
                    }
                },
            ],
        },

        frameworkComponents: {
            'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
            'ServicersRendererComponent': ServicersRendererComponent,
            'DelinquenciesRendererComponent': DelinquenciesRendererComponent,
            'QuartilesRendererComponent': QuartilesRendererComponent,
            'GeographiesRendererComponent': GeographiesRendererComponent,
            'OASPathsRendererComponent': OASPathsRendererComponent,
            'PPMProjectionsRendererComponent': PPMProjectionsRendererComponent, 
            'ForwardPathsRendererComponent': ForwardPathsRendererComponent,
            'ActVsProjSummaryRendererComponent': ActVsProjSummaryRendererComponent,
            'ActVsProjHistoryRendererComponent': ActVsProjHistoryRendererComponent,
            'AppCustomGridCellCheckboxComponent': AppCustomGridCellCheckboxComponent
        },
        onFirstDataRendered: (params) => {
            const nodesToSelect: RowNode[] = [];
            this.selectedItems.forEach((item: fromModels.ISecurityDetail) => {
                params.api.forEachNode((node: RowNode) => {
                    if (node.data.security['name'] == item.security.name) { 
                        nodesToSelect.push(node);
                    }
                });
            });

            nodesToSelect.forEach((node: RowNode) => {
                params.api.selectNode(node, true);
            });
        },
        onRowSelected: (event) => {
            this.onRowSelected(event);
        },
        onSelectionChanged: (event) => {
            this.onSelectionChanged(event);
        }
    };

    public mode: 'Live' | 'Close';

    public extraOption = {
        // sizeColumnsToFit: false
    };

    constructor(private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this.subscriptions$.push(this.mode$
            .subscribe((mode: 'Live' | 'Close') => {
                this.mode = mode;
                if (this.gridApi) {
                    this.gridApi.refreshCells()
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions$.forEach((subscription) => {
            subscription.unsubscribe();
        })
    }

    ngOnChanges(changes: SimpleChanges) {        
        if (changes && changes.lookups && changes.lookups.currentValue) { 
            this.inputTypes = [...changes.lookups.currentValue.inputLookups['InputType']];
        }

        if (changes && changes.securityDetails && changes.securityDetails.currentValue) {
            if (this.gridApi) {
                this.columnDefs = this.getColumnDefs(null);
                this.gridApi.setColumnDefs(this.columnDefs);
                this.gridApi.setRowData(changes.securityDetails.currentValue);
                this.gridApi.sizeColumnsToFit();
            }
        } else if (changes && changes.selectedViews && changes.selectedViews.currentValue) { 
            if (this.gridApi) {
                this.columnDefs = [];
                this.columnDefs = this.getColumnDefs(changes.selectedViews.currentValue);
                this.gridApi.setColumnDefs(this.columnDefs);
                this.gridApi.sizeColumnsToFit();
            }
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        if (this.securityDetails && this.securityDetails.length > 0 && this.selectedViews) {
            this.columnDefs = this.getColumnDefs(this.selectedViews);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.securityDetails);
        }
    }

    /**
     * Component Events
     */
    public onRowSelected(event: RowSelectedEvent): void {
        // NOOP - But if in the future we want to do something with it        
    }

    public onSelectionChanged(event: SelectionChangedEvent): void {
        let result: fromModels.ISecurityDetail[] = [];
        event.api.getSelectedNodes().forEach((node: RowNode) => {
            result.push(node.data);
        });
        this.updateSelectedItems.emit(result);
    }

    private getColumnDefs(selectedViews: fromModels.IGridViews): ColDef[] {

        const selViews = selectedViews ? selectedViews.selectedViews : ['inputs', 'indicative', 'py', 'ror', 'actvsproj'];

        // Common Columns
        const colDefs: ColDef[] = this.getCommonColDefs();
        this.columnDefGroups['Common'] = [...colDefs];

        // Input Columns -- Always show input columns
        const inputColDefs: ColDef[] = this.getInputColDefs()
        this.columnDefGroups['Inputs'] = inputColDefs;
        const groupedInputColDef = {
            headerName: 'User Inputs',
            children: inputColDefs
        };
        colDefs.push(groupedInputColDef);

        // Indicative Data Columns
        if (selViews.indexOf('indicative') >= 0) {
            const indicColDefs: ColDef[] = this.getIndicativeDataColDefs();
            this.columnDefGroups['Indicative Data'] = indicColDefs;
            const groupedIndicColDef = {
                headerName: 'Indicative Data',
                children: indicColDefs
            };
            colDefs.push(groupedIndicColDef);
        }

        // PY Calc columns
        if (selViews.indexOf('py') >= 0) {
            const pyCalcColDefs: ColDef[] = this.getPYRequestColDefs();
            this.columnDefGroups['PY Request'] = pyCalcColDefs;
            const groupedPYCalcColDefs = {
                headerName: 'PY Calculations',
                children: pyCalcColDefs
            };
            colDefs.push(groupedPYCalcColDefs);
        }

        // ROR columns
        if (selViews.indexOf('ror') >= 0) {
            const scenarioColDefs: ColDef[] = this.getScenarioRequestColDefs();
            this.columnDefGroups['Scenario Analysis'] = scenarioColDefs;
            const groupedScenarioColDefs = {
                headerName: 'Scenario Analysis',
                children: scenarioColDefs
            };
            colDefs.push(groupedScenarioColDefs);
        }

        // Act vs. Proj columns
        if (selViews.indexOf('actvsproj') >= 0) {
            const actVsProjColDefs: ColDef[] = this.getActVsProjColDefs();
            this.columnDefGroups['Actual vs. Projections'] = actVsProjColDefs;
            const groupedActVsProjColDefs = {
                headerName: 'Actual vs. Projections',
                children: actVsProjColDefs
            };
            colDefs.push(groupedActVsProjColDefs);
        }

        return colDefs;
    }

    /**
     * Common Columns
     */

    private getCommonColDefs(): ColDef[] {
        const result: ColDef[] = [{
            headerName: 'Display Name',
            field: 'security',
            width: 150,
            minWidth: 150,
            maxWidth: 150,
            sort: 'asc',
            pinned: 'left',
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return params.node.data['security']['name'];
            }
        }, {
            headerName: 'Name',
            field: 'security',
            width: 150,
            hide: true,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return params.node.data['security']['inputName'];
            }
        }, {
            headerName: 'Identifier',
            field: 'security',
            width: 80,
            hide: true,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return params.node.data['security']['identifier'];
            }
        }];
        return result;
    }

    private getInputColDefs(): ColDef[] { 
        const result: ColDef[] = [{
            headerName: 'Input Type',
            headerTooltip: "Type of the input e.g. Price, Yield, OAS",
            field: 'inputType',
            editable: true,
            minWidth: 80,
            maxWidth: 80,
            // editable: params => (params.data['editable'] || false),
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#fcf8ab',
                    'justify-content': 'flex-start'
                };
                return this._checkError(result, params.node.data);
            },
            cellEditor: 'agRichSelectCellEditor',
            cellEditorParams: {
                values: this.inputTypes
            },
            valueGetter: (params) => {
                return params.data['security']['inputType'];
            }
        }, {
            headerName: 'Input Value',
            headerTooltip: "Input value for the Yieldbook calculator",
            field: 'inputValue',
            editable: true,
            width: 80,
            maxWidth: 80,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#fcf8ab',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
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
            headerName: 'CUSIP/Identifier',
            headerTooltip: "Identifier used by Yieldbook",
            field: 'identifier',
            editable: true,
            width:120,
            maxWidth: 150,
            pinned: 'left',
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#fcf8ab',
                    'justify-content': 'flex-start'
                };
                return this._checkError(result, params.node.data);
            },
            valueSetter: (params) => {
                params.data['security']['identifier'] = params.newValue;
                return true;
            },
            valueGetter: (params) => {
                return params.data['security']['identifier'];
            }
        }, {
            headerName: 'YB Model',
            headerTooltip: "Name of the YB Model",
            field: 'modelCode',
            editable: true,
            maxWidth:80,
            // editable: params => (params.data['editable'] || false),
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#fcf8ab',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return params.data['security']['modelCode'];
            }
        }, {
            headerName: 'Price Date',
            headerTooltip: "Price Date",
            field: 'priceDate',
            editable: true,
            maxWidth: 80,
            // editable: params => (params.data['editable'] || false),
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#fcf8ab',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return params.data['security']['priceDate'];
            }
        }, {
            headerName: 'Settle Date',
            headerTooltip: "Settlement Date",
            field: 'settlementDate',
            editable: true,
            maxWidth: 80,
            // editable: params => (params.data['editable'] || false),
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#fcf8ab',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return params.data['security']['settlementDate'];
            }
        }, {
            headerName: 'Dials',
            headerTooltip: 'Name of the dial to use for P/Y Calculation',
            field: 'dial',
            editable: true,
            maxWidth: 80,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#fcf8ab',
                    'justify-content': 'flex-start'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return params.data['security']['dialName'];
            }
        }, {
            colId: 'includePartialDuration',
            headerName: 'Include Partials',
            headerTooltip: 'Include Partial Durations during P/Y Calculations',
            field: 'includePartialDuration',
            editable: true,
            maxWidth: 40,
            cellEditor: 'agCheckboxCellEditor',
            cellRenderer: 'AppCustomGridCellCheckboxComponent', 
            cellRendererParams: { editable: true },
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#fcf8ab',
                    'justify-content': 'center'
                };
                return this._checkError(result, params.node.data);
            },
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
            headerTooltip: "Calculate other durations such as Macaulay Duration",
            field: 'otherDurations',
            editable: true,
            maxWidth: 40,
            cellRenderer: 'AppCustomGridCellCheckboxComponent', 
            cellRendererParams: { editable: true },
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#fcf8ab',
                    'justify-content': 'center'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return params.data['security']['otherDurations'];
            },
            valueSetter: (params) => {
                alert(`otherDurations: ${params.newValue}`);
                params.data['security']['otherDurations'] = params.newValue;
                return true;
            }
        }];

        return result;
    }

    /**
     * Indicative Data
     */

    private getIndicativeDataColDefs(): ColDef[] {        
        const cols: ColDef[] = [{
            headerName: 'Sec. Type',
            headerTooltip: 'Security Type',
            field: 'indic',
            width: 80,
            hide: true,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getIndicativeDataAttribute(params.node.data, 'securityType');
            }
        }, {
            headerName: 'Current Coupon',
            headerTooltip: 'Current Coupon',                        
            field: 'indic',
            width: 60,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataAttribute(params.node.data, 'currentCoupon');
            },
            valueFormatter: (params) => {
                if (params.value) { 
                    return params.value.toFixed(2) + '%';
                }                
            }
        }, {
            headerName: 'Agency',
            headerTooltip: 'Issuing Agency',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                const indAttr = this.getIndicativeDataAttribute(params.node.data, 'ticker');
                if (indAttr) { 
                    return indAttr.substring(0, 3);
                }
                
            }
        }, {
            headerName: 'Market Ticker',
            headerTooltip: 'Bloomberg Ticker',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                var result = this.getIndicativeDataAttribute(params.node.data, 'bloombergTicker');
                if (!result) { 
                    result = this.getIndicativeDataAttribute(params.node.data, 'ticker');
                }
                return result;
            }
        }, {
            headerName: 'Pool Number',
            headerTooltip: 'Pool Number Identifier',
            field: 'indic',
            width: 80,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataPoolNumber(params.node.data);
            }
        }, {
            headerName: 'CUSIP/FIGI',
            headerTooltip: 'CUSIP/FIGI',
            field: 'indic',
            width: 100,
            minWidth: 100,
            maxWidth:100,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                var result = this.getIndicativeDataAttribute(params.node.data, 'cusip');
                if (!result || result.length === 0) { 
                    result = this.getIndicativeDataSubAttribute(params.node.data, 'figi');
                }
                return result;
            }
        }, {
            headerName: 'Maturity',
            headerTooltip: 'Maturity Date',
            field: 'indic',
            width: 80,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataAttribute(params.node.data, 'maturityDate');
            },
            valueFormatter: (params) => {
                if (params.value) { 
                    return moment(params.value).format('MM/DD/YYYY');
                }
            }
        }, {
            headerName: 'Origination Date',
            headerTooltip: 'Origination Date',
            field: 'indic',
            width: 80,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'originationDate');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return moment(params.value).format('MM/DD/YYYY');
                }
            }
        }, {
            headerName: 'AOLS',
            headerTooltip: 'Adjusted Original Loan Size',
            field: 'indic',
            width: 80,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'adjustedOriginalLoanSize');
            }, 
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
        }, {
            headerName: 'ACLS',
            headerTooltip: 'Adjusted Current Loan Size',
            field: 'indic',
            width: 80,
            cellStyle: params => {
                let result = {'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'adjustedCurrentLoanSize');
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0)
        }, {
            headerName: 'Original Loan Size Remaining',
            headerTooltip: 'Original Loan Size Remaining',
            field: 'indic',
            width: 80,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'originalLoanSizeRemaining');
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0)
        }, {
            headerName: 'ALTV',
            headerTooltip: 'Adjusted Loan-to-Value Ratio',
            field: 'indic',
            width: 80,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'adjustedLTV');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'Adj. Spread',
            headerTooltip: 'Adjusted Spread at Origination',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'adjustedSpreadAtOrigination');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'Ann. HPA',
            headerTooltip: 'Annualized Home Price Appreciation',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'annualHPA');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'CLTV',
            headerTooltip: 'Combined Loan-to-Value Ratio',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'combinedLTV');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'Cum. HPA',
            headerTooltip: 'Cumulative HPA',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'cumulativeHPA');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'FICO',
            headerTooltip: 'FICO Score',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'creditScore');
            }, 
            valueFormatter: (params) => {
                if (params.value) { 
                    return params.value.toFixed(0);
                }
            }
        }, {
            headerName: 'Lowest Rating',
            headerTooltip: 'Lowest Rating',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'lowestRating');
            }
        }, {
            headerName: 'Moody\'s Rating',
            headerTooltip: 'Moody\'s Rating',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                let moodys = this.getIndicativeDataSubAttribute(params.node.data, 'moody');
                if (moodys && moodys.length > 0) { 
                    return `${moodys[0]['value']}`;
                }                
            }
        }, {
            headerName: 'CPR (1mo)',
            headerTooltip: `
                Conditional Prepayment Rate (CPR) is the annualised percentage of a mortgage pool's <br />` +
                `principal balance that will be paid off in <strong>1 month</strong> ahead of schedule.`,
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getCPR(params.node.data, '1');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'CPR (3mo)',
            headerTooltip: `
                Conditional Prepayment Rate (CPR) is the annualised percentage of a mortgage pool's <br />` +
                `principal balance that will be paid off in <strong>3 months</strong> ahead of schedule.`,
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#d9f5f9',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getCPR(params.node.data, '3');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'CPR (6mo)',
            headerTooltip: `
                Conditional Prepayment Rate (CPR) is the annualised percentage of a mortgage pool's <br />` +
                `principal balance that will be paid off in <strong>6 months</strong> ahead of schedule.`,
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#d9f5f9',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getCPR(params.node.data, '6');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'CPR (1y)',
            headerTooltip: `
                Conditional Prepayment Rate (CPR) is the annualised percentage of a mortgage pool's <br />` +
                `principal balance that will be paid off in <strong>1 year</strong> ahead of schedule.`,
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#d9f5f9',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getCPR(params.node.data, '12');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'CPR (Life)',
            headerTooltip: `
                Conditional Prepayment Rate (CPR) is the annualised percentage of a <br /> mortgage pool's ` +
                `principal balance that will be paid off <strong>by maturity</strong>.`,
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#d9f5f9',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getCPR(params.node.data, 'Life');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'PSA (1mo)',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#d9f5f9',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getPSA(params.node.data, '1');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'PSA (3mo)',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#d9f5f9',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getPSA(params.node.data, '3');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'PSA (6mo)',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#d9f5f9',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getPSA(params.node.data, '6');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'PSA (1y)',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#d9f5f9',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getPSA(params.node.data, '12');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'PSA (Life)',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#d9f5f9',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getPSA(params.node.data, 'Life');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'Factor',
            headerTooltip: 'Factor',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'background-color': '#f9f0dd',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'factor');
            }, 
            valueFormatter: (params) => {
                if (params.value) { 
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'Factor Date',
            headerTooltip: 'Factor Date',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;', 
                    'background-color': '#f9f0dd',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data);
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return moment(params.value).format('MM/DD/YYYY');
                }
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'factorDate');
            }
        }, {
            headerName: 'FHFA CLTV',
            headerTooltip: 'FHFA Implied Current LTV',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'fhfaImpliedCurrentLTV');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'LP CLTV',
            headerTooltip: 'Loan Performance Implied Current LTV',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'loanPerformanceImpliedCurrentLTV');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'Factor',
            headerTooltip: 'Factor',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'factor');
            }
        }, {
            headerName: 'Primary Servicer',
            headerTooltip: 'Primary Servicer',
            field: 'indic',
            width: 250,
            minWidth: 250,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'primaryServicer');
            }
        }, {
            headerName: 'Jumbo Loan Size',
            headerTooltip: 'Jumbo Loan Size',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'jumboLoanSize');
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0)
        }, {
            headerName: 'Curr. TPO',
            headerTooltip: 'Current 3<sup>rd</sup> Party Origination',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'current3rdPartyOrigination');
            }
        }, {
            headerName: 'WALA',
            headerTooltip: 'Weighted Average Loan Age (Months)',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'loanAge');
            }
        }, {
            headerName: 'WAM',
            headerTooltip: 'Weighted Average Maturity (Months)',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'wam');
            }
        }, {
            headerName: 'Loan Size',
            headerTooltip: 'Loan Size',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'loanSize');
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0)
        }, {
            headerName: 'Cash Window (%)',
            headerTooltip: 'Cash Window percentage',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'percentCashWindow');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'DTI (%)',
            headerTooltip: 'Debt-to-Income Ratio (%)',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'percentDTI');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: '1st Time Home Buyers (%)',
            headerTooltip: 'First time home buyers (%)',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'percentFirstTimeHomeBuyer');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'Home Ready/Home Possible (%)',
            headerTooltip: 'Home Ready vs. Home Possible (%)',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'percentHomeReadyHomePossible');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'Inventory (%)',
            headerTooltip: 'Inventory (%)',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'percentInv');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'Servicers',
            headerTooltip: 'Servicer Distribution (%)',
            field: 'indic',
            width: 64,
            minWidth: 64,
            cellRenderer: 'ServicersRendererComponent', 
            cellRendererParams: (params) => {
                return {
                    servicers: this.getIndicativeDataSubAttribute(params.node.data, 'dataPrepayModelServicerList'),
                    bond: {
                        'name': params.node.data['security']['name'], 
                        'cusip': params.node.data['security']['identifier']
                    }
                };
            }
        }, {
            headerName: 'Delinquencies',
            headerTooltip: 'Delinquencies',
            field: 'indic',
            width: 64,
            minWidth: 64,
            cellRenderer: 'DelinquenciesRendererComponent',
            cellRendererParams: (params) => {
                return {
                    delinquencies: this.getIndicativeDataSubAttribute(params.node.data, 'delinquencies'),
                    bond: {
                        'name': params.node.data['security']['name'],
                        'cusip': params.node.data['security']['identifier']
                    }
                };
            }
        }, {
            headerName: 'Quartiles',
            headerTooltip: 'Quartiles',
            field: 'indic',
            width: 64,
            minWidth: 64,
            cellRenderer: 'QuartilesRendererComponent',
            cellRendererParams: (params) => {
                return {
                    quartiles: this.getIndicativeDataSubAttribute(params.node.data, 'dataQuartileList'),
                    bond: {
                        'name': params.node.data['security']['name'],
                        'cusip': params.node.data['security']['identifier']
                    }
                };
            }
        }, {
            headerName: 'Geographies',
            headerTooltip: 'Geographies',
            field: 'indic',
            width: 64,
            minWidth: 64,
            cellRenderer: 'GeographiesRendererComponent',
            cellRendererParams: (params) => {
                return {
                    geographies: this.getIndicativeDataSubAttribute(params.node.data, 'dataStateList'),
                    bond: {
                        'name': params.node.data['security']['name'],
                        'cusip': params.node.data['security']['identifier']
                    }
                };
            }
        }, {
            headerName: 'HARP (%)',
            headerTooltip: '% of Loans underwritten by the Home Affordable Refinance Program (HARP)',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'percentHARP');
            }
        }, {
            headerName: '2+ Borrowers (%)',
            headerTooltip: '% of Loans guaranteed by 2 or more Borrowers',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'percentTwoPlusBorrowers');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'Manufactured Homes (%)',
            headerTooltip: '% of loans associated with manufactured homes',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'percentManufacturedHome');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'Inventory (%)',
            headerTooltip: 'Inventory (%)',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'percentInv');
            },
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value.toFixed(2);
                }
            }
        }, {
            headerName: 'Inventory (%)',
            headerTooltip: 'Inventory (%)',
            field: 'indic',
            width: 100,
            valueGetter: (params) => {
                return this.getIndicativeDataSubAttribute(params.node.data, 'percentInv');
            }
        }, {
            headerName: 'Indic. Request Status',
            headerTooltip: 'Status of the Indicative Data Request',
            field: 'indic',
            width: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;', 
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getIndicativeDataAttribute(params.node.data, 'status');
            }
        }, {
            headerName: 'Indic. Request Timestamp',
            headerTooltip: 'Timestamp of the Indicative Data Response',
            field: 'indic',
            width: 150,
            minWidth: 150,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;', 
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getIndicativeDataAttribute(params.node.data, 'timestamp');
            },
            valueFormatter: (params) => {
                if (params.value) { 
                    return moment(params.value).format('lll');
                }
            }
        }, {
            headerName: 'Indic. RequestId',
            headerTooltip: 'YB RequestId for the Indicative Data Request',
            field: 'indic',
            width: 100,
            minWidth: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getIndicativeDataAttribute(params.node.data, 'requestId');
            }
        }];
        
        return cols;
    }

    private getIndicativeDataAttribute(data: any, propertyName: string): any {
        return (data['hasIndic'] && data['indic'][propertyName]) || null; 
    }

    private getCPR(data: any, month: string): any { 
        let result = null;
        const ppmHistory = this.getIndicativeDataSubAttribute(data, 'dataPPMHistoryList');
        if (ppmHistory) {
            ppmHistory.forEach((ppmData) => {
                if (ppmData['prepayType'] === 'CPR') { 
                    const cprList = ppmData['dataPPMHistoryDetailList'] || [];
                    const cprFiltered = cprList.filter((cpr) => cpr['month'] === month);
                    if (cprFiltered.length === 1) { 
                        result = cprFiltered[0]['prepayRate'];
                        return;
                    }
                }
            });
        }
        return result;
    }

    private getPSA(data: any, month: string): any {
        let result = null;
        const ppmHistory = this.getIndicativeDataSubAttribute(data, 'dataPPMHistoryList');
        if (ppmHistory) {
            ppmHistory.forEach((ppmData) => {
                if (ppmData['prepayType'] === 'PSA') {
                    const cprList = ppmData['dataPPMHistoryDetailList'] || [];
                    const cprFiltered = cprList.filter((cpr) => cpr['month'] === month);
                    if (cprFiltered.length === 1) {
                        result = cprFiltered[0]['prepayRate'];
                        return;
                    }
                }
            });
        }
        return result;
    }

    private getIndicativeDataPoolNumber(data: any): any {
        const bloombergTicker = this.getIndicativeDataSubAttribute(data, 'bloombergTicker');
        if (bloombergTicker) {
            return bloombergTicker.split(' ')[1];
        }
        return null;
    }

    private getIndicativeDataSubAttribute(data: any, propertyName: string): any {
        const indicSub =  (data['hasIndic'] && data['indic']['indic']) || null;
        if (indicSub) { 
            return indicSub[propertyName];
        }
        return null;
    }

    /**
     * PY Request
     */

    private getPYRequestColDefs(): ColDef[] { 
        const cols: ColDef[] = [{
            headerName: 'Yieldbook Model',
            headerTooltip: 'Yieldbook Model', 
            width: 80, 
            editable: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;', 
                    'justify-content': 'flex-end' 
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return params.data['security']['modelCode']
            }
        }, {
            headerName: 'Partials',
            headerTooltip: 'Partial Durations',
            minWidth: 150,
            editable: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end' 
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                if (params.data['security']['partials'] && params.data['security']['partials'].length > 0) { 
                    return params.data['security']['partials'].join(', ');
                }
            }
        }, {
            headerName: 'Vol. Model Type',
            headerTooltip: 'Vol. Model Type',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'volModelType');
            }
        }, {
            headerName: 'Price',
            headerTooltip: 'Price',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatPriceToTicks,
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'price');
            }
        }, {
            headerName: 'Yield',
            headerTooltip: 'Yield',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'yield');
            }
        }, {
            headerName: 'WAL',
            headerTooltip: `Weighted Average Life - <br /><br />
            Weighted Average Life calculated as the average time (in years) to receiving principal payments, weighted <br />
            by the amount of principal. `,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'wal');
            }
        }, {
            headerName: 'Accrued',
            headerTooltip: `Accrued Interest - <br /><br />
            The portion of the next coupon payment that has been incurred from last coupon payment date up to the settlement date, <br />
            but not yet paid out: <br /><br />
                <span><b><i>Accrued Interest = (Coupon Payment * Days since last payment) / Days in coupon period</i></b></span>
            <br /><br />
            where the coupon payment is determined as per the security's coupon rate (in %), face value (or principal balance) <br />
            and coupon payment frequency.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'accruedInterest');
            }
        }, {
            headerName: 'Vega',
            headerTooltip: `Vega  - <br /><br />
            Vega of an option calculated as a magnitude of the change in price when the yield volatility changes by 1 basis point:<br /><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><i>Vega=(Pu-Pd)/∆y</i></b><br /><br />
            where Δy=1bp change in implied volatility. Pu and Pd are full prices of the security obtained by shifting the volatility <br />
            level by 1bp and -1bp respectively.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'effectiveDuration');
            }
        }, {
            headerName: 'OAD',
            headerTooltip: `Effective Duration - <br /><br />
            A measure of relative changes in security\'s full price due to standard shifts in the pricing yield curve. <br /><br />
            The yield curve is shocked up and down and an interest rate tree is calibrated based on assumptions about the <br />
            volatility of future yields. The bond full price is then calculated for each curve while keeping OAS constant. <br />
            For securities without embedded options, the value will be close to Macaulay duration and modified duration, which are <br />
            computed using a specific cash flow schedule. <br /><br />
            
            Effective duration is calculated in the following steps: <br />
            <ol>
                <li>For a given price P, calculate the option-adjusted spread (OAS);</li>
                <li>Shift up the initial yield curve in parallel by ∆𝑦 (in basis points) while keeping the volatility input constant. <br />
                    Calculate the new price 𝑃𝑢 using the OAS value (from Step 1);</li>
                <li>Repeat Step 2 with the downward curve shift, instead of the upward shift, by ∆𝑦 and calculate the new price 𝑃𝑑;</li>
                <li>Effective Duration is then calculated as: <br /><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><b><i>10000×𝑃𝑑− 𝑃𝑢 2×𝑃×∆𝑦</i></b></span>
                </li>
            </ol>`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'effectiveDuration');
            }
        }, {
            headerName: 'OAC',
            headerTooltip: `Option Adjusted Convexity - <br /><br />
            Effective convexity is calculated as a measure of how the effective duration is impacted by parallel shifts <br />
            in the benchmark pricing yield curve. <br /><br />
            Effective convexity differs from convexity in that it is a second derivative measure used for securities with <br />
            uncertain cash flows and/or embedded options. It depends on the assumptions about the volatility of future yields <br />
            and measures a change in price as a result of change in effective duration.` ,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'effectiveConvexity');
            }
        }, {
            headerName: 'OAS',
            headerTooltip: `Option Adjusted Spread - <br /><br />
            Option Adjusted Spread calculated as a spread over the pricing risk free yield curve or benchmark curve, <br />
            after adjusting for the probability of any optional prepayments and assuming a volatility (or set of volatilities) <br />
            of future yields. OAS, when added to the interest rate benchmark matches the present value of a security to its full <br />
            market price.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'oas');
            }
        }, {
            headerName: 'ZVSpread',
            headerTooltip: `Zero Volatility Spread - <br /><br />
            The Zero-volatility spread (Z-spread) is the constant spread that makes the price of a security equal <br />
            to the present value of its cash flows when added to the yield at each point on the spot rate Treasury curve where cash <br />
            is received. In other words, each cash flow is discounted at the appropriate Treasury spot rate plus the Z-spread.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'zSpread');
            }
        }, {
            headerName: 'Yield Curve Margin',
            headerTooltip: `Yield Curve Margin - <br /><br />
            A zero volatility spread measure for mortgage backed securities. The equivalent of an OAS calculated with a <br />
            single-factor term structure model with a volatility of zero and mortgage rates that follow the forward path.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'yieldCurveMargin');
            }
        }, {
            headerName: 'Convexity Cost',
            headerTooltip: `Convexity Cost - <br /><br />
            This is the implicit cost embedded in a callable security such as mortgages that exhibit negative convexity.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'convexityCost');
            }
        }, {
            headerName: 'Spread (Swp Curve)',
            headerTooltip: `Spread to Swap Curve - <br /><br />
            The difference between the yield of a bond, and the yield on the swap curve corresponding to the maturity of the bond. <br />
            For example:<br /><br />
                bond yield = 3%;<br />
                bond maturity = 2 years;<br />
                par swap rate at 2 years = 1.5%;<br/><br />                                
                spread to swap curve = (3 - 1.5)*100 = 150. `,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'spreadToSwapCurve');
            }
        }, {
            headerName: 'Spread Duration',
            headerTooltip: `Spread Duration - <br /><br />
            Spread Duration is a measure of the bond's sensitivity to a 100bps change in the spread. Spread Duration <br />
            is calculated as: <br /><br />
                &nbsp;&nbsp;&nbsp;&nbsp; <b><i>Spread Duration = (OAS / YTM) * Modified Duration</i></b><br /><br />
            where, OAS=Option Adjusted Spread, YTM=Yield to maturity and Modified Durationi is the change in bond's price w.r.t. <br />
            in the interest rate.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'spreadDuration');
            }
        }, {
            headerName: 'Total Prepay Duration',
            headerTooltip: `Total Prepay Duration - <br /><br />
            A duration measure of relative changes in the full price of a security due to a 1% change in the prepayment model <br />
            rate: <br /><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<b><i>Prepay Duration=10 * -(Pu - Pd) / P</i></b><br /><br />
            where, Pu and Pd are security prices corresponding to the value of the prepayment rate shifted by 0.5% and -0.5% respectively;<br />
            P=full price. `,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'volatilityDuration');
            }
        }, {
            headerName: 'Volatility Duration',
            headerTooltip: `Volatility Duration - <br /><br />
            A duration measure calculated as a relative change in the full price of a security due to the change in <br />
            volatility: <br /><br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span><b><i>Volatility Duration = - (Pd-Pu)/(0.5%+0.5%) * (1/P*0.01)</i></b></span><br /><br />
            where, Pu and Pd are security prices corresponding to the current value of volatility shifted by 0.005 and -0.005 <br />
            respectively;P=full price.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'volatilityDuration');
            }
        }, {
            headerName: 'Refi. Prepay Duration',
            headerTooltip: `Refinance Prepay Duration - <br /><br />`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'refiPrepayDuration');
            }
        }, {
            headerName: 'Refi. Elbow Duration',
            headerTooltip: `Refinance Prepay Duration - <br /><br />`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'refiElbowDuration');
            }
        }, {
            headerName: 'Turnover Prepay Duration',
            headerTooltip: `Turnover Prepay Duration - <br /><br />`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'turnoverPrepayDuration');
            }
        }, {
            headerName: 'Modified Duration',
            headerTooltip: `Modified Duration - <br /><br />
            Modified duration is calculated as a measure of change in the bond's price with respect to the change in interest <br/>
            rates. It is assumed that the cash flows do not change with change in rates; if there are embedded options the paydowns <br />
            are treated as if they had no dependency on the rates.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'duration');
            }
        }, {
            headerName: 'Modified Convexity',
            headerTooltip: `Modified Convexity - <br /><br />
            Sensitivity of the bond price to a change in bond's duration calculated as a second derivative of price with respect <br />
            to yield, divided by the full price.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'convexity');
            }
        }, {
            headerName: 'CC Spread Sensitivity',
            headerTooltip: `Current Coupon Spread Sensitivity - <br /><br />
            The percentage change in full price of an MBS due to a 10 bps change in current coupon spread.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'volatilityDuration');
            }
        }, {
            headerName: 'DV01',
            headerTooltip: `DV01 - <br /><br />
            Dollar value of a basis point (DV01) calculated as a change in the price of a bond when the yield <br />
            changes by 1 bps.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'dv01');
            }
        }, {
            headerName: 'Spread DV01',
            headerTooltip: `Spread - <br /><br />
            Dollar value of a basis point (DV01) calculated as a change in the price of a bond when the spread<br />
            changes by 100 bps.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'spreadDV01');
            }
        }, {
            headerName: 'Effective Yield',
            headerTooltip: `Effective Yield - <br /><br />
            The effective yield is the return on a bond that has its interest payments (or coupons) reinvested at <br />
            the same rate by the bondholder. Effective yield is the total yield an investor receives, in contrast to the <br />
            nominal yield—which is the stated interest rate of the bond's coupon.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#e8fed3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'effectiveYield');
            }
        }, {
            headerName: 'Tsy Spread Duration',
            headerTooltip: 'Spread Duration w.r.t. Treasury',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'spreadDurationTreasury');
            }
        }, {
            headerName: 'Tsy OAD',
            headerTooltip: 'Option Adjusted Duration (Tsy)',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'effectiveDuration', 'GVT_TSYM');
            }
        }, {
            headerName: 'Tsy OAC',
            headerTooltip: 'Option Adjusted Convexity (Tsy)',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'effectiveConvexity', 'GVT_TSYM');
            }
        }, {
            headerName: 'Tsy OAS',
            headerTooltip: 'Option Adjusted Spread (Tsy)',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'oas', 'GVT_TSYM');
            }
        }, {
            headerName: 'Tsy ZVSpread',
            headerTooltip: 'Tsy Zero Vol. Spread',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'zSpread', 'GVT_TSYM');
            }
        }, {
            headerName: 'Spread (Tsy Curve)',
            headerTooltip: ``,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'spreadToTsyCurve');
            }
        }, {
            headerName: 'Tsy ZOAS',
            headerTooltip: 'Tsy OAS to Yield Curve',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'yieldCurveMargin', 'GVT_TSYM');
            }
        }, {
            headerName: 'Tsy Option Cost',
            headerTooltip: 'Tsy Option Cost',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'zSpread', 'GVT_TSYM') - this.getPYCalcAttribute(params.node.data, 'oas', 'GVT_TSYM');
            }
        }, {
            headerName: `Current Coupon - <br /><br />
            This is the coupon on the Bond that is trading closest to a par value. 
            `,
            headerTooltip: 'Current Coupon',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'currentCoupon');
            }
        }, {
            headerName: 'MOATS Current Coupon',
            headerTooltip: `(Mortgage Option-Adjusted Term Structure Model) Current Coupon - <br /><br />
            This method uses a constant OAS to calculate mortgage prices and the current-coupon mortgage rates independently for each of the <br />
            yield curves of various levels and slopes at each time step into the future.  This is accomplished by a backward-induction method <br />
            that accounts for the prepayment option of the mortgage holders should rates decline.  At each time step, all later current-coupon <br />
            rates are known, so that future prepayments can be determined.  For any yield curve at that point in time, we can price any bond whose <br />
            future cash flows are determined solely by the future path of the yield curve and are independent of the past.  In particular, we can <br />
            price new 30year mortgages of any coupon.  The coupon that has the price of par is, by definition, the current coupon. We use a <br />
            simplified, path independent, version of the SSB prepayment model for the required path independence.  The array of future mortgage <br />
            current coupons is, however, calibrated to the initial market current coupon or its OAS using the full SSB path-dependent prepayment <br />
            model.`,
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'moatsCurrentCoupon');
            }
        },  {
            headerName: 'KRD (6mo)',
            headerTooltip: '6m Partial Duration',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fef4e7'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getKRDFromPYCalc(params.node.data, 0.5, 'partialDuration');
            }
        }, {
            headerName: 'KRD (1Yr)',
            headerTooltip: '1y Partial Duration',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fef4e7'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getKRDFromPYCalc(params.node.data, 1, 'partialDuration');
            }
        }, {
            headerName: 'KRD (2Yr)',
            headerTooltip: '2y Partial Duration',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fef4e7'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getKRDFromPYCalc(params.node.data, 2, 'partialDuration');
            }
        }, {
            headerName: 'KRD (3Yr)',
            headerTooltip: '3y Partial Duration',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fef4e7'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getKRDFromPYCalc(params.node.data, 3, 'partialDuration');
            }
        }, {
            headerName: 'KRD (5Yr)',
            headerTooltip: '5y Partial Duration',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fef4e7'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getKRDFromPYCalc(params.node.data, 5, 'partialDuration');
            }
        }, {
            headerName: 'KRD (10Yr)',
            headerTooltip: '10y Partial Duration',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fef4e7'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getKRDFromPYCalc(params.node.data, 10, 'partialDuration');
            }
        }, {
            headerName: 'KRD (20Yr)',
            headerTooltip: '20y Partial Duration',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fef4e7'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getKRDFromPYCalc(params.node.data, 20, 'partialDuration');
            }
        }, {
            headerName: 'KRD (30Yr)',
            headerTooltip: '30y Partial Duration',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fef4e7'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getKRDFromPYCalc(params.node.data, 30, 'partialDuration');
            }
        }, {
            headerName: `Yield to Worst - <br /><br />
            For callable securities, the lower of a bond's yield-to-maturity and the yield assuming the issuer <br />
            redeems remaining principal at the call price on the next call date.`,
            headerTooltip: 'Total Prepay Duration',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fef4e7'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'yieldToWorst');
            }
        }, {
            headerName: `Yield to Worst Call - <br /><br />
            For callable securities, the lower of a bond's yield-to-maturity and lowest possible yield given all the <br />
            calls provisions.`,
            headerTooltip: 'Total Prepay Duration',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fef4e7'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'yieldToWorst');
            }
        }, {
            headerName: `Spread to Worst - <br /><br />
            For callable securities, the lower of a bond's yield-to-maturity and the yield assuming the issuer <br />
            redeems remaining principal at the call price on the next call date.`,
            headerTooltip: 'Total Prepay Duration',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fef4e7'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'yieldToWorst');
            }
        }, {
            headerName: 'CPR (1mo.)',
            headerTooltip: '1 month Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#edd7ff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, '1Mo', 'CPR');
            }
        }, {
            headerName: 'CPR (3mo.)',
            headerTooltip: '3 month Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#edd7ff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, '3Mo', 'CPR');
            }
        }, {
            headerName: 'CPR (6mo.)',
            headerTooltip: '6 month Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#edd7ff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, '6Mo', 'CPR');
            }
        }, {
            headerName: 'CPR (1yr.)',
            headerTooltip: '1 year Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#edd7ff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, '1Yr', 'CPR');
            }
        }, {
            headerName: 'CPR (LT)',
            headerTooltip: 'Long Term Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#edd7ff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, 'LT', 'CPR');
            }
        }, {
            headerName: 'Fwd CPR (1mo.)',
            headerTooltip: '1 month Fwd Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#f1e1ff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, '1Mo', 'FwdCPR');
            }
        }, {
            headerName: 'Fwd CPR (3mo.)',
            headerTooltip: '3 month Fwd Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#f1e1ff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, '3Mo', 'FwdCPR');
            }
        }, {
            headerName: 'Fwd CPR (6mo.)',
            headerTooltip: '6 month Fwd Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#f1e1ff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, '6Mo', 'FwdCPR');
            }
        }, {
            headerName: 'Fwd CPR (1yr.)',
            headerTooltip: '1 year Fwd Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#f1e1ff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, '1Yr', 'FwdCPR');
            }
        }, {
            headerName: 'Fwd CPR (LT)',
            headerTooltip: 'Long Term Fwd Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#f1e1ff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, 'LT', 'FwdCPR');
            }
        }, {
            headerName: 'PSA CPR (1mo.)',
            headerTooltip: '1 month PSA Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#f7ecff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, '1Mo', 'PSA');
            }
        }, {
            headerName: 'PSA CPR (3mo.)',
            headerTooltip: '3 month PSA Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#f7ecff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, '3Mo', 'PSA');
            }
        }, {
            headerName: 'PSA CPR (6mo.)',
            headerTooltip: '6 month PSA Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#f7ecff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, '6Mo', 'PSA');
            }
        }, {
            headerName: 'PSA CPR (1yr.)',
            headerTooltip: '1 year PSA Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#f7ecff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, '1Yr', 'PSA');
            }
        }, {
            headerName: 'PSA CPR (LT)',
            headerTooltip: 'Long Term PSA Conditional Prepayment Rate',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#f7ecff'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getCPRFromPYCalc(params.node.data, 'LT', 'PSA');
            }
        }, {
            headerName: 'Wal (Avg)',
            headerTooltip: 'WAL (Avg)',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'walMean');
            }
        }, {
            headerName: 'Wal (Std. Dev.)',
            headerTooltip: 'WAL (Std. Dev.)',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-end' };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                return this.getPYCalcAttribute(params.node.data, 'walStandardDeviation');
            }
        }, {
            headerName: 'OAS Paths',
            headerTooltip: 'OAS Paths',
            field: 'pyCalc',
            width: 64,
            minWidth: 64,
            cellRenderer: 'OASPathsRendererComponent',
            cellRendererParams: (params) => {
                return {                    
                    oasPaths: this.getPYCalcAttribute(params.node.data, 'dataOASPathList'),
                    bond: {
                        'name': params.node.data['security']['name'],
                        'cusip': params.node.data['security']['identifier']
                    }
                };
            }
        }, {
            headerName: 'PPM Projections',
            headerTooltip: 'PPM Projections',
            field: 'pyCalc',
            width: 64,
            minWidth: 64,
            cellRenderer: 'PPMProjectionsRendererComponent',
            cellRendererParams: (params) => {
                return {
                    ppmProjections: this.getPYCalcAttribute(params.node.data, 'dataPrepayModelProjectionList'),
                    bond: {
                        'name': params.node.data['security']['name'],
                        'cusip': params.node.data['security']['identifier']
                    }
                };
            }
        }, {
            headerName: 'Fwd Paths',
            headerTooltip: 'Forward Paths',
            field: 'pyCalc',
            width: 64,
            minWidth: 64,
            cellRenderer: 'ForwardPathsRendererComponent',
            cellRendererParams: (params) => {
                return {
                    fwdPaths: this.getPYCalcAttribute(params.node.data, 'dataForwardPathList'),
                    bond: {
                        'name': params.node.data['security']['name'],
                        'cusip': params.node.data['security']['identifier']
                    }
                };
            }
            }, {
                headerName: 'P/Y RequestID',
                headerTooltip: 'Status of the P/Y Request',
                field: 'pyCalc',
                minWidth: 130,
                hide: false,
                cellStyle: params => {
                    let result = {
                        'border-left': '0.2px dotted #dadad8;',
                        'justify-content': 'flex-start',
                        'background-color': '#f4ffe6'
                    };
                    return this._checkError(result, params.node.data);
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
                valueGetter: (params) => {
                    if (!params.node.data['hasPYCalc']) {
                        return 'P/Y not requested';
                    } else {
                        const swapRequestId = this.getPYCalcAttribute(params.node.data, 'requestId');
                        const tsyRequestId = this.getPYCalcAttribute(params.node.data, 'requestId', 'GVT_TSYM');
                        if (swapRequestId !== null && tsyRequestId !== null) {
                            return `${swapRequestId}/${tsyRequestId}`;
                        } else if (swapRequestId !== null) {
                            return `${swapRequestId}/Tsy not req.`;
                        } else if (tsyRequestId !== null) {
                            return `Swap not req./${tsyRequestId}`;
                        } else {
                            'PY Calc not requested';
                        }
                    }
                }
            }, {
            headerName: 'P/Y Request Status',
            headerTooltip: 'Status of the P/Y Request',
            field: 'pyCalc',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data); 
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                if (!params.node.data['hasPYCalc']) {
                    return null;
                }
                return this.getPYCalcAttribute(params.node.data, 'status');
            }
        }, {
            headerName: 'P/Y Request Timestamp',
            headerTooltip: 'Timestamp of the P/Y Request',
            field: 'pyCalc',
            width: 80,
            hide: false,
            minWidth: 150,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                if (!params.node.data['hasPYCalc']) {
                    return null;
                }
                return this.getPYCalcAttribute(params.node.data, 'timestamp');
            },
            valueFormatter: (params) => {
                if (!params.node.data['hasPYCalc']) {
                    return null;
                } else if (params.value) {
                    return moment(params.value).format('lll');
                }
            }
        }];
        return cols;
    }

    private getPYCalcAttribute(data: any, propertyName: string, curveName: string='SWAP_RFR'): any {
        if (data['hasPYCalc'] && data['pyCalc'] && data['pyCalc'][curveName] !== undefined) { 
            return data['pyCalc'][curveName][propertyName] || null;
        }
        return null;
    }

    private getCPRFromPYCalc(data: any, tenor: string, cprType: string, curveName: string='SWAP_RFR'): number { 
        if (data['hasPYCalc'] && data['pyCalc'] && data['pyCalc'][curveName] !== undefined) {
            const ppm = data['pyCalc'][curveName]['dataPpmProjList'].filter((item) => item['prepayType'] === cprType);
            if (ppm.length === 1) {
                switch (tenor) {
                    case '1Mo':
                        return ppm[0]['oneMonth'];
                    case '3Mo':
                        return ppm[0]['threeMonth'];
                    case '6Mo':
                        return ppm[0]['sixMonth'];
                    case '1Yr':
                        return ppm[0]['oneYear'];
                    case 'LT':
                        return ppm[0]['longTerm'];
                }
            }
        }
        return null;
    }

    private getKRDFromPYCalc(data: any, tenor: number, propertyName: string,  curveName: string = 'SWAP_RFR'): number {
        if (data['hasPYCalc'] && data['pyCalc'] && data['pyCalc'][curveName] !== undefined) {
            const partialDur = data['pyCalc'][curveName]['dataPartialDurationList'].filter((item) => item['partialDurationYear'] === tenor);
            if (partialDur.length === 1) {
                return partialDur[0][propertyName];
            }
        }
        return null;
    }

    /**
     * Scenario Request
     */
    private getScenarioRequestColDefs(): ColDef[] {
        const cols: ColDef[] = [{
            headerName: '1M CPR (-100)',
            headerTooltip: '1M CPR (with -100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;', 
                    'justify-content': 'flex-end',
                    'background-color': '#feeed8'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneMonth', 'ShiftMinus100', 'CPR');
            }
        }, {
            headerName: '1M CPR (-50)',
            headerTooltip: '1M CPR (with -5bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#feeed8'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneMonth', 'ShiftMinus50', 'CPR');
            }
        }, {
            headerName: '1M CPR (0)',
            headerTooltip: '1M CPR (with 0bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#feeed8'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneMonth', 'Shift0', 'CPR');
            }
        }, {
            headerName: '1M CPR (+50)',
            headerTooltip: '1M CPR (with +50bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#feeed8'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneMonth', 'ShiftPlus50', 'CPR');
            }
        }, {
            headerName: '1M CPR (+100)',
            headerTooltip: '1M CPR (with +100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#feeed8'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneMonth', 'ShiftPlus100', 'CPR');
            }
        }, {
            headerName: '6M CPR (-100)',
            headerTooltip: '6M CPR (with -100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fdddb3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'sixMonth', 'ShiftMinus100', 'CPR');
            }
        }, {
            headerName: '6M CPR (-50)',
            headerTooltip: '6M CPR (with -5bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fdddb3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'sixMonth', 'ShiftMinus50', 'CPR');
            }
        }, {
            headerName: '6M CPR (0)',
            headerTooltip: '6M CPR (with 0bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fdddb3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'sixMonth', 'Shift0', 'CPR');
            }
        }, {
            headerName: '6M CPR (+50)',
            headerTooltip: '6M CPR (with +50bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fdddb3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'sixMonth', 'ShiftPlus50', 'CPR');
            }
        }, {
            headerName: '6M CPR (+100)',
            headerTooltip: '6M CPR (with +100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fdddb3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'sixMonth', 'ShiftPlus100', 'CPR');
            }
        }, {
            headerName: '1Y CPR (-100)',
            headerTooltip: '1Y CPR (with -100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fcd198'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneYear', 'ShiftMinus100', 'CPR');
            }
        }, {
            headerName: '1Y CPR (-50)',
            headerTooltip: '1Y CPR (with -5bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fcd198'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneYear', 'ShiftMinus50', 'CPR');
            }
        }, {
            headerName: '1Y CPR (0)',
            headerTooltip: '1Y CPR (with 0bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fcd198'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneYear', 'Shift0', 'CPR');
            }
        }, {
            headerName: '1Y CPR (+50)',
            headerTooltip: '1Y CPR (with +50bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fcd198'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneYear', 'ShiftPlus50', 'CPR');
            }
        }, {
            headerName: '1Y CPR (+100)',
            headerTooltip: '1Y CPR (with +100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fcd198'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneYear', 'ShiftPlus100', 'CPR');
            }
        }, {
            headerName: 'LT CPR (-100)',
            headerTooltip: 'LT CPR (with -100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'ShiftMinus100', 'CPR');
            }
        }, {
            headerName: 'LT CPR (-50)',
            headerTooltip: 'LT CPR (with -5bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'ShiftMinus50', 'CPR');
            }
        }, {
            headerName: 'LT CPR (0)',
            headerTooltip: 'LT CPR (with 0bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'Shift0', 'CPR');
            }
        }, {
            headerName: 'LT CPR (+50)',
            headerTooltip: 'LT CPR (with +50bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'ShiftPlus50', 'CPR');
            }
        }, {
            headerName: 'LT CPR (+100)',
            headerTooltip: 'LT CPR (with +100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'ShiftPlus100', 'CPR');
            }
        }, {
            headerName: '1M FwdCPR (-100)',
            headerTooltip: '1M FwsCPR (with -100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#feeed8'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneMonth', 'ShiftMinus100', 'FwdCPR');
            }
        }, {
            headerName: '1M FwdCPR (-50)',
            headerTooltip: '1M FwdCPR (with -5bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#feeed8'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneMonth', 'ShiftMinus50', 'FwdCPR');
            }
        }, {
            headerName: '1M FwdCPR (0)',
            headerTooltip: '1M FwdCPR (with 0bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#feeed8'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneMonth', 'Shift0', 'FwdCPR');
            }
        }, {
            headerName: '1M FwdCPR (+50)',
            headerTooltip: '1M FwdCPR (with +50bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#feeed8'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneMonth', 'ShiftPlus50', 'FwdCPR');
            }
        }, {
            headerName: '1M FwdCPR (+100)',
            headerTooltip: '1M FwdCPR (with +100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#feeed8'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneMonth', 'ShiftPlus100', 'FwdCPR');
            }
        }, {
            headerName: '6M FwdCPR (-100)',
            headerTooltip: '6M FwdCPR (with -100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fdddb3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'sixMonth', 'ShiftMinus100', 'FwdCPR');
            }
        }, {
            headerName: '6M FwdCPR (-50)',
            headerTooltip: '6M FwdCPR (with -5bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fdddb3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'sixMonth', 'ShiftMinus50', 'FwdCPR');
            }
        }, {
            headerName: '6M FwdCPR (0)',
            headerTooltip: '6M FwdCPR (with 0bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fdddb3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'sixMonth', 'Shift0', 'FwdCPR');
            }
        }, {
            headerName: '6M FwdCPR (+50)',
            headerTooltip: '6M FwdCPR (with +50bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fdddb3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'sixMonth', 'ShiftPlus50', 'FwdCPR');
            }
        }, {
            headerName: '6M FwdCPR (+100)',
            headerTooltip: '6M FwdCPR (with +100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fdddb3'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'sixMonth', 'ShiftPlus100', 'FwdCPR');
            }
        }, {
            headerName: '1Y FwdCPR (-100)',
            headerTooltip: '1Y FwdCPR (with -100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fcd198'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneYear', 'ShiftMinus100', 'FwdCPR');
            }
        }, {
            headerName: '1Y FwdCPR (-50)',
            headerTooltip: '1Y FwdCPR (with -5bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fcd198'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneYear', 'ShiftMinus50', 'FwdCPR');
            }
        }, {
            headerName: '1Y FwdCPR (0)',
            headerTooltip: '1Y FwdCPR (with 0bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fcd198'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneYear', 'Shift0', 'FwdCPR');
            }
        }, {
            headerName: '1Y FwdCPR (+50)',
            headerTooltip: '1Y FwdCPR (with +50bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fcd198'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneYear', 'ShiftPlus50', 'FwdCPR');
            }
        }, {
            headerName: '1Y FwdCPR (+100)',
            headerTooltip: '1Y FwdCPR (with +100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fcd198'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'oneYear', 'ShiftPlus100', 'FwdCPR');
            }
        }, {
            headerName: 'LT FwdCPR (-100)',
            headerTooltip: 'LT FwdCPR (with -100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'ShiftMinus100', 'FwdCPR');
            }
        }, {
            headerName: 'LT FwdCPR (-50)',
            headerTooltip: 'LT FwdCPR (with -5bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'ShiftMinus50', 'FwdCPR');
            }
        }, {
            headerName: 'LT FwdCPR (0)',
            headerTooltip: 'LT FwdCPR (with 0bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'Shift0', 'FwdCPR');
            }
        }, {
            headerName: 'LT FwdCPR (+50)',
            headerTooltip: 'LT FwdCPR (with +50bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'ShiftPlus50', 'FwdCPR');
            }
        }, {
            headerName: 'LT FwdCPR (+100)',
            headerTooltip: 'LT FwdCPR (with +100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'ShiftPlus100', 'FwdCPR');
            }
        }, {
            headerName: 'LT PSA (-100)',
            headerTooltip: 'LT PSA (with -100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'ShiftMinus100', 'PSA');
            }
        }, {
            headerName: 'LT PSA (-50)',
            headerTooltip: 'LT PSA (with -5bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'ShiftMinus50', 'PSA');
            }
        }, {
            headerName: 'LT PSA (0)',
            headerTooltip: 'LT PSA (with 0bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'Shift0', 'PSA');
            }
        }, {
            headerName: 'LT PSA (+50)',
            headerTooltip: 'LT PSA (with +50bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'ShiftPlus50', 'PSA');
            }
        }, {
            headerName: 'LT PSA (+100)',
            headerTooltip: 'LT PSA (with +100bps shift)',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-end',
                    'background-color': '#fac08d'
                };
                return this._checkError(result, params.node.data); 
            },
            valueGetter: (params) => {
                return this.getCPRFromScenario(params.node.data, 'longTerm', 'ShiftPlus100', 'PSA');
            }
        }, {
            headerName: 'RoR RequestID',
            headerTooltip: 'RequestId for the RoR Request',
            field: 'ror',
            minWidth: 120,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                if (!params.node.data['hasRoR']) {
                    return 'RoR not requested';
                }
                return this.getRoRAttribute(params.node.data, 'requestId');
            }
        }, {
            headerName: 'RoR Request Status',
            headerTooltip: 'Status of the RoR Request',
            field: 'ror',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data);
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                if (!params.node.data['hasRoR']) {
                    return null;
                }
                return this.getRoRAttribute(params.node.data, 'status');
            }
        }, {
            headerName: 'RoR Request Timestamp',
            headerTooltip: 'Timestamp of the RoR Request',
            field: 'ror',
            width: 80,
            hide: false,
            minWidth: 150,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                if (!params.node.data['hasRoR']) {
                    return null;
                }
                return this.getRoRAttribute(params.node.data, 'timestamp');
            },
            valueFormatter: (params) => {
                if (!params.node.data['hasRoR']) {
                    return null;
                } else if (params.value) {
                    return moment(params.value).format('lll');
                }
            }
        }, {
            headerName: 'Error',
            headerTooltip: 'Error in RoR Request',
            field: 'ror',
            minWidth: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getRoRAttribute(params.node.data, 'error');
            }
        }];;
        return cols;
    }

    private getRoRAttribute(data: any, propertyName: string): any {
        if (data['hasROR'] && data['ror'] !== undefined) {
            return data['ror'][propertyName] || null;
        }
        return null;
    }

    private getCPRFromScenario(data: any, tenor: string, scenarioName: string, cprType: string, curveName: string = 'SWAP_RFR'): number {
        const horizon = this.getHorizonFromScenario(data, scenarioName, curveName);
        if (horizon) { 
            const ppmProj = horizon['dataPpmProjList'].filter((proj) => proj['prepayType'] === cprType);
            if (ppmProj.length === 1) { 
                return ppmProj[0][tenor];
            } 
        }
        return null;
    }

    private getHorizonFromScenario(data: any, scenarioName: string, curveName: string): any { 
        if (data['hasROR'] && data['ror'] && data['ror'][curveName] !== undefined) {
            const horizon = data['ror'][curveName]['horizon'][scenarioName];
            if (horizon !== undefined) {
                return horizon;
            }
        }
        return null;
    }

    private getCashflowsFromScenario(data: any, scenarioName: string, curveName: string): any {
        if (data['hasROR'] && data['ror'] && data['ror'][curveName] !== undefined) {
            const horizon = data['ror'][curveName]['cashflows'][scenarioName];
            if (horizon !== undefined) {
                return horizon;
            }
            return null
        }
        return null;
    }


    /** 
     * Act Vs Proj Request
     * */
    private getActVsProjColDefs(): ColDef[] { 
        const cols: ColDef[] = [{
            headerName: 'Act. vs. Proj. Summary',
            headerTooltip: 'Actual vs. Projected CPR Summary',
            field: 'actVsProj',
            width: 40,
            hide: false,
            cellStyle: params => {
                let result = {
                    'justify-content': 'flex-start'
                };
                return this._checkError(result, params.node.data);
            },
            cellRenderer: 'ActVsProjSummaryRendererComponent',
            cellRendererParams: (params) => {
                return {
                    summary: this.getActVsProjAttribute(params.node.data, 'dataActVsProjSummaryList'),
                    bond: {
                        'name': params.node.data['security']['name'],
                        'cusip': params.node.data['security']['identifier']
                    }
                };
            }
        }, {
                headerName: 'Act. vs. Proj. History',
                headerTooltip: 'Actual vs. Projected History',
                field: 'actVsProj',
                width: 40,
                hide: false,
                cellStyle: params => {
                    let result = {
                        'justify-content': 'flex-start'
                    };
                    return this._checkError(result, params.node.data);
                },
                cellRenderer: 'ActVsProjHistoryRendererComponent',
                cellRendererParams: (params) => {
                    return {
                        history: this.getActVsProjAttribute(params.node.data, 'dataActVsProjVectorList'),
                        bond: {
                            'name': params.node.data['security']['name'],
                            'cusip': params.node.data['security']['identifier']
                        }
                    };
                }
        }, {
            headerName: 'Status',
            headerTooltip: 'Status (Actual vs. Projected Request)',
            field: 'actVsProj',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getActVsProjAttribute(params.node.data, 'status');
            }
        }, {
            headerName: 'Act vs. Proj RequestID',
            headerTooltip: 'RequestId for the Actual vs. Projected Request',
            field: 'actVsProj',
            minWidth: 150,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                if (!params.node.data['hasActVsProj']) {
                    return 'Act. vs. Proj. not requested';
                }
                return this.getActVsProjAttribute(params.node.data, 'requestId');
            }
        }, {
            headerName: 'Act. vs. Proj. Request Status',
            headerTooltip: 'Status of the Actual vs. Projection Request',
            field: 'actVsProj',
            width: 80,
            hide: false,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data);
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2),
            valueGetter: (params) => {
                if (!params.node.data['hasActVsProj']) {
                    return null;
                }
                return this.getPYCalcAttribute(params.node.data, 'status');
            }
        }, {
            headerName: 'Act. vs. Proj. Request Timestamp',
            headerTooltip: 'Timestamp of the Actual vs. Projection Request',
            field: 'actVsProj',
            width: 80,
            hide: false,
            minWidth: 150,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                if (!params.node.data['hasActVsProj']) {
                    return null;
                }
                return this.getActVsProjAttribute(params.node.data, 'timestamp');
            },
            valueFormatter: (params) => {
                if (!params.node.data['hasActVsProj']) {
                    return null;
                } else if (params.value) {
                    return moment(params.value).format('lll');
                }
            }
        }, {
            headerName: 'Error',
            headerTooltip: 'Error in Actual vs. Projected Request',
            field: 'actVsProj',
            minWidth: 100,
            cellStyle: params => {
                let result = {
                    'border-left': '0.2px dotted #dadad8;',
                    'justify-content': 'flex-start',
                    'background-color': '#f4ffe6'
                };
                return this._checkError(result, params.node.data);
            },
            valueGetter: (params) => {
                return this.getActVsProjAttribute(params.node.data, 'error');
            }
        }];
        return cols;
    }

    private getActVsProjAttribute(data: any, propertyName: string): any {
        if (data['hasActVsProj'] && data['actVsProj'] !== undefined) {
            return data['actVsProj'][propertyName] || null;
        }
        return null;
    }

    /**
     * Common methods
     */

    private _checkError(result: any, data: any): any { 
        const indicError = this.getIndicativeDataAttribute(data, 'error');
        const pyCalcError = this.getPYCalcAttribute(data, 'error');
        const rorError = this.getRoRAttribute(data, 'error');
        const actVsProjError = this.getActVsProjAttribute(data, 'error');
        const errorMsg = indicError || pyCalcError || rorError || actVsProjError;
        if (errorMsg !== undefined && errorMsg !== null) {
            result['color'] = 'red';
            result['font-style'] = 'italic';
        }
        return result;
    }
}

