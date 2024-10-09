import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-app-error-report-payload-info',
  templateUrl: './app-error-report-payload-info.component.html',
  styleUrls: ['./app-error-report-payload-info.component.scss']
})
export class AppErrorReportPayloadInfoComponent implements OnInit {

  @Input() info: any;

  public display = false;

  constructor() { }

  ngOnInit() {
  }

}
