import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import * as fromModels from './../../models';

@Component({
  selector: 'app-risk-span-bucket',
  templateUrl: './risk-span-bucket.component.html',
  styleUrls: ['./risk-span-bucket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RiskSpanBucketComponent implements OnInit, OnChanges {

    @Input() bucket: fromModels.IBucketSchema;
    @Input() bucketInputFromRequest: fromModels.IInputBucket;

    @Output() addToRequest: EventEmitter<fromModels.IInputBucket> = new EventEmitter<fromModels.IInputBucket>();
    @Output() removeFromRequest: EventEmitter<fromModels.IInputBucket> = new EventEmitter<fromModels.IInputBucket>();

    @Output() valueChanged: EventEmitter<fromModels.IInputBucket> = new EventEmitter<fromModels.IInputBucket>();

    public detailMode = false;
    public include = false;
    public bucketInput: fromModels.IInputBucket;
    public mode = 'range';

    constructor() { }

    ngOnInit(): void {
      if (this.bucketInputFromRequest === undefined) {
        this.bucketInput = {
          inputName: this.bucket.name,
          inputType: '',
        };

        if (this.bucket.uiType === 'range-vector') {
          this.bucketInput.inputType = 'numeric';
          this.bucketInput.valuesMax = undefined;
          this.bucketInput.valuesMin = undefined;
          this.bucketInput.stepSize = undefined;
          this.bucketInput.values = undefined;
        } else if (this.bucket.uiType === 'dropdown-multiple') {
          this.bucketInput.inputType = 'categorical';
          this.bucketInput.values = [];
        } else if (this.bucket.uiType === 'choice-yn' || this.bucket.uiType === 'choice-ynna' || this.bucket.uiType === 'textbox') {
          this.bucketInput.value = undefined;
          this.bucketInput.inputType = 'text';
        }
      } else {
        this.include = true;
        // this.bucketInput = JSON.parse(JSON.stringify(this.bucketInputFromRequest));
      }
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes.bucketInput && changes.bucketInput.currentValue) {
        // this.bucketInput = JSON.parse(JSON.stringify(this.bucketInputFromRequest));
      }
    }

    onToggle() {
      this.detailMode = !this.detailMode;
    }

    onToggleInclude() {
      console.log('toggle include', this.include, this.bucketInput);
      if (this.include) {
        this.addToRequest.emit(this.bucketInput);
      } else {
        this.removeFromRequest.emit(this.bucketInput);
      }
    }

    onValueChange() {
      if (this.include) {
        this.valueChanged.emit(this.bucketInput);
      }
    }

    onSwitchingMode(mode) {
      this.mode = mode;
      if (mode === 'vector') {
        this.bucketInput.valuesMax = undefined;
        this.bucketInput.valuesMin = undefined;
        this.bucketInput.stepSize = undefined;
      } else {
        this.bucketInput.values = undefined;
      }
    }
}
