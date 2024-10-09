import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as fromModels from '../../models/index';
import { SelectionChangedEvent } from 'ag-grid-community';
import { MatCheckboxChange } from '@angular/material/checkbox';



@Component({
    selector: 'app-tree-navigation-pane',
    templateUrl: './tree-navigation-pane.component.html',
    styleUrls: ['./tree-navigation-pane.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNavigationPaneComponent implements OnChanges {

    @Input() paneData: any[];
    @Input() activePathArr:any [];
    @Input() constructedHierarchy: any[];
    @Input() selectedData: any[];
    
    @Output() onTimeseriesSelect : EventEmitter<fromModels.TimeseriesSelectionPayload> = new EventEmitter<fromModels.TimeseriesSelectionPayload>();
    @Output() overwriteConstructedHierarchy: EventEmitter<any> = new EventEmitter<any>();
    @Output() overwriteActiveArr: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {

    }

    onClick(item: fromModels.TimeseriesNode){

        if(item.catalogLevel !== 'Market Data'){
            // If clicking something that's already active, ignore 
            if(!this.activePathArr.includes(item.catalogId)){    
            
                let itemId: number = item.catalogId;
                let parentId: number = item.parentCatalogId;
            
                let newActivePathArr: number[] = [...this.activePathArr];
                let newConstructedHierarchy: fromModels.TimeseriesNode[][] = [...this.constructedHierarchy];

                // If root item selection is changed
                if(parentId === -1){

                    newActivePathArr = [itemId];
                    newConstructedHierarchy = [newConstructedHierarchy[0]];
                    
                    let rootItem: fromModels.TimeseriesNode = newConstructedHierarchy[0].find( (el: fromModels.TimeseriesNode) => el.catalogId === itemId);
                    if(rootItem.children){
                        newConstructedHierarchy.push(rootItem.children);
                    } 
                } 

                // else
                if(this.activePathArr.includes(parentId)){        
                    // trim down active path array until reaching parent level .. then push itemId
                    while(newActivePathArr[newActivePathArr.length -1] !== parentId){
                        newActivePathArr.pop();
                        newConstructedHierarchy.pop();
                    }
                    newActivePathArr.push(itemId);
                    let newChildren: fromModels.TimeseriesNode[] = newConstructedHierarchy[newConstructedHierarchy.length -1].find( (el: fromModels.TimeseriesNode) => el.catalogId === itemId).children;
                    newConstructedHierarchy.push(newChildren)
                }

                this.overwriteActiveArr.emit(newActivePathArr);
                this.overwriteConstructedHierarchy.emit(newConstructedHierarchy);
            }
        }
    }

    onSelect(event: MatCheckboxChange, item: fromModels.TimeseriesNode){
        let payload: fromModels.TimeseriesSelectionPayload = {
            label: item.absolutePath,
            alias: null,
            id: item.catalogId,
            timeseriesId: item.timeseriesId,
            isSelected: event.checked,
            isChecked: true,
            axis: 'auto'
        }
        this.onTimeseriesSelect.emit(payload)
    }

    checkIfActive(item: fromModels.TimeseriesNode){
        return this.activePathArr.includes(item.catalogId)
    }
    
    checkIsLeaf(item: fromModels.TimeseriesNode){
        return item.catalogLevel === 'Market Data'
    }

    isMarketData(item: fromModels.TimeseriesNode){
        return item.catalogLevel === 'Market Data';
    }

    isSelected(node: fromModels.TimeseriesNode){
        let isSelected: boolean = false;
 
        if(this.selectedData && this.selectedData.length > 0){
            this.selectedData.map( item => {
                if(item.id === node.catalogId){
                    isSelected = true;
                }
            })
        }
        return isSelected;
    }

}
