import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';


@Component({
    selector: 'app-blotter-dividend-layout',
    templateUrl: './blotter-dividend-layout.component.html',
    styleUrls: ['./blotter-dividend-layout.component.scss']
})
export class BlotterDividendLayoutComponent implements OnInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public data$: Observable<any[]>;
    public loading$: Observable<boolean>;

    constructor(private store: Store<fromStore.BlotterMasterState>) { }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getDividendInfo);
        this.loading$ = this.store.select(fromStore.getDividendInfoLoading);
    }

    onLoadData(event) {
        this.store.dispatch(new fromStore.LoadDividendInfo(event));
    }

}
