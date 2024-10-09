import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ColumnApi, GridApi, GridOptions, LargeTextCellEditor, ValueFormatterParams } from 'ag-grid-community';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-cs-investor-relations-fund-aum-balances',
    templateUrl: './client-solutions-investor-relations-fund-aum-balances.component.html',
    styleUrls: ['./client-solutions-investor-relations-fund-aum-balances.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsInvestorRelationsFundAumBalancesComponent implements OnInit, OnChanges {

    @Input() aumBalances: any[];

    public extraOption = {sizeColumnsToFit: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        columnDefs: [
            { 
                headerName: 'Fund/Investor', 
                field: 'InvestorName', 
                cellClass: 'txtColumn', 
                cellStyle: params => this.determineCellColor(params),
                cellClassRules: {
                    'fundColumn': (params) => {
                        return params.data['IsTotal'] === true;
                    }
                }
                
            }, 
            { headerName: 'AUM ($)', field: 'AUM', cellClass: 'moneyColumn', suppressSizeToFit: true, cellStyle: params => this.determineCellColorRightAlign(params), valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), 
                cellClassRules: {
                    'fundColumn': (params) => {
                        return params.data['IsTotal'] === true;
                    }
                }
            }
        ],
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
            id: 'fundColumn',
            font: {
                fontName: 'Arial Helvetica',
                size: 10,
                bold: true,
            },
        }]
    };

    fundFormatter(param) {
        return param.data['IsTotal'] ? param.data['FundName'] : param.data['InvestorName'];
    }

    determineCellColor(params) {
        if (params.data.IsTotal && !params.data.FundName.includes('Total') ) {
            return {backgroundColor: '#add8e6', fontWeight: 'bold'};
        }
    }

    determineCellIndentation(params) {
        let result = true;
        if (params.data.IsTotal && !params.data.FundName.includes('Total')) {
            result = false;
        }
        return result;
    }

    determineCellColorRightAlign(params) {
        if (params.data.IsTotal && !params.data.FundName.includes('Total') ) {
            return {backgroundColor: '#add8e6', justifyContent: 'flex-end', fontWeight: 'bold'};
        } else {
            return {justifyContent: 'flex-end'};
        }
    }

    constructor(private fb: UntypedFormBuilder, private store: Store<fromStore.State>, private utilityService: UtilityService ) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes && changes.aumBalances && changes.aumBalances.currentValue && this.gridApi){
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
            this.gridApi.setRowData([])
            console.warn(balances)
            this.gridApi.setRowData(balances)
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

