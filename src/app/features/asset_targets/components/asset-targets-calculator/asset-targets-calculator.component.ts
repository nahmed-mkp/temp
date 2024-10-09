import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import * as fromModels from '../../models';
import { Store } from "@ngrx/store";
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef  } from '@angular/material/legacy-dialog';
import * as fromStore from '../../store'
import { Observable } from "rxjs";

@Component({
  selector: "app-asset-target-calculator",
  templateUrl: "./asset-targets-calculator.component.html",
  styleUrls: ["./asset-targets-calculator.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetTargetsCalculatorComponent implements OnInit {

  public initVals: fromModels.ICalculatorInput[];
  public inputData: fromModels.ICalculatorInput[];
  public inflationSubsets: any[];
  public scenarioSubsets: any[];
  public country: string;
  public activeParents = [];
  public colorClassArr = [ 
    {
      primaryColor: 'gray-primary',
      secondaryColor: 'gray-secondary'
    },
    {      
      primaryColor: 'beige-primary',
      secondaryColor: 'beige-secondary'
    },
    {
      primaryColor: 'blue-primary',
      secondaryColor: 'blue-secondary'
    }, 
    {
      primaryColor: 'pink-primary',
      secondaryColor: 'pink-secondary'
    },
  ]

  public assetCalculatorInitValues$: Observable<any>;

  constructor( public dialogRef: MatDialogRef<AssetTargetsCalculatorComponent>, private store: Store<fromStore.AssetTargetsState>, @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit(): void {
    this.initVals = structuredClone(this.data.initCalcValues)
    this.inputData = this.data.editedCalcValues !== undefined ? structuredClone(this.data.editedCalcValues) : structuredClone(this.data.initCalcValues) 
    this.country = this.data.country;
    this.populateActiveParents();
    this.generateSubsetData()
  }


  generateSubsetData(){

    let masterData = {
      inflation: [],
      scenarios: []
    }

    let mappedData = {};

    let demand_data = this.inputData.find(set => set.sectionTitle === 'Demand').data;
    let inflation_data = this.inputData.find(set => set.sectionTitle === 'Inflation').data;
    let scenario_data = this.inputData.find(set => set.sectionTitle === 'Scenarios').data;
   
    Object.keys(demand_data).map( key => {

      mappedData[key] = {
        inflation: [],
        scenarios: []
      }

      Object.values(scenario_data).map( scenario => {
        let products: string[] = scenario['products']
        if(products.includes(key)){
          let inflation_obj = inflation_data[products[1]]
          inflation_obj['key'] = products[1]
          mappedData[key].inflation.push(inflation_obj)
          mappedData[key].scenarios.push(scenario)
        }
      })
   
    })
   
    Object.values(mappedData).map( vals => {
      masterData.inflation.push(vals['inflation'])
      masterData.scenarios.push(vals['scenarios'])
    })
    
    this.inflationSubsets = masterData.inflation;
    this.scenarioSubsets = masterData.scenarios;

  }


  generateScenarioValue(products: string[]): number{
    let output = 1;
    this.inputData.map( dataset => {
      let data = dataset.data;
      products.map( product => {
        if(Object.keys(data).includes(product)){
          output = output * data[product].value
        }
      })
    })

    output = output / 100;
    if(output < 100 && output !== 0){
      return Number(output)
    } 

    if(output === 0 ){
      return 0
    }
  }
0

  generateTitlePercentage(dataset: fromModels.ICalculatorInput): number{
    let totalPercentage = 0;
    Object.values(dataset.data).map( (item: any) => {
      if(dataset.sectionTitle === 'Scenarios'){
        totalPercentage += this.generateScenarioValue(item.products);
      } else {
        totalPercentage += item.value;
      }
    })
    return Math.round(totalPercentage)
  }

  getItemData(itemKey){
    let itemValues = null;
    this.inputData.map( dataset => {
      Object.keys(dataset.data).map( key => {
        if(key === itemKey){
          itemValues = dataset.data[key]
        }
      })
    })
    return itemValues;
  }


  /* ============= UTIL =========== */

  populateActiveParents(){
    this.inputData.map( dataset => {
      Object.keys(dataset.data).map( key => {
        this.activeParents.push(key)
      })
    })
  }

  onMouseEnter(item){
    if(item.products){
      this.activeParents = [];
      this.activeParents = [...item.products]
      this.activeParents.push(item.key)
    }
  }

  onMouseLeave(item){
    if(item.products){
      this.activeParents = [];
      this.populateActiveParents();
    }
  }
  
  isBlurred(item){
    return !this.activeParents.includes(item.key) ?  true : false;
  }

  resetToInitValues(){
    this.store.dispatch(fromStore.removeEditedCalculatorInputs(this.country))
    this.inputData = structuredClone(this.initVals)
    this.generateSubsetData();
  }

  saveScenarioValues(){
    let scenarios = this.inputData.find(dataset => dataset.sectionTitle === 'Scenarios');
    let oldDataRow = this.data.oldData.filter( row => row['SecuritySortOrder'] === -1)[0]
    Object.values(scenarios.data).map( (item:any) => {
      let data: fromModels.IOverridePayload = {
        country: this.country,
        field: item.title,
        old_data: oldDataRow[item.title],
        override_data: this.generateScenarioValue(item.products) / 100
      }
      this.store.dispatch(fromStore.overrideAssetTargetProbability(data))
      this.store.dispatch(fromStore.saveEditedCalculatorInputs({ country: this.country, data: this.inputData}))
    })
    this.dialogRef.close()
  }
  
}
