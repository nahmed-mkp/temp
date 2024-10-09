import { Component, OnInit, Inject, OnDestroy, Input } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { UnconfirmedTradesDialogComponent } from './../app-unconfirmed-trades-dialog/app-unconfirmed-trades-dialog.component';

@Component({
  selector: 'app-app-user-lock-condition-check-dialog',
  templateUrl: './app-user-lock-condition-check-dialog.component.html',
  styleUrls: ['./app-user-lock-condition-check-dialog.component.scss']
})
export class AppUserLockConditionCheckDialogComponent implements OnInit {

  @Input() userLockedStatus: boolean;

  @Input() unconfirmedTrades: any[];
  @Input() unconfirmedTradesLoading: boolean;
  @Input() unconfirmedTradesLoaded: boolean;
  @Input() unconfirmedTradesError: string;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {}


  showUnconfirmedTrades(): void {
    const unconfirmedDialogRef = this.dialog.open(UnconfirmedTradesDialogComponent, {
      width: '80%',
      height: '800px',
      data: {
        'unconfirmedTrades': this.unconfirmedTrades,
        'loading': this.unconfirmedTradesLoading,
        'loaded': this.unconfirmedTradesLoaded,
        'error': this.unconfirmedTradesError
      }
    });
  }

}
