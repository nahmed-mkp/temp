import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { ClientSolutionsInvestorFormComponent } from '../client-solutions-investor-form/client-solutions-investor-form.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import * as fromModels from './../../models';

@Component({
    selector: 'app-cs-investors',
    templateUrl: './client-solutions-investors.component.html',
    styleUrls: ['./client-solutions-investors.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsInvestorsComponent implements OnInit {

    @Input() investorList: any[];
    @Input() investors: any[];
    @Input() formData: fromModels.CapitalFlowForm;
    @Input() formDataLoading: boolean;
    @Input() formDataLoaded: boolean;
    @Input() formDataError: string;

    @Input() canEditInvestorDetails: boolean;

    @Output() editInvestor: EventEmitter<any> = new EventEmitter<any>();
    @Output() deleteInvestor: EventEmitter<any> = new EventEmitter<any>();

    public extraOption = {sizeColumnsToFit: true, autoSizeColumns: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        defaultColDef: {
            suppressMenu: true,
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
        },
        floatingFilter: true,
        columnDefs: [
            { headerName: 'ID', field: 'Id', hide: true},
            { headerName: 'MasterFund', field: 'MasterFundName', filter: 'agSetColumnFilter' },
            { headerName: 'Fund', field: 'Fund', filter: 'agSetColumnFilter' },
            { headerName: 'Fund ID', field: 'FundId', filter: 'agSetColumnFilter' },
            { headerName: 'Investor Name', field: 'InvestorName', pinned: 'left', filter: 'agSetColumnFilter', sort: 'asc' },
            { headerName: 'Investor ID', field: 'InvestorId', filter: 'agSetColumnFilter' },
            { headerName: 'Investor Type', field: 'InvestorType', pinned: 'left', filter: 'agSetColumnFilter' },
            { headerName: 'Relationship', field: 'Relationship', filter: 'agSetColumnFilter' },
            { headerName: 'Management Fee', field: 'MgmtFee', valueFormatter: this.utilityService.formatPercentNumberAdvance(2)},
            { headerName: 'Incentive Fee', field: 'IncFee', valueFormatter: this.utilityService.formatPercentNumberAdvance(2)},
            { headerName: 'Notes', field: 'Notes'},
            { headerName: 'Region', field: 'Region', filter: 'agSetColumnFilter' },
            { headerName: 'Consultant', field: 'Consultant'},
            { headerName: 'Create Name', field: 'CreateName'},
            { headerName: 'Create Date', field: 'CreateDate', type: 'date', valueGetter: params => this.dateFormatter(params.data['CreateDate']) },
            { headerName: 'Update Name', field: 'UpdateName'},
            { headerName: 'Update Date', field: 'UpdateDate', type: 'date', valueGetter: params => this.dateFormatter(params.data['UpdateDate']) }
        ],
        getContextMenuItems: params => {

            const editInvestorMenuItem = {
                name: 'Edit Investor',
                disabled: !(this.gridApi.getSelectedRows().length !== 1 || this.canEditInvestorDetails),
                icon: '<i class="material-icons small-menu-icon">edit</i>',
                action: () => this.editInvestorRow(this.gridApi)
            };

            const deleteInvestorMenuItem = {
                name: 'Delete Investor',
                disabled: !(this.gridApi.getSelectedRows().length !== 1 || this.canEditInvestorDetails),
                icon: '<i class="material-icons small-menu-icon">delete</i>',
                action: () => this.deleteInvestorRow(this.gridApi)
            };

            const result = ['copy', 'copyWithHeaders', 'separator', editInvestorMenuItem, 'separator', deleteInvestorMenuItem];
            return result;
        },
    };

    constructor(private utilityService: UtilityService, private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    dateFormatter(dateVal) {
        const dateAsString = dateVal;
        const dateParts = dateAsString.split('T');
        const datePart = dateParts[0].split('-');
        return `${datePart[1]}/${datePart[2]}/${datePart[0]} ${dateParts[1].split('.')[0]}`;
    }

    private editInvestorRow(masterGridApi: GridApi) {
        const selectedRows = masterGridApi.getSelectedRows();
        if (selectedRows.length > 0) {
            const dialogRef = this.dialog.open(ClientSolutionsInvestorFormComponent, {
                hasBackdrop: true,
                width: '40%',
                height: '80%',
                data: {
                    'investors': this.investorList,
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
                    this.editInvestor.emit(payload);
                }
            });
        }
    }

    private deleteInvestorRow(masterGridApi: GridApi) {
        const selectedRows = masterGridApi.getSelectedRows();
        if (selectedRows.length > 0) {
            const dialogRef = this.dialog.open(ClientSolutionsInvestorFormComponent, {
                hasBackdrop: true,
                width: '50%',
                height: '80%',
                data: {
                    'investors': this.investorList,
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
                    this.deleteInvestor.emit(payload);
                }
            });
        }
    }

}
