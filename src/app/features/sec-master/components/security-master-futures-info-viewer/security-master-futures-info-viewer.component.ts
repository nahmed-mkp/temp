import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';
import { GridCellGeneralButtonComponent } from 'src/app/components';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import * as _ from 'lodash';

import * as fromModels from './../../models/futures-root.models';

import { SecurityMasterFuturesInfoCloneDialogLayoutComponent, SecurityMasterFuturesInfoEditorDialogLayoutComponent } from '../../containers';


@Component({
    selector: 'app-security-master-futures-info-viewer',
    templateUrl: './security-master-futures-info-viewer.component.html',
    styleUrls: ['./security-master-futures-info-viewer.component.scss']
})
export class SecurityMasterFuturesInfoViewerComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() countries: any[];
    @Input() loading: boolean;

    @Output() createFutureInfo: EventEmitter<fromModels.IFutureRoot> = new EventEmitter<fromModels.IFutureRoot>();

    private gridApi: GridApi;
    public extraOption = { autoSizeColumns: true };

    public filterValue: string;
    public uniqueValueDict: any = {};

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true
        },
        getRowNodeId: data => data.futures_id,
        rowSelection: 'single',
        columnDefs: [
            {
                headerName: 'Futures Id',
                field: 'futures_id',
                filter: 'agSetColumnFilter',
                sort: 'desc'
            },
            {
                headerName: 'Root',
                field: 'root',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Bloomberg Suffix',
                field: 'blbg_suffix',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Name',
                field: 'name',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Currency',
                field: 'currency',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'RMLongName',
                field: 'rm_long_name',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Get Deliverables?',
                field: 'get_deliverables',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Deliverable Prefix',
                field: 'deliverable_prefix',
            },
            {
                headerName: 'Exchange',
                field: 'exchange',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Category',
                field: 'category',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Region',
                field: 'region',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'CountryID',
                field: 'country_id',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Num Units',
                field: 'num_units',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Option Num Units',
                field: 'option_num_units',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Round To',
                field: 'round_to',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'OTR Underlying Security',
                field: 'otr_underlying_security',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'MKP Curve Name',
                field: 'mkp_curve_name',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Deposit Days',
                field: 'deposit_days',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Benchmark CUSIP',
                field: 'benchmark_cusip'
            },
            {
                headerName: 'Blbg Job Name',
                field: 'blbg_job_name'
            },
            {
                headerName: 'IsBondFuture?',
                field: 'is_bond_future',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'IsRateFuture?',
                field: 'is_rate_future',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'IsMidCurve?',
                field: 'is_mid_curve',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'IsWeekly?',
                field: 'is_weekly',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Weekly Underlier Id',
                field: 'weekly_underlier_id',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Exposure Type',
                field: 'exposure_type',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Option EOD Price Method',
                field: 'opt_eod_price_method',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Option Intraday Price Method',
                field: 'opt_intraday_price_method',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'AIFM Position SubAsset Type',
                field: 'aifm_position_sub_asset_type',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'AIFM Transaction SubAsset Type',
                field: 'aifm_transaction_sub_asset_type',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'CPO/PQR SubAsset Class',
                field: 'cpo_pqr_sub_asset_class',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Form PF SubAsset Class',
                field: 'form_pf_sub_asset_class',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Generic Contract Frequency',
                field: 'generic_contract_frequency',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Index SID',
                field: 'index_sid',
            },
            {
                headerName: 'Instance ID',
                field: 'instance_id',
            },
            {
                headerName: 'Key',
                field: 'key',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Loading Time',
                field: 'loading_time',
            },
            {
                headerName: 'Country ID',
                field: 'rcpm_country_id',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Strike Step',
                field: 'strike_step',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Term',
                field: 'term',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Use Index Price',
                field: 'use_index_price',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Generic Contract Frequency',
                field: 'generic_contract_frequency',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Standard Exchange Name',
                field: 'standard_exchange_name',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Create Roll Adjustment',
                field: 'create_roll_adjusted_timeseries',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Roll Adjustment Method',
                field: 'roll_adjustment_method',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Modify',
                field: 'Modify',
                cellStyle: {'color': '#00bcd4', 'font-weight': 'bold', 'justify-content': 'center'},
                pinned: 'right',
                suppressMenu: true,
                cellRenderer: 'GridCellGeneralButtonComponent',
                cellRendererParams: {
                    click: params => {
                        this.openEditorDialog(params.data);
                    },
                    buttonText: 'Edit',
                    isIconButton: true,
                    icon: 'edit'
                },
                hide: true
            }
        ],

        frameworkComponents: {
            'GridCellGeneralButtonComponent': GridCellGeneralButtonComponent
        }
    };

    constructor(private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
        this.openEditorDialog = this.openEditorDialog.bind(this);
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue) {
            this.uniqueValueDict = Object.assign({}, this.uniqueValueDict, {
                'aifm_position_sub_asset_type': this._get_unique_values(this.data, 'aifm_position_sub_asset_type'),
                'aifm_transaction_sub_asset_type': this._get_unique_values(this.data, 'aifm_transaction_sub_asset_type'),
                'category': this._get_unique_values(this.data, 'category'),
                'cpo_pqr_sub_asset_class': this._get_unique_values(this.data, 'cpo_pqr_sub_asset_class'),
                'currency': this._get_unique_values(this.data, 'currency'),
                'exchange': this._get_unique_values(this.data, 'exchange'),
                'form_pf_sub_asset_class': this._get_unique_values(this.data, 'form_pf_sub_asset_class'),
                'exposure_type': this._get_unique_values(this.data, 'exposure_type'),
                'opt_eod_price_method': this._get_unique_values(this.data, 'opt_eod_price_method'),
                'opt_intraday_price_method': this._get_unique_values(this.data, 'opt_intraday_price_method'),
                'blbg_suffix': this._get_unique_values(this.data, 'blbg_suffix'),
                'otr_underlying_security': this._get_unique_values(this.data, 'otr_underlying_security'),
                'benchmark_cusip': this._get_unique_values(this.data, 'benchmark_cusip'),
                'region': this._get_unique_values(this.data, 'region'),
                'last_index': this._get_max_value(this.data, 'futures_id'),
                'weekly_underlier': this._get_weekly_underliers(this.data)
            });
        }
        if (changes.countries && changes.countries.currentValue) {
            this.uniqueValueDict = Object.assign({}, this.uniqueValueDict, {
                'countries': changes.countries.currentValue.sort((a: any, b: any) => {
                    return a['Description'].localeCompare(b['Description']);
                })
            });
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
    }

    openEditorDialog(rowData: any) {
        this.dialog.open(SecurityMasterFuturesInfoEditorDialogLayoutComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '75rem',
            height: '60rem',
            data: {
                'lists': this.uniqueValueDict,
                'futuresInfo': rowData
            }
        });
    }

    public onFilterChange() {
        if (this.gridApi) {
            if (this.filterValue === '' || this.filterValue === undefined) {
                this.gridApi.setQuickFilter(null);
            } else {
                this.gridApi.setQuickFilter(this.filterValue);
            }
        }
    }

    public onAddNewFutureInfo() {
        this._get_future_root_to_clone_from();
    }

    private _get_unique_values(data: any[], field_name: string): string[] {
        const result: string[] = _.uniqBy(this.data, field_name)
            .filter((item) => item[field_name] !== '' && item[field_name] !== null && item[field_name] !== undefined)
            .map(item => item[field_name])
            .sort();
        result.unshift('');
        return result;
    }

    private _get_max_value(data: any[], field_name: string): number {
        if (data.length > 0) {
            return _.maxBy(this.data, field_name)[field_name];
        } else {
            return 0
        }
        
    }

    private _get_weekly_underliers(data: any[]): any[] {
        const underliers: number[] = _.uniqBy(this.data, 'weekly_underlier_id')
            .filter((item) => item['weekly_underlier_id'] !== '' && item['weekly_underlier_id'] !== null && item['weekly_underlier_id'] !== undefined)
            .map(item => parseInt(item['weekly_underlier_id'], 10));
        const underlying_futures = this.data
            .filter((item) => underliers.indexOf(item['futures_id']) >= 0)
            .map((item) => {
                return {'id': item['futures_id'], 'name': item['name']}
            });
        return underlying_futures;
    }

    private _get_future_root_to_clone_from(): void {
        const dialogRef = this.dialog.open(SecurityMasterFuturesInfoCloneDialogLayoutComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '35rem',
            height: '10rem',
            data: {
                'futures': this.data.sort((a: fromModels.IFutureRoot, b: fromModels.IFutureRoot) => {
                    return a.root.localeCompare(b.root);
                })
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            const clonedFuture = this._clone_selected_future(result);
            const futureDialogRef = this.dialog.open(SecurityMasterFuturesInfoEditorDialogLayoutComponent, {
                hasBackdrop: false,
                panelClass: 'event-analysis-pop-up-panel',
                width: '75rem',
                height: '55rem',
                data: {
                    'lists': this.uniqueValueDict,
                    'futuresInfo': clonedFuture
                }
            });

            futureDialogRef.afterClosed().subscribe((futureRoot) => {
                if (futureRoot) {
                    this.createFutureInfo.emit(futureRoot);
                }
            });

        });
    }

    private _clone_selected_future(result: fromModels.IFutureRoot): fromModels.IFutureRoot {
        const clone = Object.assign({}, result,
            {
                'futures_id': this.uniqueValueDict['last_index'] + 1,
                'root': null,
                'name': null,
                'rm_long_name': null,
                'num_units': null,
                'mkp_curve_name': null
            });


        return clone;
    }

}
