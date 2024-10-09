import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rcpm-position-info-viewer',
  templateUrl: './rcpm-position-info-viewer.component.html',
  styleUrls: ['./rcpm-position-info-viewer.component.scss']
})
export class RcpmPositionInfoViewerComponent implements OnInit, OnChanges {

  @Input() positionData: any;
  @Input() positionDetail: any;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.positionDetail && changes.positionDetail.currentValue) {
      this.positionDetail['MaturityDate'] = this.positionDetail['MaturityDate'] ? new Date(this.positionDetail['MaturityDate']) : this.positionDetail['MaturityDate'];
      this.positionDetail['ExpiryDate'] = this.positionDetail['ExpiryDate'] ? new Date(this.positionDetail['ExpiryDate']) : this.positionDetail['ExpiryDate'];
      this.positionDetail['IssueDate'] = this.positionDetail['IssueDate'] ? new Date(this.positionDetail['IssueDate']) : this.positionDetail['IssueDate'];
    }
  }

  public numberFormatter(num: number, digit?: number) {
    if (typeof num === 'number') {
      return num.toLocaleString('en-US', {maximumFractionDigits: digit, minimumFractionDigits: digit});
    } else {
      return '';
    }
  }

}
