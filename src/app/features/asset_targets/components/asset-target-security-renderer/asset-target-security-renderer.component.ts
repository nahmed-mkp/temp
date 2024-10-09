import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

import Highcharts from 'highcharts';


@Component({
    selector: 'app-asset-target-security-cell',
    templateUrl: './asset-target-security-renderer.component.html',
    styleUrls: ['./asset-target-security-renderer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetTargetSecurityCellRendererComponent implements ICellRendererAngularComp {

    private _scenarios: any[];

    public hasOverride: boolean;
    public totalProbability: number;
    public addsToHundred: boolean;
    public security: string;

    public params: any;
    public Highcharts = Highcharts;

    constructor() {
    }

    agInit(params: any): void {
        this.params = params;
        this.security = params.data['Security'];
        this.totalProbability = 0;
        this.hasOverride = false;
        this.addsToHundred = true;

        this._scenarios = params.scenarios;

        if (params.data['Security'] === 'Probabilities') {
            let scenariosWithOverrides = [];

            const scenarios = this._scenarios.map((scenario) => scenario.ScenarioDescription);
            Object.keys(params.data).forEach(prop => {
                if (prop.endsWith('_override')) {
                    this.hasOverride = true;
                    this.totalProbability += parseFloat(params.data[prop]);
                    let overrideScenario = prop.replace('_override', '');
                    overrideScenario = overrideScenario.replace('_1', '');
                    scenariosWithOverrides.push(overrideScenario);
                }
            });

            Object.keys(params.data).forEach(prop => {
                if (scenarios.indexOf(prop) >= 0 && scenariosWithOverrides.indexOf(prop) < 0) {
                    this.totalProbability += parseFloat(params.data[prop]);
                }
            });
            
            this.addsToHundred = true;
            if (Math.abs(this.totalProbability - 1.0) > 0.01) {
                this.addsToHundred = false;
            }
        }
        return params.value;
    }

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    }

    showHistory(security: string): void {
        this.params.context.componentParent.showHistory(security);
    }    

    refresh(): boolean {
        return false;
    }
}
