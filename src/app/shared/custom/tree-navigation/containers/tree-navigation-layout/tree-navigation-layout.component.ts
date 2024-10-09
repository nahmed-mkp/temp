import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions';

@Component({
    selector: 'app-tree-navigation',
    templateUrl: './tree-navigation-layout.component.html',
    styleUrls: ['./tree-navigation-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNavigationLayoutComponent implements OnChanges {

    @Input() loading;
    @Input() rawData; 
    @Input() treeData;
    @Input() selectedData;
    
    @Output() timeseriesSelected: EventEmitter<fromModels.TimeseriesSelectionPayload> = new EventEmitter<fromModels.TimeseriesSelectionPayload>();

    public constructedHierarchy$: Observable<any[]>;
    public activePathArr$: Observable<any[]>;

    constructor(private store: Store<fromStore.State>) {
        this.constructedHierarchy$ = this.store.select(fromStore.getConstructedHierarchy);
        this.activePathArr$ = this.store.select(fromStore.getActivePathIds);
    }

    ngOnChanges(changes: SimpleChanges): void {

        if(changes && changes.rawData && changes.rawData.currentValue && changes.rawData.currentValue.length > 0 ){
            // Do not add to hierarchy if values are already present 
            this.constructedHierarchy$.pipe(take(1)).subscribe(existingHierarchy => {

                if(existingHierarchy.length === 0){
                    
                    let prevVal = changes.rawData.previousValue;
                    
                    if(prevVal === undefined || (prevVal && prevVal.length == 0)){
                        this.store.dispatch(fromActions.addToConstructedHierarchy(this.rawData))
                    }
        
                }

            })

        }
    }

    overwriteActiveArray(payload: number[]){
        this.store.dispatch(fromActions.overwriteActivePath(payload))
    }

    overwriteConstructedHierarchy(payload: fromModels.TimeseriesNode[][]){
        this.store.dispatch(fromActions.overwriteConstructedHierarchy(payload));
    }

    onTimeseriesSelect(e: fromModels.TimeseriesSelectionPayload){
        this.timeseriesSelected.emit(e)
    }

}
