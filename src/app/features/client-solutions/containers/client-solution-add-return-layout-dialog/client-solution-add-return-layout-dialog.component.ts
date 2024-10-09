import { Component, OnInit, Inject, Output, EventEmitter, HostBinding } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-solution-add-return-layout-dialog',
  templateUrl: './client-solution-add-return-layout-dialog.component.html',
  styleUrls: ['./client-solution-add-return-layout-dialog.component.scss']
})
export class ClientSolutionAddReturnLayoutDialogComponent implements OnInit {

  @HostBinding('class') classes = 'vertical-flex-full-height';
  @Output() onFundReturnSave: EventEmitter<fromModels.IFundReturn> = new EventEmitter<fromModels.IFundReturn>();

  public fundReturnSaving$: Observable<boolean>;
  public fundReturnSaved$: Observable<boolean>;

  public fundReturn: fromModels.IFundReturn = {
    year: (new Date()).getFullYear(),
    month: (new Date()).getMonth(),
    return: 0,
    isEstimated: false
  }

  public monthsOfYear: any = [
    { name: 'January', value: 1 }
    , { name: 'February', value: 2 }
    , { name: 'March', value: 3 }
    , { name: 'April', value: 4 }
    , { name: 'May', value: 5 }
    , { name: 'June', value: 6 }
    , { name: 'July', value: 7 }
    , { name: 'August', value: 8 }
    , { name: 'September', value: 9 }
    , { name: 'October', value: 10 }
    , { name: 'November', value: 11 }
    , { name: 'December', value: 12 }
  ];

  public listOfYears: any = this._getListOfYears();

  public percentageFormControl = new UntypedFormControl('' , [Validators.required, Validators.min(-100), Validators.max(100)]);

  constructor(
    private store: Store<fromStore.State>,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ClientSolutionAddReturnLayoutDialogComponent>
  ) { }

  ngOnInit() {
    this.fundReturnSaving$ = this.store.select(fromStore.getFundReturnSaving);
    this.fundReturnSaved$ = this.store.select(fromStore.getFundReturnSaved);
  }

  public onCloseClick() {
    this.dialogRef.close();
  }

  public onSaveFundReturn(): void {
    this.store.dispatch(new fromStore.SaveFundReturns(this.fundReturn));
    // this.onFundReturnSave.emit(this.fundReturn);
  }


  // Utility -------------------------------------------------------------

  _getListOfYears(): any {
    const currentYear: number = new Date().getFullYear() + 1;
    const listOfYears: any = [];
    let year = currentYear;
    while (year >= currentYear - 10) {
      listOfYears.push(year);
      year--;
    }
    return listOfYears;
  }

}
