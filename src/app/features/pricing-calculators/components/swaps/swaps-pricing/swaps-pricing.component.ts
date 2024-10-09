import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-pricer-swap',
    templateUrl: './swaps-pricing.component.html',
    styleUrls: ['./swaps-pricing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwapsPricingComponent implements OnInit {

    @Input() data: any;
    @Input() loading: boolean;

    constructor() { }

    ngOnInit(): void { }
}
