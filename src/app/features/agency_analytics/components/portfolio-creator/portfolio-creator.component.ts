import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models/agency-analytics.models';
import { SecuritySearchComponent } from '../security-search/security-search.component';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';


@Component({
    selector: 'app-agency-portfolio-creator',
    templateUrl: './portfolio-creator.component.html',
    styleUrls: ['./portfolio-creator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioCreatorComponent implements OnInit, OnDestroy, OnChanges {

    @Input() validSecurities: fromModels.IValidSecurity[];
    @Input() validatingSecurities: boolean;
    
    @Input() newPortfolio: fromModels.INewPortfolio | fromModels.IPortfolio;
    @Input() portfolioCreating: boolean;
    @Input() portfolioCreated: boolean;
    @Input() portfolioCreationError: string;

    @Output() createPortfolio: EventEmitter<fromModels.INewPortfolio> = new EventEmitter<fromModels.INewPortfolio>();
    @Output() validateSecurities: EventEmitter<string[]> = new EventEmitter<string[]>();
    @Output() resetCreationState: EventEmitter<void> = new EventEmitter<void>();

    @Output() loadPortfolio: EventEmitter<fromModels.IPortfolio> = new EventEmitter<fromModels.IPortfolio>();

    @Output() reloadPortfolio: EventEmitter<fromModels.IPortfolio> = new EventEmitter<fromModels.IPortfolio>();

    public portfolioForm: FormGroup;
    public subscriptions: Subscription[] = [];
    public prevSecuritiesValue: string = '';

    public securities: fromModels.ISecurity[] = [];

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('id') === false ?
                    { 'justify-content': 'flex-end' } : {};
            },
            filter: 'agSetColumnFilter',
            editable: true
        },

        getContextMenuItems: params => {
            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport'];
        },

        sideBar: false,
        suppressColumnVirtualisation: true,
        rowSelection: 'single',
        floatingFilter: false,
        stopEditingWhenGridLosesFocus: true,
        deltaRowDataMode: true,
        context: this,

        onRowEditingStarted: params => {
            params.context.tempRowData = Object.keys(params.data).reduce((result, key) => {
                if (params.data[key] === null) {
                    return result + '';
                } else {
                    return result + params.data[key];
                }
            }, '');
        },
        
        onRowEditingStopped: params => {
            const targetData = Object.keys(params.data).reduce((result, key) => {
                if (params.data[key] === null) {
                    return result + '';
                } else {
                    return result + params.data[key];
                }
            }, '');
            if (targetData !== params.context.tempRowData) {
                params.data['_notSave'] = true;
                params.api.redrawRows({ rowNodes: [params.node] });
            }
        },

        getRowNodeId: data => data.identifier
    };

    public extraOption = {
        autoSizeColumns: true
    };

    constructor(private fb: FormBuilder, private dialog: MatDialog) {
        
        this.portfolioForm = this.fb.group({
            'name': [null, Validators.required],
            'securities': [null, Validators.required]
        });

        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            if (subscription) { 
                subscription.unsubscribe();
            }
        });
        this.securities = [];
        this.gridApi.setRowData([]);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.validSecurities && changes.validSecurities.currentValue) {
            changes.validSecurities.currentValue.forEach((validSecurity) => {
                const filter = this.securities.filter((security) => security.identifier === validSecurity.identifier);
                if (filter.length === 0) { 
                    this.securities.push({
                        idType: validSecurity.idType,
                        identifier: validSecurity.identifier,
                        name: validSecurity.name,
                        inputName: validSecurity.userTerm,
                        securityType: validSecurity.securityType
                    });
                }
            })

            if (this.gridApi) {
                this.gridApi.setColumnDefs([]);
                this.gridApi.setRowData([]);

                this.gridApi.setColumnDefs(this.getColumnDefs());
                this.gridApi.setRowData(this.securities);

                this.gridApi.redrawRows();
            }
        }
    }

    onShowSearch(): void {
        this.subscriptions.push(
            this.dialog.open(SecuritySearchComponent, {
                hasBackdrop: false,
                panelClass: 'event-analysis-pop-up-panel',
                width: '40rem',
                height: '40rem'
            }).afterClosed().subscribe((res) => {
                if (res) {
                    alert('DialogClosed')
                }
            }));
    }

    getSecurities(value: string): string[] {
        const securities: string[] = [];
        if (value !== null && value !== undefined) {
            value.split('\n').map((line) => {
                line.split(',').forEach((item) => {
                    if (item !== '') {
                        securities.push(item);
                    }
                })
            });
        }
        return securities;
    }

    onValidateSecurities(): void { 
        const curValue = this.portfolioForm.get('securities').value;
        if (curValue !== this.prevSecuritiesValue) {
            const securities = this.getSecurities(curValue);
            if (securities.length > 0) {
                this.prevSecuritiesValue = curValue;
                this.validateSecurities.emit(securities);
            }            
        }
    }

    onSubmitForm(): void {        
        if (this.canCreatePortfolio()) {
            const portfolioName: string = this.portfolioForm.get('name').value;
            const securities = [...this.securities];
            const payload: fromModels.INewPortfolio = {
                'name': portfolioName, 
                'securities': securities,
                'portfolioType': 'Custom'};
            this.createPortfolio.emit(payload);
        }
    }

    onResetForm(): void {
        this.portfolioForm.clearValidators();
        this.portfolioForm.reset();
        this.securities = [];
        this.gridApi.setRowData([]);
        this.prevSecuritiesValue = '';
        this.resetCreationState.emit();
    }

    // this is a type guard
    instanceOfPortfolio(object: any): object is fromModels.IPortfolio {
        return 'guid' in this.newPortfolio;
    }

    onLoadPortfolio(): void {
        if (this.instanceOfPortfolio(this.newPortfolio)) { 
            const payload: fromModels.IPortfolio = this.newPortfolio as fromModels.IPortfolio;
            if (payload) {
                this.loadPortfolio.emit(payload);
            }
        }
    }
    
    onReloadPortfolio(): void {
        if (this.instanceOfPortfolio(this.newPortfolio)) {
            const payload: fromModels.IPortfolio = this.newPortfolio as fromModels.IPortfolio;
            if (payload) {
                this.reloadPortfolio.emit(payload);
            }
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(this.getColumnDefs());

        if (this.securities) {
            this.gridApi.setRowData(this.securities)
        }
    }

    getColumnDefs(): any {
        const colDefs: any[] = [];
        colDefs.push({ headerName: 'Alias', field: 'inputName', editable: true, maxWidth: 120 });
        colDefs.push({ headerName: 'Name', field: 'name', editable: false, maxWidth: 90 });
        colDefs.push({ headerName: 'Identifier', field: 'identifier', editable: false, maxWidth: 90 });
        colDefs.push({ headerName: 'Sec. Type', field: 'securityType', editable: false, maxWidth: 120 });        
        return colDefs;
    }

    canValidateSecurities(): boolean {
        return this.getSecurities(this.portfolioForm.get('securities').value).length > 0;
    }

    canCreatePortfolio(): boolean {
        const portfolioName: string = this.portfolioForm.get('name').value;
        if (portfolioName !== null && portfolioName !== undefined && this.securities.length > 0) {
            return true;
        }
        return false;
    }
}
