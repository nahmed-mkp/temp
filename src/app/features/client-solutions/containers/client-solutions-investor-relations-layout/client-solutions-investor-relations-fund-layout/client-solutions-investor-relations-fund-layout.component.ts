import { Component, OnInit, HostBinding, OnChanges, SimpleChanges, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-solutions-investor-relations-fund-layout',
  templateUrl: './client-solutions-investor-relations-fund-layout.component.html',
  styleUrls: ['./client-solutions-investor-relations-fund-layout.component.scss'],
})

export class ClientSolutionsInvestorRelationsFundLayoutComponent {


  @Input() fundAumBalances: any[];
  @Input() fundTop10List: any[];
  @Input() fundInvestorTypes: any[];
  @Input() fundRegions: any[];


  constructor(private store: Store<fromStore.State>) {
  }


}
