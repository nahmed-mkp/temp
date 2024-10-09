import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-pricing-calculator-general-form',
    templateUrl: './pricing-calculator-general-form.component.html',
    styleUrls: ['./pricing-calculator-general-form.component.scss']
})
export class PricingCalculatorGeneralFormComponent implements OnInit {

    @Input() data: any;
    @Input() loading: boolean;

    constructor() { }

    ngOnInit() {
    }

}
