import { I } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';
import * as fromModels from '../../models/factor-exposure.models';
import { ParamsChanged } from '../../store';

@Component({
  selector: 'app-factor-exposure-tab-viewer',
  templateUrl: './factor-exposure-tab-viewer.component.html',
  styleUrls: ['./factor-exposure-tab-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactorExposureTabViewerComponent implements OnInit, OnChanges {

  @HostBinding('class') classes = 'vertical-flex-full-height';

  @Input() privilegedAccess: boolean;
  @Input() activeDate: string;

  @Input() factorsTabData: any[];
  @Input() factorsTabDataLoaded: boolean; 

  @Input() groupingTabData: any[];
  @Input() groupingTabDataLoaded: boolean;

  @Input() positionsAndGroupingData: any[];
  @Input() positionsAndGroupingDataLoaded: boolean;

  @Input() activeGrouping: string;
  @Input() tabsList: string[];
  @Input() groupingNameAndIdMaping: any;

  @Input() useUSDFilter: boolean;
  @Input() useBpsToFundFilter: boolean;
  @Input() useBpsToPodFilter: boolean;
  @Input() useNullSecFilter: boolean;

  @Input() userSettings: any;

  @Output() activeTabChanged: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() tabClosed: EventEmitter<string> = new EventEmitter<string>();

  public selectedLayoutLinearData;
  public selectedLayoutNonlinearData;
  public tabIndex = 0;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.groupingTabData && changes.groupingTabData.currentValue){
      this.tabIndex = this.tabsList.indexOf(this.activeGrouping);
    }
  }

  onTabChanged(params: MatTabChangeEvent){
    if(params.tab.textLabel !== 'Factors'){
      this.activeTabChanged.emit({
        activeDate: this.activeDate,
        activeGrouping: params.tab.textLabel
      })
    } else {
      this.activeTabChanged.emit({
        activeDate: this.activeDate,
        loadFactors: true
      })
    }
  }

  closeTab(index: number): void {
    event.stopPropagation();
    const tabName = this.tabsList[index]; 
    this.tabsList.splice(index, 1);
    this.tabClosed.emit(tabName);
  }

  getActiveGroupingArray(activeGrouping: string): string[] {
    return activeGrouping && ("Firm|" + activeGrouping).split('|');
  }
}
