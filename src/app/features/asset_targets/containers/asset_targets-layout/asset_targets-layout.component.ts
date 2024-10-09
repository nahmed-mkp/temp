import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromModels from './../../models/asset_targets.models';

import * as fromStore from './../../store';

@Component({
    selector: 'app-asset-targets-layout',
    templateUrl: './asset_targets-layout.component.html',
    styleUrls: ['./asset_targets-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetTargetsLayoutComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    public params$: Observable<fromModels.IAssetTargetsParam>;
    public mode$: Observable<'Live' | 'Historical'>;

    public assetType$: Subscription;
    public assetType: 'fv' | 'st' = 'fv';
    
    public editorAssetTargetType$: Observable<'fv' | 'st'>;

    private loadData: any;
    private loadEditorData: any;
    
    public initLoadComplete$: Observable<boolean>;

    public userAccessLevel$: Observable<boolean>;
    public userLimitedAccessLevel$: Observable<boolean>;

    public assetTargets$: Observable<any>;
    public assetTargetsLoading$: Observable<boolean>;
    public assetTargetsLoaded$: Observable<boolean>;
    public assetTargetsError$: Observable<string>;

    public editorAssetTargets$: Observable<any>;
    public editorAssetTargetsLoading$: Observable<boolean>;
    public editorAssetTargetsLoaded$: Observable<boolean>;
    public editorAssetTargetsError$: Observable<string>;

    public assetTargetTimeseries$: Observable<any>;
    public assetTargetTimeseriesLoading$: Observable<boolean>;
    public assetTargetTimeseriesLoaded$: Observable<boolean>;
    public assetTargetTimeseriesError$: Observable<string>;

    public scenarioTargetDashboardData$: Observable<any>;
    public scenarioTargetDashboardDataLoading$: Observable<boolean>;
    public scenarioTargetDashboardDataLoaded$: Observable<boolean>;
    public scenarioTargetDashboardDataError$: Observable<string>;

    public scenarioProbabilityDashboardData$: Observable<any>;
    public scenarioProbabilityDashboardDataLoading$: Observable<boolean>;
    public scenarioProbabilityDashboardDataLoaded$: Observable<boolean>;
    public scenarioProbabilityDashboardDataError$: Observable<string>;

    public overridenValues$: Observable<any>;
    public assetCalculatorInitValues$: Observable<any>;
    public asssetCalculatorEditedValues$: Observable<any>;
    public assetCalculatorValues$: Observable<any>;

    public initCalcLoadComplete: boolean = false;

    constructor(private store: Store<fromStore.AssetTargetsState>) {
        this.params$ = this.store.select(fromStore.getAssetTargetsParams);
        this.mode$ = this.store.select(fromStore.getAssetTargetsMode);

        this.editorAssetTargetType$ = this.store.select(fromStore.getEditorAssetType);

        this.userAccessLevel$ = this.store.select(fromStore.getUserAccessLevel);
        this.userLimitedAccessLevel$ = this.store.select(fromStore.getUserLimitedAccessLevel);
        this.initLoadComplete$ = this.store.select(fromStore.getInitLoadComplete);

        this.assetTargets$ = this.store.select(fromStore.getAssetTargets);
        this.assetTargetsLoading$ = this.store.select(fromStore.getAssetTargetsLoading);
        this.assetTargetsLoaded$ = this.store.select(fromStore.getAssetTargetsLoaded);
        this.assetTargetsError$ = this.store.select(fromStore.getAssetTargetsError);

        this.editorAssetTargets$ = this.store.select(fromStore.getEditorAssetTargets);
        this.editorAssetTargetsLoading$ = this.store.select(fromStore.getEditorAssetTargetsLoading);
        this.editorAssetTargetsLoaded$ = this.store.select(fromStore.getEditorAssetTargetsLoaded);
        this.editorAssetTargetsError$ = this.store.select(fromStore.getEditorAssetTargetsError);

        this.assetTargetTimeseries$ = this.store.select(fromStore.getAssetTargetTimeseries);
        this.assetTargetTimeseriesLoading$ = this.store.select(fromStore.getAssetTargetTimeseriesLoading);
        this.assetTargetTimeseriesLoaded$ = this.store.select(fromStore.getAssetTargetTimeseriesLoaded);
        this.assetTargetTimeseriesError$ = this.store.select(fromStore.getAssetTargetTimeseriesError);

        this.scenarioTargetDashboardData$ = this.store.select(fromStore.getScenarioTargetDashboardData);
        this.scenarioProbabilityDashboardDataLoading$ = this.store.select(fromStore.getScenarioProbabilityDashboardDataLoading);
        this.scenarioTargetDashboardDataLoaded$ = this.store.select(fromStore.getScenarioProbabilityDashboardDataLoaded);
        this.scenarioTargetDashboardDataError$ = this.store.select(fromStore.getScenarioTargetDashboardDataFailed)
        
        this.scenarioProbabilityDashboardData$ = this.store.select(fromStore.getScenarioProbabilityDashboardData);
        this.scenarioProbabilityDashboardDataLoading$ = this.store.select(fromStore.getScenarioProbabilityDashboardDataLoading);
        this.scenarioProbabilityDashboardDataLoaded$ = this.store.select(fromStore.getScenarioProbabilityDashboardDataLoaded);
        this.scenarioProbabilityDashboardDataError$ = this.store.select(fromStore.getScenarioProbabilityDashboardDataFailed);

        this.overridenValues$ = this.store.select(fromStore.getOverriddenvalues);
        this.assetCalculatorInitValues$ = this.store.select(fromStore.getInitAssetCalculatorInputs);
        this.asssetCalculatorEditedValues$ = this.store.select(fromStore.getEditedAssetCalculatorInputs)
        this.assetCalculatorValues$ = this.store.select(fromStore.getAssetCalculatorInputs);

        this.subscriptions.push(this.assetType$ = this.store.select(fromStore.getAssetType)
            .subscribe( type => {
                this.assetType = type;
            })
        )

        this.subscriptions.push(this.assetTargets$
            .subscribe( (target) => {
                if(target.countries && !this.initCalcLoadComplete){
                    target.countries.map( country => {
                        this.store.dispatch(fromStore.loadCalculatorInputsByCountry(country))
                    })
                    this.initCalcLoadComplete = true;
                }
            })
        )
    }   

    ngOnInit(): void {
        this.store.dispatch(fromStore.checkUserAccess());
        this.store.dispatch(fromStore.checkUserLimitedAccess());

        this.loadData = setInterval( () => this.store.dispatch(fromStore.loadAssetTargets(this.assetType)), 15000);
        this.store.dispatch(fromStore.loadEditorAssetTargets('fv'));

        this.store.dispatch(fromStore.loadScenarioTargetDashboardData('fv'));
        this.store.dispatch(fromStore.loadScenarioProbabilityDashboardData('fv'));
    };

    ngOnDestroy(): void {
        if (this.loadData) {
            clearInterval(this.loadData);
        }
        if (this.loadEditorData) {
            clearInterval(this.loadEditorData);
        }
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(sub => sub.unsubscribe());

        }
    }

    changeShowLevels(params: fromModels.IAssetTargetsParam): void {
        this.store.dispatch(fromStore.changeShowLevel(params.showLevels));
    }

    changeType(params: fromModels.IAssetTargetsParam): void {
        clearInterval(this.loadData)
        const type = params.type;
        if (type === 'Latest') { 
            this.loadData = setInterval(() => this.store.dispatch(fromStore.loadAssetTargets(this.assetType)), 15000);
            this.store.dispatch(fromStore.loadAssetTargets(this.assetType));
            this.store.dispatch(fromStore.loadAssetTargetTimeseries({assetType: this.assetType, date: new Date()}));
        } else if (type === 'Historical') {
            this.store.dispatch(fromStore.loadHistoricalAssetTargets({ assetType: this.assetType, date: params.asOfDate}));
            this.store.dispatch(fromStore.loadAssetTargetTimeseries({ assetType: this.assetType, date: params.asOfDate}));
        } else if (type === 'Testing') { 
            this.loadData = setInterval(() => this.store.dispatch(fromStore.loadTestAssetTargets(this.assetType)), 15000);
            this.store.dispatch(fromStore.loadTestAssetTargets(this.assetType));
            this.store.dispatch(fromStore.loadAssetTargetTimeseries({ assetType: this.assetType, date: params.asOfDate}));
        }
    }

    changeAssetType(value: 'fv' | 'st'): void {
        this.store.dispatch(fromStore.changeAssetType(value));
    }

    changeDate(params: fromModels.IAssetTargetsParam): void {
        const today = new Date();        
        clearInterval(this.loadData);
        if (params.asOfDate.getFullYear() === today.getFullYear() && 
            params.asOfDate.getMonth() === today.getMonth() && 
            params.asOfDate.getDate() === today.getDate()) {
            this.loadData = setInterval(() => this.store.dispatch(fromStore.loadAssetTargets(this.assetType)), 15000);
            this.store.dispatch(fromStore.loadAssetTargets(this.assetType))
            this.store.dispatch(fromStore.loadAssetTargetTimeseries({ assetType: this.assetType, date: new Date()}));
        } else {
            this.store.dispatch(fromStore.loadHistoricalAssetTargets({ assetType: this.assetType, date: params.asOfDate}));
            this.store.dispatch(fromStore.loadAssetTargetTimeseries({ assetType: this.assetType, date: params.asOfDate}));
        }
    }
}