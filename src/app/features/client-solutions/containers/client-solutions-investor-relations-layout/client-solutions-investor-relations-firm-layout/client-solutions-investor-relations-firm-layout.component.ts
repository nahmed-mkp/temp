import { Component, OnInit, HostBinding, OnChanges, SimpleChanges, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatLegacyTabChangeEvent as MatTabChangeEvent, MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import * as fromStore from '../../../store';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';


@Component({
  selector: 'app-client-solutions-investor-relations-firm-layout',
  templateUrl: './client-solutions-investor-relations-firm-layout.component.html',
  styleUrls: ['./client-solutions-investor-relations-firm-layout.component.scss'],
})

export class ClientSolutionsInvestorRelationsFirmLayoutComponent{

  @Input() firmAumBalances: [];
  @Input() firmTop10List: [];
  @Input() firmRelationshipList: any[];
  @Input() firmInvestorTypes: any[];
  @Input() firmRegions: any[];

  public extraOption = {sizeColumnsToFit: true};

  constructor(private store: Store<fromStore.State>) {

  }

}
