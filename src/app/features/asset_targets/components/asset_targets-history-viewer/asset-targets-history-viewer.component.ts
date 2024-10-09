import { ChangeDetectionStrategy, Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA  } from '@angular/material/legacy-dialog'
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { AppLineChartComponent } from 'src/app/components';

@Component({
    selector: 'app-asset-targets-history',
    templateUrl: './asset-targets-history-viewer.component.html',
    styleUrls: ['./asset-targets-history-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetTargetsHistoryViewerComponent implements OnInit, AfterViewInit {


    @ViewChild('chart', { static: false }) chart: AppLineChartComponent;

    public Highcharts = Highcharts;
    public selectedTimeseries: any = null;
    public params: any;  

    public options: any = {};

    constructor(public dialogRef: MatDialogRef<AssetTargetsHistoryViewerComponent>,
        @Inject(MAT_DIALOG_DATA) public data) {
        
        this.callbackFn = this.callbackFn.bind(this);
        this.selectedTimeseries = data['timeseries'];
        
        this.setOptions();
    }

    callbackFn(chart): void {
        this.chart = chart;
    }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
    }

    onClose(e: any): void {
        this.dialogRef.close();
    }

    private setOptions(): any {
        this.options = {
            chart: {
                zooming:{
                    type: 'xy'
                }
            },
            plotOptions: {
                series: {
                    pointInterval: 24,
                    marker: {
                        enabled: true,
                        fillColor: '#FFFFFF',
                        lineWidth: 2,
                        lineColor: null // inherit from series
                    }
                }
            },
            rangeSelector: {
                enabled: false
            },
            legend: {
                enabled: true,
            },
            exporting: {
                csv: {
                    dateFormat: '%m/%d/%Y'
                }
            },
            title: {
                text: this.selectedTimeseries ? this.selectedTimeseries.name : null
            },
            subtitle: {
                text: 'Historical Target vs. Asset Values'
            },
            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: "Asset/Target Levels"
                },
                labels: {
                    style: {
                        color: '#000000'
                    }
                },
                crosshair: true
            },
            xAxis: {
                crosshair: true,
                type: 'datetime',
                labels: {
                    format: '{value:%m/%d/%y}',
                    align: 'right',
                    rotation: -30,
                    style: {
                        color: '#000000'
                    }
                }
            },
            series: this.getChartData(this.selectedTimeseries),
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.4f}</b><br/>',
                shared: true,
                xDateFormat: '%m/%d/%Y',
                crosshairs: true
            },
        }
    }

    private getChartData(selectedTimeseries: any): any[] {
        const assetLevels = this.transformSeries(selectedTimeseries['assetLevels']);
        const targetLevels = this.transformSeries(selectedTimeseries['targetLevels']);
        const range = this.transformRange(selectedTimeseries['range']);

        // Add Asset Levels
        const result = [];

        // result.push({
        //     name: 'Range',
        //     type: 'arearange',
        //     marker: {
        //         enabled: false
        //     },
        //     data: [...range]
        // });

        result.push({
            name: 'Asset Levels',
            data: [...assetLevels]
        });

        // Add Target Levels
        result.push({
            name: 'Target Levels',
            data: [...targetLevels]
        });

        // Add Range
        return result;
    }

    private transformSeries(data: any[]): any[] {
        const result = data.map((row) => {
            return [new Date(row[0]).getTime(), row[1]];
        })
        return result;
    }
    
    private transformRange(data: any[]): any[] {
        const result = data.map((row) => {
            return [
                new Date(row[0]).getTime(), 
                row[1],
                row[2]
            ];
        })
        return result;
    }

    private transformValue(value: number, displayFormat: string): number {
        // let formattedValue = null;
        // if (value) {
        //     if (displayFormat && displayFormat === 'integer') {
        //         formattedValue = parseInt(value.toFixed(0), 10);
        //     } else if (displayFormat && displayFormat.startsWith('decimal')) {
        //         formattedValue = parseFloat(value.toFixed(parseInt(displayFormat.replace('decimal', ''), 10)));
        //     } else {
        //         formattedValue = parseFloat(value.toFixed(2));
        //     }
        // }
        // return formattedValue;
        return value;
    }

    

}
