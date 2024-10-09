export interface ITab {
    scenario: IScenario;
}

export interface IMetaData{
    clientServicesThemeBreakdown: IClientTheme[],
    portfolioDate: string,
    shockTypes: string[]
}

export interface IScenarioData {
    shared: IScenario[],
    userScenarios: IScenario[]
}

export interface IInitScenarioData {
    metaData: IMetaData,
    scenarios: IScenarioData

}

export interface IScenario {
	Name: string,
	CreatedBy: string,
	GeneralShocks: IGeneralShock[],
	CustomShocks: ICustomShock[],
	Dates: string[],
    Shared: boolean,
    guid?: string
}

export interface ISecurity { 
    sid: number,
    name: string
}

export interface IClientTheme {
    name: string,
    id: number
}

export interface IGeneralShock {
    [key: string] : IShock
}

export interface IShock {
    ShockType: string,
	ShockAmount: number
}

export interface ICustomShock {
    SID: string, // --> This will be a drop down (or something smarter) of securities in the portfolio for the as of date.
    ShockType: string,
    ShockAmount: number
}