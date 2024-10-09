import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromModels from './../../models';
import * as fromStore from './../../store';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-worldevents-covid-layout',
    templateUrl: './covid-layout.component.html',
    styleUrls: ['./covid-layout.component.scss']
})
export class CovidLayoutComponent implements OnInit {

    public countries$: Observable<fromModels.ICountry[]>;
    public countriesLoading$: Observable<boolean>;
    public countriesLoaded$: Observable<boolean>;
    public countriesError$: Observable<string>;
    public columns$: Observable<string[]>;

    public countriesRawData$: Observable<any>;
    public countriesRawDataLoading$: Observable<boolean>;
    public countriesRawDataLoaded$: Observable<boolean>;
    public countriesRawDataError$: Observable<string>;


    // Initial State
    public selectedCountry: any;
    public selectedScale = 'basic';
    public selectedXaxis = 'date';
    public selectedColumns = ['Total Cases', 'New Cases'];

    constructor(private store: Store<fromStore.CovidState>) {
        this.countries$ = this.store.select(fromStore.getCovidCountries);
        this.countriesLoading$ = this.store.select(fromStore.getCovidCountriesLoading);
        this.countriesLoaded$ = this.store.select(fromStore.getCovidCountriesLoaded);
        this.countriesError$ = this.store.select(fromStore.getCovidCountriesError);

        this.columns$ = this.store.select(fromStore.getColumns);
        this.countriesRawData$ = this.store.select(fromStore.getCovidCountryDataRecords);
        this.countriesRawDataLoading$ = this.store.select(fromStore.getCovidCountryDataLoading);
        this.countriesRawDataLoaded$ = this.store.select(fromStore.getCovidCountryDataLoaded);
        this.countriesRawDataError$ = this.store.select(fromStore.getCovidCountryDataError);
    }

    ngOnInit(): void { }
}
