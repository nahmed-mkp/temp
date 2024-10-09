import { ProjectsEffects, } from './projects.effects';
import { WorkbooksEffects } from './workbooks.effects';
import { ReportsEffects } from './reports.effects';

export const effects = [ProjectsEffects, WorkbooksEffects, ReportsEffects];

export * from './projects.effects';
export * from './workbooks.effects';
export * from './reports.effects';

