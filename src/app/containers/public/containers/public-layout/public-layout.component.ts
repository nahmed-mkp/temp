import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
