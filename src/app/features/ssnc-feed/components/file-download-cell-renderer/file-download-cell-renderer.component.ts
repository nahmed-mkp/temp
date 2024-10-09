import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-ssnc-file-download-cell-renderer',
  templateUrl: './file-download-cell-renderer.component.html',
  styleUrls: ['./file-download-cell-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileDownloadCellRenderer  {

  private params: any;
    public buttonText: string;
    public isIconButton: boolean;
    public icon: string;
    public bgColor: string;
    public type: 'trade' | 'ack'

    constructor(private store: Store<fromStore.SSNCFeedState>) { }

    agInit(params: any) {
      this.params = params;
      this.buttonText = params.buttonText;
      this.isIconButton = params.isIconButton;
      this.icon = params.icon;
      this.bgColor = params.bgColor;
      this.type = params.type;
    }

    public onClick() {
      if(this.type === 'trade'){
        this.store.dispatch(fromStore.downloadTradeFile(this.params.node.data['TradeId']))
      }
      if(this.type === 'ack'){
        this.store.dispatch(fromStore.downloadAckFile(this.params.node.data['TradeId']))
      }
    }

}
 