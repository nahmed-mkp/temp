import { Component, OnInit, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import * as fromModels from './../../models';
import * as fromStore from '../../store';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';


@Component({
    selector: 'app-rcpm-directionality-layout',
    templateUrl: './rcpm-directionality-layout.component.html',
    styleUrls: ['./rcpm-directionality-layout.component.scss']
})
export class RcpmDirectionalityLayoutComponent implements OnInit, OnChanges {

    @HostBinding('class') class = '';

    @Input() currentDate: string;
    @Input() dataPath: fromModels.DataPath;
    @Input() layout: string;
    @Input() isOpen = false;
    @Input() grouping: string[];

    public inputs$: Observable<fromModels.DirectionalityInputs>;
    public inputsLoading$: Observable<boolean>;
    public inputsLoaded$: Observable<boolean>;
    public inputsError$: Observable<string>;

    public regressionFactors$: Observable<any>;
    public regressionFactorsLoading$: Observable<boolean>;
    public regressionFactorsLoaded$: Observable<boolean>;
    public regressionFactorsError$: Observable<string>;  

    // ------------------------------------------------------------------------

    public directionality$: Observable<any>;
    public directionalityLoading$: Observable<boolean>;
    public directionalityLoaded$: Observable<boolean>;
    public directionalityError$: Observable<string>;

    public selectedLookback$: Observable<string>;
    public selectedLookbackCollection$ : Observable<string[]>;

    public directionlityScatterPlotData_lookback1$: Observable<any>;
    public directionlityScatterPlotDataLoading_lookback1$: Observable<boolean>;
    public directionlityScatterPlotDataLoaded_lookback1$: Observable<boolean>;
    public directionlityScatterPlotDataError_lookback1$: Observable<string>;

    public directionlityScatterPlotData_lookback2$: Observable<any>;
    public directionlityScatterPlotDataLoading_lookback2$: Observable<boolean>;
    public directionlityScatterPlotDataLoaded_lookback2$: Observable<boolean>;
    public directionlityScatterPlotDataError_lookback2$: Observable<string>;

    public regressionLoading$: Observable<boolean>;

    public updateTimestamp$: Observable<Date>;
    public displayMode$: Observable<string>;

    public mode: 'correlation' | 'regression' = 'correlation';
    public selectedFactor: string;
    public scatterPlotRequest: any;
    public selectedTabIndex = 0;

    // public inputsLoaded = false;

    public lookback1 = '1m lookback';
    public lookback2 = '2w lookback';

    public params: fromModels.DirectionalityRequest;

    constructor(private store: Store<fromStore.RCPM2State>) {}

    ngOnInit() {
        this.inputs$ = this.store.select(fromStore.getDirectionalityInput);
        this.inputsLoading$ = this.store.select(fromStore.getDirectionalityInputLoading);
        this.inputsLoaded$ = this.store.select(fromStore.getDirectionalityInputLoaded);
        this.inputsError$ = this.store.select(fromStore.getDirectionalityInputError);

        this.regressionFactors$ = this.store.select(fromStore.getRegressionFactors);
        this.regressionFactorsLoading$ = this.store.select(fromStore.getRegressionFactorsLoading);
        this.regressionFactorsLoaded$ = this.store.select(fromStore.getRegressionFactorsLoaded);
        this.regressionFactorsError$ = this.store.select(fromStore.getRegressionFactorsError);


        this.updateTimestamp$ = this.store.select(fromStore.getUpdateTimestampForLayout(this.layout));

        this.directionality$ = this.store.select(fromStore.getSelectedLayoutDirectionality(), this.layout);
        this.directionalityLoading$ = this.store.select(fromStore.getSelectedLayoutDirectionalityLoading(), this.layout);
        this.directionalityLoaded$ = this.store.select(fromStore.getSelectedLayoutDirectionalityLoaded(), this.layout);
        this.directionalityError$ = this.store.select(fromStore.getSelectedLayoutDirectionalityError(), this.layout);

        this.selectedLookback$ = this.store.select(fromStore.getSelectedLayoutCurrentLookback(this.layout));
        this.selectedLookbackCollection$ = this.store.select(fromStore.getSelectedLayoutLookBackCollection(this.layout));

        this.directionlityScatterPlotData_lookback1$ = this.store.select(fromStore.getSelectedLayoutScatterPlotDataWithLookback(this.layout, 'lookback1'));
        this.directionlityScatterPlotDataLoading_lookback1$ = this.store.select(fromStore.getSelectedLayoutScatterPlotDataWithLookbackLoading(this.layout, 'lookback1'));
        this.directionlityScatterPlotDataLoaded_lookback1$ = this.store.select(fromStore.getSelectedLayoutScatterPlotDataWithLookbackLoaded(this.layout, 'lookback1'));
        this.directionlityScatterPlotDataError_lookback1$ = this.store.select(fromStore.getSelectedLayoutScatterPlotDataWithLookbackError(this.layout, 'lookback1'));

        this.directionlityScatterPlotData_lookback2$ = this.store.select(fromStore.getSelectedLayoutScatterPlotDataWithLookback(this.layout, 'lookback2'));
        this.directionlityScatterPlotDataLoading_lookback2$ = this.store.select(fromStore.getSelectedLayoutScatterPlotDataWithLookbackLoading(this.layout, 'lookback2'));
        this.directionlityScatterPlotDataLoaded_lookback2$ = this.store.select(fromStore.getSelectedLayoutScatterPlotDataWithLookbackLoaded(this.layout, 'lookback2'));
        this.directionlityScatterPlotDataError_lookback2$ = this.store.select(fromStore.getSelectedLayoutScatterPlotDataWithLookbackError(this.layout, 'lookback2'));

        this.store.dispatch(new fromStore.SetDirectionalityActiveTabIndex(this.selectedTabIndex, this.layout));

        this.regressionLoading$ = this.store.select(fromStore.getRegressionLoadingFromLayout(this.layout));
        this.displayMode$ = this.store.select(fromStore.getDisplayModeForLayout(this.layout));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.isOpen) {
            // if (!this.inputsLoaded) {}
            // this.store.dispatch(new fromStore.LoadDirectionality(this.params, this.layout));
            if (changes.isOpen.currentValue === false) {
                this.class = 'created-but-hide'
            } else {
                this.class = '';
            }
        }
    }

    public loadDirectionality(params: fromModels.DirectionalityRequest) {
        this.params = params;
        this.store.dispatch(new fromStore.LoadDirectionality(params, this.layout));
    }

    public onSelectFactor(event: {data: fromModels.ScatterPlotRequest, lookback: string, factor: string}) {
        this.scatterPlotRequest = {'data': event.data, 'layout': this.layout, 'lookback': event.lookback};
        this.dispatchScatterPlotRequest(this.scatterPlotRequest);
        this.selectedFactor = event.factor;
    }

    public onLookbackChanged(selectedLookback: {'index': number, 'name': string}): void {
        if (selectedLookback.index === 0) {
            this.lookback1 = selectedLookback.name;
        } else if (selectedLookback.index === 1) {
            this.lookback2 = selectedLookback.name;
        }
    }

    public changeSelectedLookback(e: MatTabChangeEvent): void {
        this.selectedTabIndex = e.index;
        this.store.dispatch(new fromStore.SetDirectionalityActiveTabIndex(this.selectedTabIndex, this.layout));
        
        // if (e.index === 0) {
        //     if (this.lookback1 !== null || this.lookback1 !== undefined) {
        //         this.scatterPlotRequest = Object.assign({}, this.scatterPlotRequest, {'lookback': this.lookback1 });
        //         this.dispatchScatterPlotRequest(this.scatterPlotRequest);
        //     }
        // } else if (e.index === 1) {
        //     if (this.lookback2 !== null || this.lookback2 !== undefined) {
        //         this.scatterPlotRequest = Object.assign({}, this.scatterPlotRequest, { 'lookback': this.lookback2 });
        //         this.dispatchScatterPlotRequest(this.scatterPlotRequest);
        //     }
        // }
    }

    private dispatchScatterPlotRequest(request: any) {
        const lookbackIndex = this.selectedTabIndex === 0 ? 'lookback1' : 'lookback2';
        const lookback = request.lookback.replace('lookback', '').trim();
        this.store.dispatch(new fromStore.LoadScatterPlot(request.data, request.layout, lookback, lookbackIndex));
    }

    public onRunRegression(request: fromModels.regressionRequest) {
        // console.log('run regression', request);
        if (this.grouping) {
            request.grouping = this.grouping.join('|');
        }
        this.store.dispatch(new fromStore.RunRegression(request, this.layout));
    }

    public onSetGridClearingStatus(event: boolean) {
        this.store.dispatch(new fromStore.SetDirectionalityGridClearing(event, this.layout));
    }

    public onSetDisplayMode(event: string) {
        this.store.dispatch(new fromStore.SetDirectionalityDisplayMode(event, this.layout));
    }

}
