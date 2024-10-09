import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { ActVsProjSummaryComponent } from './act-vs-proj-summary.component';

import { IBond } from '../../../../models/renderer.models';

@Component({
    template: `<button mat-raised-button (click)="showSummary()">...</button>`
})
export class ActVsProjSummaryRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public bond: IBond[] = [];
    public summary: any[] = [];

    // private DELINQUENCY_LABEL_MAP = {
    //     '30 Days': ['del30Days'],
    //     '60 Days': ['del60Days'] ,
    //     '90+ Days': ['del90PlusDays'] ,
    //     '120+ Days': ['del120PlusDays'] ,
    //     '4-20 Months': ['fourToTwentyMonth'],
    //     '20+ Months': ['twentyOneMonth', 'twentyTwoMonth', 'twentyThreeMonthPlus'],
    //     'Trial Payment Plan': ['trialPaymentPlan']
    // };

    constructor(private dialog: MatDialog) { }

    refresh(params: any): boolean {
       return true;
    }
    
    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    }

    agInit(params: any): void {
        this.params = params;
        this.bond = params.bond || null;
        this.summary = params.summary || null;

        // Object.keys(this.DELINQUENCY_LABEL_MAP).forEach((key) => {
        //     let total = 0;
        //     const dqs = this.DELINQUENCY_LABEL_MAP[key].forEach((dq) => {
        //         if (this.params.delinquencies) { 
        //             if (dq in this.params.delinquencies) {
        //                 total += this.params.delinquencies[dq]['percent'];
        //             }
        //         }
        //     });
        //     this.delinquencies.push({'delinquencyType': key, 'percent': total});
        // });
    }

    showSummary(): void {
        this.dialog.open(ActVsProjSummaryComponent, {
            panelClass: ['event-analysis-pop-up-panel', 'tool-bar-border-radius'],
            hasBackdrop: true,
            data: { 'summary': this.summary, 'bond': this.bond },
            width: '40rem',
            height: '32rem'
        });
    }
}
