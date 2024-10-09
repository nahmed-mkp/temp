import { ChangeDetectionStrategy, Component, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromStore from '../../../store';
import * as fromSelectors from '../../../store/selectors';
import * as fromModels from '../../../models';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";

interface ConfigNode {
    name: string;
    guid?: string;
    children?: ConfigNode[]        
}

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

interface TransformedNode {
    expandable: boolean;
    name: string;
    level: number;
    guid: string;

}

@Component({
    selector: 'scenario-analysis-import-dialog-viewer',
    templateUrl: './scenario-analysis-import-dialog-viewer.component.html',
    styleUrls: ['./scenario-analysis-import-dialog-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ScenarioAnalysisImportDialogViewerComponent implements OnInit {

    private _transformer = (node: ConfigNode, level: number): TransformedNode => {
        return {
            expandable: !!node.children,
            name: node.name,
            level: level,
            guid: node.guid
        };
    };

    treeData: ConfigNode[] = [
        {
        name: 'Shared',
        children: []
        },
        {
        name: 'Personal',
        children: []
        },
    ];
    
    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level,
        node => node.expandable,
    );
    
    treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children,
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    sharedConfigs: any[] = [];
    userConfigs: any[] = [];
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data, 
        public dialogRef: MatDialogRef<ScenarioAnalysisImportDialogViewerComponent>,
        private store: Store<fromStore.ScenarioAnalysisState>) {
            this.data.sharedConfigs.map( config => {
                this.sharedConfigs.push({
                    name: config['Name'],
                    guid: config['guid']
                })
            })
            this.data.userConfigs.map( config => {
                this.userConfigs.push({
                    name: config['Name'],
                    guid: config['guid']
                })
            })
    
            this.treeData[0].children = this.sharedConfigs;
            this.treeData[1].children = this.userConfigs;
    
            this.dataSource.data = this.treeData
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    ngOnInit(): void {}

    changeFlyoutVisibility(){
        
    }

    clientThemeSelectionChanged(event){

    }

    handleConfigSelect(node: TransformedNode){
        this.store.dispatch(fromStore.loadScenarioByGuid(node.guid))
        this.dialogRef.close(true);
    }


}
