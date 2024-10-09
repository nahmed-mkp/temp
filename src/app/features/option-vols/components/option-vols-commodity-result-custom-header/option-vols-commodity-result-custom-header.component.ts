import { Component, OnInit } from '@angular/core';
import { IHeaderGroupAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-option-vols-commodity-result-custom-header',
  templateUrl: './option-vols-commodity-result-custom-header.component.html',
  styleUrls: ['./option-vols-commodity-result-custom-header.component.scss']
})
export class OptionVolsCommodityResultCustomHeaderComponent implements IHeaderGroupAngularComp {

  public result: any;
  public uniqueExpiry: string[];
  public targetExpiry: string;
  private context: any;
  public mode: string;

  constructor() { }

  agInit(params): void {
    this.context = params.context;
    this.result = params.context.result;
    this.targetExpiry = params.context.targetExpiry;
    this.uniqueExpiry =  params.context.uniqueExpiry;
    this.mode = params.context.mode;
  }

  onTargetExpiryChange() {
    this.context.onFilterExpiry(this.targetExpiry);
  }

  onModeChange() {
    this.context.onModeChange(this.mode);
  }

}
