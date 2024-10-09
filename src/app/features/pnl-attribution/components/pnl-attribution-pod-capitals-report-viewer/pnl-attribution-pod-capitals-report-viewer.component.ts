import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { GridApi, GridOptions, ColDef } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-pnl-attribution-pod-capitals-report-viewer',
    templateUrl: './pnl-attribution-pod-capitals-report-viewer.component.html',
    styleUrls: ['./pnl-attribution-pod-capitals-report-viewer.component.scss']
})
export class PnlAttributionPodCapitalsReportViewerComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() loading: boolean;
    @Output() sendGridApi = new EventEmitter<GridApi>();

    private timeOrderMap = {
        'Jan': 1,
        'Feb': 2,
        'Mar': 3,
        'Apr': 4,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sep': 9,
        'Oct': 10,
        'Nov': 11,
        'Dec': 12,
    };
    private gridApi: GridApi;
    public extraOption = {};
    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            editable: false,
            enableCellChangeFlash: false,
            cellStyle: params => {
                let styleObj = {'justify-content': 'flex-end'};
                // if (typeof params.value === 'number') {
                //   styleObj = Object.assign(styleObj, {'justify-content': 'flex-end'})
                // }
                if (params.node.data['CrossPodName'] === 'Total') {
                  styleObj = Object.assign(styleObj, {'border-top': '3px solid #8080804d'})
                }
                return styleObj;
            },
            cellClass: 'cell-right-border',
            headerClass: 'word-wrap',
        },
    
        columnDefs: [],
        sideBar: false,
        headerHeight: 55
    }


    constructor(private utilityService: UtilityService) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue && changes.data.currentValue) {
            setTimeout(() => {
                const colDefs = this._createDynamicColDef(this.data);
                if (this.gridApi) {
                  this.gridApi.setColumnDefs(colDefs);
                }
            }, 200);
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.sendGridApi.emit(this.gridApi);
    }


    private _createDynamicColDef(data): ColDef[] {


        if (data.length > 0) {

            const colDefs: ColDef[] = [];

            colDefs.push({
                headerName: 'CrossPodName',
                field: 'CrossPodName',
                sort: 'asc',
                sortedAt: 0,
                width: 100,
                cellStyle: params => {
                    let styleObj = {'justify-content': 'flex-start'};
                    if (params.node.data['CrossPodName'] === 'Total') {
                      styleObj = Object.assign(styleObj, {'border-top': '3px solid #8080804d'})
                    }
                    return styleObj;
                }
            });
            colDefs.push({
                headerName: 'FundName',
                field: 'FundName',
                sort: 'asc',
                sortedAt: 10,
                width: 150,
                cellStyle: params => {
                    let styleObj = {'justify-content': 'flex-start'};
                    if (params.node.data['CrossPodName'] === 'Total') {
                      styleObj = Object.assign(styleObj, {'border-top': '3px solid #8080804d'})
                    }
                    return styleObj;
                }
            });

            const targetFields = Object.keys(data[0]).filter(field => field !== 'CrossPodName' && field !== 'FundName');
            targetFields.sort((valueA, valueB) => {
                const [monthA, yearA] = valueA.split('-');
                const [monthB, yearB] = valueB.split('-');

                return this.timeOrderMap[monthA] + parseInt(yearA, 10) * 100 -
                       (this.timeOrderMap[monthB] + parseInt(yearB, 10) * 100)
            });

            targetFields.forEach(field => {
                colDefs.push({
                    headerName: field,
                    field: field,
                    valueGetter: this.utilityService.formatNumberWithCommaSeperated(0),
                    width: 80,
                })
            });

            // colDefs.push({
            //     headerName: 'Total Column',
            //     field: 'totalColumn',
            //     valueGetter: params => {
            //         let sum = 0;
            //         Object.keys(params.data).forEach(key => {
            //             if (key !== 'CrossPodName' && key !== 'FundName' ) {
            //                 sum += params.data[key];
            //             }
            //         });
            //         return sum;
            //     },
            //     valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(0),
            //     width: 100,
            //     cellClass: ['cell-left-border-thick'],
            // })

            return colDefs;
        } else {
            return [];
        }

    }

}
