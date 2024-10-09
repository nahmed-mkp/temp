import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-app-custom-color-picker',
  templateUrl: './app-custom-color-picker.component.html',
  styleUrls: ['./app-custom-color-picker.component.scss']
})
export class AppCustomColorPickerComponent implements OnInit {

  public targetColor;

  constructor(public dialogRef: MatDialogRef<AppCustomColorPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}

  onCloseClick(event) {
    if (event === 'apply') {
      this.dialogRef.close(this.targetColor);
    } else {
      this.dialogRef.close();
    }
  }

  onChangeComplete(result) {
    const hexValue = this._convertRgbaToHex(result.color.rgb);
    this.targetColor = hexValue;
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
