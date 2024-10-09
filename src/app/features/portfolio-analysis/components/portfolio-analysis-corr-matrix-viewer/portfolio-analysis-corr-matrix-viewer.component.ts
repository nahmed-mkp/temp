import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { GridOptions, ColDef } from 'ag-grid-community';

import * as fromModels from './../../models';

@Component({
  selector: 'app-portfolio-analysis-corr-matrix-viewer',
  templateUrl: './portfolio-analysis-corr-matrix-viewer.component.html',
  styleUrls: ['./portfolio-analysis-corr-matrix-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioAnalysisCorrMatrixViewerComponent implements OnInit, OnChanges {

  @Input() portfolioAnalysisCorrMatrix: fromModels.PortfolioAnalysisCorrMatrix;
  @Input() portfolioAnalysisLoadingStatus: boolean;
  @Input() portfolioAnalysisLoadedStatus: boolean;
  @Input() portfolioAnalysisResponseError: string;

  public customGridOption: GridOptions = {}
  public extraOption = {sizeColumnsToFit: true};
  public columnDefs: ColDef[] = [];
  public gridData: any[] = [];

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.portfolioAnalysisCorrMatrix && changes.portfolioAnalysisCorrMatrix.currentValue) {
      this.normalizeColDefs();
      this.normalizeGridData();
    }
  }

  normalizeColDefs() {
    const temp: any = this.portfolioAnalysisCorrMatrix.sec.map(security => {
      return {
        headerName: security, 
        field: security, 
        cellStyle: {'border-right': '1px solid #8080804f'},
        valueFormatter: this.valueFormatter
      }
    });
    temp.unshift({
      headerName: 'Securities', 
      field: 'securities', 
      cellStyle: {'border-right': '1px solid #8080804f'}
    });
    this.columnDefs = temp;
  }

  normalizeGridData() {
    const keys = this.portfolioAnalysisCorrMatrix.sec; 
    this.gridData = this.portfolioAnalysisCorrMatrix.data.map((row, i) => {
      const rowFormated = {};
      row.forEach((item, index) => {
        rowFormated[keys[index]] = item;
      });
      rowFormated['securities'] = keys[i];
      return rowFormated;
    });
  }

  valueFormatter(params) {
    if(params.value) {
      return params.value.toLocaleString(undefined, {maximumFractionDigits: 2});
    }
  }
}
