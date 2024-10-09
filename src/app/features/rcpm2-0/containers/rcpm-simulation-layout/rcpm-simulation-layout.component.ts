import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromModels from './../../models/position.models';
import * as fromStore from '../../store';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import moment from 'moment';


@Component({
  selector: 'app-rcpm-simulation-layout',
  templateUrl: './rcpm-simulation-layout.component.html',
  styleUrls: ['./rcpm-simulation-layout.component.scss']
})
export class RcpmSimulationLayoutComponent implements OnChanges {

  @Input() currentDate: string;
  @Input() dataPath: fromModels.DataPath;
  @Input() layout: string;
  @Input() isOpen = false;

  public duration = 'Daily';
  public simulationData$: Observable<any[]>;
  public simulationLoading$: Observable<boolean>;
  public simulationLoaded$: Observable<boolean>;
  public simulationError$: Observable<string>;

  public mode = 'timeseries';
  public calculationMode = '$';
  public showIsSymmetric = true;
  public showToolBar = true;


  constructor(private store: Store<fromStore.RCPM2State>, private snackbar: MatSnackBar) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataPath && changes.dataPath.currentValue && this.isOpen) {
      this.loadSimulation();
    }

    if (changes.isOpen && changes.isOpen.currentValue && this.dataPath) {
      this.loadSimulation();
    }

    if (changes.layout && changes.layout.currentValue) {
      this.simulationData$ = this.store.select(fromStore.getSelectedLayoutSimuluation(), this.layout);
      this.simulationLoading$ = this.store.select(fromStore.getSelectedLayoutSimuluationLoading(), this.layout);
      this.simulationLoaded$ = this.store.select(fromStore.getSelectedLayoutSimuluationLoaded(), this.layout);
      this.simulationError$ = this.store.select(fromStore.getSelectedLayoutSimuluationError(), this.layout);
    }
  }

  loadSimulation() {
    const dataPath = Object.assign({}, this.dataPath, {layout: this.layout});

    if(this.currentDate != moment().format('MM/DD/YYYY')){
      dataPath.date = moment(this.currentDate).format('MM-DD-YYYY');
    }

    if (this.duration === 'Daily') {
      this.store.dispatch(new fromStore.LoadDailySimulations(dataPath));
    } else if (this.duration === 'Monthly') {
      this.store.dispatch(new fromStore.LoadMonthlySimulations(dataPath));
    } else if (this.duration === 'Quarterly') {
      this.store.dispatch(new fromStore.LoadQuarterlySimulations(dataPath));
    }
  }

  public onDurationChange() {
    if (this.dataPath) {
      this.loadSimulation();
    }
  }

  public copyUrl() {
    this.copyTextToClipboard(this.url);
  }

  public get url(): string {
    let result = '';
    if (this.dataPath) {
      const formatGrouping = this.dataPath.grouping.split('|').join('_');
      if (this.duration === 'Daily') {
        result = `http://prizm-map.mkpcap.com/api/v1/position/simulations/${formatGrouping}/daily/${this.dataPath.key}`;
      } else if (this.duration === 'Monthly') {
        result = `http://prizm-map.mkpcap.com/api/v1/position/simulations/${formatGrouping}/monthly/${this.dataPath.key}`;
      } else if (this.duration === 'Quarterly') {
        result = `http://prizm-map.mkpcap.com/api/v1/position/simulations/${formatGrouping}/quarterly/${this.dataPath.key}`;
      }

      if(this.currentDate != moment().format('MM/DD/YYYY')){
        result += `${moment(this.currentDate).format('MM-DD-YYYY')}`
      }
    }
    
    return result;
  }

  private copyTextToClipboard(text: string): void {

    const textArea = document.createElement('textarea');

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if the element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a
    // flash, so some of these are just precautions. However in
    // Internet Explorer the element is visible whilst the popup
    // box asking the user for permission for the web page to
    // copy to the clipboard.
    //

    // Place in the top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = '0';

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of the white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      this.snackbar.open(`Url to access this timeseries was copied to your clipboard!`, '', { duration: 3000 });
    } catch (err) {
      console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
  }

  public onToggleToolbar() {
    this.showToolBar = !this.showToolBar;
  }

}
