import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import * as fromModels from '../../models';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { UntypedFormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
    selector: 'app-cs-capital-flow-stats',
    templateUrl: './client-solutions-capital-flow-stats.component.html',
    styleUrls: ['./client-solutions-capital-flow-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsCapitalFlowStatsComponent implements OnInit, OnChanges {

    @Input() dateRange: fromModels.DateRange;

    @Input() capitalFlowStats: fromModels.CapitalFlowStats;
    @Input() capitalFlowStatsLoading: boolean;
    @Input() capitalFlowStatsLoaded: boolean;
    @Input() capitalFlowStatsError: boolean;

    public dateFilter = new UntypedFormControl();
    public selectedDates: any[] = [];
    public capitalDates: any[] = [];
    public capitalDateDict: {[id: string]: any} = {};

    MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    public extraOption = { sizeColumnsToFit: true };

    private gridApiMonthlyFlowsByFund: GridApi;
    private gridColumnApiFlowsByFund: ColumnApi;
    private gridApiMonthlyFlowsByMasterFund: GridApi;
    private gridColumnApiFlowsByMasterFund: ColumnApi;
    private gridApiUpcomingFlows: GridApi;
    private gridColumnApiUpcomingFlows: ColumnApi;
    private gridApiFlowsByInvestorType: GridApi;
    private gridColumnApiFlowsByInvestorType: ColumnApi;
    private gridApiFlowsByRelationship: GridApi;
    private gridColumnApiFlowsByRelationship: ColumnApi;
    private gridApiTotalFlowsByInvestorType: GridApi;
    private gridColumnApiTotalFlowsByInvestorType: ColumnApi;
    private gridApiTotalFlowsByRelationship: GridApi;
    private gridColumnApiTotalFlowsByRelationship: ColumnApi;

    public isExternalFilterPresent = false;

    public customGridOption: GridOptions = {
        defaultColDef: {
            suppressMenu: true,
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
        },
        headerHeight: 70,
        floatingFilter: false,
        isExternalFilterPresent: () => {
            let result = false;
            Object.keys(this.capitalDateDict).forEach((key) => {
                if (this.capitalDateDict[key].selected === false) {
                    result = true;
                }
            });
            return result;
        },
        doesExternalFilterPass: node => {
            const nodeMonth = Number(node.data.Month);
            const nodeYear = Number(node.data.Year);
            const exists = this._getSelectedDates().filter((capDate) => capDate.month === nodeMonth && capDate.year === nodeYear);
            if (exists.length > 0) {
                return true;
            }
            return false;
        },
    };

    public customGridOption2: GridOptions = {
        defaultColDef: {
            suppressMenu: true,
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
        },
        floatingFilter: false,
        isExternalFilterPresent: () => {
            let result = false;
            Object.keys(this.capitalDateDict).forEach((key) => {
                if (this.capitalDateDict[key].selected === false) {
                    result = true;
                }
            });
            return result;
        },
        doesExternalFilterPass: node => {
            const nodeMonth = Number(node.data.Month);
            const nodeYear = Number(node.data.Year);
            const exists = this._getSelectedDates().filter((capDate) => capDate.month === nodeMonth && capDate.year === nodeYear);
            if (exists.length > 0) {
                return true;
            }
            return false;
        },
    };

    constructor(private utilities: UtilityService) {
        this.customGridCallBackMonthlyFlowsByFund = this.customGridCallBackMonthlyFlowsByFund.bind(this);
        this.customGridCallBackMonthlyFlowsByMasterFund = this.customGridCallBackMonthlyFlowsByMasterFund.bind(this);
        this.customGridCallBackUpcomingFlows = this.customGridCallBackUpcomingFlows.bind(this);
        this.customGridCallBackFlowsByInvestorType = this.customGridCallBackFlowsByInvestorType.bind(this);
        this.customGridCallBackFlowsByRelationship = this.customGridCallBackFlowsByRelationship.bind(this);
        this.customGridCallBackTotalFlowsByInvestorType = this.customGridCallBackTotalFlowsByInvestorType.bind(this);
        this.customGridCallBackTotalFlowsByRelationship = this.customGridCallBackTotalFlowsByRelationship.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.capitalFlowStats && changes.capitalFlowStats.currentValue) {

            this.capitalDates = changes.capitalFlowStats.currentValue.capitalDates;

            this.capitalDates.map((capitalDate) => {
                this.capitalDateDict[capitalDate.name] = {'month': capitalDate.month, 'year': capitalDate.year, 'selected': true};
            });

            this.selectedDates = changes.capitalFlowStats.currentValue.capitalDates;

            if (this.gridApiMonthlyFlowsByFund) {
                const columnDefs = this.getColumnDefsMonthlyFlowsByFund(changes.capitalFlowStats.currentValue);
                this.gridApiMonthlyFlowsByFund.setColumnDefs(columnDefs);
                this.gridApiMonthlyFlowsByFund.setRowData([]);
                this.gridApiMonthlyFlowsByFund.setRowData(changes.capitalFlowStats.currentValue.monthlyFlowPivotedByFund);
                this.gridApiMonthlyFlowsByFund.refreshCells();
                this.gridApiMonthlyFlowsByFund.sizeColumnsToFit();
            }

            if (this.gridApiMonthlyFlowsByMasterFund) {
                const columnDefs = this.getColumnDefsMonthlyFlowsByMasterFund(changes.capitalFlowStats.currentValue);
                this.gridApiMonthlyFlowsByMasterFund.setColumnDefs(columnDefs);
                this.gridApiMonthlyFlowsByMasterFund.setRowData([]);
                this.gridApiMonthlyFlowsByMasterFund.setRowData(changes.capitalFlowStats.currentValue.monthlyLeveredFlowByMasterFund);
                this.gridApiMonthlyFlowsByMasterFund.refreshCells();
                this.gridApiMonthlyFlowsByMasterFund.sizeColumnsToFit();
            }

            if (this.gridApiUpcomingFlows) {
                const columnDefs = this.getColumnDefsUpcomingFlows(changes.capitalFlowStats.currentValue);
                this.gridApiUpcomingFlows.setColumnDefs(columnDefs);
                this.gridApiUpcomingFlows.setRowData([]);
                this.gridApiUpcomingFlows.setRowData(changes.capitalFlowStats.currentValue.upcomingFlows);
                this.gridApiUpcomingFlows.refreshCells();
                this.gridApiUpcomingFlows.sizeColumnsToFit();
            }

            if (this.gridApiFlowsByInvestorType) {
                const columnDefs = this.getColumnDefsFlowsByInvestorType(changes.capitalFlowStats.currentValue);
                this.gridApiFlowsByInvestorType.setColumnDefs(columnDefs);
                this.gridApiFlowsByInvestorType.setRowData([]);
                this.gridApiFlowsByInvestorType.setRowData(changes.capitalFlowStats.currentValue.monthlyFlowByFundInvestorType);
                this.gridApiFlowsByInvestorType.refreshCells();
                this.gridApiFlowsByInvestorType.sizeColumnsToFit();
            }

            if (this.gridApiFlowsByRelationship) {
                const columnDefs = this.getColumnDefsFlowsByRelationship(changes.capitalFlowStats.currentValue);
                this.gridApiFlowsByRelationship.setColumnDefs(columnDefs);
                this.gridApiFlowsByRelationship.setRowData([]);
                this.gridApiFlowsByRelationship.setRowData(changes.capitalFlowStats.currentValue.monthlyFlowByFundRelationship);
                this.gridApiFlowsByRelationship.refreshCells();
                this.gridApiFlowsByRelationship.sizeColumnsToFit();
            }

            if (this.gridApiTotalFlowsByInvestorType) {
                const columnDefs = this.getColumnDefsTotalFlowsByInvestorType(changes.capitalFlowStats.currentValue);
                this.gridApiTotalFlowsByInvestorType.setColumnDefs(columnDefs);
                this.gridApiTotalFlowsByInvestorType.setRowData([]);
                this.gridApiTotalFlowsByInvestorType.setRowData(changes.capitalFlowStats.currentValue.totalFlowByInvestorType);
                this.gridApiTotalFlowsByInvestorType.refreshCells();
                this.gridApiTotalFlowsByInvestorType.sizeColumnsToFit();
            }

            if (this.gridApiTotalFlowsByRelationship) {
                const columnDefs = this.getColumnDefsTotalFlowsByRelationship(changes.capitalFlowStats.currentValue);
                this.gridApiTotalFlowsByRelationship.setColumnDefs(columnDefs);
                this.gridApiTotalFlowsByRelationship.setRowData([]);
                this.gridApiTotalFlowsByRelationship.setRowData(changes.capitalFlowStats.currentValue.totalFlowByRelationship);
                this.gridApiTotalFlowsByRelationship.refreshCells();
                this.gridApiTotalFlowsByRelationship.sizeColumnsToFit();
            }
        }
    }

    /**
     * Monthly Flows Pivoted By Fund
     */

    customGridCallBackMonthlyFlowsByFund(params) {
        this.gridApiMonthlyFlowsByFund = params.api;
        this.gridColumnApiFlowsByFund = params.columnApi;

        if (this.gridApiMonthlyFlowsByFund && this.capitalFlowStats) {
            const columnDefs = this.getColumnDefsMonthlyFlowsByFund(this.capitalFlowStats);
            this.gridApiMonthlyFlowsByFund.setColumnDefs(columnDefs);
            this.gridApiMonthlyFlowsByFund.setRowData([]);
            this.gridApiMonthlyFlowsByFund.setRowData(this.capitalFlowStats.monthlyFlowPivotedByFund);
            this.gridApiMonthlyFlowsByFund.refreshCells();
            this.gridApiMonthlyFlowsByFund.sizeColumnsToFit();
        }
    }

    getColumnDefsMonthlyFlowsByFund(capitalFlowStats: fromModels.CapitalFlowStats): any[] {
        const colDefs: any[] = [];
        if (capitalFlowStats) {
            colDefs.push({
                headerName: 'Date',
                field: 'Month',
                pinned: 'left',
                width: 100,
                valueGetter: params => {
                    return this._getDate(params.data['Month'], params.data['Year']);
                },
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['TransactionType'] === 'Net Flow') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                sortable: true
            });

            colDefs.push({
                headerName: 'Flow Type',
                pinned: 'left',     
                width: 120,
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['TransactionType'] === 'Net Flow') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                field: 'TransactionType',
                sortable: false
            });
            const fundList = capitalFlowStats.fundList.map(fund => fund);
            fundList.push('Total');
            fundList.forEach((fund) => {
                const colDef = {
                    headerName: fund,
                    field: fund,
                    maxWidth: 170,
                    cellStyle: (params) => {
                        let stl = { 'justify-content': 'end' };
                        if (fund === 'Total') {
                            stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#f4ffe8' });
                        } else if (capitalFlowStats.masterFundList.indexOf(fund) >= 0) {
                            stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#cefffd' });
                        } else if (params.data['TransactionType'] === 'Net Flow') {
                            stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                        }
                        return stl;
                    },
                    valueGetter: params => {
                        return params.data[fund] || 0.0;
                    },
                    sortable: false,
                    valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
                };
                colDefs.push(colDef);
            });
        }
        return colDefs;
    }

    /**
     * Levered Monthly Flows By Master Fund
     */

    customGridCallBackMonthlyFlowsByMasterFund(params) {
        this.gridApiMonthlyFlowsByMasterFund = params.api;
        this.gridColumnApiFlowsByMasterFund = params.columnApi;

        if (this.gridApiMonthlyFlowsByMasterFund && this.capitalFlowStats) {
            const columnDefs = this.getColumnDefsMonthlyFlowsByMasterFund(this.capitalFlowStats);
            this.gridApiMonthlyFlowsByMasterFund.setColumnDefs(columnDefs);
            this.gridApiMonthlyFlowsByMasterFund.setRowData([]);
            this.gridApiMonthlyFlowsByMasterFund.setRowData(this.capitalFlowStats.monthlyLeveredFlowByMasterFund);
            this.gridApiMonthlyFlowsByMasterFund.refreshCells();
            this.gridApiMonthlyFlowsByMasterFund.sizeColumnsToFit();
        }
    }

    getColumnDefsMonthlyFlowsByMasterFund(capitalFlowStats: fromModels.CapitalFlowStats): any[] {
        const colDefs: any[] = [];
        if (capitalFlowStats) {
            colDefs.push({
                headerName: 'Date',
                field: 'Month',
                pinned: 'left',
                width: 100,
                valueGetter: params => {
                    return this._getDate(params.data['Month'], params.data['Year']);
                },
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['TransactionType'] === 'Net Flow') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                sortable: true
            });

            colDefs.push({
                headerName: 'Flow Type',
                pinned: 'left',
                sortable: false,
                width: 120,
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['TransactionType'] === 'Net Flow') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                field: 'TransactionType'
            });

            const fundList = capitalFlowStats.masterFundList.map(fund => fund);
            fundList.push('Total');
            fundList.forEach((fund) => {
                const colDef = {
                    headerName: fund,
                    field: fund,
                    maxWidth: 170,
                    cellStyle: (params) => {
                        let stl = { 'justify-content': 'end' };
                        if (params.data['TransactionType'] === 'Net Flow') {
                            stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                        }
                        return stl;
                    },
                    valueGetter: params => {
                        return params.data[fund] || 0.0;
                    },
                    sortable: false,
                    valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
                };
                colDefs.push(colDef);
            });
        }
        return colDefs;
    }

    /**
     * Upcoming Flows
     */
    customGridCallBackUpcomingFlows(params) {
        this.gridApiUpcomingFlows = params.api;
        this.gridColumnApiUpcomingFlows = params.columnApi;

        if (this.gridApiUpcomingFlows && this.capitalFlowStats) {
            const columnDefs = this.getColumnDefsUpcomingFlows(this.capitalFlowStats);
            this.gridApiUpcomingFlows.setColumnDefs(columnDefs);
            this.gridApiUpcomingFlows.setRowData([]);
            this.gridApiUpcomingFlows.setRowData(this.capitalFlowStats.upcomingFlows);
            this.gridApiUpcomingFlows.refreshCells();
            this.gridApiUpcomingFlows.sizeColumnsToFit();
        }
    }

    getColumnDefsUpcomingFlows(capitalFlowStats: fromModels.CapitalFlowStats): any[] {
        const colDefs: any[] = [];
        if (capitalFlowStats) {
            colDefs.push({
                headerName: 'Date',
                field: 'Month',
                pinned: 'left',
                width: 100,
                valueGetter: params => {
                    return this._getDate(params.data['Month'], params.data['Year']);
                },
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['TransactionType'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                sortable: true
            });

            colDefs.push({
                headerName: 'Flow Type',
                pinned: 'left',
                sortable: false,
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['TransactionType'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                field: 'TransactionType'
            });

            const fundList = capitalFlowStats.masterFundList.map(fund => fund);
            fundList.push('Total');
            fundList.forEach((fund) => {
                const colDef = {
                    headerName: fund,
                    field: fund,
                    maxWidth: 140,
                    cellStyle: (params) => {
                        let stl = { 'justify-content': 'end' };
                        if (fund === 'Total') {
                            stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#f4ffe8' });
                        } else if (params.data['TransactionType'] === 'Total') {
                            stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                        }
                        return stl;
                    },
                    valueGetter: params => {
                        return params.data[fund] || 0.0;
                    },
                    sortable: false,
                    valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
                };
                colDefs.push(colDef);
            });
        }
        return colDefs;
    }

    /**
    * Monthly Flows by Investor Type
    */
    customGridCallBackFlowsByInvestorType(params) {
        this.gridApiFlowsByInvestorType = params.api;
        this.gridColumnApiFlowsByInvestorType = params.columnApi;

        if (this.gridApiFlowsByInvestorType && this.capitalFlowStats) {
            const columnDefs = this.getColumnDefsFlowsByInvestorType(this.capitalFlowStats);
            this.gridApiFlowsByInvestorType.setColumnDefs(columnDefs);
            this.gridApiFlowsByInvestorType.setRowData([]);
            this.gridApiFlowsByInvestorType.setRowData(this.capitalFlowStats.monthlyFlowByFundInvestorType);
            this.gridApiFlowsByInvestorType.refreshCells();
            this.gridApiFlowsByInvestorType.sizeColumnsToFit();
        }
    }

    getColumnDefsFlowsByInvestorType(capitalFlowStats: fromModels.CapitalFlowStats): any[] {
        const colDefs: any[] = [];
        if (capitalFlowStats) {
            colDefs.push({
                headerName: 'Date',
                field: 'Month',
                pinned: 'left',
                width: 130,
                valueGetter: params => {
                    return this._getDate(params.data['Month'], params.data['Year']);
                },
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['MasterFundName'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                sortable: true
            });

            colDefs.push({
                headerName: 'Investor Type',
                field: 'InvestorType',
                sortable: true,
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['MasterFundName'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                pinned: 'left'
            });

            colDefs.push({
                headerName: 'Master Fund',
                field: 'MasterFundName',
                sortable: true,
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['MasterFundName'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
            });

            colDefs.push({
                headerName: 'Feeder Fund',
                field: 'FundName',
                sortable: true,
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['MasterFundName'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
            });

            colDefs.push({
                headerName: 'Inflow',
                field: 'Inflow',
                sortable: true,
                cellStyle: (params) => {
                    let stl = { 'justify-content': 'end' };
                    if (params.data['MasterFundName'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            });

            colDefs.push({
                headerName: 'Outflow',
                field: 'Outflow',
                sortable: true,
                cellStyle: (params) => {
                    let stl = { 'justify-content': 'end' };
                    if (params.data['MasterFundName'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            });

            colDefs.push({
                headerName: 'Netflow',
                field: 'Netflow',
                sortable: true,
                cellStyle: (params) => {
                    return { 'justify-content': 'end', 'font-weight': 'bold', 'background-color': '#f4ffe8' };
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            });
        }
        return colDefs;
    }

    /**
    * Monthly Flows by Relationship
    */
    customGridCallBackFlowsByRelationship(params) {
        this.gridApiFlowsByRelationship = params.api;
        this.gridColumnApiFlowsByRelationship = params.columnApi;

        if (this.gridApiFlowsByRelationship && this.capitalFlowStats) {
            const columnDefs = this.getColumnDefsFlowsByRelationship(this.capitalFlowStats);
            this.gridApiFlowsByRelationship.setColumnDefs(columnDefs);
            this.gridApiFlowsByRelationship.setRowData([]);
            this.gridApiFlowsByRelationship.setRowData(this.capitalFlowStats.monthlyFlowByFundRelationship);
            this.gridApiFlowsByRelationship.refreshCells();
            this.gridApiFlowsByRelationship.sizeColumnsToFit();
        }
    }

    getColumnDefsFlowsByRelationship(capitalFlowStats: fromModels.CapitalFlowStats): any[] {
        const colDefs: any[] = [];
        if (capitalFlowStats) {
            colDefs.push({
                headerName: 'Date',
                field: 'Month',
                pinned: 'left',
                width: 130,
                valueGetter: params => {
                    return this._getDate(params.data['Month'], params.data['Year']);
                },
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['MasterFundName'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                sortable: true
            });

            colDefs.push({
                headerName: 'Relationship',
                field: 'Relationship',
                sortable: true,
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['MasterFundName'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                pinned: 'left'
            });

            colDefs.push({
                headerName: 'Master Fund',
                field: 'MasterFundName',
                sortable: true,
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['MasterFundName'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
            });

            colDefs.push({
                headerName: 'Feeder Fund',
                field: 'FundName',
                sortable: true,
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['MasterFundName'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
            });

            colDefs.push({
                headerName: 'Inflow',
                field: 'Inflow',
                sortable: true,
                cellStyle: (params) => {
                    let stl = { 'justify-content': 'end' };
                    if (params.data['MasterFundName'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            });

            colDefs.push({
                headerName: 'Outflow',
                field: 'Outflow',
                sortable: true,
                cellStyle: (params) => {
                    let stl = { 'justify-content': 'end' };
                    if (params.data['MasterFundName'] === 'Total') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            });

            colDefs.push({
                headerName: 'Netflow',
                field: 'Netflow',
                sortable: true,
                cellStyle: (params) => {
                    return { 'justify-content': 'end', 'font-weight': 'bold', 'background-color': '#f4ffe8' };
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            });
        }
        return colDefs;
    }

    /**
    * Total Flows by Investor Type
    */
    customGridCallBackTotalFlowsByInvestorType(params) {
        this.gridApiTotalFlowsByInvestorType = params.api;
        this.gridColumnApiTotalFlowsByInvestorType = params.columnApi;

        if (this.gridApiTotalFlowsByInvestorType && this.capitalFlowStats) {
            const columnDefs = this.getColumnDefsTotalFlowsByInvestorType(this.capitalFlowStats);
            this.gridApiTotalFlowsByInvestorType.setColumnDefs(columnDefs);
            this.gridApiTotalFlowsByInvestorType.setRowData([]);
            this.gridApiTotalFlowsByInvestorType.setRowData(this.capitalFlowStats.totalFlowByInvestorType);
            this.gridApiTotalFlowsByInvestorType.refreshCells();
            this.gridApiTotalFlowsByInvestorType.sizeColumnsToFit();
        }
    }

    getColumnDefsTotalFlowsByInvestorType(capitalFlowStats: fromModels.CapitalFlowStats): any[] {
        const colDefs: any[] = [];
        if (capitalFlowStats) {
            colDefs.push({
                headerName: 'Investor Type',
                field: 'InvestorType',
                sortable: true,
                cellStyle: (params) => {
                    let stl = {};
                    if (params.data['InvestorType'] === 'TOTAL') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
            });

            colDefs.push({
                headerName: 'Inflow',
                field: 'Inflow',
                sortable: true,
                cellStyle: (params) => {
                    let stl = { 'justify-content': 'end' };
                    if (params.data['InvestorType'] === 'TOTAL') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            });

            colDefs.push({
                headerName: 'Outflow',
                field: 'Outflow',
                sortable: true,
                cellStyle: (params) => {
                    let stl = { 'justify-content': 'end' };
                    if (params.data['InvestorType'] === 'TOTAL') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            });

            colDefs.push({
                headerName: 'Netflow',
                field: 'Netflow',
                sortable: true,
                cellStyle: (params) => {
                    return { 'justify-content': 'end', 'font-weight': 'bold', 'background-color': '#f4ffe8' };
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            });
        }
        return colDefs;
    }

    /**
    * Total Flows by Relationship
    */
    customGridCallBackTotalFlowsByRelationship(params) {
        this.gridApiTotalFlowsByRelationship = params.api;
        this.gridColumnApiTotalFlowsByRelationship = params.columnApi;

        if (this.gridApiTotalFlowsByRelationship && this.capitalFlowStats) {
            const columnDefs = this.getColumnDefsTotalFlowsByRelationship(this.capitalFlowStats);
            this.gridApiTotalFlowsByRelationship.setColumnDefs(columnDefs);
            this.gridApiTotalFlowsByRelationship.setRowData([]);
            this.gridApiTotalFlowsByRelationship.setRowData(this.capitalFlowStats.totalFlowByRelationship);
            this.gridApiTotalFlowsByRelationship.refreshCells();
            this.gridApiTotalFlowsByRelationship.sizeColumnsToFit();
        }
    }

    getColumnDefsTotalFlowsByRelationship(capitalFlowStats: fromModels.CapitalFlowStats): any[] {
        const colDefs: any[] = [];
        if (capitalFlowStats) {
            colDefs.push({
                headerName: 'Relationship',
                field: 'Relationship',
                sortable: true,
                cellStyle: (params) => {
                    let stl = { };
                    if (params.data['Relationship'] === 'TOTAL') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                }
            });

            colDefs.push({
                headerName: 'Inflow',
                field: 'Inflow',
                sortable: true,
                cellStyle: (params) => {
                    let stl = { 'justify-content': 'end' };
                    if (params.data['Relationship'] === 'TOTAL') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            });

            colDefs.push({
                headerName: 'Outflow',
                field: 'Outflow',
                sortable: true,
                cellStyle: (params) => {
                    let stl = { 'justify-content': 'end' };
                    if (params.data['Relationship'] === 'TOTAL') {
                        stl = Object.assign({}, stl, { 'font-weight': 'bold', 'background-color': '#fafbdd' });
                    }
                    return stl;
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            });

            colDefs.push({
                headerName: 'Netflow',
                field: 'Netflow',
                sortable: true,
                cellStyle: (params) => {
                    return { 'justify-content': 'end', 'font-weight': 'bold', 'background-color': '#f4ffe8' };
                },
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            });
        }
        return colDefs;
    }

    changeSelectedDates(e: MatOptionSelectionChange): void {
        const val = e.source.value;
        const selected = e.source.selected;

        this.capitalDateDict[val.name] = Object.assign({}, this.capitalDateDict[val.name], {'selected': selected});

        if (this.gridApiMonthlyFlowsByFund) {
            this.gridApiMonthlyFlowsByFund.onFilterChanged();
        }

        if (this.gridApiMonthlyFlowsByMasterFund) {
            this.gridApiMonthlyFlowsByMasterFund.onFilterChanged();
        }

        if (this.gridApiFlowsByInvestorType) {
            this.gridApiFlowsByInvestorType.onFilterChanged();
        }

        if (this.gridApiFlowsByRelationship) {
            this.gridApiFlowsByRelationship.onFilterChanged();
        }
    }

    private _getSelectedDates(): any[] {
        const result = [];
        Object.keys(this.capitalDateDict).forEach((key) => {
            if (this.capitalDateDict[key].selected) {
                result.push(this.capitalDateDict[key]);
            }
        });
        return result;
    }

    private _getDate(month: number, year: number): string {
        if (!month) {
            return '';
        }
        return `${this.MONTHS[month - 1]} \' ${year.toString().substring(2, 4)}`;
    }

}
