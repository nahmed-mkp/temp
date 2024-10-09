import { TBAReportsParserEffects } from './tbareports-parser.effects';
import { TBAReportsTimeseriesEffects } from './tbareports-timeseries.effects';

export const effects = [TBAReportsParserEffects, TBAReportsTimeseriesEffects];

export * from './tbareports-parser.effects';
export * from './tbareports-timeseries.effects';

