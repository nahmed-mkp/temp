import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pricer-swaption',
    templateUrl: './swaptions-pricing.component.html',
    styleUrls: ['./swaptions-pricing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwaptionsPricingComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
