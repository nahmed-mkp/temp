import { Injectable } from '@angular/core';

import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
import HC_3d from 'highcharts/highcharts-3d';

import HC_highstocks from 'highcharts/modules/stock';
import HC_map from 'highcharts/modules/map';
import HC_exporting from 'highcharts/modules/exporting';
import HC_drilldown from 'highcharts/modules/drilldown';
import HC_heatmap from 'highcharts/modules/heatmap';
import HC_pareto from 'highcharts/modules/pareto';
import HC_exportData from 'highcharts/modules/export-data';
import HC_Sankey from 'highcharts/modules/sankey';
import HC_bellcurve from 'highcharts/modules/histogram-bellcurve';
import HC_organization from 'highcharts/modules/organization';
// const HighchartsGroupedCategories = require('highcharts-grouped-categories');
// import * as AnnotationsModule from "highcharts/modules/annotations"




HC_more(Highcharts);
HC_highstocks(Highcharts);
HC_map(Highcharts);
HC_exporting(Highcharts);
HC_drilldown(Highcharts);
HC_heatmap(Highcharts);
HC_3d(Highcharts);
HC_pareto(Highcharts);
HC_bellcurve(Highcharts);
HC_Sankey(Highcharts)
HC_exportData(Highcharts);
HC_organization(Highcharts)
// AnnotationsModule(Highcharts);

// HighchartsGroupedCategories(Highcharts)

// Set Highcharts theme
Highcharts.setOptions({
    title: {
        style: {
            color: '#000',
            font: 'bold 16px "trebuchet ms", verdana, sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#666666',
            font: 'bold 12px "trebuchet ms", verdana, sans-serif'
        }
    },
    // credits: false
});

Highcharts.dateFormats.q = (timestamp): string => {
    var date = new Date(timestamp),
        quarter = (Math.floor(date.getUTCMonth() / 3) + 1);
    return quarter.toString();
};

Highcharts.dateFormats.srM = (timestamp): string => {
    let dt = new Date(timestamp);    
    let date = dt.getUTCDate();
    let year = dt.getUTCFullYear();
    let month = dt.getUTCMonth() + 1;
    
    const mm = month.toString();
    const yy = year.toString().substring(2, 4);
    return `M${mm} '${yy}`;
};

@Injectable()
export class HighchartsFactory {

    public Highcharts: any = Highcharts;
}
