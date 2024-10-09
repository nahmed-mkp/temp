import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatLegacySlideToggleChange as MatSlideToggleChange } from '@angular/material/legacy-slide-toggle';

@Component({
  selector: 'app-market-data-rates-params-toolbar',
  templateUrl: './market-data-rates-params-toolbar.component.html',
  styleUrls: ['./market-data-rates-params-toolbar.component.scss']
})
export class MarketDataRatesParamsToolbarComponent implements OnInit {

  @Input() selectedDate: Date;
  @Input() devMode: boolean;

  @Output() sendNewSelectedDate = new EventEmitter<Date>();
  @Output() setLayoutMode = new EventEmitter<string>();
  @Output() changeMode = new EventEmitter<boolean>();

  // public selectedDate: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

  public onSelectedDateChange() {
    // const newSelectedDate = this.selectedDate.toLocaleDateString().split('/').join('-');
    // console.log('newSelectedDate', newSelectedDate);
    this.sendNewSelectedDate.emit(this.selectedDate);
  }

  public onSetLayoutMode(mode: string) {
    this.setLayoutMode.emit(mode);
  }

  public onModeChange(event: MatSlideToggleChange) {
    this.changeMode.emit(event.checked);
  }

}
