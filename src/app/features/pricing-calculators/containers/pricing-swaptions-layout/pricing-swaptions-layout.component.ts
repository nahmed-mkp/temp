import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-pricer-swaption-layout',
    templateUrl: './pricing-swaptions-layout.component.html',
    styleUrls: ['./pricing-swaptions-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PricingCalculatorSwaptionsLayoutComponent implements OnInit, AfterViewInit {

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
    }
}
