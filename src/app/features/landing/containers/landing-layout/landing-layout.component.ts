import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-landing-layout',
    templateUrl: './landing-layout.component.html',
    styleUrls: ['./landing-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
