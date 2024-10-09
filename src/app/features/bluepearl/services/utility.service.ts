import { ICellRendererParams, ValueGetterParams } from "ag-grid-community";

export const formatNumberWithCommaSeperated = (digit) => {
    return (params: ValueGetterParams) => {
        if (params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined) {
            if (typeof params.data[params.colDef.field] === 'number') {
                const result = params.data[params.colDef.field].toLocaleString('en-US', {maximumFractionDigits: digit, minimumFractionDigits: digit});
                return result;
            }
        }
    };
}

export const syntheticCellRenderer = (params: ICellRendererParams)  => {
    const syntheticTrade: boolean = params.data['SyntheticMove'] === true ? true : false;
    if(syntheticTrade){
        return `${params.value} <span style='color:red'><sup>S</sup></span>`
    } else {
        return params.value
    }
  }