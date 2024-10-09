
import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import moment from 'moment';
import * as fromModels from './../../models/asset_targets.models';

@Component({
    selector: 'app-asset-targets-grid-layout',
    templateUrl: './asset_targets-grid-layout.component.html',
    styleUrls: ['./asset_targets-grid-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetTargetsGridLayoutComponent implements OnChanges {

    @Input() params: fromModels.IAssetTargetsParam;
    @Input() mode: 'Live' | 'Historical';
    @Input() assetType: 'fv' | 'st';

    @Input() initLoadComplete: boolean;

    @Input() assetTargets: any;
    @Input() assetTargetsLoading: boolean;
    @Input() assetTargetsLoaded: boolean;
    @Input() assetTargetsError: string;

    @Input() scenarioList: any;

    @Input() assetTargetTimeseries: any;
    @Input() assetTargetTimeseriesLoading: boolean;
    @Input() assetTargetTimeseriesLoaded: boolean;
    @Input() assetTargetTimeseriesError: string;

    @Input() overridenValues: any;
    @Input() initAssetCalculatorInputs: fromModels.ICalculatorInput[];
    @Input() editedAssetCalculatorInputs: fromModels.ICalculatorInput[];
    @Input() assetCalculatorInputs: fromModels.ICalculatorInput[];

    loadBuffer: boolean = false;
    showSpinner: boolean = false;
    showHistoricalWarning: boolean = false;

    constructor() {
    }

    ngOnChanges(changes): void {

        if(changes && changes.params && changes.params.currentValue){
            this.showHistoricalWarning = (moment(this.params.asOfDate).diff(new Date(), 'days') >= 0 && this.mode === 'Historical');
        }

        if(changes && changes.assetType && changes.assetType.currentValue !== changes.assetType.previousValue){
            this.loadBuffer = true;
            this.showHistoricalWarning = (moment(this.params.asOfDate).diff(new Date(), 'days') >= 0 && this.mode === 'Historical');
        } else {
            this.loadBuffer = false;
        }

        if(changes && changes.mode && (changes.mode.currentValue !== changes.mode.previousValue)){
            this.showSpinner = true;
        }

        if(changes && changes.assetTargets){
            this.showSpinner = false;
        }

    }
}