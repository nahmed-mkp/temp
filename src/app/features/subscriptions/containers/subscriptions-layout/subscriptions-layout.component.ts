

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-subscriptions-layout',
    templateUrl: './subscriptions-layout.component.html',
    styleUrls: ['./subscriptions-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
