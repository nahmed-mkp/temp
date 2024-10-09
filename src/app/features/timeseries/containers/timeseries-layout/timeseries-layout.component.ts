import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TimeseriesDataSourceViewerComponent } from '../../components/timeseries-data-source-viewer/timeseries-data-source-viewer.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import moment from 'moment';

@Component({
    selector: 'app-timeseries-layout',
    templateUrl: './timeseries-layout.component.html',
    styleUrls: ['./timeseries-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TimeseriesLayoutComponent implements OnDestroy {

    public showChartConfig: boolean = false;
    public mode: fromModels.Mode = 'view';
    public initPortfolioGuid = null;

    public sourceMapVisibility = false;

    public timeseriesHierarchyData$: Observable<any>;
    public timeseriesHierarchyDataLoading$: Observable<any>;
    
    public importablePortfolios$: Observable<{personal: fromModels.IPortfolio[], shared: fromModels.IPortfolio[] }>;
    
    public startDate$ = new Observable<Date>();
    public endDate$ = new Observable<Date>();
    
    public tabs$ = new Observable<fromModels.ITab[]>;
    public currTab$  = new Observable<fromModels.ITab>();
    
    public drawdownData$ = new Observable<any>();
    public drawdownDataLoading$ = new Observable<boolean>();

    public selectedDrawdownTimeseries$ = new Observable<string>();
    public selectedDrawdownTimeseriesRow$ = new Observable<any>();

    public regressionData$ = new Observable<fromModels.IRegressionRes>();
    public regressionViewMode$ = new Observable<'residual' | 'actual'>();

    public curTabSubject$: BehaviorSubject<fromModels.ITab> = new BehaviorSubject(null);

    public loadPortfolioFromUrlError$ =  new Observable<string>();

    public subscriptions: Subscription[] = [];

    public SCRATCHPAD_PORTFOLIO = 'scratchpad';

    ngOnInit() {
        this.store.dispatch(fromStore.loadTimeseriesHierarchyData());
        this.store.dispatch(fromStore.loadParentCatalogData());
        this.store.dispatch(fromStore.loadImportablePortfolios());

        let url = this.route.snapshot['_routerState'].url;
        if (url.toLowerCase().endsWith(this.SCRATCHPAD_PORTFOLIO)) { 
            this.loadScratchpad();
        } else {
            var localData: fromModels.ILocalStorageItem = JSON.parse(localStorage.getItem('timeseriesStoreLite'));
            if(localData){
                this.loadDataFromLocalStorage(localData);
            } 
            if(this.initPortfolioGuid){
                this.loadDataFromURL(this.initPortfolioGuid);
            }
        }        
    }

    constructor(private store: Store<fromStore.State>, private dialog: MatDialog, private _bottomSheet: MatBottomSheet, 
        private route: ActivatedRoute, private router: Router){

        this.timeseriesHierarchyData$ = this.store.select(fromStore.getTimeseriesHierarchy);
        this.timeseriesHierarchyDataLoading$ = this.store.select(fromStore.getTimeseriesHierarchyLoading);
        
        this.importablePortfolios$ = this.store.select(fromStore.getImportableTimeseriesPortfolios);
        
        this.startDate$ = this.store.select(fromStore.getStartDate);
        this.endDate$ = this.store.select(fromStore.getEndDate);
        
        this.tabs$ = this.store.select(fromStore.getTabs);
        this.currTab$ = this.store.select(fromStore.getCurrTab);

        this.drawdownData$ = this.store.select(fromStore.getDrawdownData)
        this.drawdownDataLoading$ = this.store.select(fromStore.getDrawdownDataLoading);

        this.selectedDrawdownTimeseries$ = this.store.select(fromStore.getSelectedDrawdownTimeseries);
        this.selectedDrawdownTimeseriesRow$ = this.store.select(fromStore.getSelectedRegressionTimeseriesRow);

        this.loadPortfolioFromUrlError$ = this.store.select(fromStore.getPortfolioFromUrlFailed);
        this.initPortfolioGuid = this.route.snapshot.paramMap.get('guid');

        this.subscriptions.push(this.currTab$.subscribe(tab => {
            this.curTabSubject$.next({...tab});
        }));
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(sub => sub.unsubscribe());
        }
    }

    handleTimeseriesSelected(payload: fromModels.ITimeseries){
        if(payload.isSelected){
            this.store.dispatch(fromStore.selectTimeseriesfromNav(payload));
        } else {
            this.store.dispatch(fromStore.deleteTimeseriesFromNav(payload));
        }
    }

    onSelectedDrawdownTimeseriesChanged(ts: string){
        this.store.dispatch(fromStore.selectDrawdownTimeseries(ts))
    }

    onRegressionViewChanged(view: 'actual' | 'residual'){
        this.store.dispatch(fromStore.changeRegressionViewMode(view))
    }

    modeChangedHandler(mode: fromModels.Mode){
        this.mode = mode;
    }

    dataSourceVisibilityHandler(showDataSource: boolean){
        this._bottomSheet.open(TimeseriesDataSourceViewerComponent, {
            panelClass: 'data-source-panel'
        });
    }

    loadDataFromLocalStorage(localData: fromModels.ILocalStorageItem) {

        if(localData.startDate !== moment(new Date()).format('YYYY-MM-DD' )){
            this.store.dispatch(fromStore.updateStartDate(new Date(localData.startDate)));                
        }

        localData.portfolios.map(portfolio => {
            let newTabTemplate: fromModels.ITab = {
                portfolio: {
                    name: portfolio.name,
                    timeseries: [],
                    derivedTimeseries: [],
                    guid: portfolio.guid,
                    isShared: portfolio.isShared
                },
                chartData: [],
                chartDataLoaded: false,
                chartDataLoading: false,
                statData: [],
                statDataLoading: false,
                statDataLoaded: false,
                regressionData: {
                    expr: '',
                    mse: 0,
                    r2: 0,
                    timeseries: [],
                    observations: 0,
                    regressionPlot: null,
                    regressionLine: null,
                    curPoint: null
                },
                regressionDataLoading: false,
                regressionDataLoaded: false,
                drawdownData: { data: [], drawdown: [] },
                drawdownDataLoading: false,
                drawdownDataLoaded: false,
                regressionViewMode: 'regression',
                selectedDrawdownTimeseries:' ',
                selectedRegressionTimeseries:null
            }
                
            this.store.dispatch(fromStore.addTabFromLocalStorage(newTabTemplate));
            this.store.dispatch(fromStore.loadPortfolioDataFromLocalStorage({
                startDate: localData.startDate,
                endDate: moment().format('MM-DD-YYYY'),
                portfolio: portfolio
            }));    
        })
    }

    loadDataFromURL(guid: string){
        this.store.dispatch(fromStore.loadPortfolioFromURL(guid));
    }

    loadScratchpad() {
        this.store.dispatch(fromStore.loadPortfolioFromURL(this.SCRATCHPAD_PORTFOLIO));
    }

    clearScratchpad() { 
        this.store.dispatch(fromStore.deleteScratchpad(this.SCRATCHPAD_PORTFOLIO));
        this.loadScratchpad();
    }

    public onChangeSideScreen() {
        this.showChartConfig = !this.showChartConfig;
    }
}