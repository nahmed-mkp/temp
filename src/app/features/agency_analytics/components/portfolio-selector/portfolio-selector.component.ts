import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild } from '@angular/core';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import * as fromModels from './../../models/agency-analytics.models';


@Component({
    selector: 'app-agency-portfolio-selector',
    templateUrl: './portfolio-selector.component.html',
    styleUrls: ['./portfolio-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioSelectorComponent implements OnInit, OnChanges {
    
    @Input() portfolios: fromModels.IPortfolio[];
    @Input() expandedNodePaths: string[];

    @Input() portfoliosLoading: boolean;
    @Input() portfoliosLoaded: boolean;
    @Input() portfoliosError: string;

    @Input() portfolioTree: fromModels.TreeNode[];
    @Output() loadPortfolio: EventEmitter<fromModels.IPortfolio> = new EventEmitter<fromModels.IPortfolio>();
    @Output() deletePortfolio: EventEmitter<fromModels.IPortfolio> = new EventEmitter<fromModels.IPortfolio>();

    @Output() expandNode: EventEmitter<fromModels.TreeNode> = new EventEmitter<fromModels.TreeNode>();
    @Output() collapseNode: EventEmitter<fromModels.TreeNode> = new EventEmitter<fromModels.TreeNode>();


    treeControl = new NestedTreeControl<fromModels.TreeNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<fromModels.TreeNode>();

    public filteredPortfolios: fromModels.IPortfolio[] = [];
    public searchTerm: string = null;

    private KEY_CODE_ENTER = 13;
    private KEY_CODE_DOWN = 40;
    private KEY_CODE_UP = 38;

    public displayedColumns: string[] = ['inputName', 'identifier', 'securityType'];
    
    constructor() {        
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.portfolioTree && changes.portfolioTree.currentValue) { 
            this.dataSource.data = changes.portfolioTree.currentValue;
            this.treeControl.dataNodes = changes.portfolioTree.currentValue;
            if (this.treeControl.dataNodes.length > 0) {
                this.treeControl.dataNodes.forEach((node) => {
                    this.updateExpansionStateRecursively(node, true);
                })
                
            }
        }
    }

    onFilterPortfolio(e: any): void {
        this.searchTerm = (e.target.value as string).toLowerCase();
        const code = e.keyCode;

        if (code === this.KEY_CODE_DOWN || code === this.KEY_CODE_UP || code === this.KEY_CODE_ENTER) {
            e.stopPropagation();
            return;
        }

        this.filteredPortfolios = this.portfolios.filter((portfolio) => {
            if (portfolio.name.toLowerCase().includes(this.searchTerm)) {
                return true;
            } else {
                let result = false;
                portfolio.securities.forEach((security) => {
                    const cusip = security.identifier ? security.identifier.toLowerCase() : '';
                    const inputName = security.inputName ? security.inputName.toLowerCase() : '';
                    const name = security.name ? security.name.toLowerCase() : '';
                    if (cusip.includes(this.searchTerm) || inputName.includes(this.searchTerm) || name.includes(this.searchTerm)) {
                        result = true;
                        return;
                    }
                });
                return result;
            }
        });
    }

    onLoadPortfolio(portfolio: fromModels.IPortfolio): void {
        if (portfolio) {
            this.loadPortfolio.emit(portfolio);
        }
    }

    onEditPortfolio(portfolio: fromModels.IPortfolio): void {

    }

    onDeletePortfolio(portfolio: fromModels.IPortfolio): void {
        if (portfolio) { 
            this.deletePortfolio.emit(portfolio);
        }
    }

    hasChild = (_: number, node: fromModels.TreeNode) => !!node.children && node.children.length > 0;

    isSearching(): boolean {
        return this.searchTerm === null || this.searchTerm === '';
    }

    toggleExpansionState(node: fromModels.TreeNode): void {
        if (this.expandedNodePaths.indexOf(node.treePath) >= 0) { 
            this.collapseNode.emit(node);
        } else {
            this.expandNode.emit(node);
        }
    }

    updateExpansionStateRecursively(node: fromModels.TreeNode, override: boolean): void {
        if (node) { 
            if (override) {
                this.treeControl.expand(node);
            }
            if (node.children) { 
                node.children.forEach((child) => {
                    this.updateExpansionStateRecursively(child, child.expanded);
                });
            }
        }
    }
}
