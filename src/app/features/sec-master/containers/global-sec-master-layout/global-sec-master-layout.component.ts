import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models';

@Component({
  selector: 'app-global-sec-master-layout',
  templateUrl: './global-sec-master-layout.component.html',
  styleUrls: ['./global-sec-master-layout.component.scss']
})
export class GlobalSecMasterLayoutComponent implements OnInit {

  constructor(private store: Store<fromStore.SecurityMasterState>) { }

  ngOnInit() {
  }

}
