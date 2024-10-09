import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp } from "ag-grid-angular";
import { MarketDataForTimeseriesExporter } from 'src/app/shared/custom/market-data-search/models';
import { RowNode } from 'ag-grid-community';

import * as fromModels from './../../models/timeseries-exporter.models';


@Component({
  selector: 'app-timeseries-exporter-market-data-search-cell-editor',
  templateUrl: './timeseries-exporter-market-data-search-cell-editor.component.html',
  styleUrls: ['./timeseries-exporter-market-data-search-cell-editor.component.scss']
})
export class TimeseriesExporterMarketDataSearchCellEditorComponent implements ICellEditorAngularComp {

  private params: any;
  private node: RowNode;
  public value: fromModels.IMonitorMarketData;

  agInit(params: any): void {
    console.log('inline editing', params)
    this.params = params;
    this.value = this.params.value;
  }

  getValue(): any {
    return this.value;
  }

  marketDataSelected(event: MarketDataForTimeseriesExporter) {
    this.value = this.buildExpressionFromSearchResult(event);
    this.params.api.stopEditing();
  }

  private buildExpressionFromSearchResult(payload: MarketDataForTimeseriesExporter): fromModels.IMonitorMarketData {
    return {
      displayName: payload.name,
      displayType: payload.type,
      label: payload.name + ':' + payload.type,
      mdid: payload.mdid,
      // listOrder: 100
    };
  }

}
