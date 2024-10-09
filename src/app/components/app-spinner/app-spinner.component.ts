import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

// import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as moment from 'moment';


@Component({
  selector: 'app-spinner',
  template: `
    <div class="drip" *ngIf="spinnerType === 'drip'"></div>

    <div class="loader" *ngIf="spinnerType === 'animated'">
        <span class="dot dot_1"></span>
        <span class="dot dot_2"></span>
        <span class="dot dot_3"></span>
        <span class="dot dot_4"></span>
    </div>

    <div class="container" *ngIf="spinnerType === 'helix'">
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
    </div>

    <div class="loader" *ngIf="spinnerType == 'steps'">
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__ball"></div>
    </div>

  `,
  styleUrls: ['./app-spinner.component.scss']
})
export class AppSpinnerComponent {

  @Input() spinnerType: string;

  constructor() {
    this.spinnerType = 'steps';
  }

}
