export interface PricingCalculatorForm {
    inputs: {
        fieldName: string;
        fieldType: string;
        uiType: string;
        lookupValues: string;
        sortOrder: number;
        tabName: string;
    }[];

    lookups: {
        counterparties: string[];
        ratings: string[];
    }
}