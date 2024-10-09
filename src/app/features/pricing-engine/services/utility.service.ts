import { Injectable } from "@angular/core";
import { CellClassParams, ICellRendererParams } from "ag-grid-community";

@Injectable()
export class PricingEngineUtilityService {
    
    constructor(){}

    pricedByPrizmCellRenderer(params: ICellRendererParams){
        const pricedByPrizm: boolean = params.data['PricedByPrizm'] === 'True' ? true : false;
        if(pricedByPrizm){
            return `${params.value} <span style='color:red'><sup>P</sup></span>`
        } else {
            return params.value
        }
    }

    inPositionCellStyle(params: ICellRendererParams){
        const inPosition: boolean = params.data['PricedByPrizm'] === 'True' ? true : false;
        if(!inPosition){
            return {'background-color': '#F5F5F5;'}
        }
    }

    generateStyles(params: CellClassParams){
        const inPosition: boolean = params.data['InPosition'] === 'True' ? true : false;
        let output: any = {'border-left': '0.2px dotted #d7d7d7;'};

        if(typeof params.value === 'number' ){
          if(!inPosition){
            output = {...output, 'justify-content':'right', 'color': '#A9A9A9'}
          } else {
            output = {...output, 'justify-content':'right', 'color': '#000'}
          }
        }
        if(typeof params.value == 'string'){
          if(!inPosition){
            output = {...output, 'color': '#A9A9A9'}
          } else {
            output = {...output, 'color': '#000'}
          }

        }
        if(params.colDef.editable !== true){
          if(!inPosition){
            output = {...output, 'color': '#A9A9A9'}
          } else {
            output = {...output, 'color': '#000'}
          }
        }
        return output
    }
    
}