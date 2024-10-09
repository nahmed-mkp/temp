import { ChangeDetectionStrategy, Component, OnInit, HostBinding, AfterViewInit, ViewChild, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import * as fromStore from './../../store';
import * as fromModels from './../../models/snr-dashboard.models';
import { MatLegacyTabChangeEvent as MatTabChangeEvent, MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-snr-dashboards-layout',
    templateUrl: './snr-dashboards-layout.component.html',
    styleUrls: ['./snr-dashboards-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SNRDashboardsLayoutComponent implements OnInit, AfterViewInit {

    @ViewChildren('tabs') tabGroup: MatTabGroup;
    @HostBinding('class') classes = 'vertical-flex-full-height';

    public dates$: Observable<string[]>;
    public countries$: Observable<fromModels.ICountry[]>;
    public selectedCountries$: Observable<fromModels.ICountry[]>;

    public inputsLoading$: Observable<boolean>;
    public inputsLoaded$: Observable<boolean>;
    public inputsError$: Observable<string>;

    public assetClass: string;
    public currIndex: number;

    constructor(private store: Store<fromStore.SNRDashboardState>, private location: Location, private router: Router, private activatedRoute: ActivatedRoute) {

        this.dates$ = this.store.select(fromStore.getSNRMacroRunDates);
        this.countries$ = this.store.select(fromStore.getSNRMacroRunCountries);
        this.selectedCountries$ = this.store.select(fromStore.getSNRMacroRunSelectedCountries);

        this.inputsLoading$ = this.store.select(fromStore.getSNRMacroRunInputsLoading);
        this.inputsLoaded$ = this.store.select(fromStore.getSNRMacroRunInputsLoaded);
        this.inputsError$ = this.store.select(fromStore.getSNRMacroRunInputsError);

    }

    ngOnInit(): void { }

    onInputChanged(input: fromModels.IMacroRun): void {
        const payload = Object.assign({}, input, {'countries': this._sanitizeCountries(input.countries)});
        this.store.dispatch(new fromStore.SelectMacroRun(payload));
    }

    ngAfterViewInit(): void {
        let currTabs;
        this.countries$.subscribe(countries => {
            if (countries) {
                this.activatedRoute.url.subscribe(route => {
                    if (route) {
                        this.assetClass = route.length > 1 ? route[1]['path'].toLowerCase() : 'us';
                    }
                    currTabs = countries.map( country => {
                        return country.code;
                    });
                    this.currIndex = currTabs.indexOf(this.assetClass);
                    if (this.currIndex >= 0) {
                        this.tabGroup.selectedIndex = this.currIndex;
                    } else {
                        this.tabGroup.selectedIndex = 0;
                    }
                });
            }
        });
    }

    public changeTab(e: MatTabChangeEvent): void {
       const assetClass =  e.tab.textLabel;
        this.activateRoute(assetClass);
    }

    public activateRoute(assetClass: string): void {
        const url = this.router.createUrlTree([`macro/${assetClass}`], { relativeTo: this.activatedRoute.parent, }).toString();
        this.location.go(url);
      }

    private _sanitizeCountries(countries: any[]): string[] {
        return countries.filter((country) => country !== 0);
    }
}
