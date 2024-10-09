import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';

import * as fromModels from './../../models/daily-tracking.models';

export class TreeNode {
    item: string;
    displayName: string;
    children: TreeNode[];
}

export class FlatNode { 
    item: string;
    displayName: string;
    level: number;
    expandable: boolean;
}

@Injectable()
export class TreeNodeDatabase {

    dataChange = new BehaviorSubject<TreeNode[]>([]);

    get data(): TreeNode[] { return this.dataChange.value; }

    constructor() { 
    }

    initialize(treeData: any) { 
        const data = this._build_file_tree(treeData, 0);
        this.dataChange.next(data);
    }

    private _build_file_tree(data: {[key: string]: any}, level: number): TreeNode[] { 
        return Object.keys(data).reduce<TreeNode[]>((acc, key) => {
            const value = data[key];
            const node = new TreeNode();
            node.item = key;
            node.displayName = key;
            if (value !== null) { 
                if (typeof value === 'object') {
                    node.children = this._build_file_tree(value, level+1);
                } else {
                    node.item = value;
                    const nameParts = value.split(':');
                    node.displayName = nameParts[nameParts.length - 1];
                }
            }
            return acc.concat(node);
        }, []);
    }
}

@Component({
    selector: 'app-tracking-timeseries-selector',
    templateUrl: './timeseries-selector.component.html',
    styleUrls: ['./timeseries-selector.component.scss'],
    providers: [TreeNodeDatabase]
})
export class MBSTimeseriesSelectorComponent implements OnInit, OnChanges {

    @Input() request: fromModels.IntradayRequest;
    @Input() metaData: fromModels.IntradayMetaData;

    @Input() loading: boolean;
    @Input() loaded: boolean;
    @Input() error: string;

    public flatNodeMap = new Map<FlatNode, TreeNode>()
    public nestedNodeMap = new Map<TreeNode, FlatNode>();

    public selectedParent: FlatNode | null = null;


    public treeControl: FlatTreeControl<FlatNode>;
    public treeFlattener: MatTreeFlattener<TreeNode, FlatNode>;
    public dataSource: MatTreeFlatDataSource<TreeNode, FlatNode>;

    public checklistSelection: SelectionModel<FlatNode> = new SelectionModel<FlatNode>(true);

    constructor(private _database: TreeNodeDatabase) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        _database.dataChange.subscribe(data => {
            this.dataSource.data = data;
        });
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.metaData && changes.metaData.currentValue) { 
            this._database.initialize(changes.metaData.currentValue.hierarchy);
        }
        if (changes && changes.request && changes.request.currentValue) { 
            if (changes.request.currentValue.expressions.length > 0) {
                const selectedExpressions: string[] = changes.request.currentValue.expressions;                
                this.treeControl.dataNodes.forEach((node) => {
                    if (selectedExpressions.indexOf(node.item) >= 0) {
                        this.todoItemSelectionToggle(node);
                        this.treeControl.expand(node);
                    }
                })
            }
        }
    }

    public getLevel = (node: FlatNode) => node.level;

    public isExpandable = (node: FlatNode) => node.expandable;

    public getChildren = (node: TreeNode): TreeNode[] => node.children;

    public hasChild = (_: number, _nodeData: FlatNode) => _nodeData.expandable;

    public hasNoContent = (_: number, _nodeData: FlatNode) => _nodeData.item === '';

    /**
    * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
    */
    public transformer = (node: TreeNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.item === node.item
            ? existingNode
            : new FlatNode();
        flatNode.item = node.item;
        flatNode.displayName = node.displayName;
        flatNode.level = level;
        flatNode.expandable = !!node.children;            
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    }

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: FlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        return descAllSelected;
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: FlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: FlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        this.checkAllParentsSelection(node);
    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: FlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: FlatNode): void {
        let parent: FlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: FlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    /* Get the parent node of a node */
    getParentNode(node: FlatNode): FlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }
}


