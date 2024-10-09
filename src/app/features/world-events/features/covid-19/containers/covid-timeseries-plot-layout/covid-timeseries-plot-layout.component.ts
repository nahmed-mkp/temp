import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as fromModels from './../../models';

@Component({
  selector: 'app-covid-timeseries-plot-layout',
  templateUrl: './covid-timeseries-plot-layout.component.html',
  styleUrls: ['./covid-timeseries-plot-layout.component.scss']
})
export class CovidTimeseriesPlotLayoutComponent implements OnInit, OnChanges {

  @Input() selectedCountry: any;
  @Input() selectedScale: string;
  @Input() selectedXaxis: string;
  @Input() selectedColumns: string[];
  @Input() columns: string[];

  @Input() countriesRawData: any;
  @Input() countriesRawDataLoading: boolean;
  @Input() countriesRawDataError: string;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedCountry && changes.selectedCountry.currentValue) {

    }
  }

  private getPlotData() {
    const plotData: any[] = [];
    const targetCountriesData: fromModels.CountryData[] = this.selectedCountry.map(country => {
      return this.countriesRawData[country];
    });

    targetCountriesData.forEach(countryData => {
      const xAxis = this.selectedScale === 'date' ? countryData.dates : countryData.days;
      this.selectedColumns.forEach(targetColumn => {
        
      })
    });

    if (this.selectedScale === 'date') {

    }

    if (this.selectedScale === 'day') {

    }
  }

}
