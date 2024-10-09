import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as fromModels from '../../models';
import { JbotService } from '../../services';

@Component({
  selector: 'app-jbot-timeseries-viewer',
  templateUrl: './jbot-timeseries-viewer.component.html',
  styleUrls: ['./jbot-timeseries-viewer.component.scss']
})
export class JbotTimeseriesViewerComponent implements OnInit {

  @Input() data: fromModels.JbotTimeseriesResponse;
  @Input() displayPropety: string;
  @Input() title: string;
  @Input() loadingStatus: string;
  private columnKeys: string[];

  public chart: any;
  public optionsPlot = {
    // title : { text : this.title + ' ' + this.displayPropety},
    subtitle: { text: 'Timeseries Plot' },

    legend: {
        enabled: true,
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'top',
        floating: false,
        y: 100,
    },
    navigator: {
        series: {
          includeInCSVExport: false
        },
        height: 80,
    },
    exporting: {
        csv: {
            dateFormat: '%Y-%m-%d'
        }
    },
    credits: {
        enabled: false
    },
    plotOptions: {
      series: {
        showInNavigator: true
      }
    },
  }

  constructor(private jbotService: JbotService) {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data && changes.data.currentValue && this.chart) {
      const formattedPlotData = this.formatData(changes.data.currentValue);
      this.drawPlot(formattedPlotData);
    } 
  }

  public callbackFn(chart) {
    this.chart = chart;
    if(this.data && this.data.data && this.data.data.length>0) {
      const formattedPlotData = this.formatData(this.data);
      this.drawPlot(formattedPlotData);
    }
  }

  // Utility -----------------------------------------------------

  formatData(data: fromModels.JbotTimeseriesResponse): any {
    const plotData: any = {}
    this.columnKeys = Object.keys(data.data[0]).filter(key => 
      key!=='category' && key!=='seriesName' && key!=='when' && key!=='asOfDate');
    this.columnKeys.forEach(key => plotData[key]=[])
    data.data.forEach(item => {
      this.columnKeys.forEach(key => {
        plotData[key].push([item['asOfDate'], item[key]]);
      })
    });
    return plotData;
  }

  drawPlot(formattedPlotData) {
    this.columnKeys.forEach(key => {
      this.chart.addSeries({
        name: key,
        data: formattedPlotData[key],
        visible: key === this.displayPropety ? true : false,
      });
    })

    this.chart.setTitle({
      text: this.title
    });

    const annotations = this.data.annotations.map(date => {
      let dateTimeId = (new Date(date.when)).getTime();
      return {
        color: '#e7e7e7',
        value: dateTimeId,
        width: 3
      }
    });
    annotations.forEach(plotLineLocation => {
      this.chart.xAxis[0].addPlotLine(plotLineLocation);
    })
  }


}
