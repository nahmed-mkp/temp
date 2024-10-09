import { ParserGuard } from './parser.guard';
import { TimeseriesGuard } from './timeseries.guard';
import { CouponsGuard } from './coupons.guard';
import { MetricTypesGuard } from './metric-types.guard';

export const guards: any[] = [ParserGuard, TimeseriesGuard, CouponsGuard, MetricTypesGuard];

export * from './parser.guard';
export * from './timeseries.guard';
export * from './coupons.guard';
export * from './metric-types.guard'


