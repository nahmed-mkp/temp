import { RowNode } from 'ag-grid-community';
import * as _ from 'lodash';

/* ============== MAPPING =================== */

 export function currencyCountryMapper(country: string){
    switch(country) {
      case 'US':
        return 'US';
      case 'UK':
        return 'UK';
      case 'EA':
        return 'Euro Area';
      case 'JPN':
        return 'Japan';
      case 'CH':
        return 'China';
      case 'MX':
        return 'Mexico';
      case 'ZA':
        return 'South Africa';
      case 'AU':
        return 'Australia'
    }
  }

export function groupAttributeIdMapping(groupAttribute: string): string {
    const mappingDict = {
      fundName: 'fundID',
      Fund: 'fundID',
      Pod: 'podID',
      Firm: 'FirmId',
      podName: 'podID',
      tradeName: 'tid',
      CrossPod:'CrossPodID',
      CrossPodName: 'CrossPodID',
      TradeGroup: 'TGID',
      TradeName: 'TID',
      TradeNameWithID: 'TID',
      CrossFund: 'CrossFundID',
      PortfolioBreakout: 'PortfolioBreakoutId',
      ExposureCurrency: 'ExposureCurrencyId',
      ClientServicesTradeTheme: 'CSTTID',
      SecurityName: 'SecurityNameId',
      MacroTheme: 'MTID',
      ClientServicesThemeBreakdown: 'CSTBID',
      CountryOfRisk: 'CountryOfRiskId',
      SecurityNameExcludingCP: 'SGID',
    };
    return mappingDict[groupAttribute];
  }

/* ============== NON-LINEAR UTILITY ============== */

export function getNonlinearDataForFirm(targetField: string, dataTree: any) {
    if(targetField.includes('-bpsToFund')){
        targetField = targetField.replace('-bpsToFund', '');
    }
    if(targetField.includes('-bpsToPod')){
        targetField = targetField.replace('-bpsToPod', '');
    }
    const valueLocatorIndex = dataTree.columns.indexOf(targetField);
    const firmDataCollection = dataTree && dataTree.data;
    if (firmDataCollection) {
        return firmDataCollection[1].data[valueLocatorIndex];
    }
}

export function getNonlinearDataPathAdvance(node: RowNode): string[] {
    let currentNode = node;
    let groupAttributePath: string[] = [];
    let FPTS;

    let targetLeafNode: RowNode;
    if (currentNode.group){
        targetLeafNode = node.allLeafChildren && node.allLeafChildren[0];
    } else {
        targetLeafNode = currentNode;
    }

    do {
        if (currentNode.group) {
          // In group level
          const groupAttribute = groupAttributeIdMapping(currentNode.field);
          groupAttributePath.push(groupAttribute);
        } else {
          // On the leaf level only use the Id attribute
          let leafIdAttrs = currentNode.data['Id'].split('|')
          let leafIdSuffix = leafIdAttrs[leafIdAttrs.length - 1]
          let parentPathMap = getNonlinearDataPathAdvance(currentNode.parent);
          parentPathMap.push( parentPathMap[parentPathMap.length - 1].concat(`|${leafIdSuffix}`))
          //FPTS = currentNode.data['Id'];
          FPTS = parentPathMap[parentPathMap.length - 1]
      }
        // keep climbing the grouping hierarchy
        if(currentNode.parent){
          currentNode = currentNode.parent;
        } else {
          break;
        }
    } while (currentNode.level !== -1 && currentNode.field !== 'Firm')

    groupAttributePath = groupAttributePath.reverse();

    // if(groupAttributePath.includes('TID')){
    //     if(groupAttributePath.slice(-1)[0] !== 'TID'){
    //     return null
    //     }
    // }

    const treePath = groupAttributePath.map(attribute => {
        if (attribute) {
        return targetLeafNode.data[attribute];
        }
    });

    let accumlativePath;
    const formatTreePath = treePath.map((item, index) => {
        if (index > 0) {
        accumlativePath = accumlativePath + '|' + item;
        return accumlativePath;
        } else {
        accumlativePath = '' + item;
        return accumlativePath;
        }
    });

    if (FPTS) {
        formatTreePath.push(FPTS);
    } 

    return formatTreePath;
}

export function getDistinctValues(values: any[]) {
    if (values && values.length && values.length > 0) {
      const uniqueValueArray = _.uniq(values);
      return uniqueValueArray.reduce((a, b) => {
        if (typeof b === 'number') {
          return a + b;
        } else {
          return a;
        }
      }, 0);
    } else {
      return null;
    }
  }

/* ============== COLORING =================== */

export function getMin(arr){
    let len = arr.length;
    let min = Infinity;

    while (len--) {
        min = arr[len] < min ? arr[len] : min;
    }
    return min;
}

export function getMax(arr) {
    let len = arr.length;
    let max = -Infinity;

    while (len--) {
        max = arr[len] > max ? arr[len] : max;
    }
    return max;
}

export function _normalize_value(curValue: number, otherValues: number[]): any{

    const positiveValues = otherValues.filter(val => val >= 0);
    const negativeValues = otherValues.filter(val => val < 0);
    if (curValue > 0) { 
      const min = getMin(positiveValues);
      const max = getMax(positiveValues);
      if (max !== min) {
        const result = Math.abs((curValue - min) / (max - min));
        return result;
      }
    } else {
      const max = getMin(negativeValues);
      const min = getMax(negativeValues);
      if (max !== min) {
        const result = Math.abs((curValue - min) / (max - min));
        return result;
      }
    }
    return 0;
}

/* ============= MISC ====================== */

export function createDashedBorder() {
  return {'border-left': '0.2px dotted #d7d7d7', 'justify-content': 'flex-end' };
}

export function isRowPinned(name) {
    if (name.includes('Beta') || name.includes('rSquaredSquared') || name.includes('Security') || name.includes('RSquare')) {
      return 'left';
    }
}

/* ============= VALUE FORMATTER ====================== */

export function formatNumberWithCommasAndDigitBlankNaNs(params, digit, option?: any) {
    const myvalue = params.value || params.data[params.colDef.field];
    if (myvalue !== undefined && myvalue !== null && typeof myvalue === 'number') {
        let result: any = myvalue;
        if (option && option === 'thousand') {
            result = myvalue / 1000 ;
        } else if (option && option === 'percent') {
            result = myvalue * 100;
        } else if (option && option === 'zeroCutOff') {
            if (Math.abs(Math.round(myvalue)) < 1) {
                return '  ';
            } else {
              return (myvalue * 100).toFixed(1);
            }
        }
        result = result.toLocaleString('en-US', { maximumFractionDigits: digit, minimumFractionDigits: digit });
        if (result === 'NaN') {
            result = '  ';
        }
        if (option && option === 'percent') {
            return result + '%';
        } else {
            if (result === '0' || result === '-0') {
              return '';
            }
            return result;
        }
    } else {
        return undefined;
    }
}
