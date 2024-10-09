import { Injectable } from '@angular/core';
import { ColumnApi, ColGroupDef, ColumnState, RowNode } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Injectable()
export class PositionViewerService {

  constructor(private utilityService: UtilityService) {
    this.getNonlinearDataPathAdvance = this.getNonlinearDataPathAdvance.bind(this);
  }

  public getNonLinearDataPathKeys(node: RowNode, primaryGroupingNameIdMaping: any): string {
    // const paths = this.getNonlinearDataPath(node, primaryGroupingNameIdMaping).map((path) => {
    //   const pathParts = path.split('|');
    //   return pathParts[pathParts.length - 1];
    // });
    const paths = this.getNonlinearDataPathAdvance(node).map((path) => {
      const pathParts = path.split('|');
      return pathParts[pathParts.length - 1];
    });
    return paths.join('_').toLowerCase();
  }

  public getNonlinearDataPathAdvance(node: RowNode): string[] {
    let currentNode = node;
    let groupAttributePath: string[] = [];
    let FPTS;

    let targetLeafNode: RowNode;
    if (currentNode.group) {
      targetLeafNode = node.allLeafChildren && node.allLeafChildren[0];
    } else {
      targetLeafNode = currentNode;
    }

    do {
      if (currentNode.group) {
        // In group level
        const groupAttribute = this._groupAttributeIdMapping(currentNode.field);
        groupAttributePath.push(groupAttribute);
      } else {
        // On the leaf level only use the Id attribute
        FPTS = currentNode.data['Id'];
      }
      // keep climbing the grouping hierarchy
      currentNode = currentNode.parent;
    } while (currentNode.level !== -1 && currentNode.field !== 'Firm')

    groupAttributePath = groupAttributePath.reverse();

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

  private _groupAttributeIdMapping(groupAttribute: string): string {
    const mappingDict = {
      fundName: 'fundID',
      podName: 'podID',
      tradeName: 'tid',

      CrossPodName: 'CrossPodID',
      TradeGroup: 'TGID',
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
    }
    return mappingDict[groupAttribute];
  }

  public getNonlinearDataPath(node: RowNode, primaryGroupingNameIdMaping: any): string[] {
      let currentNode = node;
      let treePath = [];
      let FPTS;
      do {
        if (currentNode.group) {
          // In group level
          const groupValue = currentNode.key;
          const group = currentNode.field;
  
          let targetGroupId;
  
          if (primaryGroupingNameIdMaping[group]) {
  
            if (group !== 'tradeName') {
              targetGroupId = primaryGroupingNameIdMaping[group][groupValue];
            } else {
              // special case for tradeName since multiple TIDs could associate with the same tradeName
              // Check leaf node to confirm the correct tid
              if (primaryGroupingNameIdMaping['tradeName'][groupValue].length > 1) {
                const leafNode = currentNode.allLeafChildren && currentNode.allLeafChildren[0] || undefined;
                targetGroupId = leafNode.data['tid'];
              } else {
                targetGroupId = primaryGroupingNameIdMaping['tradeName'][groupValue][0];
              }
            }
          }
          treePath.push(parseInt(targetGroupId, 10));
          // treePath.push(groupValue); // for debugger purpose
        } else {
          // In leaf level which mean position/security level, it will use the FTPS locator too
          // treePath.push(currentNode.data['SID']);
          FPTS = currentNode.data['Id'];
        }
        currentNode = currentNode.parent;
      } while (currentNode.level !== -1 && currentNode.field !== 'Firm');
  
      treePath = treePath.reverse();
  
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

  // retrieve data based on path depth of the request, recursively run for each level of the dataset 
  public getNonLinearData(treePath: string[], targetField: string, dataTree: any, position?) {
    if (dataTree.columns === undefined) {
      return undefined;
    }
    const valueLocatorIndex = dataTree.columns.indexOf(targetField);

    const targetLevelData = treePath.reduce((dataObj, path, currentIndex) => {

      if (dataObj) {
        if (currentIndex === 0) {
          return dataObj[path];
        } else if (dataObj.branches) {
          return dataObj.branches[path];
        } else if (dataObj.leaves) {
          return dataObj.leaves[path];
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }

    }, dataTree.data);

    if (targetLevelData) {
      const finalResult = targetLevelData.data ? targetLevelData.data[valueLocatorIndex] : 0;
      return finalResult;
    } else {
      // could not locate the data
      return undefined;
    }
  }

  public getNonlinearDataForFirm(targetField: string, dataTree: any) {
    const firmDataCollection = dataTree && dataTree.firm;
    if (firmDataCollection) {
      return firmDataCollection[targetField];
    }
  }

  public getNonlinearDataColumnInfo(targetField: string, dataTree: any) {
    if (dataTree.columns === undefined) {
      return undefined;
    }
    const valueLocatorIndex = dataTree.columns.indexOf(targetField);
    return valueLocatorIndex;
  }

  public getNormalizedServerSideGrouping(rowGrouping: any[]): string {
    let result = this.prepareColumnGroupingForServer(rowGrouping).join('|');
    while (result[0] === '|') {
      result = result.substring(1);
    }
    return result;
  }

  public prepareColumnGroupingForServer(fields: string[]): string[] {
    const result: string[] = [];

    fields.forEach(field => {
      if (field !== 'Firm') {
        if (field === 'CrossPodName') {
          result.push('CrossPod');
        } else if (field === 'TradeNameWithID' || field === 'tradeName') {
          result.push('TradeName');
        } else if (field === 'fundName') {
          result.push('Fund');
        } else if (field === 'podName') {
          result.push('Pod');
        } else {
          if (field !== '' && field !== undefined && field !== null) {
            result.push(field);
          }
        }
      }
    });
    result.push('Position');
    return result;
  }

}