import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-fund-capitals-input',
    templateUrl: './fund-capitals-input.component.html',
    styleUrls: ['./fund-capitals-input.component.scss']
})
export class FundCapitalsInputComponent implements OnInit {

    @Input() fundCap: any[];
    @Input() podCap: any[];
    @Input() podCapMatrix: any[];

    constructor() { }

    ngOnInit(): void { }
}
