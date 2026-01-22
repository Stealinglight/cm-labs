export interface DiagramNode {
  id: string;
  label: string;
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  color: string;
}

export interface DiagramConnection {
  from: string;
  to: string;
}

export interface DiagramConfig {
  title: string;
  nodes: DiagramNode[];
  connections: DiagramConnection[];
}

export const acrsDiagram: DiagramConfig = {
  title: 'ACRS 5-Agent Pipeline',
  nodes: [
    { id: 'wazuh', label: 'Wazuh\nSIEM', x: 10, y: 50, color: '#00d9ff' },
    { id: 'detection', label: 'Detection\nAgent', x: 30, y: 50, color: '#00ff41' },
    { id: 'analysis', label: 'Analysis\nAgent', x: 50, y: 50, color: '#00ff41' },
    { id: 'decision', label: 'Decision\nAgent', x: 70, y: 50, color: '#00ff41' },
    { id: 'remediation', label: 'Remediation\nAgent', x: 70, y: 150, color: '#00ff41' },
    { id: 'escalation', label: 'Escalation\nTicket', x: 90, y: 100, color: '#ff6b6b' },
    { id: 'documentation', label: 'Documentation\nAgent', x: 50, y: 200, color: '#00ff41' },
    { id: 's3', label: 'S3 Audit\nLogs', x: 50, y: 280, color: '#00d9ff' },
  ],
  connections: [
    { from: 'wazuh', to: 'detection' },
    { from: 'detection', to: 'analysis' },
    { from: 'analysis', to: 'decision' },
    { from: 'decision', to: 'remediation' },
    { from: 'decision', to: 'escalation' },
    { from: 'remediation', to: 'documentation' },
    { from: 'escalation', to: 'documentation' },
    { from: 'documentation', to: 's3' },
  ],
};

export const snapshotSleuthDiagram: DiagramConfig = {
  title: 'Snapshot Sleuth Pipeline',
  nodes: [
    { id: 'trigger', label: 'Trigger\n(CLI/Event)', x: 10, y: 50, color: '#00d9ff' },
    { id: 'validate', label: 'Validate\nSnapshot', x: 30, y: 50, color: '#00ff41' },
    { id: 'provision', label: 'Provision\nEnvironment', x: 50, y: 50, color: '#00ff41' },
    { id: 'yara', label: 'YARA', x: 20, y: 150, color: '#00ff41' },
    { id: 'clamav', label: 'ClamAV', x: 40, y: 150, color: '#00ff41' },
    { id: 'miner', label: 'Evidence\nMiner', x: 60, y: 150, color: '#00ff41' },
    { id: 'timeline', label: 'Log2\nTimeline', x: 80, y: 150, color: '#00ff41' },
    { id: 's3', label: 'S3\nEvidence', x: 50, y: 230, color: '#00d9ff' },
    { id: 'notify', label: 'Notify\n(Slack/Email)', x: 80, y: 230, color: '#00d9ff' },
  ],
  connections: [
    { from: 'trigger', to: 'validate' },
    { from: 'validate', to: 'provision' },
    { from: 'provision', to: 'yara' },
    { from: 'provision', to: 'clamav' },
    { from: 'provision', to: 'miner' },
    { from: 'provision', to: 'timeline' },
    { from: 'yara', to: 's3' },
    { from: 'clamav', to: 's3' },
    { from: 'miner', to: 's3' },
    { from: 'timeline', to: 's3' },
    { from: 's3', to: 'notify' },
  ],
};

export const stravaMCPDiagram: DiagramConfig = {
  title: 'StravaMCP Architecture',
  nodes: [
    { id: 'claude', label: 'Claude\nDesktop/Code', x: 20, y: 50, color: '#00d9ff' },
    { id: 'mcp', label: 'MCP\nProtocol', x: 50, y: 50, color: '#00ff41' },
    { id: 'lambda', label: 'Lambda\nFunction', x: 50, y: 130, color: '#00ff41' },
    { id: 'strava', label: 'Strava\nAPI', x: 80, y: 130, color: '#00d9ff' },
  ],
  connections: [
    { from: 'claude', to: 'mcp' },
    { from: 'mcp', to: 'lambda' },
    { from: 'lambda', to: 'strava' },
  ],
};

export const wristAgentDiagram: DiagramConfig = {
  title: 'wrist-agent Pipeline',
  nodes: [
    { id: 'watch', label: 'Apple\nWatch', x: 15, y: 50, color: '#00d9ff' },
    { id: 'voice', label: 'Voice\nCapture', x: 35, y: 50, color: '#00ff41' },
    { id: 'lambda', label: 'Lambda\n(Go)', x: 55, y: 50, color: '#00ff41' },
    { id: 'bedrock', label: 'Amazon\nBedrock', x: 75, y: 50, color: '#00ff41' },
    { id: 'notes', label: 'Apple\nNotes', x: 65, y: 150, color: '#00d9ff' },
    { id: 'reminders', label: 'Apple\nReminders', x: 85, y: 150, color: '#00d9ff' },
  ],
  connections: [
    { from: 'watch', to: 'voice' },
    { from: 'voice', to: 'lambda' },
    { from: 'lambda', to: 'bedrock' },
    { from: 'bedrock', to: 'notes' },
    { from: 'bedrock', to: 'reminders' },
  ],
};
