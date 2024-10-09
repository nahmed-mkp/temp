import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
  selector: 'app-agency-portfolio-grid-layout-dialog',
  templateUrl: './agency-portfolio-grid-layout-dialog.component.html',
  styleUrls: ['./agency-portfolio-grid-layout-dialog.component.scss']
})
export class AgencyPortfolioGridLayoutDialogComponent implements OnInit {

  public layoutName: string;

  constructor(
    public dialogRef: MatDialogRef<AgencyPortfolioGridLayoutDialogComponent>,
    private store: Store<fromStore.AgencyPortfolioState>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {}

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    this.store.dispatch(new fromStore.SaveLayout({
      name: this.layoutName,
      subCategory: this.data.category,
      layoutData: this.data.columnStates
    }));
    this.onClose();
  }

  onUpdate() {
    this.store.dispatch(new fromStore.SaveLayout({
      name: this.layoutName,
      subCategory: this.data.category,
      layoutData: this.data.columnStates
    }));
    this.onClose();
  }

}
