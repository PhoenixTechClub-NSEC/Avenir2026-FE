// Main export file for team data
import { coreTeamData } from './core-team.js';
import { devTeamData } from './dev-team.js';
import { wingLeadsData } from './wing-leads.js';

// Export organized team data for the Team component
export const TEAM_DATA = {
    core: coreTeamData,
    dev: devTeamData,
    wings: wingLeadsData
};

// Export individual arrays if needed
export { coreTeamData, devTeamData, wingLeadsData };
