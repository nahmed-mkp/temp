import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'structured-layout',
  templateUrl: './structured-layout.component.html',
  styleUrls: ['./structured-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StructuredLayoutComponent implements OnInit {

  @Input() hideHeaderLine: boolean;

  constructor() { }

  ngOnInit() {
  }

  getShowHeaderLine() {
    if (this.hideHeaderLine) {
      return 'collapsed';
    } else {
      return 'visible';
    }
  }
}
