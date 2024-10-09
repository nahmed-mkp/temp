import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { Store } from "@ngrx/store";
import { MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ScenarioManagementConfirmCloseDialog, ScenarioManagementEconvarDialogViewer, ScenarioManagementForecastPeriodDialogViewer, ScenarioManagementScenarioDialogViewer } from "../../components";
import { ScenarioManagementForecastDialogViewer } from "../../components/scenario-management-forecast-dialog-viewer/scenario-management-forecast-dialog-viewer.component";

@Component({
    selector: 'scenario-management-layout',
    templateUrl: './scenario-management-layout.component.html',
    styleUrls: ['./scenario-management-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioManagementLayoutComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];
    public displayMode: 'Edit' | 'Create' = 'Create';

    econVars: fromModels.IEconomicVariable[];
    countries: fromModels.ICountry[];
    scenarios: fromModels.IScenario[];
    forecastPeriods: fromModels.IForecastPeriod[]

    public countries$: Observable<fromModels.ICountry[]>;
    public economicVariables$: Observable<fromModels.IEconomicVariable[]>;
    public forecastPeriods$: Observable<fromModels.IForecastPeriod[]>;
    public scenarios$: Observable<fromModels.IScenario[]>;
    public forecasts$: Observable<fromModels.IForecast[]>;

    constructor(private store: Store<fromStore.State>, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data) {
        this.countries$ = this.store.select(fromStore.getCountries);
        this.economicVariables$ = this.store.select(fromStore.getEconomicVariables);
        this.forecastPeriods$ = this.store.select(fromStore.getForecastPeriods);
        this.scenarios$ = this.store.select(fromStore.getScenarios);
        this.forecasts$ = this.store.select(fromStore.getForecasts);
        this.displayMode = this.data.displayMode;

        this.subscriptions.push( this.economicVariables$
            .subscribe( (econVars) => {
                if(econVars){
                    this.econVars = econVars;
                }
            } 
        ))

        this.subscriptions.push( this.countries$
            .subscribe( (countries) => {
                if(countries){
                    this.countries = countries;
                }
            }))

        this.subscriptions.push( this.scenarios$
            .subscribe( (scenarios) => {
                if(scenarios){
                    this.scenarios = scenarios;
                }
            }))

        this.subscriptions.push( this.forecastPeriods$
            .subscribe( (forecastPeriods) => {
                if(forecastPeriods){
                    this.forecastPeriods = forecastPeriods
                }
            }))
    }

    ngOnInit(){
        this.store.dispatch(fromStore.loadCountries())
        this.store.dispatch(fromStore.loadEconomicVariables())
        this.store.dispatch(fromStore.loadScenarios())
        this.store.dispatch(fromStore.loadCountryForecastPeriods())
        this.store.dispatch(fromStore.loadAggregatedForecast())
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            if (subscription) { 
                subscription.unsubscribe();
            }
        });
    }
    
    /* =========== UPDATES =========== */

    handleCountryUpdate(payload: fromModels.ICountryUpdateReq){
        this.store.dispatch(fromStore.updateCountry(payload))
    }

    handleEconomicVariableUpdate(payload: fromModels.IEconomicVariableUpdateReq){
        this.store.dispatch(fromStore.updateEconomicVariable(payload))
    }

    handleForecastPeriodUpdate(payload: fromModels.IForecastPeriodUpdateReq){
        this.store.dispatch(fromStore.updateCountryForecastPeriod(payload))
    }

    handleScenarioUpdate(payload: fromModels.IScenarioUpdateReq){
        this.store.dispatch(fromStore.updateScenario(payload))
    }
    
    handleForecastUpdate(payload: fromModels.IForecastUpdateReq){
        this.store.dispatch(fromStore.updateAggregatedForecast(payload))
    }

    /* =========== ADD ITEMS =========== */

    addEconomicVariable(){
        const dialogRef = this.dialog.open(ScenarioManagementEconvarDialogViewer, {
            data: {
                countries: this.countries
            }
        });
    }

    addForecastPeriod(){
        this.dialog.open(ScenarioManagementForecastPeriodDialogViewer, {
            data: {
                econVars: this.econVars,
            }
        })
    }

    addScenario(){
        this.dialog.open(ScenarioManagementScenarioDialogViewer, {
            data: {
                countries: this.countries
            }
        })
    }

    addForecast(){
        this.dialog.open(ScenarioManagementForecastDialogViewer, {
            data: {
                scenarios: this.scenarios,
                forecastPeriods: this.forecastPeriods
            }
        })
    }


    showConfirmCloseDialog(){
        const dialogRef = this.dialog.open(ScenarioManagementConfirmCloseDialog);
    }

}
