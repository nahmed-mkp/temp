
import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions, ColDef } from 'ag-grid-community';

import * as fromModels from './../../models/timeseries-exporter.models';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-timeseries-viewer',
    templateUrl: './timeseries-viewer.component.html',
    styleUrls: ['./timeseries-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesViewerComponent implements OnInit, OnChanges {

    @Input() selectedMonitor: string;
    @Input() params: fromModels.IDateRange;
    @Input() viewMode: 'table' | 'chart';

    @Input() timeseries: any[];
    @Input() timeseriesLoading: boolean;
    @Input() timeseriesLoaded: boolean;
    @Input() timeseriesError: string;


    // Grid
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private colDefs: ColDef[];
    public extraOption = { autoSizeColumns: true };
    public customGridOption: GridOptions = {
        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                        params.colDef.field.toLowerCase().includes('id') === false ?
                        {'justify-content': 'flex-end'} : { };
            },
            cellClass: 'right-border-light',
            filter: 'agNumberColumnFilter',
            valueFormatter:  params => {
              if ( typeof params.value === 'number' && params.colDef.field.toLowerCase().includes('id') === false) {
                return this.utilityService.formatNumberWithCommasAndDigitBlankNaNs(3)(params);
              }
            },
        },
        columnDefs: [],
        rowClass: 'medium-row',
        rowHeight: 22,
        headerHeight: 24,
        sideBar: false,

        getContextMenuItems: params => {
          const csvExport = {
            name: 'CSV Export',
            action: () => this.onDownloadData_csv()
          };
    
          const excelExport = {
            name: 'Excel Export',
            action: () => this.onDownloadData_excel()
          };
          return ['copy', 'copyWithHeaders', 'separator', csvExport, excelExport];
        },
    }

    // Plot
    private chart: any;
    private plotData: any;
    public optionsPlot: any;

    constructor(private utilityService: UtilityService) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
        this.callbackFn = this.callbackFn.bind(this);
    }

    ngOnInit(): void {
        this.optionsPlot = this._createPlotOption();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.timeseries && changes.timeseries.currentValue) {
            this.colDefs = this._createColumnDefs(changes.timeseries.currentValue);
            this.plotData = this._formatPlotData(changes.timeseries.currentValue);

            if (this.gridApi) {
                this.gridApi.setColumnDefs([...this.colDefs]);
            }
            if (this.chart) {
                this._drawPlot(this.plotData);
            }
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;

        if (this.colDefs && this.colDefs.length > 0) {
            this.gridApi.setColumnDefs(this.colDefs);
        }
    }

    public callbackFn(chart: any): void {
        this.chart = chart;

        if (this.plotData) {
            this._drawPlot(this.plotData);
        }
    }

    // Utility --------------------------------------------------

    private _createColumnDefs(data: any[]): ColDef[] {

        const columnName: string[] = data.length > 0 ? Object.keys(data[0]) : [];
        const colDefs: ColDef[] = columnName.map(name => {

            const colDef: ColDef = {
                headerName: name,
                field: name
            };
            if (name.toLowerCase().includes('date')) {
                colDef.valueGetter = params => {
                  const value = params.data[params.colDef.field];
                  return (new Date(value)).toLocaleDateString();
                };
                // colDef.valueFormatter = params => {
                //     const value = params.data[params.colDef.field];
                //     const formattedValue = (new Date(value)).toLocaleDateString();
                //     return formattedValue;
                // };
                colDef.sortable = true;
                colDef.sort = 'asc';
                colDef.cellStyle = { 'justify-content': 'flex-start' };
                colDef.comparator = (valueA, valueB, nodeA, nodeB) => {
                  const dateValueA = (new Date(valueA)).getTime();
                  const dateValueB = (new Date(valueB)).getTime();
                  return dateValueA - dateValueB;
                }
            } else {
                colDef.valueFormatter = this.utilityService.formatNumberWithCommasAndDigitBlankNaNs(3);
                colDef.sortable = false;
                colDef.cellStyle = { 'justify-content': 'flex-end' };
            }
            return colDef;
        });
        return colDefs;
    }

    private _formatPlotData(data: any[]) {
        const dataCollection: any = {};
        data.forEach(element => {
            const time = element['Date']
            Object.keys(element).filter(key => key !== 'Date').forEach(key => {
              if (dataCollection[key] === undefined) {
                  dataCollection[key] = {name: key, data: []};
              }
              const dataPoint = [time, element[key]];
              dataCollection[key].data.push(dataPoint);
            });
        });
        return Object.keys(dataCollection).map(key => dataCollection[key]);
    }

    private _drawPlot(plotData: any[]) {
        this.chart.animation = false;
        while (this.chart.series.length > 0) {
          this.chart.series[0].remove();
        }
        plotData.forEach((series, index) => {
          if (index > 5) {
            series['visible'] = false;
          }
          this.chart.addSeries(series);
        });

        setTimeout(() => this.chart.reflow(), 100);
    }


    private _createPlotOption() {
        return {
            // subtitle: { text: (this.dataPath ? this.dataPath.displayName : '') + ' Simulated Returns' },
            // title : { text : this.title + ' ' + this.displayPropety},
            chart: {
              zooming:{
                type: 'xy'
              }
            },
            xAxis: {
                gridLineWidth: 0.5,
                style: {
                  color: 'white'
                },
              },
              yAxis: {
                gridLineWidth: 0.5,
              },
              colors:['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
              '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
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
              lang: {
                noData: 'No Data'
              },
              legend: {
                  enabled: true,
                  align: 'right',
                  layout: 'vertical',
                  verticalAlign: 'top',
                  floating: true,
                  y: 50,
                  itemStyle: {'opacity': 0.7, 'fontWeight': 'normal', color: 'black'}
              },
              navigator: {
                  series: {
                    includeInCSVExport: false
                  },
                  height: 160,
                  enabled: true,
              },
              exporting: {
                csv: {
                  dateFormat: '%m/%d/%Y'
                },
                buttons: {
                  contextButton: {
                    enabled: false
                  }
                }
              },
              credits: {
                enabled: false
              },
              plotOptions: {
                series: {
                  showInNavigator: true
                },
              },
              stockTools: {
                  gui: {
                      enabled: true
                  }
              },
              scrollbar: {
                height: 7
              },
              rangeSelector: {
                selected: 4,
              },
        }
    }

    private onDownloadData_csv(): void {
      this.gridApi.exportDataAsCsv({
        fileName: `${this.selectedMonitor || ''} Timeseries ${this.params.startDate} to ${this.params.endDate}`
      });
    }
  
    private onDownloadData_excel(): void {
      this.gridApi.exportDataAsExcel({
        fileName: `${this.selectedMonitor || ''} Timeseries ${this.params.startDate} to ${this.params.endDate}`
      });
    }
}
