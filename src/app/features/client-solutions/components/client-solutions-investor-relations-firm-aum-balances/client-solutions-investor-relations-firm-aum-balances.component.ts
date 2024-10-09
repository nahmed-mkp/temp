import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-cs-investor-relations-firm-aum-balances',
    templateUrl: './client-solutions-investor-relations-firm-aum-balances.component.html',
    styleUrls: ['./client-solutions-investor-relations-firm-aum-balances.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsInvestorRelationsFirmAumBalancesComponent implements OnInit, OnChanges {

    @Input() aumBalances: any[];

    public extraOption = {sizeColumnsToFit: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        columnDefs: [{
            headerName: 'Fund', 
            field: 'FundName', 
            cellStyle:  (params) => this.determineCellColor(params), cellClass: 'txtColumn',
            cellClassRules: {
                'indentedColumn': (params) => {
                    this.determineCellIndentation(params)
                }
            }
        }, {
            headerName: 'AUM ($)', field: 'AUM',
            suppressSizeToFit: true,
            cellStyle: params => this.determineCellColorRightAlign(params),
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2),
            cellClass: 'moneyColumn'
        }],
        excelStyles: [{
            id: 'header',
            interior: {
                color: '#df8e35',
                pattern: 'Solid'
            },
            font: {
                fontName: 'Arial Helvetica',
                size: 10,
                bold: true,
            },
            borders: {
                borderBottom: {
                    color: '#000000',
                    lineStyle: 'Continuous',
                    weight: 1
                },
                borderLeft: {
                    color: '#000000',
                    lineStyle: 'Continuous',
                    weight: 1
                },
                borderRight: {
                    color: '#000000',
                    lineStyle: 'Continuous',
                    weight: 1
                },
                borderTop: {
                    color: '#000000',
                    lineStyle: 'Continuous',
                    weight: 1
                }
            }
        }, {
            id: 'moneyColumn',
            numberFormat: {
                format: '$#,##0'
            },
            font: {
                fontName: 'Arial Helvetica',
                size: 9
            }
        }, {
            id: 'txtColumn',
            font: {
                fontName: 'Arial Helvetica',
                size: 9
            }
        }, {
            id: 'indentedColumn',
            alignment: {
                indent: 10
            }
        }],
        onRowDataChanged: params =>  {
            if (this.gridApi && this.gridColumnApi) {
                this.gridApi.sizeColumnsToFit();
                this.gridColumnApi.autoSizeAllColumns();
            }
        },
    };

    determineCellColor(params) {
        if (params.data.IsTotal && !params.data.FundName.includes('Total') ) {
            return {backgroundColor: '#add8e6', fontWeight: 'bold'};
        } else if (params.data.FundName.startsWith('Total')) {
            return { fontWeight: 'bold' };
        }
    }

    determineCellColorRightAlign(params) {
        if (params.data.IsTotal && !params.data.FundName.includes('Total') ) {
            return {backgroundColor: '#add8e6', justifyContent: 'flex-end', fontWeight: 'bold'};
        } else if (params.data.FundName.startsWith('Total')) {
            return { justifyContent: 'flex-end', fontWeight: 'bold' };
        } else {
            return {justifyContent: 'flex-end'};
        }
    }

    determineCellIndentation(params) {
        let result = true;
        if (params.data.IsTotal && !params.data.FundName.includes('Total')) {
            result = false;
        }
        return result;
    }

    constructor(private fb: UntypedFormBuilder, private store: Store<fromStore.State>, private utilityService: UtilityService ) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        const balances = changes.aumBalances.currentValue;
        if (balances.length > 0) {
            let i = 0;
            balances.map( (item, index) => {
                if (balances[i].IsTotal && item.IsTotal) {
                    const sorted_sub_arr = balances.slice(i + 1, index).sort(function(a,b) {
                        return a.AUM - b.AUM;
                    });
                    balances.splice(i + 1,  sorted_sub_arr.length, ...sorted_sub_arr);
                    i = index;
                }
            });
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        if (this.aumBalances && this.aumBalances.length > 0) {
            this.gridApi.setRowData(this.aumBalances);
        }
    }
}
