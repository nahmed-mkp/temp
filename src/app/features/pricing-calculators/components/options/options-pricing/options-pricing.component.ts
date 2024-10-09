import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-pricer-option',
    templateUrl: './options-pricing.component.html',
    styleUrls: ['./options-pricing.component.scss']
})
export class OptionsPricingComponent implements OnInit {

    @Input() data: any;
    @Input() loading: boolean;

    constructor() { }

    ngOnInit(): void { }
}
