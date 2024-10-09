import { Component, OnInit, ChangeDetectionStrategy,
    Input, OnChanges, OnDestroy, SimpleChanges, Output,
    EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MatLegacySelectionListChange as MatSelectionListChange } from '@angular/material/legacy-list';
import * as Highcharts from 'highcharts';

import * as fromModels from './../../models/event-analysis.models';
import { EventAnalysisService } from '../../services';

@Component({
  selector: 'app-event-analysis-event-plot-viewer',
  templateUrl: './event-analysis-event-plot-viewer.component.html',
  styleUrls: ['./event-analysis-event-plot-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventAnalysisEventPlotViewerComponent implements OnInit, OnDestroy, OnChanges {

    @Input() data: any;
    @Input() selectedDates: string[] = [];
    @Input() datesColorCodes: {[date: string]: string};

    @Input() activeConfiguration: fromModels.Configuration;
    @Input() activeEventAnalysisLoadingStatus: boolean;
    @Input() activeTimeseriesAnalysisRecord: fromModels.TimeseriesAnalysis;
    @Input() displayMode: string;
    @Input() visibilityInEventPlot: {[series: string]: boolean};

    @Output() selectedDatesChange: EventEmitter<string[]> = new EventEmitter<string[]>();

    public show = true;
    public options: any;
    public selectedDateSubject: Subject<string[]> = new Subject<string[]>();
    private selectedDateIndex: any;
    public averageMode = false;

    public Highcharts = Highcharts;
    public processRendering = false;

    public fixed4decimal: any = { type: 'fixedPoint', precision: 4 };
    public optionsPlot = {
            chart: {
                // height: 500,
                type: 'line',
                events: {
                    click: this.onShowAllSeries.bind(this),
                    addSeries: this.debounce(this.forceUpdateView.bind(this), 200),
                },
                className: 'all',
                animation: false,
                ignoreHiddenSeries: false,
                zooming:{
                    type: 'xy'
                }
            },
            title: {
                text: 'Event Analysis'
            },
            subtitle: { text: 'Event Analysis Plot' },
            xAxis: {
                type: 'linear',
                gridLineWidth: 1,
                tickInterval: 1,
                plotLines: [
                    {
                        color: '#7474741f',
                        value: 0,
                        width: 5
                    }
                ]
            },
            yAxis: {
                tickPositioner: function(min, max) {
                    const maxScale = Math.ceil(Math.max(Math.abs(min), Math.abs(max)) * 100) / 100;
                    const tickInterval = maxScale * 2 / 8;

                    const newTickPositions = [];
                    let currentTick = -maxScale;

                    for (let index = 0; index <= 8; index++) {
                        newTickPositions.push(Math.floor(currentTick * 1000) / 1000);
                        currentTick += tickInterval;
                    }
                    return newTickPositions;
                },
                plotLines: [
                    {
                        color: '#7474741f',
                        value: 0,
                        width: 5
                    }
                ]
            },

            // series: plotData,
            plotOptions: {
                series: {
                    point: {
                        events: {
                            click: this.lineClick
                        }
                    }
                }
            },
            legend: {
                enabled: false,
                align: 'left',
                layout: 'horizontal',
                verticalAlign: 'bottom'
            },
            credits: {
                enabled: false
            },
            tooltip: {
                formatter: function () {
                    return this.points.reduce(function (s, point) {
                        const date = point.series.userOptions.className.split(':')[1];
                        const dateShorten = date ? date.slice(0, 6) + date.slice(8) : 'Avg';
                        return s + '<br>' + `<strong style="color: ${point.series.userOptions.color}; font-size: 11px">` +
                        fromModels.uniqueHighchartSymbolsHexCode[point.series.userOptions.symbol] + '</strong>' +
                        // '</b>' + point.series.name + ': ' +
                        '&nbsp;&nbsp;' +
                        `<span style="color: ${point.series.userOptions.color}">` +
                        dateShorten + ':' + '&nbsp;&nbsp;' +
                        point.y.toFixed(3) + '</span>';
                    }, '<b>' + this.x + '</b>');
                },
                shared: true,
                useHTML: true,
                backgroundColor: 'white',
                animation: false,
                style: {
                    fontSize: '11px',
                }
            }
        };

    private chart: any;
    private formatedPlotData: any;
    private timeSeriesYaxisRange: any;
    private subscription: Subscription;

    private currentVisibleSeries: any[] = [];
    private currentInvisbleSeries: any[] = [];

    constructor(private ref: ChangeDetectorRef, private service: EventAnalysisService) {
        this.subscription = this.selectedDateSubject
            .subscribe((dates) => {
                this.selectedDates = dates;
                if (this.selectedDates && this.data) {
                    this.formatedPlotData = this.getEventDateData(this.selectedDates);
                    if (this.chart) {
                        this.renderChart(this.formatedPlotData);
                    }
                }
            });
        this.callbackFn = this.callbackFn.bind(this);
        this.lineClick = this.lineClick.bind(this);
        this.onHoverEnterDate = this.debounce(this.onHoverEnterDate.bind(this), 500);
        this.onHoverLeaveDate = this.debounce(this.onHoverLeaveDate.bind(this), 500);
        this.Highcharts = this.service.enrichHighChartSymbolLib(Highcharts);
    }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue) {
        this.processRendering = true;
        this.formatedPlotData = this.getEventDateData(this.selectedDates);
        this.timeSeriesYaxisRange = this.data.timeSeriesYaxisRange;
            if (this.chart) {
                this.renderChart(this.formatedPlotData);
            }
        }

        if (changes.activeTimeseriesAnalysisRecord && changes.activeTimeseriesAnalysisRecord.currentValue && this.chart) {
        this.chart.setTitle({text: this.activeTimeseriesAnalysisRecord.name});
        }

        if (changes.displayMode) {
        this.show = false;
        setTimeout(() => {
            this.show = true;
            this.ref.markForCheck();
            });
        }
        if (changes.visibilityInEventPlot && changes.visibilityInEventPlot.currentValue) {
            console.log('current plot series', this.formatedPlotData);
        }

    //   if (changes.datesColorCodes && changes.datesColorCodes.currentValue) {
    //       console.log('changes.datesColorCodes.currentValue', changes.datesColorCodes.currentValue);
    //   }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    //   get calendarDates(): any {
    //     return this.data['calendarDates'];
    //   }

    //   get summaryStats(): any {
    //       return this.data['summaryStats'];
    //   }

    //   get simpleValues(): any {
    //       return this.data['gridData'];
    //   }

    //   get simpleValuesCols(): any {
    //       const cols = ['date'];
    //       cols.push(...Object.keys(this.simpleValues[0]).filter(k => k !== 'date'));
    //       return cols;
    //   }


    // UI Function ------------------------------------------------------------------------

    public lineClick(e: any): void {
        const state = e.point.series.chart.userOptions.chart.className;
        if (state === 'all') {
            e.point.series.chart.userOptions.chart.className = 'date';
            const dateTag = e.point.series.userOptions.className.split(':')[1];
            const sameDate = e.point.series.chart.series.filter(function (s) { return s.userOptions.className.split(':')[1] === dateTag; });
            sameDate.map(function (s) { s.show(); });
            const diffDate = e.point.series.chart.series.filter(function (s) { return s.userOptions.className.split(':')[1] !== dateTag; });
            diffDate.map(function (s) { s.hide(); });
        } else if (state === 'date') {
            e.point.series.chart.userOptions.chart.className = 'formula';
            const formTag = e.point.series.userOptions.className.split(':')[0];
            const sameForm = e.point.series.chart.series.filter(function (s) { return s.userOptions.className.split(':')[0] === formTag; });
            sameForm.map(function (s) { s.show(); });
            const diffForm = e.point.series.chart.series.filter(function (s) { return s.userOptions.className.split(':')[0] !== formTag; });
            diffForm.map(function (s) { s.hide(); });
        } else if (state === 'formula') {
            e.point.series.chart.userOptions.chart.className = 'single';
            const selectedSeries = e.point.series;
            const diffSeries = e.point.series.chart.series.filter(function (s) { return s !== selectedSeries; });
            diffSeries.map(function (s) { s.hide(); });
        }
    }

    public dateSelectionChange(event: MatSelectionListChange) {
        this.processRendering = true;
        // @ts-ignore
        const selectedDates = event.options.selectionList.selectedOptions.selected.map(item => item.value);
        this.selectedDateSubject.next(selectedDates);
        this.selectedDatesChange.emit(selectedDates);
    }

    public callbackFn(chart) {
        this.chart = chart;
        if (this.formatedPlotData) {
            this.renderChart(this.formatedPlotData);
        }
        if (this.activeTimeseriesAnalysisRecord) {
            this.chart.setTitle({text: this.activeTimeseriesAnalysisRecord.name});
        }
    }

    private renderChart(plotData: any): void {
        // Clean up previous render
        // if(this.chart.yAxis.length > 1) {
        const yAxisNeedToBeDeleted = this.chart.yAxis.filter(axis => {
            if (axis.userOptions.id) {
                return axis.userOptions.id.includes('event-analysis');
            } else {
                return false;
            }
        });
        yAxisNeedToBeDeleted.forEach(axis => axis.remove(false));
        // }
        while (this.chart.series.length > 0) {
            // console.log('this.chart.series', this.chart.series);
            this.chart.series[0].remove(false, false);
        }

        if (plotData.length === 0) {
            // nothing to render
            this.processRendering = false;
            return;
        }

        // Start next render
        const dataWithAxis = this.applyAxis(this.formatedPlotData, this.timeSeriesYaxisRange);
        const customAxis = this.getAxisLabels(this.timeSeriesYaxisRange);

        customAxis.forEach(axis => this.chart.addAxis(axis, false, false, false));

        dataWithAxis.forEach(plotdata => {

            plotdata = Object.assign({}, plotdata, {marker: {
                enabled: true,
                symbol: plotdata.symbol,
                width: 12,
                height: 12,
                fillColor: plotdata.color,
                lineColor: plotdata.color,
                lineWidth: 1,
                radius: 6
            }});
            // console.log('plotdata', plotdata)

            this.chart.addSeries(plotdata, false, false);
        });

        const avergeSeriesCollection = this.getAvergeSeries(dataWithAxis, this.activeConfiguration, this.selectedDates);
        avergeSeriesCollection.forEach(series => this.chart.addSeries(series, false, false));

        this.chart.redraw();
        this.averageMode = false;
        this.ref.markForCheck();
    }

    private getEventDateData(dates) {
        return this.data['plotData']
        .filter(d => d.name === 'eventResult')[0]['value']
        .filter(s => dates.includes(s['className'].split(':')[1])
                    || (s['className'].split(':')[1] === 'AVG'));
    }

    private getAxisLabels(timeSeriesYaxisRange): any[] {
        const activeTimeseriesGroupNames = Object.keys(timeSeriesYaxisRange);
        const customAxis = activeTimeseriesGroupNames.map(name => {
            return {
                id: name + 'event-analysis',
                title: { text: name.toUpperCase()},
                lineWidth: 2,
                visible: true,
                opposite: true,
                max: timeSeriesYaxisRange[name] * 1.10,
                min: timeSeriesYaxisRange[name] * 1.10 * -1,
                startOnTick: false,
                endOnTick: false,
                tickAmount: 9
            };
        });
        return customAxis;
    }

    private applyAxis(data: any[], timeSeriesYaxisRange): any[] {
        const activeTimeseriesGroupNames = Object.keys(timeSeriesYaxisRange);
        const result = data.map((series, idx) => {
            if (series.customAxis) {
                let dataWithAxis;
                activeTimeseriesGroupNames.forEach(name => {
                    if (series.name.includes(name)) {
                        dataWithAxis =  Object.assign({}, series, { yAxis: name + 'event-analysis' });
                    }
                });
                return dataWithAxis;
            } else {
                return Object.assign({}, series, { yAxis: 0});
            }
        });
        return result;
    }

    onHoverEnterDate(targetDate) {
        // console.log('onHoverEnterDate', targetDate);
        if (this.selectedDates.includes(targetDate) === false ) {
            this.formatedPlotData = this.getEventDateData([...this.selectedDates, targetDate]);
            if (this.chart) {
                this.renderChart(this.formatedPlotData);
            }
        }
    }

    onHoverLeaveDate(date) {
            this.formatedPlotData = this.getEventDateData(this.selectedDates);
        if (this.chart) {
            this.renderChart(this.formatedPlotData);
        }
    }

    getAvergeSeries(dataWithAxis, activeConfiguration: fromModels.Configuration, selectedDate: string[]) {
        const groupSeries: any = {};
        activeConfiguration.timeseriesAndFormulas.forEach(assetClass => {
            groupSeries[assetClass.alias] = dataWithAxis.filter(series => series.name.includes(assetClass.alias));
        });
        // console.log('groupSeries', groupSeries);
        // remove assetclass that are hidden
        Object.keys(groupSeries).forEach(key => {
            if (groupSeries[key].length === 0) {
                delete groupSeries[key];
            }
        });

        if (selectedDate && selectedDate.length <= 1) {
            // no need to run average calculation if selected date is only one date or no selected date
            return [];
        }

        const assetClassAverageSeries = Object.keys(groupSeries).map(assetClass => {
            const numOfSeries = groupSeries[assetClass].length;
            const rawSeriesData = groupSeries[assetClass].map(series => series.data);
            // console.log('rawSeriesData', rawSeriesData);

            const rawDataCollection: any = {};
            rawSeriesData.forEach(series => {
                series.forEach(dataPoint => {
                    if (rawDataCollection[dataPoint[0]] === undefined) {
                        rawDataCollection[dataPoint[0]] = dataPoint[1];
                    } else {
                        rawDataCollection[dataPoint[0]] += dataPoint[1];
                    }
                });
            });
            // console.log('rawDataCollection', rawDataCollection);

            const rawAverageforAssetClass = Object.keys(rawDataCollection).map(key => {
                return [parseInt(key, 10), rawDataCollection[key] / numOfSeries];
            });

            rawAverageforAssetClass.sort((a, b) => a[0] - b[0]);
            // console.log('rawAverageforAssetClass', rawAverageforAssetClass);

            return {
                color: '#000000',
                dashline: groupSeries[assetClass][0].dashStyle,
                data: rawAverageforAssetClass,
                name: 'Avg ' + assetClass,
                yAxis: groupSeries[assetClass][0].yAxis,
                className: groupSeries[assetClass][0].className.split(':')[0] + 'AVG',
                symbol: groupSeries[assetClass][0].symbol,

                marker: {
                    enabled: true,
                    symbol: groupSeries[assetClass][0].symbol,
                    // width: 15,
                    // height: 15,
                    fillColor: 'black',
                    lineColor: 'black',
                    lineWidth: 1,
                    radius: 5.5
                }
            };
        });

        // console.log('assetClassAverageSeries', assetClassAverageSeries);
        return assetClassAverageSeries;
    }

    onToggleAverage() {
        if (this.averageMode === false) {
            this.averageMode = true;
            this.chart.series.filter(s => !s.userOptions.className.includes('AVG')).forEach(s => s.hide());
            this.chart.series.filter(s => s.userOptions.className.includes('AVG')).forEach(s => s.show());
        } else {
            this.averageMode =  false;
            this.chart.series.forEach(s => s.show());
        }
    }

    onShowAllSeries() {
        this.averageMode = false;
        this.chart.userOptions.chart.className = 'all';
        this.chart.series.map(function(s) { s.show(); });
        this.ref.markForCheck();
    }

    // Uitility Function ------------------------------------------------------------------------

    private forceUpdateView() {
        this.processRendering = false;
        this.ref.markForCheck();
    }

    private debounce(func, timeLimit) {
        let timer;
        return function() {
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(null, args);
            }, timeLimit);
        };
    }
}

