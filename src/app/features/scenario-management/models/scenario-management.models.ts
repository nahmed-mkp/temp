
/* ========== COUNTRY =========== */

export interface ICountry {
    countryCode: string, 
    countrySortOrder: number, 
    Name: string
}

export interface ICountryUpdateReq { 
    countryCode: string;
    sortOrder: number,
    name: string
}

/* ========== ECON VARIABLE =========== */

export interface IEconomicVariable {
    VariableId: number, 
    CountryCode: string,
    VariableName: string, 
    CreateName: string, 
    CreateDate: Date, 
    UpdateName: string, 
    UpdateDate: Date,
    Enabled: boolean
}

export interface IEconomicVariableUpdateReq{
    variableId: number,
    countryCode: string,
    variableName: string,
    enabled: number
}

export interface IEconomicVariableCreateReq{
    countryCode: string, 
    variableName: string 
}

/* ========== FORECAST PERIOD =========== */

export interface IForecastPeriod {
    ForecastPeriodId: number, 
    VariableId: number, 
    VariableName: string,
    ForecastPeriod: string,
    Enabled: boolean, 
    CreateName: string, 
    CreateDate: Date,
    UpdateName: string, 
    UpdateDate: Date
}

export interface IForecastPeriodUpdateReq {
    forecastPeriodId: number,
    forecastPeriod: string,
    enabled: number
}

export interface IForecastPeriodCreateReq{
    variableId: number,
    forecastPeriod: string
}

/* ========== SCENARIO =========== */

export interface IScenario {
    ScenarioId: number,
    ScenarioCode: string, 
    CountryCode: string, 
    ScenarioDescription: string,
    ScenarioName: string,
    ScenarioSortOrder:number
    Enabled: boolean
}

export interface IScenarioUpdateReq {
    scenarioId: number,
    countryCode: string,
    scenarioName: string,
    scenarioDescription: string,
    scenarioSortOrder: number,
    enabled: number
}

export interface IScenarioCreateReq{
    scenarioName: string,
    scenarioSet: string,
    scenarioDescription: string, 
    scenarioSortOrder: number,
    countryCode: string
}

/* ========== FORECAST =========== */

export interface IForecast {
    AsOfDate: Date, 
    Name: string, 
    ScenarioName: string, 
    VariableName: string, 
    ForecastPeriod: string,
    MKPValue: number, 
    ConsensusValue: number,
    ForecastPeriodId: number, 
    VariableId: number,
    ScenarioId: number, 
    CreateName: string, 
    CreateDate: string, 
    UpdateName: string, 
    UpdateDate: string
}

export interface IForecastUpdateReq {
    econVariableName: string,
    econVariableId: number,
    scenarioId: number,
    scenarioName: string,
    forecastPeriodId: number,
    forecastPeriod: string,
    mkpValue: number,
    consensusValue: number
}

export interface IForecastCreateReq{
    forecastPeriodId: number,
    scenarioId: number,
    mkpValue: number,
    consensusValue: number
}