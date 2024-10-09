import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _ from 'lodash';
import * as Highcharts from 'highcharts';

import * as moment from 'moment';
import * as fromModels from './../../models/capitals.models';
import { GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-capital-history',
    templateUrl: './capital-history.component.html',
    styleUrls: ['./capital-history.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapitalHistoryComponent implements OnInit, OnChanges {

    @Input() fundOrPod: string;
    @Input() historyInput: fromModels.ICapitalHistoryInput | fromModels.ICapitalHistoryInput;
    @Input() fundMapping: any;

    @Input() fundCapitalHistory: any[];
    @Input() fundCapitalHistoryLoading: boolean;
    @Input() podCapitalHistory: any[];
    @Input() podCapitalHistoryLoading: boolean;


    @Output() changeFundHistoryInput: EventEmitter<fromModels.ICapitalHistoryInput> = new EventEmitter<fromModels.ICapitalHistoryInput>();
    @Output() changePodHistoryInput: EventEmitter<fromModels.ICapitalHistoryInput> = new EventEmitter<fromModels.ICapitalHistoryInput>();

    public mode = 'data';
    public highcharts = Highcharts;

    public fundList: string[] = [];
    public selectedFund: string;
    public onActiveDateChanged_debounce: any;

    public attributes: string[] = ['SOD Capital', 'Levered SOD Capital', 'Leverage Factor'];
    public attributesKeyMappinng = {
        'SOD Capital': 'SODCapital',
        'Levered SOD Capital': 'LeveredSODCapital',
        'Leverage Factor': 'leverageFactor'
    };
    public activefundAttribute = 'SOD Capital';
    public activePodAttribute = 'SOD Capital';


    // Grid Config -------------------------------------------------------------------------------------
    private gridApi_fund: GridApi;
    private gridApi_pod: GridApi;
    public customGridOption_fund: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('CrossPodName') === false ?
                    { 'justify-content': 'flex-end' } : {};
            },
            sortable: false,
            suppressMenu: true
        },

        sideBar: false,
        suppressColumnVirtualisation: true,
        rowSelection: 'single',
        floatingFilter: false,
        stopEditingWhenGridLosesFocus: true,
        context: this,
        skipHeaderOnAutoSize: true,

        columnDefs: [{
            headerName: 'Date',
            field: 'date',
            sort: 'desc',
            comparator: (valueA, valueB, nodeA, nodeB) => {
                const timeA = (new Date(valueA)).getTime();
                const timeB = (new Date(valueB)).getTime();
                return timeA - timeB;
            },
            valueFormatter: params => {
                return params.value.split('T')[0];
            }
        }, {
            headerName: 'Fund',
            field: 'fundName',
        },{
            headerName: 'LeveredSODCapital',
            field: 'LeveredSODCapital',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(0),
        }, {
            headerName: 'SOD Capital',
            field: 'SODCapital',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(0),
        },{
            headerName: 'leverageFactor',
            field: 'leverageFactor',
        }, ],

        // getRowNodeId: data => data.CrossPodName,

        frameworkComponents: {
            // CrossPodMatrixCellRendererComponent: CrossPodMatrixCellRendererComponent
        }
    };
    public customGridOption_pod: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('CrossPodName') === false ?
                    { 'justify-content': 'flex-end' } : {};
            },
            sortable: false,
            suppressMenu: true
        },

        sideBar: false,
        suppressColumnVirtualisation: true,
        rowSelection: 'single',
        floatingFilter: false,
        stopEditingWhenGridLosesFocus: true,
        context: this,
        skipHeaderOnAutoSize: true,

        columnDefs: [{
            headerName: 'Date',
            field: 'date',
            sort: 'desc',
            comparator: (valueA, valueB, nodeA, nodeB) => {
                const timeA = (new Date(valueA)).getTime();
                const timeB = (new Date(valueB)).getTime();
                return timeA - timeB;
            },
            valueFormatter: params => {
                return params.value.split('T')[0];
            }
        }, {
            headerName: 'Pod',
            field: 'podName',
        },{
            headerName: 'Cross Pod',
            field: 'CrossPodName',
        },{
            headerName: 'LeveredSODCapital',
            field: 'LeveredSODCapital',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(0),
        }, {
            headerName: 'SOD Capital',
            field: 'SODCapital',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(0),
        },{
            headerName: 'leverageFactor',
            field: 'leverageFactor',
        }, ],

        // getRowNodeId: data => data.CrossPodName,

        frameworkComponents: {
            // CrossPodMatrixCellRendererComponent: CrossPodMatrixCellRendererComponent
        }
    };
    public extraOption = {
        sizeColumnsToFit: true
    };

    // Chart Config ------------------------------------------------------------------------------------
    private chart_fund: any;
    private chart_pod: any;
    public chartOptions = {
        chart: {
            type: 'column'
        },
        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'Net Contributions'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Net Contributions (mm)'
            },
            lineWidth: 2,
            resize: {
                enabled: true
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'bottom',
            floating: false,
            borderWidth: 1,
            enabled: true
        },
        tooltip: {
            shared: true,
            crosshairs: [true],
            borderColor: 'gray',
            borderRadius: 10,
            borderWidth: 1,
            split: false,
            formatter: function() {
              return this.points.reduce(function(s, point) {
                  return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
              }, '<b>' + new Date(this.x).toLocaleDateString('en-US', { timeZone: 'UTC'}) + '</b>');
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataGrouping: {
                    enabled: true,
                    forced: true,
                    units: [
                        ['day', [1]]
                    ]
                }
            }
        },
    };
    public formattedPlotValue_fund: any;
    public formattedPlotValue_pod: any;

    constructor(private utilityService: UtilityService) { 
        this.onActiveDateChanged_debounce = _.debounce(this.onActiveDateChanged.bind(this), 1000);

        this.customGridCallBack_fund = this.customGridCallBack_fund.bind(this);
        this.customGridCallBack_pod = this.customGridCallBack_pod.bind(this);

        this.callbackFn_pod = this.callbackFn_pod.bind(this);
        this.callbackFn_fund = this.callbackFn_fund.bind(this);
    }

    ngOnInit(): void {
        if (this.historyInput) {
            this.changeFundHistoryInput.emit(this.historyInput);
        }
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.fundMapping && changes.fundMapping.currentValue) {
            this.fundList = Object.keys(this.fundMapping);
        }

        if (this.gridApi_fund && changes.fundCapitalHistory && changes.fundCapitalHistory.currentValue) {
            if (this.gridApi_fund) {
                this.gridApi_fund.setRowData(changes.fundCapitalHistory.currentValue);
                this.gridApi_fund.refreshCells();
            }
        }

        if (this.gridApi_pod && changes.podCapitalHistory && changes.podCapitalHistory.currentValue) {
            if (this.gridApi_pod) {
                this.gridApi_pod.setRowData(changes.podCapitalHistory.currentValue);
                this.gridApi_pod.refreshCells();
            }
        }

        if (changes.fundCapitalHistory && changes.fundCapitalHistory.currentValue) {
            this.formattedPlotValue_fund = this._formatPlotValue(this.fundCapitalHistory || [], this.attributesKeyMappinng[this.activefundAttribute], 'fund');
            if (this.chart_fund) {
                this._renderChart(this.chart_fund, this.formattedPlotValue_fund);
            }
        }

        if (changes.podCapitalHistory && changes.podCapitalHistory.currentValue) {
            this.formattedPlotValue_pod = this._formatPlotValue(this.podCapitalHistory || [], this.attributesKeyMappinng[this.activePodAttribute], 'pod');
            if (this.chart_fund) {
                this._renderChart(this.chart_pod, this.formattedPlotValue_pod);
            }
        }
    }

    public onActiveDateChanged(e: MatDatepickerInputEvent<Date>, type: string): void {
        if (type === 'start') {
            this.changeFundHistoryInput.emit(Object.assign({}, this.historyInput, { 'startDate': moment(e.value).format('MM-DD-YYYY') }));
            if (this.selectedFund) {
                this.changePodHistoryInput.emit(Object.assign({}, this.historyInput, { 'startDate': moment(e.value).format('MM-DD-YYYY') }));
            }
        } else {
            this.changeFundHistoryInput.emit(Object.assign({}, this.historyInput, { 'endDate': moment(e.value).format('MM-DD-YYYY') }));
            if (this.selectedFund) {
                this.changePodHistoryInput.emit(Object.assign({}, this.historyInput, { 'endDate': moment(e.value).format('MM-DD-YYYY') }));
            }
        }
    }

    public getDate(input: fromModels.ICapitalHistoryInput, type: string): Date {
        if (type === 'start') {
            return input && moment(input.startDate).toDate();
        } else {
            return input && moment(input.endDate).toDate();
        }
    }

    public onFundChange() {
        const newHistoryInput = {...this.historyInput};
        newHistoryInput['fundId'] = this.fundMapping[this.selectedFund];

        this.changePodHistoryInput.emit(newHistoryInput);
    }


    public changeMode(mode: string): void {
        this.mode = mode;
    }

    public customGridCallBack_fund(params) {
        this.gridApi_fund = params.api;
        this.gridApi_fund.closeToolPanel();

        if (this.fundCapitalHistory) {
            this.gridApi_fund.setRowData(this.fundCapitalHistory);
        }
    }

    public customGridCallBack_pod(params) {
        this.gridApi_pod = params.api;
        this.gridApi_pod.closeToolPanel();

        if (this.podCapitalHistory) {
            this.gridApi_pod.setRowData(this.podCapitalHistory);
        }
    }

    public callbackFn_fund(chart) {
        this.chart_fund = chart;
        if (this.formattedPlotValue_fund) {
            this._renderChart(this.chart_fund, this.formattedPlotValue_fund);
        }
    }

    public callbackFn_pod(chart) {
        this.chart_pod = chart;
        if (this.formattedPlotValue_pod) {
            this._renderChart(this.chart_pod, this.formattedPlotValue_pod);
        }
    }

    
    public onAttributeChange(event: string) {
        if (event === 'fund') {
            this.formattedPlotValue_fund = this._formatPlotValue(this.fundCapitalHistory || [], this.attributesKeyMappinng[this.activefundAttribute], 'fund');
            if (this.chart_fund) {
                this._renderChart(this.chart_fund, this.formattedPlotValue_fund);
            }
        } else {
            this.formattedPlotValue_pod = this._formatPlotValue(this.podCapitalHistory || [], this.attributesKeyMappinng[this.activePodAttribute], 'pod');
            if (this.chart_fund) {
                this._renderChart(this.chart_pod, this.formattedPlotValue_pod);
            }
        }
    }

    // Utility ------------------------------------------------------------------------

    private _renderChart(chart, plotDataCollection) {
        while (chart.series.length > 0) {
            chart.series[0].remove(true);
        }

        Object.keys(plotDataCollection).map(key => {
            chart.addSeries(plotDataCollection[key]);
        });

        chart.redraw();

        const targetkey = Object.keys(plotDataCollection)[0];
        const targetDataArray = plotDataCollection[targetkey]['data'];
        const targetMaxDate = targetDataArray[targetDataArray.length - 1][0];

        setTimeout(() => {
            this._setDateRangeDynamically(targetMaxDate, chart)
        }, 100);
    }

    private _setDateRangeDynamically(maxDate: number, chart: any) {
        const toDate = new Date(maxDate);
        const fromDate = new Date(maxDate);
        fromDate.setDate(fromDate.getDate() - 10);
        chart.xAxis[0].setExtremes(fromDate.getTime(), toDate.getTime());
    }

    private _formatPlotValue(rawData: any[], targetAttribute, type?: string) {
        let groupData = {};
        if (type === 'fund') {
            groupData = _.groupBy(rawData, 'fundName');
        } else if (type === 'pod') {
            groupData = _.groupBy(rawData, 'podName');
        }
        const targetDateKey = 'date';

        for (const key in groupData) {
            groupData[key].sort((valueA, valueB) => {

                const timeA = (new Date(valueA[targetDateKey])).getTime();
                const timeB = (new Date(valueB[targetDateKey])).getTime();
                return timeA - timeB;
            });
        }
        const plotDataCollection: any = {};
        for (const key in groupData) {
            plotDataCollection[key] = {
                name: key,
                data: groupData[key].map(element => {
                    return [
                        (new Date(element[targetDateKey])).getTime(),
                        element[targetAttribute]
                    ]
                })
            };
        }

        return plotDataCollection;
    }
}
