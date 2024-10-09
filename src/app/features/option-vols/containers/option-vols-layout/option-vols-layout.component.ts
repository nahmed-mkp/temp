import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from './../../models/option-vols.models';

@Component({
    selector: 'app-option-vols-layout',
    templateUrl: './option-vols-layout.component.html',
    styleUrls: ['./option-vols-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionVolsLayoutComponent implements OnInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public supportedTickers$: Observable<string[]>;
    public supportedTickersLoading$: Observable<boolean>;
    public supportedTickersLoaded$: Observable<boolean>;
    public supportedTickersError$: Observable<string>;

    public optionChains$: Observable<any[]>;
    public optionChainsLoading$: Observable<boolean>;
    public optionChainsLoaded$: Observable<boolean>;
    public optionChainsError$: Observable<string>;

    public sizingCapitals$: Observable<fromModels.SizingCapital[]>;

    public selectedOptionVolRequestIds$: Observable<string[]>;
    public activeIndex$: Observable<number>;
    public activeIndex: number;
    public optionPricingMethod: 'strike' | 'delta' = 'delta';
    public activeRequest$: Observable<fromModels.IOptionVolRequest>;

    constructor(private store: Store<fromStore.OptionVolsState>) {

        this.supportedTickers$ = this.store.select(fromStore.getOptionChainSupportedTickers);
        this.supportedTickersLoading$ = this.store.select(fromStore.getOptionChainSupportedTickersLoading);
        this.supportedTickersLoaded$ = this.store.select(fromStore.getOptionChainSupportedTickersLoaded);
        this.supportedTickersError$ = this.store.select(fromStore.getOptionChainSupportedTickersError);

        this.optionChains$ = this.store.select(fromStore.getOptionChains);
        this.optionChainsLoading$ = this.store.select(fromStore.getOptionChainsLoadingStatus);
        this.optionChainsLoaded$ = this.store.select(fromStore.getOptionChainsLoadedStatus);
        this.optionChainsError$ = this.store.select(fromStore.getOptionChainsError);

        this.selectedOptionVolRequestIds$ = this.store.select(fromStore.getSelectedOptionVolRequestIds);
        this.activeIndex$ = this.store.select(fromStore.getActiveIndex);
        this.activeRequest$ = this.store.select(fromStore.getActiveOptionVolsAnalysisRequest);

        this.sizingCapitals$ = this.store.select(fromStore.getTradeSizingCapitalsFlat);
    }

    ngOnInit(): void { }

    public submitOptionVolsParameters(event: {request: fromModels.IOptionVolRequest, newTab: boolean}) {
        // console.log('what is my parameter', event);
        if (event.request.templateType === 'FX') {
            this.store.dispatch(new fromStore.RunFXOptionVolAnalysis(event.request));
            this.store.dispatch(new fromStore.GetOptionVolAnalysisLogs(event.request.guid));
        } else {
            this.store.dispatch(new fromStore.RunOptionVolAnalysis(event.request));
            this.store.dispatch(new fromStore.GetOptionVolAnalysisLogs(event.request.guid));
        }

        if (event.newTab) {
            this.store.dispatch(new fromStore.AddRequestId(event.request.guid));
        } else {
            this.store.dispatch(new fromStore.UpdateSelectedRequestId(event.request.guid));
        }
    }

    public removeSelectedRequestId(guid) {
        this.store.dispatch(new fromStore.DeletedSelectedRequestId(guid));
    }

    public setActiveIndex(index: number) {
        this.activeIndex = index;
        this.store.dispatch(new fromStore.SetActiveIndex(index));
    }

    public handlePricingMethodChange(e: any){
        this.optionPricingMethod = e;
    }
}
