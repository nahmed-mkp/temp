import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _ from 'lodash';

import * as moment from 'moment';
import * as Highcharts from 'highcharts';
import * as fromModels from './../../models/capitals.models';
import { UtilityService } from 'src/app/services';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-capital-flows',
    templateUrl: './capital-flows.component.html',
    styleUrls: ['./capital-flows.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapitalFlowsComponent implements OnInit, OnChanges {

    @Input() fundOrPod: string;
    @Input() flowsInput: fromModels.ICapitalFlowInput;
    @Input() fundCapitalFlows: any[];
    @Input() fundCapitalFlowsLoading: boolean;

    @Input() podCapitalFlows: any[];
    @Input() podCapitalFlowsLoading: boolean;

    @Input() canEdit: boolean;

    @Output() changeFlowsInput: EventEmitter<fromModels.ICapitalFlowInput> = new EventEmitter<fromModels.ICapitalFlowInput>();

    public mode = 'data';
    public highcharts = Highcharts;

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
    // public fundAttributes: string[] = ['eodCapital', 'leveredEodCapital', 'leveredSodCapital', 'outflow', 'inflow', 'sodCapital'];
    public fundAttributes: string[] = ['Inflow', 'Outflow', 'SOD Capital', 'EOD Capital', 'Levered SOD Capital', 'Levered EOD Capital'];
    public fundAttributesKayMapping = {
        'Inflow': 'inflow',
        'Outflow': 'outflow',
        'SOD Capital': 'sodCapital',
        'EOD Capital': 'eodCapital',
        'Levered SOD Capital': 'leveredSodCapital',
        'Levered EOD Capital': 'leveredEodCapital'
    }

    public activefundAttribute = 'EOD Capital';
    public podAttributes: string[] = ['Amount', 'RemainderPct'];
    public activePodAttribute = 'RemainderPct';

    public onActiveDateChanged_debounce: any;

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
        // deltaRowDataMode: true,
        context: this,
        skipHeaderOnAutoSize: true,

        onCellValueChanged: this.onCellValueChanged,

        columnDefs: [{
            headerName: 'Date',
            field: 'date',
            sort: 'desc',
            comparator: (valueA, valueB, nodeA, nodeB) => {
                const timeA = (new Date(valueA)).getTime();
                const timeB = (new Date(valueB)).getTime();
                return timeA - timeB;
            }
        }, {
            headerName: 'Fund',
            field: 'name'
        }, {
            headerName: 'SOD Capital',
            field: 'sodCapital',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(0),
        }, {
            headerName: 'EOD Capital',
            field: 'eodCapital',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(0),
        }, {
            headerName: 'Inflow',
            field: 'inflow',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(0),
        }, {
            headerName: 'Outflow',
            field: 'outflow',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(0),
        }],

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
        // deltaRowDataMode: true,
        context: this,
        skipHeaderOnAutoSize: true,

        onCellValueChanged: this.onCellValueChanged,

        columnDefs: [{
            headerName: 'Date',
            field: 'Date',
            valueFormatter: params => {
                return params.value.split('T')[0]
            },
            sort: 'desc',
            comparator: (valueA, valueB, nodeA, nodeB) => {
                const timeA = (new Date(valueA)).getTime();
                const timeB = (new Date(valueB)).getTime();
                return timeA - timeB;
            }
        }, {
            headerName: 'Pod',
            field: 'Name'
        }, {
            headerName: 'Amount',
            field: 'Amount',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(0),
        }, {
            headerName: 'Flow Type',
            field: 'FlowType',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(0),
        }, {
            headerName: 'RemainderPct',
            field: 'RemainderPct',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, {percent: true}),
        }],

        // getRowNodeId: data => data.CrossPodName,

        frameworkComponents: {
            // CrossPodMatrixCellRendererComponent: CrossPodMatrixCellRendererComponent
        }
    };
    public extraOption = {
        sizeColumnsToFit: true
    };


    constructor(private utilityService: UtilityService) {
        this.customGridCallBack_fund = this.customGridCallBack_fund.bind(this);
        this.customGridCallBack_pod = this.customGridCallBack_pod.bind(this);

        this.callbackFn_pod = this.callbackFn_pod.bind(this);
        this.callbackFn_fund = this.callbackFn_fund.bind(this);

        this.onActiveDateChanged_debounce = _.debounce(this.onActiveDateChanged.bind(this), 1000);
    }

    ngOnInit(): void {

        // if (this.podCapitalFlows && this.podCapitalFlows.length > 0) {
        //     this.formattedPlotValue_pod = this._formatPlotValue(this.formattedPlotValue_pod);
        //     if (this.chart_fund) {
                
        //     }
        // }

        if (this.flowsInput) {
            this.changeFlowsInput.emit({
                'startDate': moment(this.flowsInput.startDate).format('MM-DD-YYYY'),
                'endDate': moment(this.flowsInput.endDate).format('MM-DD-YYYY')
            });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.gridApi_fund && changes.fundCapitalFlows && changes.fundCapitalFlows.currentValue) {
            if (this.gridApi_fund) {
                this.gridApi_fund.setRowData(changes.fundCapitalFlows.currentValue);
                this.gridApi_fund.refreshCells();
            }
        }

        if (this.gridApi_pod && changes.podCapitalFlows && changes.podCapitalFlows.currentValue) {
            if (this.gridApi_pod) {
                this.gridApi_pod.setRowData(changes.podCapitalFlows.currentValue);
                this.gridApi_pod.refreshCells();
            }
        }

        if (changes.fundCapitalFlows && changes.fundCapitalFlows.currentValue) {
            this.formattedPlotValue_fund = this._formatPlotValue(this.fundCapitalFlows || [], this.fundAttributesKayMapping[this.activefundAttribute], 'fund');
            if (this.chart_fund) {
                this._renderChart(this.chart_fund, this.formattedPlotValue_fund);
            }
        }

        if (changes.podCapitalFlows && changes.podCapitalFlows.currentValue) {
            this.formattedPlotValue_pod = this._formatPlotValue(this.podCapitalFlows || [], this.activePodAttribute, 'pod');
            if (this.chart_pod) {
                this._renderChart(this.chart_pod, this.formattedPlotValue_pod);
            }
        }
    }

    public onActiveDateChanged(e: MatDatepickerInputEvent<Date>, type: string): void {
        if (type === 'start') {
            this.changeFlowsInput.emit(Object.assign({}, this.flowsInput, { 'startDate': moment(e.value).format('MM-DD-YYYY') }));
        } else {
            this.changeFlowsInput.emit(Object.assign({}, this.flowsInput, { 'endDate': moment(e.value).format('MM-DD-YYYY') }));
        }
    }

    public getDate(input: fromModels.ICapitalFlowInput, type: string): Date {
        if (type === 'start') {
            return input && moment(input.startDate).toDate();
        } else {
            return input && moment(input.endDate).toDate();
        }
    }

    public changeMode(mode: string): void {
        this.mode = mode;
    }

    customGridCallBack_fund(params) {
        this.gridApi_fund = params.api;
        this.gridApi_fund.closeToolPanel();

        if (this.fundCapitalFlows) {
            this.gridApi_fund.setRowData(this.fundCapitalFlows);
        }
    }

    customGridCallBack_pod(params) {
        this.gridApi_pod = params.api;
        this.gridApi_pod.closeToolPanel();

        if (this.podCapitalFlows) {
            this.gridApi_pod.setRowData(this.podCapitalFlows);
        }
    }

    onCellValueChanged(event): void {
        // TODO
    }

    public onAttributeChange(event: string) {
        if (event === 'fund') {
            this.formattedPlotValue_fund = this._formatPlotValue(this.fundCapitalFlows || [], this.fundAttributesKayMapping[this.activefundAttribute], 'fund');
            if (this.chart_fund) {
                this._renderChart(this.chart_fund, this.formattedPlotValue_fund);
            }
        } else {
            this.formattedPlotValue_pod = this._formatPlotValue(this.podCapitalFlows || [], this.activePodAttribute, 'pod');
            if (this.chart_fund) {
                this._renderChart(this.chart_pod, this.formattedPlotValue_pod);
            }
        }
    }

    // public callbackFn(chart) {
    //     this.chart = chart;
    //     if (this.fundCapitalFlows && this.fundCapitalFlows.length > 0) {
    //         this.renderChart(this.fundCapitalFlows);
    //     }
    // }

    // public renderChart(flows: any[]) {
    //     if (!this.chart) {
    //         return;
    //     }

    //     const capitals: {[name: string]: any} = {};
    //     const netContributions: {[name: string]: any } = {};
    //     const groupingUnits = [['week', [1]], ['month', [1, 2, 3, 4, 6]]];

    //     flows.map(flow => {
    //         const mom = moment(flow['date']);
    //         const utc = mom.utc().valueOf();
    //         const fundName = flow['fundShortName'];
    //         // if (!(fundName in capitals)) {
    //         //     capitals[fundName] = [];
    //         // }
    //         // capitals[fundName].push([utc, flow['sodCapital'] / 1000000.00]);

    //         const inflow = flow['inflow'] ? flow['inflow'] : 0;
    //         const outflow = flow['outflow'] ? flow['outflow'] : 0;
    //         if (!(fundName in netContributions)) {
    //             netContributions[fundName] = [];
    //         }
    //         netContributions[fundName].push([utc, inflow - outflow]);
    //     });


    //     while (this.chart.series.length > 0) {
    //         this.chart.series[0].remove(true);
    //     }

    //     // Object.keys(capitals).map(key => {
    //     //     this.chart.addSeries({
    //     //         name: `${key} SOD Capital`,
    //     //         data: capitals[key],
    //     //         // dataGrouping: {
    //     //         //     units: groupingUnits
    //     //         // }
    //     //     });
    //     // });

    //     Object.keys(netContributions).map(key => {
    //         this.chart.addSeries({
    //             name: `${key} Net Contributions`,
    //             type: 'column',
    //             data: netContributions[key]
    //         });
    //     });

    //     this.chart.redraw();
    // }

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

    private _formatPlotValue(rawData: any[], targetAttribute, type?: string) {
        let groupData = {};
        if (type === 'fund') {
            groupData = _.groupBy(rawData, 'name');
        } else if (type === 'pod') {
            groupData = _.groupBy(rawData, 'Name');
        }
        let targetDateKey = 'date';
        if (rawData.length > 0) {
            if (Object.keys(rawData[0]).includes('date')) {
                targetDateKey = 'date';
            } else if (Object.keys(rawData[0]).includes('Date')) {
                targetDateKey = 'Date';
            }
        }


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
}
