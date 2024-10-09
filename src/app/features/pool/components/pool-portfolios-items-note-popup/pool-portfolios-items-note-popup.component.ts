import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-pool-portfolios-items-note-popup',
  templateUrl: './pool-portfolios-items-note-popup.component.html',
  styleUrls: ['./pool-portfolios-items-note-popup.component.scss']
})
export class PoolPortfoliosItemsNotePopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PoolPortfoliosItemsNotePopupComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {}

  onCloseClick() {
    this.dialogRef.close();
  }

}
