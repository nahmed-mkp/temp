import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.DailyTrackingLayoutComponent,
    data: {
      'title': 'Daily Tracking'
    }
  },
  {
    path: 'compact',
    component: fromContainers.DailyTrackingLayoutComponent,
    data: {
      'title': 'Daily Tracking (Compact)'
    }
  },
  {
    path: 'chart',
    component: fromContainers.MBSIntradayChartLayoutComponent, 
    data: {
      'title': 'Daily Tracking Intraday Chart'
    }
  },
  {
    path: 'eodchart',
    component: fromContainers.MBSHistoricalChartLayoutComponent,
    data: {
      'title': 'Daily Tracking Historical Chart'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyTrackingRoutingModule { }
