import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-option-chain',
    templateUrl: './option-chain.component.html',
    styleUrls: ['./option-chain.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionChainComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
