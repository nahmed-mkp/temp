import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-pricing-engine-security-details-viewer',
    templateUrl: './pricing-engine-security-details-viewer.component.html',
    styleUrls: ['./pricing-engine-security-details-viewer.component.scss']
})
export class PricingEngineSecurityDetailsViewerComponent implements OnInit {

    @Input() data: any = {};
    @Input() loading: boolean;

    constructor() { }

    ngOnInit() {}
}
