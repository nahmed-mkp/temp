import { Component, OnInit, HostBinding } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-security-master-user-activity-progress-bar',
    templateUrl: './security-master-user-activity-progress-bar.component.html',
    styleUrls: ['./security-master-user-activity-progress-bar.component.scss']
})
export class SecurityMasterUserActivityProgressBarComponent implements ICellRendererAngularComp {

    @HostBinding('class') classes = 'horizontal-flex-full-center';

    public nodeData: any;
    public currentProgress: number;

    public isProcessing: boolean;
    public isErrored: boolean;

    constructor() { }

    agInit(params: any): void {
        this.nodeData = params.node.data;

        if (this.nodeData['isProcessed'] === false && this.nodeData['isErrored'] === false) {
            this.isProcessing = true;
            this.isErrored = false;
            this.currentProgress = this._setProgressBarValue(this.nodeData);
        } else if (this.nodeData['isProcessed'] === false && this.nodeData['isErrored'] === true) {
            this.isProcessing = false;
            this.isErrored = true;
            this.currentProgress = 100;
        } else if (this.nodeData['isProcessed'] === true && this.nodeData['isErrored'] === false) {
            this.isProcessing = false;
            this.isErrored = false;
            this.currentProgress = 100;
        } else if (this.nodeData['isProcessed'] === true && this.nodeData['isErrored'] === true) {
            this.isProcessing = false;
            this.isErrored = true;
            this.currentProgress = 100;
        }
    }

    refresh(params: any): boolean {
        return false;
    }

    private _setProgressBarValue(data): number {

        let progress = 0;

        if (data['isBBGPullProcessDone'] === true) {
            progress += 20;
        } 

        if (data['isRuleProcessDone'] === true) {
            progress += 20;
        }

        if (data['pushedToCRD'] === true) {
            progress += 30;
        }

        if (data['pushedToRCPM'] === true) {
            progress += 10;
        }

        if (data['pushedToDW'] === true) {
            progress += 10;
        }

        if (data['isProcessed'] === true) {
            progress += 10;
        }
        return progress;
    }
}
