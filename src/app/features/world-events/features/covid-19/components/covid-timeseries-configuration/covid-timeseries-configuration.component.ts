import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-covid-timeseries-configuration',
  templateUrl: './covid-timeseries-configuration.component.html',
  styleUrls: ['./covid-timeseries-configuration.component.scss']
})
export class CovidTimeseriesConfigurationComponent implements OnInit, OnChanges {

  @Input() countries: any[];
  @Input() columns: string[];
  @Output() onSelectCountry = new EventEmitter<any>();
  @Output() onSelectScale = new EventEmitter<string>();
  @Output() onSelectXaxis = new EventEmitter<string>();
  @Output() onSelectColumn = new EventEmitter<string[]>();


  public selectedCountry: any;
  public selectedScale = 'basic';
  public selectedXaxis = 'date';
  public selectedColumns = ['Total Cases', 'New Cases'];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }

  onSelectCountryChange() {
    this.onSelectCountry.emit(this.selectedCountry);
  }

  onSelectScaleChange() {
    this.onSelectScale.emit(this.selectedScale);
  }

  onSelectXaxisChange() {
    this.onSelectXaxis.emit(this.selectedXaxis);
  }

  onSelectedColumnsChange() {
    this.onSelectColumn.emit(this.selectedColumns);
  }

}
