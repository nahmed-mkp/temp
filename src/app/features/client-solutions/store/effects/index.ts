import { FundEffects } from './fund.effects';
import { BenchmarkEffects } from './benchmark.effects';
import { CliffwaterEffects } from './cliffwater.effects';
import { SnapshotEffects } from './snapshot.effects';
import { InvestorRelationsEffects } from './investor-relations.effects';
import { CapitalFlowsEffects } from './capital-flows.effects';

export const effects: any = [FundEffects, BenchmarkEffects, CliffwaterEffects, SnapshotEffects,
    InvestorRelationsEffects, CapitalFlowsEffects];

export * from './fund.effects';
export * from './benchmark.effects';
export * from './cliffwater.effects';
export * from './snapshot.effects';
export * from './investor-relations.effects';
export * from './capital-flows.effects';

