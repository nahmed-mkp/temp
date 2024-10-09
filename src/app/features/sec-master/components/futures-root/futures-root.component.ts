import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as fromModels from './../../models/futures-root.models';

@Component({
    selector: 'app-sec-master-future-roots',
    templateUrl: './futures-root.component.html',
    styleUrls: ['./futures-root.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuturesRootComponent implements OnInit {

    @Input() futuresRoot: fromModels.IFutureRoot[];
    @Input() futuresRootLoading: boolean;
    @Input() futuresRootLoaded: boolean;
    @Input() futuresRootError: boolean;

    @Output() addFuturesRoot: EventEmitter<fromModels.IFutureRoot> = new EventEmitter<fromModels.IFutureRoot>();
    @Output() updateFuturesRoot: EventEmitter<fromModels.IFutureRoot> = new EventEmitter<fromModels.IFutureRoot>();
    @Output() deleteFuturesRoot: EventEmitter<fromModels.IFutureRoot> = new EventEmitter<fromModels.IFutureRoot>();

    constructor() { }

    ngOnInit(): void { }
}
