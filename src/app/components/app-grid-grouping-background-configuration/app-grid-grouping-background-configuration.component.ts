import { Component, OnInit, Inject, HostBinding, ChangeDetectorRef } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AppCustomColorPickerComponent } from '../app-custom-color-picker/app-custom-color-picker.component';

@Component({
  selector: 'app-grid-grouping-background-configuration',
  templateUrl: './app-grid-grouping-background-configuration.component.html',
  styleUrls: ['./app-grid-grouping-background-configuration.component.scss']
})
export class AppGridGroupingBackgroundConfigurationComponent implements OnInit {

  @HostBinding('class') class = 'vertical-flex-full-height';

  private dialogRefColorPicker: MatDialogRef<AppCustomColorPickerComponent>;
  public groupingBackgroundData: any;

  constructor(public dialogRef: MatDialogRef<AppGridGroupingBackgroundConfigurationComponent>,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.groupingBackgroundData = this.data.customStyle;
  }

  public onCloseClick(event) {
    if (event === 'apply') {
      this.dialogRef.close(this.groupingBackgroundData);
    } else {
      this.dialogRef.close();
    }
  }

  public onSelectedColor(result, index) {
    // item.color = color;
    this.groupingBackgroundData[index].color = this._convertRgbaToHex(result.color.rgb);
    this.groupingBackgroundData = [...this.groupingBackgroundData];
    this.ref.markForCheck();
  }

  public onReset() {
    this.groupingBackgroundData = this.data.defaultStyle;
  }

  private _convertRgbaToHex(rgba: any): string {

    let {r, g, b, a} = rgba;

    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = Math.round(a * 255).toString(16);

    if (r.length === 1) {
      r = '0' + r;
    }

    if (g.length === 1) {
      g = '0' + g;
    }

    if (b.length === 1) {
      b = '0' + b;
    }

    if (a.length === 1) {
      a = '0' + a;
    }
    return '#' + r + g + b + a;
  }

}
