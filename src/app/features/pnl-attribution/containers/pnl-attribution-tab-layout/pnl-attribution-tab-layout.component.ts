import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
    selector: 'app-pnl-attribution-tab-layout',
    templateUrl: './pnl-attribution-tab-layout.component.html',
    styleUrls: ['./pnl-attribution-tab-layout.component.scss']
})
export class PnlAttributionTabLayoutComponent implements OnChanges {
    
    @ViewChild("tabGroup") tabGroup: MatTabGroup;
    
    @Input() layoutNames: string[];
    @Input() layoutEntity: any;

    public selectedIndex = 0;

    @Output() onTabChanged = new EventEmitter<string>();
    @Output() onRemoveLayout = new EventEmitter<string>();

    constructor(private store: Store<fromStore.PnlAttributionState>) { }

    ngOnChanges(changes: SimpleChanges): void {

    }

    tabChanged(event: MatTabChangeEvent) {
        this.selectedIndex = event.index;
        this.onTabChanged.emit(event.tab.textLabel);
    }

    switchActiveTabToLast(){
        this.store.dispatch(new fromStore.SetActiveLayout(this.layoutNames[this.layoutNames.length - 1]));
        this.selectedIndex = this.layoutNames.length - 1;
    }

    removeLayout(layoutName){
        this.onRemoveLayout.emit(this.layoutNames[this.selectedIndex]);
    }

}
