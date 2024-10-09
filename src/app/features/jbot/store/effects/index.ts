import { JbotEffects } from './jbot.effects';
import { JbotTechEffects } from './jbot-tech.effects';
import { JbotMonitorEffects } from './jbot-monitor.effects';
import { JbotSummaryEffects } from './jbot-summary.effects';

export const effects = [JbotEffects, JbotTechEffects, JbotMonitorEffects, JbotSummaryEffects];

export * from './jbot.effects';
export * from './jbot-tech.effects';
export * from './jbot-monitor.effects';
export * from './jbot-summary.effects';
