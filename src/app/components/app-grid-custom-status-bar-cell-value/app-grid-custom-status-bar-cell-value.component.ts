import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IStatusPanelParams } from 'ag-grid-community';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-app-grid-custom-status-bar-cell-value',
  templateUrl: './app-grid-custom-status-bar-cell-value.component.html',
  styleUrls: ['./app-grid-custom-status-bar-cell-value.component.scss']
})
export class AppGridCustomStatusBarCellValueComponent implements OnInit {

  private params: IStatusPanelParams | any;
  public cellValue: any;
  public singleCellValueSubject$: Subject<number>;

  constructor(private ref: ChangeDetectorRef) {}

  agInit(params: IStatusPanelParams): void {
    this.params = params;

    if (this.params.context && this.params.context.singleCellValueSubject$) {
      this.singleCellValueSubject$ = this.params.context.singleCellValueSubject$;
    } else {
      this.singleCellValueSubject$ = new Subject<number>();
    }

    const fractionDigits = this.params && this.params.fractionDigits ? this.params.fractionDigits : 5;

    this.params.api.addEventListener('cellClicked', event => {
      if (typeof(event.value) === 'number') {
        this.cellValue = event.value.toLocaleString(undefined, { maximumFractionDigits: fractionDigits });
      } else {
        this.cellValue = null;
      }
      this.singleCellValueSubject$.next(this.cellValue);
    });
  }

  ngOnInit() {}

}
