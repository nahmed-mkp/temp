import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-dials-set-create-dialog',
  templateUrl: './dials-set-create-dialog.component.html',
  styleUrls: ['./dials-set-create-dialog.component.scss']
})
export class DialsSetCreateDialogComponent implements OnInit {

  public newDialSetName: string

  constructor(public dialogRef: MatDialogRef<DialsSetCreateDialogComponent>) { }

  ngOnInit() {
  }

  onCloseClick($event) {
    if($event === 'save') {
      this.dialogRef.close({
        newDialSetName: this.newDialSetName
      })
    } else {
      this.dialogRef.close();
    }
  }
}
