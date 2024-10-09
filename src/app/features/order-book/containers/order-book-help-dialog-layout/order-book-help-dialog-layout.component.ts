import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-order-book-help-dialog-layout',
  templateUrl: './order-book-help-dialog-layout.component.html',
  styleUrls: ['./order-book-help-dialog-layout.component.scss']
})
export class OrderBookHelpDialogLayoutComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<OrderBookHelpDialogLayoutComponent>
  ) { }

  ngOnInit() {}

  onClose() {
    this.dialogRef.close();
  }

}
