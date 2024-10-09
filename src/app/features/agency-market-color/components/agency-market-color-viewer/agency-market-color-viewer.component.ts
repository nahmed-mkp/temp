import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-agency-market-color-viewer',
  templateUrl: './agency-market-color-viewer.component.html',
  styleUrls: ['./agency-market-color-viewer.component.scss']
})
export class AgencyMarketColorViewerComponent implements OnInit {

  public Highcharts = Highcharts;
  public option = {
    chart: {
      type: 'scatter',
      zooming:{
        type: 'xy'
      },
      events: {
        load: (params) => {
          console.log('foo', params);
            let chart = params.target;
            let xAxis = chart['xAxis'][0];
            let yAxis = chart['yAxis'][0];
            let extremes = yAxis.getExtremes();
            let crossing = Math.abs(extremes.min) + Math.abs(extremes.max);
            let offset = yAxis.toPixels(crossing, true);
            xAxis.update({
                  offset: offset
            });
        }
      }
    },

    xAxis: {
      tickmarkPlacement: 'on',
      lineColor: 'black',      
      labels: {
        overflow: 'justify',
        style: {
          fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
          color: 'black',
          fontWeight: '600',
          fontSize: '11.4px'
        },
      },
      zeroCrossing: true
    },
    title: {text: 'Agency Market Color'},
    legend: {
      enabled: true,
      align: 'left',
      layout: 'horizontal',
      verticalAlign: 'bottom'
    },
    tooltip: {
      split: false, 
      shared: true,
    },
    credits: {
      enabled: false
    },
  }

  public chart: any;

  private rawData = [
    {
      "Stip": "200K",
      "TbaPx": 100.73438,
      "Color": 12.5
    },
    {
      "Stip": "200K",
      "TbaPx": 100.77344,
      "Color": 11.75
    },
    {
      "Stip": "200K",
      "TbaPx": 100.67188,
      "Color": 8.5
    },
    {
      "Stip": "200K",
      "TbaPx": 100.75,
      "Color": 10
    },
    {
      "Stip": "200K",
      "TbaPx": 100.69531,
      "Color": 11.125
    },
    {
      "Stip": "200K",
      "TbaPx": 100.71094,
      "Color": 12.75
    },
    {
      "Stip": "200K",
      "TbaPx": 100.71094,
      "Color": 12.75
    },
    {
      "Stip": "200K",
      "TbaPx": 100.67969,
      "Color": 12.625
    },
    {
      "Stip": "200K",
      "TbaPx": 102.26562,
      "Color": 31.5
    },
    {
      "Stip": "200K",
      "TbaPx": 102.23438,
      "Color": 34.125
    },
    {
      "Stip": "200K",
      "TbaPx": 102.25,
      "Color": 21
    },
    {
      "Stip": "200K",
      "TbaPx": 102.27344,
      "Color": 34.625
    },
    {
      "Stip": "200K",
      "TbaPx": 102.28125,
      "Color": 35.875
    },
    {
      "Stip": "200K",
      "TbaPx": 102.21875,
      "Color": 32.5
    },
    {
      "Stip": "200K",
      "TbaPx": 102.27344,
      "Color": 33.625
    },
    {
      "Stip": "200K",
      "TbaPx": 102.24219,
      "Color": 34.625
    },
    {
      "Stip": "200K",
      "TbaPx": 102.21875,
      "Color": 27.125
    },
    {
      "Stip": "200K",
      "TbaPx": 102.22656,
      "Color": 31
    },
    {
      "Stip": "200K",
      "TbaPx": 102.21875,
      "Color": 35.125
    },
    {
      "Stip": "200K",
      "TbaPx": 102.24219,
      "Color": 35.125
    },
    {
      "Stip": "200K",
      "TbaPx": 102.1875,
      "Color": 33.125
    },
    {
      "Stip": "200K",
      "TbaPx": 102.21875,
      "Color": 23.5
    },
    {
      "Stip": "200K",
      "TbaPx": 102.20312,
      "Color": 20
    },
    {
      "Stip": "200K",
      "TbaPx": 102.21094,
      "Color": 31.125
    },
    {
      "Stip": "200K",
      "TbaPx": 103.39062,
      "Color": 50.125
    },
    {
      "Stip": "200K",
      "TbaPx": 103.38281,
      "Color": 35.125
    },
    {
      "Stip": "200K",
      "TbaPx": 103.40625,
      "Color": 54
    },
    {
      "Stip": "200K",
      "TbaPx": 103.39062,
      "Color": 54
    },
    {
      "Stip": "200K",
      "TbaPx": 103.375,
      "Color": 60.25
    },
    {
      "Stip": "200K",
      "TbaPx": 103.39453,
      "Color": 55.125
    },
    {
      "Stip": "200K",
      "TbaPx": 103.42188,
      "Color": 52.125
    },
    {
      "Stip": "200K",
      "TbaPx": 103.375,
      "Color": 43.125
    },
    {
      "Stip": "200K",
      "TbaPx": 103.38281,
      "Color": 38
    },
    {
      "Stip": "200K",
      "TbaPx": 103.66406,
      "Color": 19
    },
    {
      "Stip": "200K",
      "TbaPx": 103.35938,
      "Color": 53.5
    },
    {
      "Stip": "200K",
      "TbaPx": 103.375,
      "Color": 51
    },
    {
      "Stip": "200K",
      "TbaPx": 103.375,
      "Color": 40.5
    },
    {
      "Stip": "200K",
      "TbaPx": 104.51562,
      "Color": 65.5
    },
    {
      "Stip": "200K",
      "TbaPx": 104.5625,
      "Color": 62.875
    },
    {
      "Stip": "200K",
      "TbaPx": 104.5625,
      "Color": 60
    },
    {
      "Stip": "200K",
      "TbaPx": 104.53906,
      "Color": 75
    },
    {
      "Stip": "200K",
      "TbaPx": 104.57031,
      "Color": 96
    },
    {
      "Stip": "200K",
      "TbaPx": 104.17188,
      "Color": 37
    },
    {
      "Stip": "200K",
      "TbaPx": 105.66797,
      "Color": 65
    },
    {
      "Stip": "200K",
      "TbaPx": 105.75781,
      "Color": 59.75
    },
    {
      "Stip": "200K",
      "TbaPx": 105.69531,
      "Color": 128
    },
    {
      "Stip": "200K",
      "TbaPx": 105.69922,
      "Color": 46.125
    },
    {
      "Stip": "200K",
      "TbaPx": 105.69922,
      "Color": 52
    },
    {
      "Stip": "200K",
      "TbaPx": 104.44531,
      "Color": 34
    },
    {
      "Stip": "200K",
      "TbaPx": 105.67969,
      "Color": 58
    },
    {
      "Stip": "225K",
      "TbaPx": 100.71875,
      "Color": 7.75
    },
    {
      "Stip": "225K",
      "TbaPx": 100.69531,
      "Color": 7
    },
    {
      "Stip": "225K",
      "TbaPx": 100.69531,
      "Color": 7
    },
    {
      "Stip": "225K",
      "TbaPx": 100.71094,
      "Color": 8.25
    },
    {
      "Stip": "225K",
      "TbaPx": 100.71094,
      "Color": 7
    },
    {
      "Stip": "225K",
      "TbaPx": 102.25781,
      "Color": 23.5
    },
    {
      "Stip": "225K",
      "TbaPx": 102.26562,
      "Color": 26.125
    },
    {
      "Stip": "225K",
      "TbaPx": 102.27344,
      "Color": 25.5
    },
    {
      "Stip": "225K",
      "TbaPx": 102.25,
      "Color": 25.5
    },
    {
      "Stip": "225K",
      "TbaPx": 102.19531,
      "Color": 20
    },
    {
      "Stip": "225K",
      "TbaPx": 102.22656,
      "Color": 23.25
    },
    {
      "Stip": "225K",
      "TbaPx": 102.23438,
      "Color": 27.125
    },
    {
      "Stip": "225K",
      "TbaPx": 102.24219,
      "Color": 27.125
    },
    {
      "Stip": "225K",
      "TbaPx": 102.20312,
      "Color": 15
    },
    {
      "Stip": "225K",
      "TbaPx": 102.21094,
      "Color": 25.25
    },
    {
      "Stip": "225K",
      "TbaPx": 103.39062,
      "Color": 41.125
    },
    {
      "Stip": "225K",
      "TbaPx": 103.42188,
      "Color": 41.625
    },
    {
      "Stip": "225K",
      "TbaPx": 103.35938,
      "Color": 42.125
    },
    {
      "Stip": "225K",
      "TbaPx": 103.375,
      "Color": 29.625
    },
    {
      "Stip": "225K",
      "TbaPx": 103.375,
      "Color": 42
    },
    {
      "Stip": "225K",
      "TbaPx": 104.51562,
      "Color": 53.125
    },
    {
      "Stip": "225K",
      "TbaPx": 104.5625,
      "Color": 48.25
    },
    {
      "Stip": "225K",
      "TbaPx": 104.57031,
      "Color": 39
    },
    {
      "Stip": "225K",
      "TbaPx": 104.53906,
      "Color": 43.875
    },
    {
      "Stip": "225K",
      "TbaPx": 104.53125,
      "Color": 39
    },
    {
      "Stip": "225K",
      "TbaPx": 105.66797,
      "Color": 45.625
    },
    {
      "Stip": "FICO",
      "TbaPx": 103.40625,
      "Color": 15
    },
    {
      "Stip": "FICO",
      "TbaPx": 103.40625,
      "Color": 10
    },
    {
      "Stip": "FICO",
      "TbaPx": 104.53125,
      "Color": 15.5
    },
    {
      "Stip": "FICO",
      "TbaPx": 104.53125,
      "Color": 14
    },
    {
      "Stip": "FICO",
      "TbaPx": 105.67969,
      "Color": 14.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 100.67969,
      "Color": 19
    },
    {
      "Stip": "HLB",
      "TbaPx": 100.6875,
      "Color": 16
    },
    {
      "Stip": "HLB",
      "TbaPx": 100.77344,
      "Color": 18.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 100.69531,
      "Color": 19.5
    },
    {
      "Stip": "HLB",
      "TbaPx": 100.6875,
      "Color": 19
    },
    {
      "Stip": "HLB",
      "TbaPx": 100.6875,
      "Color": 17
    },
    {
      "Stip": "HLB",
      "TbaPx": 100.67969,
      "Color": 16
    },
    {
      "Stip": "HLB",
      "TbaPx": 100.67969,
      "Color": 11
    },
    {
      "Stip": "HLB",
      "TbaPx": 100.71094,
      "Color": 20
    },
    {
      "Stip": "HLB",
      "TbaPx": 100.71094,
      "Color": 20
    },
    {
      "Stip": "HLB",
      "TbaPx": 100.67188,
      "Color": 12
    },
    {
      "Stip": "HLB",
      "TbaPx": 101.78906,
      "Color": 5.25
    },
    {
      "Stip": "HLB",
      "TbaPx": 100.67969,
      "Color": 20.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.26562,
      "Color": 51.25
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.23438,
      "Color": 47
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.21875,
      "Color": 43.625
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.28125,
      "Color": 47.875
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.21875,
      "Color": 48
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.24219,
      "Color": 48.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.21875,
      "Color": 41.5
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.22656,
      "Color": 49.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.21875,
      "Color": 48.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.22656,
      "Color": 48.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.23438,
      "Color": 44
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.22656,
      "Color": 35.5
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.24219,
      "Color": 50.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.1875,
      "Color": 47
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.21875,
      "Color": 46
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.20312,
      "Color": 34
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.16406,
      "Color": 20.25
    },
    {
      "Stip": "HLB",
      "TbaPx": 102.21094,
      "Color": 48
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.39062,
      "Color": 78.5
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.39062,
      "Color": 80.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.40625,
      "Color": 78.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.39062,
      "Color": 78
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.63281,
      "Color": 75.375
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.42188,
      "Color": 79.5
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.39844,
      "Color": 81.5
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.375,
      "Color": 70
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.375,
      "Color": 71
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.375,
      "Color": 64.625
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.38281,
      "Color": 76.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.38281,
      "Color": 57
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.66406,
      "Color": 58
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.35938,
      "Color": 75.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.42188,
      "Color": 82.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.375,
      "Color": 78.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.64062,
      "Color": 63.5
    },
    {
      "Stip": "HLB",
      "TbaPx": 103.375,
      "Color": 62.5
    },
    {
      "Stip": "HLB",
      "TbaPx": 104.53125,
      "Color": 105.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 104.57031,
      "Color": 101
    },
    {
      "Stip": "HLB",
      "TbaPx": 104.53125,
      "Color": 97.75
    },
    {
      "Stip": "HLB",
      "TbaPx": 104.17188,
      "Color": 124.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 104.53125,
      "Color": 90
    },
    {
      "Stip": "HLB",
      "TbaPx": 104.54297,
      "Color": 90
    },
    {
      "Stip": "HLB",
      "TbaPx": 104.53125,
      "Color": 84
    },
    {
      "Stip": "HLB",
      "TbaPx": 104.17188,
      "Color": 74.5
    },
    {
      "Stip": "HLB",
      "TbaPx": 104.53125,
      "Color": 100.125
    },
    {
      "Stip": "HLB",
      "TbaPx": 104.53125,
      "Color": 98
    },
    {
      "Stip": "HLB",
      "TbaPx": 104.53125,
      "Color": 82
    },
    {
      "Stip": "HLB",
      "TbaPx": 105.66406,
      "Color": 110
    },
    {
      "Stip": "HLB",
      "TbaPx": 105.69531,
      "Color": 130.5
    },
    {
      "Stip": "HLB",
      "TbaPx": 105.75781,
      "Color": 100
    },
    {
      "Stip": "HLB",
      "TbaPx": 105.69922,
      "Color": 84.75
    },
    {
      "Stip": "HLB",
      "TbaPx": 104.44531,
      "Color": 76
    },
    // {
    //   "Stip": "HLB",
    //   "TbaPx": null,
    //   "Color": 109.688
    // },
    {
      "Stip": "HLTV",
      "TbaPx": 100.71875,
      "Color": 4
    },
    {
      "Stip": "HLTV",
      "TbaPx": 100.67188,
      "Color": 5.125
    },
    {
      "Stip": "HLTV",
      "TbaPx": 102.1875,
      "Color": 19.125
    },
    {
      "Stip": "HLTV",
      "TbaPx": 102.1875,
      "Color": 13.125
    },
    {
      "Stip": "HLTV",
      "TbaPx": 102.21094,
      "Color": 17
    },
    {
      "Stip": "HLTV",
      "TbaPx": 102.21875,
      "Color": 20.75
    },
    {
      "Stip": "HLTV",
      "TbaPx": 102.1875,
      "Color": 20.125
    },
    {
      "Stip": "HLTV",
      "TbaPx": 102.1875,
      "Color": 17.125
    },
    {
      "Stip": "HLTV",
      "TbaPx": 102.20312,
      "Color": 19.625
    },
    {
      "Stip": "HLTV",
      "TbaPx": 103.375,
      "Color": 26.75
    },
    {
      "Stip": "HLTV",
      "TbaPx": 103.35938,
      "Color": 23
    },
    {
      "Stip": "HLTV",
      "TbaPx": 103.40625,
      "Color": 22.125
    },
    {
      "Stip": "HLTV",
      "TbaPx": 103.375,
      "Color": 24
    },
    {
      "Stip": "HLTV",
      "TbaPx": 103.35938,
      "Color": 24.5
    },
    {
      "Stip": "HLTV",
      "TbaPx": 103.375,
      "Color": 24
    },
    {
      "Stip": "HLTV",
      "TbaPx": 104.53906,
      "Color": 23
    },
    {
      "Stip": "HLTV",
      "TbaPx": 104.53125,
      "Color": 26.125
    },
    {
      "Stip": "HLTV",
      "TbaPx": 104.53125,
      "Color": 24.125
    },
    {
      "Stip": "HLTV",
      "TbaPx": 104.57031,
      "Color": 24
    },
    {
      "Stip": "HLTV_95",
      "TbaPx": 100.71875,
      "Color": 5.5
    },
    {
      "Stip": "HLTV_95",
      "TbaPx": 100.67188,
      "Color": 5.5
    },
    {
      "Stip": "HLTV_95",
      "TbaPx": 102.26562,
      "Color": 21
    },
    {
      "Stip": "HLTV_95",
      "TbaPx": 102.27344,
      "Color": 16
    },
    {
      "Stip": "HLTV_95",
      "TbaPx": 103.375,
      "Color": 22
    },
    {
      "Stip": "INV",
      "TbaPx": 103.38281,
      "Color": 20.125
    },
    {
      "Stip": "INV",
      "TbaPx": 104.53125,
      "Color": 13.125
    },
    {
      "Stip": "INV",
      "TbaPx": 104.53125,
      "Color": 20
    },
    {
      "Stip": "INV",
      "TbaPx": 104.57031,
      "Color": 15
    },
    {
      "Stip": "INV",
      "TbaPx": 105.67969,
      "Color": 14.5
    },
    // {
    //   "Stip": "JUMBO",
    //   "TbaPx": null,
    //   "Color": -34
    // },
    // {
    //   "Stip": "JUMBO",
    //   "TbaPx": null,
    //   "Color": -28
    // },
    {
      "Stip": "JUMBO",
      "TbaPx": 102.27344,
      "Color": -30.375
    },
    {
      "Stip": "JUMBO",
      "TbaPx": 102.25,
      "Color": -29.375
    },
    // {
    //   "Stip": "JUMBO",
    //   "TbaPx": null,
    //   "Color": -33.25
    // },
    {
      "Stip": "JUMBO",
      "TbaPx": 103.39062,
      "Color": -44
    },
    {
      "Stip": "JUMBO",
      "TbaPx": 103.39844,
      "Color": -42
    },
    {
      "Stip": "JUMBO",
      "TbaPx": 103.41406,
      "Color": -39.5
    },
    {
      "Stip": "JUMBO",
      "TbaPx": 104.5625,
      "Color": -55.375
    },
    {
      "Stip": "JUMBO NY",
      "TbaPx": 103.375,
      "Color": -14.25
    },
    {
      "Stip": "LLB",
      "TbaPx": 100.77344,
      "Color": 29.125
    },
    {
      "Stip": "LLB",
      "TbaPx": 102.23438,
      "Color": 69.5
    },
    {
      "Stip": "LLB",
      "TbaPx": 102.28125,
      "Color": 65
    },
    {
      "Stip": "LLB",
      "TbaPx": 102.21875,
      "Color": 64
    },
    {
      "Stip": "LLB",
      "TbaPx": 102.23438,
      "Color": 50
    },
    {
      "Stip": "LLB",
      "TbaPx": 102.24219,
      "Color": 70.125
    },
    {
      "Stip": "LLB",
      "TbaPx": 103.39062,
      "Color": 116.125
    },
    {
      "Stip": "LLB",
      "TbaPx": 103.40625,
      "Color": 116.125
    },
    {
      "Stip": "LLB",
      "TbaPx": 103.39062,
      "Color": 112
    },
    {
      "Stip": "LLB",
      "TbaPx": 103.39844,
      "Color": 114.125
    },
    {
      "Stip": "LLB",
      "TbaPx": 103.38281,
      "Color": 112.125
    },
    {
      "Stip": "LLB",
      "TbaPx": 103.39062,
      "Color": 113
    },
    {
      "Stip": "LLB",
      "TbaPx": 103.66406,
      "Color": 124
    },
    {
      "Stip": "LLB",
      "TbaPx": 103.42188,
      "Color": 118
    },
    {
      "Stip": "LLB",
      "TbaPx": 103.375,
      "Color": 98.75
    },
    {
      "Stip": "LLB",
      "TbaPx": 104.17188,
      "Color": 140.125
    },
    {
      "Stip": "LLB",
      "TbaPx": 104.53125,
      "Color": 136
    },
    {
      "Stip": "LLB",
      "TbaPx": 104.53125,
      "Color": 132
    },
    {
      "Stip": "LLB",
      "TbaPx": 105.69531,
      "Color": 111
    },
    {
      "Stip": "MHLB",
      "TbaPx": 100.67969,
      "Color": 19.125
    },
    {
      "Stip": "MHLB",
      "TbaPx": 100.71094,
      "Color": 21
    },
    {
      "Stip": "MHLB",
      "TbaPx": 102.23438,
      "Color": 50.125
    },
    {
      "Stip": "MHLB",
      "TbaPx": 102.21875,
      "Color": 49.875
    },
    {
      "Stip": "MHLB",
      "TbaPx": 102.24219,
      "Color": 51.25
    },
    {
      "Stip": "MHLB",
      "TbaPx": 102.22656,
      "Color": 49.125
    },
    {
      "Stip": "MHLB",
      "TbaPx": 102.23438,
      "Color": 45
    },
    {
      "Stip": "MHLB",
      "TbaPx": 102.22656,
      "Color": 37
    },
    {
      "Stip": "MHLB",
      "TbaPx": 102.24219,
      "Color": 52.125
    },
    {
      "Stip": "MHLB",
      "TbaPx": 102.1875,
      "Color": 48.5
    },
    {
      "Stip": "MHLB",
      "TbaPx": 103.39062,
      "Color": 86
    },
    {
      "Stip": "MHLB",
      "TbaPx": 103.39844,
      "Color": 84.125
    },
    {
      "Stip": "MHLB",
      "TbaPx": 103.41406,
      "Color": 78.125
    },
    {
      "Stip": "MHLB",
      "TbaPx": 103.41406,
      "Color": 84
    },
    {
      "Stip": "MHLB",
      "TbaPx": 103.66406,
      "Color": 76.5
    },
    {
      "Stip": "MHLB",
      "TbaPx": 103.42188,
      "Color": 87.125
    },
    {
      "Stip": "MHLB",
      "TbaPx": 103.375,
      "Color": 78.5
    },
    {
      "Stip": "MHLB",
      "TbaPx": 103.375,
      "Color": 68.5
    },
    {
      "Stip": "MHLB",
      "TbaPx": 104.51562,
      "Color": 112.125
    },
    {
      "Stip": "MHLB",
      "TbaPx": 104.53906,
      "Color": 108.125
    },
    {
      "Stip": "MHLB",
      "TbaPx": 104.57031,
      "Color": 132.5
    },
    {
      "Stip": "MHLB",
      "TbaPx": 104.53125,
      "Color": 85
    },
    {
      "Stip": "MHLB",
      "TbaPx": 104.17188,
      "Color": 97
    },
    {
      "Stip": "MHLB",
      "TbaPx": 105.66406,
      "Color": 119.5
    },
    {
      "Stip": "MHLB",
      "TbaPx": 105.69922,
      "Color": 108
    },
    {
      "Stip": "MLB",
      "TbaPx": 100.67969,
      "Color": 23.5
    },
    {
      "Stip": "MLB",
      "TbaPx": 100.77344,
      "Color": 23.125
    },
    {
      "Stip": "MLB",
      "TbaPx": 100.6875,
      "Color": 23.125
    },
    {
      "Stip": "MLB",
      "TbaPx": 100.71094,
      "Color": 24.5
    },
    {
      "Stip": "MLB",
      "TbaPx": 100.67969,
      "Color": 25
    },
    {
      "Stip": "MLB",
      "TbaPx": 102.26562,
      "Color": 56.125
    },
    {
      "Stip": "MLB",
      "TbaPx": 102.23438,
      "Color": 58
    },
    {
      "Stip": "MLB",
      "TbaPx": 102.28125,
      "Color": 55.75
    },
    {
      "Stip": "MLB",
      "TbaPx": 102.21875,
      "Color": 57.125
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.1875,
      "Color": 13.625
    },
    {
      "Stip": "MLB",
      "TbaPx": 102.21875,
      "Color": 56
    },
    {
      "Stip": "MLB",
      "TbaPx": 102.22656,
      "Color": 58
    },
    {
      "Stip": "MLB",
      "TbaPx": 102.23438,
      "Color": 43
    },
    {
      "Stip": "MLB",
      "TbaPx": 102.24219,
      "Color": 60.125
    },
    {
      "Stip": "MLB",
      "TbaPx": 102.21094,
      "Color": 57
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.39062,
      "Color": 102.125
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.40625,
      "Color": 100
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.63281,
      "Color": 92.25
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.42188,
      "Color": 100
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.39844,
      "Color": 100
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.35938,
      "Color": 95
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.39844,
      "Color": 99
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.375,
      "Color": 91
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.375,
      "Color": 91
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.375,
      "Color": 87
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.38281,
      "Color": 97
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.66406,
      "Color": 103
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.42188,
      "Color": 104.125
    },
    {
      "Stip": "MLB",
      "TbaPx": 103.375,
      "Color": 82.625
    },
    {
      "Stip": "MLB",
      "TbaPx": 104.53906,
      "Color": 132.5
    },
    {
      "Stip": "MLB",
      "TbaPx": 104.53125,
      "Color": 134
    },
    {
      "Stip": "MLB",
      "TbaPx": 104.53125,
      "Color": 123
    },
    {
      "Stip": "MLB",
      "TbaPx": 104.17188,
      "Color": 93
    },
    {
      "Stip": "MLB",
      "TbaPx": 104.53906,
      "Color": 130
    },
    {
      "Stip": "MLB",
      "TbaPx": 104.53125,
      "Color": 123
    },
    {
      "Stip": "MLB",
      "TbaPx": 104.53125,
      "Color": 112
    },
    {
      "Stip": "MLB",
      "TbaPx": 104.17188,
      "Color": 115
    },
    {
      "Stip": "MLB",
      "TbaPx": 104.53125,
      "Color": 130.125
    },
    {
      "Stip": "MLB",
      "TbaPx": 104.53125,
      "Color": 125
    },
    {
      "Stip": "MLB",
      "TbaPx": 105.67578,
      "Color": 145.5
    },
    {
      "Stip": "MLB",
      "TbaPx": 104.47266,
      "Color": 126
    },
    {
      "Stip": "MLB",
      "TbaPx": 105.69922,
      "Color": 130.125
    },
    {
      "Stip": "MLB",
      "TbaPx": 104.44531,
      "Color": 141
    },
    {
      "Stip": "MLB",
      "TbaPx": 105.70312,
      "Color": 141.75
    },
    {
      "Stip": "MLB",
      "TbaPx": 105.67969,
      "Color": 140
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 98.917969,
      "Color": 0
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.76562,
      "Color": 2.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.71875,
      "Color": 31.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 101.90625,
      "Color": 4.375
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.77344,
      "Color": 1.0625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.76562,
      "Color": 31.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.76562,
      "Color": 1
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.67188,
      "Color": 30.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.76562,
      "Color": 1.75
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.70312,
      "Color": 30.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 101.64844,
      "Color": 9.375
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 101.9375,
      "Color": 3.75
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.76562,
      "Color": 1
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.76562,
      "Color": 2.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.76562,
      "Color": 31.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.71094,
      "Color": 31.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.66406,
      "Color": 1.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.71094,
      "Color": 30
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.67188,
      "Color": 0.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.69531,
      "Color": 0.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.64062,
      "Color": 14.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.67969,
      "Color": 31.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.64062,
      "Color": 0.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 101.88281,
      "Color": 3.375
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.6875,
      "Color": 31.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.66406,
      "Color": 31.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.66406,
      "Color": 30.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.66406,
      "Color": 1.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.66406,
      "Color": 0.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.71094,
      "Color": 0.75
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.70312,
      "Color": 1.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.70312,
      "Color": 1.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.70312,
      "Color": 1.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.71094,
      "Color": 31.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.71094,
      "Color": 31.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.71094,
      "Color": 30.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 101.64844,
      "Color": 7.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.6875,
      "Color": 0.375
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.6875,
      "Color": 0.0625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.6875,
      "Color": 0.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.6875,
      "Color": 0.3125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.67188,
      "Color": 1.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 100.67188,
      "Color": 1.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.28125,
      "Color": 9.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.28125,
      "Color": 9
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.25,
      "Color": 29.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.17969,
      "Color": 4.3125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.28125,
      "Color": 6.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.27344,
      "Color": 29.75
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.28125,
      "Color": 3.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.21875,
      "Color": 30.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.27344,
      "Color": 4.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.27344,
      "Color": 12
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.21875,
      "Color": 29.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.72266,
      "Color": 14.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.20312,
      "Color": 3.875
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.27344,
      "Color": 7.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.27344,
      "Color": 10.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.27344,
      "Color": 30.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.25,
      "Color": 29.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.25,
      "Color": 29.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.23438,
      "Color": 3
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.23438,
      "Color": 3.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.21094,
      "Color": 30
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.1875,
      "Color": 3.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.22656,
      "Color": 9.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.23438,
      "Color": 3.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.23438,
      "Color": 3.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.17969,
      "Color": 3.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.23438,
      "Color": 10.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.23438,
      "Color": 10.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.22656,
      "Color": 29.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.23438,
      "Color": 10
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.21094,
      "Color": 30.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.21094,
      "Color": 29.75
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.21875,
      "Color": 10.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.21875,
      "Color": 31
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.1875,
      "Color": 5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.25,
      "Color": 5.75
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.25,
      "Color": 5.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.25,
      "Color": 5.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.24219,
      "Color": 30
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.25,
      "Color": 30.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.72266,
      "Color": 12
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.21875,
      "Color": 4.4375
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.21875,
      "Color": 3.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.22656,
      "Color": 4.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.20312,
      "Color": 9.75
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 102.20312,
      "Color": 8.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.42188,
      "Color": 17.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.63281,
      "Color": 21.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.39844,
      "Color": 13
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.42188,
      "Color": 32.75
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.42188,
      "Color": 9.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.38281,
      "Color": 33.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.42188,
      "Color": 10.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.42188,
      "Color": 23
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.58594,
      "Color": 25.875
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.64062,
      "Color": 20.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.42188,
      "Color": 21.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.42188,
      "Color": 27.75
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.42188,
      "Color": 33.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.35938,
      "Color": 12
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.42188,
      "Color": 33.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.39062,
      "Color": 10
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.38281,
      "Color": 9
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.35938,
      "Color": 9.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.38281,
      "Color": 15.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.38281,
      "Color": 13
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.65625,
      "Color": 20
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.39062,
      "Color": 16.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.39062,
      "Color": 18
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.39062,
      "Color": 10
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.39062,
      "Color": 9
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.39062,
      "Color": 34.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.39062,
      "Color": 33
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.39062,
      "Color": 25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.42188,
      "Color": 15
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.41406,
      "Color": 34.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.39062,
      "Color": 11.375
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.39062,
      "Color": 8.75
    },
    // {
    //   "Stip": "NEWPROD",
    //   "TbaPx": null,
    //   "Color": 20.25
    // },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.375,
      "Color": 10.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 103.375,
      "Color": 11
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.5625,
      "Color": 22
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.5625,
      "Color": 13.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.53125,
      "Color": 12
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.53125,
      "Color": 24
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.21094,
      "Color": 27.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.5625,
      "Color": 25.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.5625,
      "Color": 27.75
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.50781,
      "Color": 12.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.54688,
      "Color": 11
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.53125,
      "Color": 9
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.53125,
      "Color": 11.625
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.53125,
      "Color": 20
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.21094,
      "Color": 26.875
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.53125,
      "Color": 15
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.53125,
      "Color": 10.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.54688,
      "Color": 25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.54688,
      "Color": 27
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.54688,
      "Color": 28
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.57031,
      "Color": 21
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.54297,
      "Color": 12
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.54297,
      "Color": 10.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.53125,
      "Color": 11.25
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.69531,
      "Color": 14
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.69531,
      "Color": 8
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.69531,
      "Color": 11
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.69531,
      "Color": 18
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 104.46875,
      "Color": 37.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.69531,
      "Color": 25.125
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.69922,
      "Color": 11.5
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.68359,
      "Color": 10
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.70703,
      "Color": 9
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.67969,
      "Color": 9.75
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.70312,
      "Color": 13
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.70312,
      "Color": 12
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.69922,
      "Color": 10
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.70312,
      "Color": 15
    },
    {
      "Stip": "NEWPROD",
      "TbaPx": 105.67969,
      "Color": 8.5
    },
    {
      "Stip": "NY",
      "TbaPx": 100.67188,
      "Color": 15.75
    },
    {
      "Stip": "NY",
      "TbaPx": 102.27344,
      "Color": 52.5
    },
    {
      "Stip": "NY",
      "TbaPx": 102.21875,
      "Color": 51.125
    },
    {
      "Stip": "NY",
      "TbaPx": 102.21875,
      "Color": 47.5
    },
    {
      "Stip": "NY",
      "TbaPx": 102.21094,
      "Color": 51.125
    },
    {
      "Stip": "NY",
      "TbaPx": 102.22656,
      "Color": 50
    },
    {
      "Stip": "NY",
      "TbaPx": 102.22656,
      "Color": 42
    },
    {
      "Stip": "NY",
      "TbaPx": 102.24219,
      "Color": 53.5
    },
    {
      "Stip": "NY",
      "TbaPx": 103.39062,
      "Color": 85.5
    },
    {
      "Stip": "NY",
      "TbaPx": 103.40625,
      "Color": 86
    },
    {
      "Stip": "NY",
      "TbaPx": 103.375,
      "Color": 90
    },
    {
      "Stip": "NY",
      "TbaPx": 103.39062,
      "Color": 84.5
    },
    {
      "Stip": "NY",
      "TbaPx": 103.40625,
      "Color": 85
    },
    {
      "Stip": "NY",
      "TbaPx": 104.53125,
      "Color": 110
    },
    {
      "Stip": "RHS",
      "TbaPx": 103.63281,
      "Color": 109.5
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.73438,
      "Color": 16.5
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.67188,
      "Color": 13.5
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.77344,
      "Color": 12.875
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.71875,
      "Color": 15
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.69531,
      "Color": 16.125
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.69531,
      "Color": 16.125
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.6875,
      "Color": 13.125
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.6875,
      "Color": 14
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.70312,
      "Color": 10.625
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.70312,
      "Color": 10.625
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.67969,
      "Color": 8
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.71094,
      "Color": 16
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.71094,
      "Color": 16
    },
    {
      "Stip": "VHLB",
      "TbaPx": 100.67188,
      "Color": 9.5
    },
    {
      "Stip": "VHLB",
      "TbaPx": 101.78906,
      "Color": 3.25
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.26562,
      "Color": 39.125
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.23438,
      "Color": 37.5
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.21875,
      "Color": 38
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.28125,
      "Color": 38.5
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.21875,
      "Color": 38
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.24219,
      "Color": 39.375
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.24219,
      "Color": 38
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.21875,
      "Color": 37.125
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.21875,
      "Color": 38.125
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.22656,
      "Color": 6.5
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.22656,
      "Color": 36.5
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.23438,
      "Color": 40
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.23438,
      "Color": 40
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.22656,
      "Color": 29.5
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.23438,
      "Color": 38.625
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.24219,
      "Color": 38.625
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.1875,
      "Color": 37
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.21875,
      "Color": 36
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.20312,
      "Color": 24.5
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.16406,
      "Color": 13.375
    },
    {
      "Stip": "VHLB",
      "TbaPx": 102.21094,
      "Color": 38.625
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.39062,
      "Color": 60.5
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.39062,
      "Color": 60.125
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.42188,
      "Color": 63
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.39062,
      "Color": 61
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.39453,
      "Color": 60.125
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.42188,
      "Color": 54.25
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.38281,
      "Color": 59
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.38281,
      "Color": 45.875
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.66406,
      "Color": 36
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.42188,
      "Color": 65.125
    },
    {
      "Stip": "VHLB",
      "TbaPx": 103.375,
      "Color": 52.5
    },
    {
      "Stip": "VHLB",
      "TbaPx": 104.53906,
      "Color": 80
    },
    {
      "Stip": "VHLB",
      "TbaPx": 104.57031,
      "Color": 72
    },
    {
      "Stip": "VHLB",
      "TbaPx": 104.57031,
      "Color": 92
    },
    {
      "Stip": "VHLB",
      "TbaPx": 104.53125,
      "Color": 65
    },
    {
      "Stip": "VHLB",
      "TbaPx": 104.17188,
      "Color": 58
    },
    {
      "Stip": "VHLB",
      "TbaPx": 104.53125,
      "Color": 74
    },
    {
      "Stip": "VHLB",
      "TbaPx": 104.53125,
      "Color": 78
    },
    {
      "Stip": "VHLB",
      "TbaPx": 105.66797,
      "Color": 77.125
    },
    {
      "Stip": "VHLB",
      "TbaPx": 105.75781,
      "Color": 74.625
    },
    {
      "Stip": "VHLB",
      "TbaPx": 104.44531,
      "Color": 64
    }
   ]
  private formatedData: any = {}

  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {
    this.rawData.forEach(dataPoint => {
      let x = dataPoint.TbaPx;
      let y = dataPoint.Color;
      if(this.formatedData[dataPoint.Stip]) {
        this.formatedData[dataPoint.Stip].data.push([x,y])
      } else {
        this.formatedData[dataPoint.Stip] = {
          name: dataPoint.Stip,
          data: [[x, y]]
        }
      }
    });

  }

  public callbackFn(chart) {
    this.chart = chart;
    Object.keys(this.formatedData).forEach(key => {
      this.formatedData[key].data.sort();
      this.chart.addSeries(this.formatedData[key]);
    })
  }

}
