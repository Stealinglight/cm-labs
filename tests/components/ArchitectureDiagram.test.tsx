import { render } from '@testing-library/react';
import { ArchitectureDiagram } from '../../src/components/ArchitectureDiagram';

describe('ArchitectureDiagram', () => {
  const mockNodes = [
    { id: 'node1', label: 'Node 1', x: 20, y: 50, color: '#00ff41' },
    { id: 'node2', label: 'Node 2', x: 80, y: 50, color: '#00d9ff' },
  ];

  const mockConnections = [{ from: 'node1', to: 'node2' }];

  it('renders with title', () => {
    const { container } = render(
      <ArchitectureDiagram
        title="Test Diagram"
        nodes={mockNodes}
        connections={mockConnections}
      />
    );
    expect(container.textContent).toContain('Test Diagram');
  });

  it('renders SVG with correct viewBox', () => {
    const { container } = render(
      <ArchitectureDiagram
        title="Test Diagram"
        nodes={mockNodes}
        connections={mockConnections}
      />
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 600 350');
  });

  it('renders all nodes', () => {
    const { container } = render(
      <ArchitectureDiagram
        title="Test Diagram"
        nodes={mockNodes}
        connections={mockConnections}
      />
    );
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBe(mockNodes.length);
  });

  it('renders node labels', () => {
    const { container } = render(
      <ArchitectureDiagram
        title="Test Diagram"
        nodes={mockNodes}
        connections={mockConnections}
      />
    );
    expect(container.textContent).toContain('Node 1');
    expect(container.textContent).toContain('Node 2');
  });

  it('renders multi-line node labels', () => {
    const multiLineNodes = [
      { id: 'node1', label: 'Line 1\nLine 2', x: 50, y: 50, color: '#00ff41' },
    ];
    const { container } = render(
      <ArchitectureDiagram
        title="Test Diagram"
        nodes={multiLineNodes}
        connections={[]}
      />
    );
    expect(container.textContent).toContain('Line 1');
    expect(container.textContent).toContain('Line 2');
  });

  it('renders connections between nodes', () => {
    const { container } = render(
      <ArchitectureDiagram
        title="Test Diagram"
        nodes={mockNodes}
        connections={mockConnections}
      />
    );
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBe(mockConnections.length);
  });

  it('renders arrow heads for connections', () => {
    const { container } = render(
      <ArchitectureDiagram
        title="Test Diagram"
        nodes={mockNodes}
        connections={mockConnections}
      />
    );
    const polygons = container.querySelectorAll('polygon');
    expect(polygons.length).toBe(mockConnections.length);
  });

  it('handles missing node references in connections', () => {
    const invalidConnections = [{ from: 'nonexistent', to: 'node1' }];
    const { container } = render(
      <ArchitectureDiagram
        title="Test Diagram"
        nodes={mockNodes}
        connections={invalidConnections}
      />
    );
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBe(0); // Should not render invalid connection
  });

  it('applies correct colors to nodes', () => {
    const { container } = render(
      <ArchitectureDiagram
        title="Test Diagram"
        nodes={mockNodes}
        connections={mockConnections}
      />
    );
    const rects = container.querySelectorAll('rect');
    expect(rects[0]).toHaveAttribute('stroke', '#00ff41');
    expect(rects[1]).toHaveAttribute('stroke', '#00d9ff');
  });

  describe('Snapshot tests', () => {
    it('matches snapshot for ACRS-style diagram', () => {
      const acrsNodes = [
        { id: 'wazuh', label: 'Wazuh\nSIEM', x: 10, y: 50, color: '#00d9ff' },
        { id: 'detection', label: 'Detection\nAgent', x: 30, y: 50, color: '#00ff41' },
        { id: 'analysis', label: 'Analysis\nAgent', x: 50, y: 50, color: '#00ff41' },
        { id: 'decision', label: 'Decision\nAgent', x: 70, y: 50, color: '#00ff41' },
      ];
      const acrsConnections = [
        { from: 'wazuh', to: 'detection' },
        { from: 'detection', to: 'analysis' },
        { from: 'analysis', to: 'decision' },
      ];

      const { container } = render(
        <ArchitectureDiagram
          title="ACRS 5-Agent Pipeline"
          nodes={acrsNodes}
          connections={acrsConnections}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('matches snapshot for simple two-node diagram', () => {
      const { container } = render(
        <ArchitectureDiagram
          title="Simple Pipeline"
          nodes={mockNodes}
          connections={mockConnections}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  it('converts percentage coordinates correctly', () => {
    const testNodes = [
      { id: 'node1', label: 'Test', x: 0, y: 0, color: '#00ff41' }, // 0% = 0px
      { id: 'node2', label: 'Test', x: 100, y: 100, color: '#00ff41' }, // 100% = 600px, 350px
    ];

    const { container } = render(
      <ArchitectureDiagram
        title="Coordinate Test"
        nodes={testNodes}
        connections={[]}
      />
    );

    const rects = container.querySelectorAll('rect');
    // First node at 0% should be centered at 0,0 (box offset by -60,-30)
    expect(rects[0]).toHaveAttribute('x', String(0 - 120 / 2));
    expect(rects[0]).toHaveAttribute('y', String(0 - 60 / 2));

    // Second node at 100% should be at 600,350 (box offset)
    expect(rects[1]).toHaveAttribute('x', String(600 - 120 / 2));
    expect(rects[1]).toHaveAttribute('y', String(350 - 60 / 2));
  });
});
