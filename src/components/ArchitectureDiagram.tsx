interface Node {
  id: string;
  label: string;
  x: number; // Percentage-based X coordinate (0-100) within SVG viewBox
  y: number; // Percentage-based Y coordinate (0-100) within SVG viewBox
  color: string;
}

interface Connection {
  from: string;
  to: string;
}

interface ArchitectureDiagramProps {
  title: string;
  nodes: Node[];
  connections: Connection[];
}

export function ArchitectureDiagram({ title, nodes, connections }: ArchitectureDiagramProps) {
  // SVG canvas dimensions: 600x350px viewBox, scales responsively
  const width = 600;
  const height = 350;

  return (
    <div className="w-full">
      <div className="text-xs font-mono text-[#00ff41] mb-4">// {title}</div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        style={{ maxHeight: '350px' }}
      >
        {/* Draw connections */}
        {connections.map((conn, idx) => {
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          // Convert percentage coordinates (0-100) to absolute SVG positions
          const x1 = (fromNode.x / 100) * width;
          const y1 = (fromNode.y / 100) * height;
          const x2 = (toNode.x / 100) * width;
          const y2 = (toNode.y / 100) * height;

          return (
            <g key={idx}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={fromNode.color}
                strokeWidth="2"
                opacity="0.3"
                strokeDasharray="5,5"
              />
              {/* Arrow head */}
              <polygon
                points={`${x2},${y2} ${x2 - 6},${y2 - 4} ${x2 - 6},${y2 + 4}`}
                fill={toNode.color}
                opacity="0.5"
                transform={`rotate(${Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)}, ${x2}, ${y2})`}
              />
            </g>
          );
        })}

        {/* Draw nodes */}
        {nodes.map((node, idx) => {
          // Convert percentage coordinates (0-100) to absolute SVG positions
          const x = (node.x / 100) * width;
          const y = (node.y / 100) * height;
          const lines = node.label.split('\n');
          const boxWidth = 120;  // Node box width in pixels
          const boxHeight = 60;  // Node box height in pixels

          return (
            <g key={idx}>
              {/* Node box */}
              <rect
                x={x - boxWidth / 2}
                y={y - boxHeight / 2}
                width={boxWidth}
                height={boxHeight}
                fill="rgba(26, 26, 26, 0.9)"
                stroke={node.color}
                strokeWidth="2"
                rx="4"
              />
              {/* Node text */}
              {lines.map((line, lineIdx) => (
                <text
                  key={lineIdx}
                  x={x}
                  y={y + (lineIdx - (lines.length - 1) / 2) * 14}
                  fill={node.color}
                  fontSize="12"
                  fontFamily="monospace"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
