import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as fromModels from '../../models';

@Component({
  selector: 'app-risk-span-multi-plot-layout',
  templateUrl: './risk-span-multi-plot-layout.component.html',
  styleUrls: ['./risk-span-multi-plot-layout.component.scss']
})
export class RiskSpanMultiPlotLayoutComponent implements OnInit, OnChanges {

  @Input() plotResponse: fromModels.ReportPlotResponse;
  @Input() targetSeries: string[];
  @Input() viewMode: string;

  public dynamicLayoutStyle: any;
  public seriesCollection: string[];

  private columnCount: number;
  private rowCount: number;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.plotResponse && changes.plotResponse.currentValue) {
      this.columnCount = this.plotResponse.columns.length;
      this.rowCount = this.plotResponse.yAxis.length;
      this.dynamicLayoutStyle = this.viewMode === 'compact' ?
                                {"flex": `0 0 ${100/this.columnCount-0.5}%`, "height": `${100/this.rowCount-1}%`} :
                                {"flex": `0 0 ${100/this.columnCount-0.5}%`, "height": "48%", "margin-bottom": "1rem"}
      
      let sortedPlots = [];
      for(let i = 0; i < this.plotResponse.plots.length; i+=this.columnCount) {
        let temp = this.plotResponse.plots.slice(i, i+this.columnCount).sort((a, b) => {
          return parseFloat(a.subTitle.split('~')[1]) - parseFloat(b.subTitle.split('~')[1])
        });
        sortedPlots = sortedPlots.concat([...temp]);
      }
      this.plotResponse.plots = sortedPlots;
      this.plotResponse.plots.forEach((plot, index) => {
        if(index < this.plotResponse.plots.length - this.columnCount) plot.xAxisVisiblity = false;
        else plot.xAxisVisiblity = true;
      })
    }

    if(changes.viewMode && changes.viewMode.currentValue) {
      this.dynamicLayoutStyle = this.viewMode === 'compact' ? 
                                {"flex": `0 0 ${100/this.columnCount-0.5}%`, "height": `${100/this.rowCount-1}%`} :
                                {"flex": `0 0 ${100/this.columnCount-0.5}%`, "height": "48%", "margin-bottom": "1rem"}
    }
  }

}
 