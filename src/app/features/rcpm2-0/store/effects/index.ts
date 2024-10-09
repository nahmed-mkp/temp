import { RCPM2PositionsEffects } from './rcpm-2-positions.effects';
import { ShockAnalysisEffects } from './shock-analysis.effects';
import { LayoutEffects } from './layout.effects';
import { TradeNameEffects } from './tradename.effects';
import { SimulationEffects } from './simulation.effects';
import { DirectionalityEffects } from './directionality.effects';
import { ReturnsEffects } from './returns.effects';
import { DataRetrievalMethodEffects } from './ui.effects';

export const effect = [
    RCPM2PositionsEffects,
    ShockAnalysisEffects,
    LayoutEffects,
    TradeNameEffects,
    SimulationEffects,
    DirectionalityEffects,
    ReturnsEffects,
    DataRetrievalMethodEffects
];

export * from './rcpm-2-positions.effects';
export * from './shock-analysis.effects';
export * from './layout.effects';
export * from './tradename.effects';
export * from './simulation.effects';
export * from './directionality.effects';
export * from './returns.effects';
export * from './ui.effects';
