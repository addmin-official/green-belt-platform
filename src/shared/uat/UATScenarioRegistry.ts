export interface UATScenario {
  id: string;
  name: string;
  roleId: string;
  action: string;
  expectedBehavior: string;
  riskMitigation: string;
}

export const UAT_SCENARIOS: UATScenario[] = [
  {
    id: 'scen-fed-dashboard',
    name: 'Federal Executive Accessing Federal Sector',
    roleId: 'fed-exec-viewer',
    action: 'Executive navigates to high-level revenue and customs overview.',
    expectedBehavior: 'System displays sovereign Federal aggregation models correctly. No KRG details readable.',
    riskMitigation: 'Isolates regional databases from federal telemetry scans.'
  },
  {
    id: 'scen-krg-dashboard',
    name: 'KRG Executive Accessing KRG Sector',
    roleId: 'krg-exec-viewer',
    action: 'Executive loads Kurdistan regional transit checkpoints dashboard.',
    expectedBehavior: 'Regional indicators populate correctly. Direct Federal API queries are fully blocked.',
    riskMitigation: 'Maintains autonomous regional administration of custom operations.'
  },
  {
    id: 'scen-joint-dashboard',
    name: 'Joint Auditor Accessing Joint Segment',
    roleId: 'joint-auditor',
    action: 'Auditor displays bi-directional reconciliation metrics and hashes.',
    expectedBehavior: 'System queries only sanitized aggregations and cross-border hash ledger values.',
    riskMitigation: 'Ensures zero raw records leakage across administrative lines.'
  },
  {
    id: 'scen-fed-customs-blocks-krg',
    name: 'Federal Customs Officer Accessing KRG Assets',
    roleId: 'fed-customs-officer',
    action: 'Officer attempts to load KRG warehouse and local inventory registers.',
    expectedBehavior: 'Access is implicitly denied. Active guard interceptor returns HTTP 403 Forbidden.',
    riskMitigation: 'Enforces federal boundaries and respects regional administrative sovereignty.'
  },
  {
    id: 'scen-krg-customs-blocks-fed',
    name: 'KRG Customs Officer Accessing Federal Assets',
    roleId: 'krg-customs-officer',
    action: 'Officer attempts to load Federal import licenses registry.',
    expectedBehavior: 'Security context intercepts the token and blocks the path with access denied warnings.',
    riskMitigation: 'Enforces regional boundaries and prevents unauthorized out-of-jurisdiction query execution.'
  },
  {
    id: 'scen-joint-denies-raw-revenue',
    name: 'Joint Auditor Prohibited from Raw Financial Records',
    roleId: 'joint-auditor',
    action: 'Auditor tries to execute query on raw_revenue or raw_customs tables.',
    expectedBehavior: 'Interface intercepts requests and triggers raw field stripping warning. Payload is rejected.',
    riskMitigation: 'Blocks database inspection on non-aggregated revenue records.'
  },
  {
    id: 'scen-language-switching',
    name: 'Language Context Preservation on Session Navigation',
    roleId: 'tech-administrator',
    action: 'User changes language selection between Arabic, Kurdish and English.',
    expectedBehavior: 'GUI redraws with proper RTL/LTR. System keeps existing user active session and jurisdiction limits.',
    riskMitigation: 'Provides seamless operational localized flows for native officers.'
  },
  {
    id: 'scen-not-configured-honesty',
    name: 'Transparent Provider State Indicator Response',
    roleId: 'tech-administrator',
    action: 'Supervisor views provider connection panel in pilot mode.',
    expectedBehavior: 'States output NOT_CONFIGURED without faking database connection metrics.',
    riskMitigation: 'Keeps operational auditing honest and prevents false certifications of system readiness.'
  },
  {
    id: 'scen-qa-production-gate-integrity',
    name: 'QA Production Gate Staged Checks Verification',
    roleId: 'tech-administrator',
    action: 'Administrator compiles development scripts and runs production test gates.',
    expectedBehavior: 'Gates query real files, validation engines, and schemas; results reflect factual current status.',
    riskMitigation: 'Guarantees standard build safety constraints exist before staging pipeline release.'
  },
  {
    id: 'scen-smoke-tests-integration',
    name: 'E2E Smoke Verification Suite Execution',
    roleId: 'tech-administrator',
    action: 'Operator executes npm run smoke:local to check backend routing.',
    expectedBehavior: 'Test output lists correct offline components without failing back to fake passes.',
    riskMitigation: 'Saves developer diagnostics time by highlighting missing configurations directly.'
  }
];

export class UATScenarioRegistry {
  public static getScenarios(): UATScenario[] {
    return UAT_SCENARIOS;
  }
}
