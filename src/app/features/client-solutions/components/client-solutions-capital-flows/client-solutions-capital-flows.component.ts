import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellRangesStatisticComponent, AppGridCustomStatusBarCellValueComponent } from 'src/app/components';
import { UtilityService } from 'src/app/services';
import { ClientSolutionsCapitalFlowFormComponent } from '../client-solutions-capital-flow-form/client-solutions-capital-flow-form.component';

import * as moment from 'moment';
import * as fromModels from './../../models';

@Component({
    selector: 'app-cs-capital-flows',
    templateUrl: './client-solutions-capital-flows.component.html',
    styleUrls: ['./client-solutions-capital-flows.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsCapitalFlowsComponent implements OnInit {

    @Input() dateRange: fromModels.DateRange;

    @Input() capitalFlows: fromModels.CapitalFlow[];
    @Input() capitalFlowsLoading: boolean;
    @Input() capitalFlowsLoaded: boolean;
    @Input() capitalFlowsError: string;

    @Input() capitalFlowStats: fromModels.CapitalFlowStats;
    @Input() capitalFlowStatsLoading: boolean;
    @Input() capitalFlowStatsLoaded: boolean;
    @Input() capitalFlowStatsError: string;

    @Input() projectedAUM: fromModels.ProjectedAUM;
    @Input() projectedAUMLoading: boolean;
    @Input() projectedAUMLoaded: boolean;
    @Input() projectedAUMError: string;

    @Input() investors: any[];
    @Input() formData: fromModels.CapitalFlowForm;
    @Input() formDataLoading: boolean;
    @Input() formDataLoaded: boolean;
    @Input() formDataError: string;

    @Input() canEditCapitalFlows: boolean;

    @Output() addInvestment: EventEmitter<any> = new EventEmitter<any>();
    @Output() editInvestment: EventEmitter<any> = new EventEmitter<any>();
    @Output() deleteInvestment: EventEmitter<any> = new EventEmitter<any>();

    @Output() sendCapitalFlowEmail: EventEmitter<void> = new EventEmitter<void>();

    public extraOption = {sizeColumnsToFit: true, autoSizeColumns: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        defaultColDef: {
            suppressMenu: true,
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
        },
        context: this,
        statusBar: {
            statusPanels: [
                // {statusPanel: 'agAggregationComponent'},
                { statusPanel: 'AppGridCustomStatusBarCellRangesStatisticComponent' },
                { statusPanel: 'AppGridCustomStatusBarCellValueComponent' },
            ]
        },
        getContextMenuItems: params => {

            const asOfDate = params.node.data['EffectiveDate'];
            const effDate = moment(asOfDate);
            const today = moment();

            const canDelete = effDate.diff(today, 'days', true) > 0;

            // Users should be allowed to edit final amount of full redemptions once NAVs are finalized
            const canEdit = effDate.diff(today, 'months', false) >= -1;

            const addActivityMenuItem = {
                name: 'Add Activity',
                icon: '<i class="material-icons small-menu-icon">add</i>',
                disabled: !this.canEditCapitalFlows,
                action: () => this.addCapitalActivity(this.gridApi)
            };

            const editActivityMenuItem = {
                name: 'Edit Activity',
                disabled: !(this.gridApi.getSelectedRows().length !== 1 || this.canEditCapitalFlows),
                icon: '<i class="material-icons small-menu-icon">edit</i>',
                action: () => this.editCapitalActivity(this.gridApi)
            };

            const deleteActivityMenuItem = {
                name: 'Delete Activity',
                disabled: !(this.gridApi.getSelectedRows().length !== 1 || this.canEditCapitalFlows),
                icon: '<i class="material-icons small-menu-icon">delete</i>',
                action: () => this.deleteCapitalActivity(this.gridApi)
            };

            const sendUpcomingFlowsEmail = {
                name: 'Send Upcoming Flows Email',
                icon: '<i class="material-icons small-menu-icon">mail</i>',
                disabled: !this.canEditCapitalFlows,
                action: () => this.sendCapitalFlowEmail.emit()
            };
            const result = ['copy', 'copyWithHeaders', 'csvExport', 'excelExport', 'separator', addActivityMenuItem];
            if (canEdit) {
                result.push(editActivityMenuItem);
            }
            if (canDelete) {
                result.push('separator');
                result.push(deleteActivityMenuItem);
            }

            result.push('separator');
            result.push(sendUpcomingFlowsEmail);

            return result;
        },
        columnDefs: [
            { headerName: 'TransactionId', field: 'TransactionId', hide: true},
            { headerName: 'Effective Date', field: 'EffectiveDate', pinned: 'left',
              type: 'date', valueGetter: params => this.dateFormatter(params.data['EffectiveDate']), 'sort': 'desc', 'sortedAt': 1 },
            { headerName: 'Entry Date', field: 'EntryDate', type: 'date', valueGetter: params => this.dateFormatter(params.data['EntryDate']) },
            { headerName: 'FundName', field: 'FundName', pinned: 'left', filter: 'agSetColumnFilter', 'sort': 'asc', 'sortedAt': 2 },
            { headerName: 'Fund ID', field: 'FundId', filter: 'agSetColumnFilter' },
            { headerName: 'Investor Name', field: 'InvestorName', filter: 'agSetColumnFilter' },
            { headerName: 'Investor ID', field: 'InvestorId', filter: 'agSetColumnFilter' },
            { headerName: 'Type', field: 'TransactionType', pinned: 'left', filter: 'agSetColumnFilter' },
            {
                headerName: 'Amount ($)', field: 'TransactionAmountUSD',
                pinned: 'left', valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0),
                cellStyle: { 'justify-content': 'end'}
            },
            { headerName: 'Notes', field: 'Notes'},
            { headerName: 'Status', field: 'TransactionStatus' },
            { headerName: 'Transfer Date', field: 'TransferDate', valueGetter: params => this.dateFormatter(params.data['TransferDate']) },
            { headerName: 'Transfer Status', field: 'TransferStatus' },
            { headerName: 'Create Name', field: 'CreateName'},
            { headerName: 'Create Date', field: 'CreateDate', type: 'date', valueGetter: params => this.dateTimeFormatter(params.data['CreateDate']) },
            { headerName: 'Update Name', field: 'UpdateName'},
            { headerName: 'Update Date', field: 'UpdateDate', type: 'date', valueGetter: params => this.dateTimeFormatter(params.data['UpdateDate']) }
        ],

        // Framework
        frameworkComponents: {
            'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
            'AppGridCustomStatusBarCellRangesStatisticComponent': AppGridCustomStatusBarCellRangesStatisticComponent
        }
    };

    constructor(private utilityService: UtilityService, private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        if(changes && changes.capitalFlows && changes.capitalFlows.currentValue && this.gridApi) {

            var sort = [
                {
                  colId: 'country',
                  sort: 'asc',
                  sortedAt: 1
                },
                {
                  colId: 'sport',
                  sort: 'asc',
                  sortedAt: 2
                },
            ];

            this.gridApi.setSortModel(sort);
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    dateFormatter(dateVal) {
        const dateAsString = dateVal;
        const dateParts = dateAsString.split('T');
        const datePart = dateParts[0].split('-');
        return `${datePart[1]}/${datePart[2]}/${datePart[0]}`;
    }

    dateTimeFormatter(dateVal) {
        const dateAsString = dateVal;
        const dateParts = dateAsString.split('T');
        const datePart = dateParts[0].split('-');
        return `${datePart[1]}/${datePart[2]}/${datePart[0]} ${dateParts[1].split('.')[0]}`;
    }

    private addCapitalActivity(masterGridApi: GridApi) {
        const dialogRef = this.dialog.open(ClientSolutionsCapitalFlowFormComponent, {
            hasBackdrop: true,
            width: '50%',
            height: '80%',
            data: {
                'investors': this.investors,
                'formData': this.formData,
                'formDataLoading': this.formDataLoading,
                'formDataLoaded': this.formDataLoaded,
                'formDataError': this.formDataError,
                'mode': 'Add'
            }
        });
        dialogRef.afterClosed().subscribe((payload) => {
            if (payload && payload.action === 'Add') {
                const finalPayload = Object.assign({}, payload,
                    {   'startDate': this.dateRange.startDate,
                        'endDate': this.dateRange.endDate
                    });
                this.addInvestment.emit(finalPayload);
            }
        });
    }

    private editCapitalActivity(masterGridApi: GridApi) {
        const selectedRows = masterGridApi.getSelectedRows();
        if (selectedRows.length > 0) {
            const dialogRef = this.dialog.open(ClientSolutionsCapitalFlowFormComponent, {
                hasBackdrop: true,
                width: '50%',
                height: '80%',
                data: {
                    'investors': this.investors,
                    'formData': this.formData,
                    'formDataLoading': this.formDataLoading,
                    'formDataLoaded': this.formDataLoaded,
                    'formDataError': this.formDataError,
                    'mode': 'Edit',
                    'selectedRow': selectedRows[0]
                }
            });
            dialogRef.afterClosed().subscribe((payload) => {
                if (payload && payload.action === 'Edit') {
                    const finalPayload = Object.assign({}, payload,
                        {
                            'startDate': this.dateRange.startDate,
                            'endDate': this.dateRange.endDate
                        });
                    this.editInvestment.emit(finalPayload);
                }
            });
        }
    }

    private deleteCapitalActivity(masterGridApi: GridApi) {
        const selectedRows = masterGridApi.getSelectedRows();
        if (selectedRows.length > 0) {
            const dialogRef = this.dialog.open(ClientSolutionsCapitalFlowFormComponent, {
                hasBackdrop: true,
                width: '50%',
                height: '80%',
                data: {
                    'investors': this.investors,
                    'formData': this.formData,
                    'formDataLoading': this.formDataLoading,
                    'formDataLoaded': this.formDataLoaded,
                    'formDataError': this.formDataError,
                    'mode': 'Delete',
                    'selectedRow': selectedRows[0]
                }
            });
            dialogRef.afterClosed().subscribe((payload) => {
                if (payload && payload.action === 'Delete') {
                    const finalPayload = Object.assign({}, payload,
                        {
                            'startDate': this.dateRange.startDate,
                            'endDate': this.dateRange.endDate
                        });
                    this.deleteInvestment.emit(finalPayload);
                }
            });
        }
    }

}
