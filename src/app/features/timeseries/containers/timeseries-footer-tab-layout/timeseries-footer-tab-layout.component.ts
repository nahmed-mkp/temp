import { Component, HostBinding, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import * as fromModels from '../../models';
import {Location} from '@angular/common'; 
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { TimeseriesNewPortfolioDialogViewerComponent } from '../../components';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TimeseriesRenameCurrPortfolioDialogViewerComponent } from '../../components/dialog-viewers/rename-curr-portfolio-dialog-viewer/rename-curr-portfolio-dialog-viewer.component';

@Component({
  selector: 'app-timeseries-footer-tab-layout',
  templateUrl: './timeseries-footer-tab-layout.component.html',
  styleUrls: ['./timeseries-footer-tab-layout.component.scss']
})
export class TimeseriesFooterTabLayoutComponent implements OnChanges {

  @ViewChild('tabs') tabGroup: MatTabGroup;
  @HostBinding('class') classes = 'vertical-flex-full-height';

  public tabIndex = 0;
  public previousTabIndex = 0;

  @Input() allTabs: fromModels.ITab[];
  @Input() currTab: fromModels.ITab;

  @Input() selectedPortfolio: fromModels.IPortfolio;
  @Input() openedPortfolios: fromModels.IPortfolio[];
  
  constructor(private store: Store<fromStore.State>,  private dialog: MatDialog, private location: Location)  {}

  ngOnChanges(changes: SimpleChanges){
    if(changes && changes.currTab && changes.currTab.currentValue){
      this.allTabs.map(tab => {
        if(tab.portfolio.name === this.currTab.portfolio.name){
          this.previousTabIndex = this.tabIndex;
          this.tabIndex = this.allTabs.indexOf(tab)
        }
      })
    }
  }

  handleTabDeletion(){
    this.store.dispatch(fromStore.deletePortfolioTab(this.currTab))
  }

  handleTabChange(e: MatTabChangeEvent){    
    // CREATE NEW TAB
    if(e.tab.textLabel === '+'){
      const importDialogRef = this.dialog.open(TimeseriesNewPortfolioDialogViewerComponent, {
        data: {
          tabs: this.allTabs,
        }
      })

      // IF DIALOG CLOSED WITHOUT ADDING NEW TAB
      .afterClosed()
      .subscribe( res => {
        if(res === undefined){  
          this.tabGroup.selectedIndex = this.previousTabIndex;
        }
      })
    } 
    
    // SWITCH TABS 
    else {
      if(this.currTab.portfolio.name !== e.tab.textLabel){
        this.store.dispatch(fromStore.switchTab(e.tab.textLabel))
      }
    }
  }

  isActiveTab(name: string){
    return this.currTab.portfolio.name === name
  }
  
  onContextMenuClick(event, guid: string){
    event.preventDefault();
    if(guid === this.currTab.portfolio.guid){
      const dialogRef = this.dialog.open(TimeseriesRenameCurrPortfolioDialogViewerComponent, {
        data: {
          portfolio: this.currTab.portfolio
        }
      })
    }
  }
}
