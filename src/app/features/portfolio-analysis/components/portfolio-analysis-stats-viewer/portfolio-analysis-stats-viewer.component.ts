import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

import * as fromModels from './../../models';

@Component({
  selector: 'app-portfolio-analysis-stats-viewer',
  templateUrl: './portfolio-analysis-stats-viewer.component.html',
  styleUrls: ['./portfolio-analysis-stats-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioAnalysisStatsViewerComponent implements OnInit, OnChanges {

  @Input() portfolioAnalysisStats: fromModels.PortfolioAnalysisStats[] = [];
  @Input() portfolioAnalysisLoadingStatus: boolean;
  @Input() portfolioAnalysisLoadedStatus: boolean;
  @Input() portfolioAnalysisResponseError: string;

  public customGridOption: GridOptions = {
    columnDefs: [
      {headerName: 'Security', field: 'security', cellStyle: {'border-right': '1px solid #8080804f'}},
      {headerName: 'Ann Return($)', field: 'ann_return', cellStyle: {'border-right': '1px solid #8080804f'}, valueFormatter: this.valueFormatter},
      {headerName: 'Ann Vol($)', field: 'ann_vol', cellStyle: {'border-right': '1px solid #8080804f'}, valueFormatter: this.valueFormatter},
      {headerName: 'Max dd($)', field: 'max_dd', cellStyle: {'border-right': '1px solid #8080804f'}, valueFormatter: this.valueFormatter},
    ]
  }

  public extraOption = {
    sizeColumnsToFit: true
  }

  constructor() { }

  ngOnInit() {}

  ngOnChanges(change: SimpleChanges) {}

  valueFormatter(params) {
    return params.value.toLocaleString(undefined, {maximumFractionDigits: 2});
  }
}
