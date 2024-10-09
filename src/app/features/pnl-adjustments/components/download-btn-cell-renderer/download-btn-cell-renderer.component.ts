import { Component, OnInit, HostBinding } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { PnlAdjustmentsDownloadDialogViewerComponent } from '../download-dialog-viewer/pnl-adjustments-download-dialog-viewer.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
@Component({
    selector: 'app-pnl-adjustments-btn-cell-renderer',
    templateUrl: './download-btn-cell-renderer.component.html',
    styleUrls: ['./download-btn-cell-renderer.component.scss']
})
export class PnlDownloadButtonCellRendererComponent {

    constructor(private dialog: MatDialog){}

    public params: any;
    public attachmentsArr: string[] = [];

    agInit(params: any): void {
      this.params = params;
      let attachmentsString = params.value ? params.value : null;
      if(attachmentsString){
        this.attachmentsArr = attachmentsString.split(':');
      }
    }

    openDownloadDialog(){
      this.dialog.open(PnlAdjustmentsDownloadDialogViewerComponent, {
        width: '60rem',
        height: '30rem',
        data: { 
          attachments: this.attachmentsArr,
          rowId: this.params.data['Id']
        }
      })
    }

}
