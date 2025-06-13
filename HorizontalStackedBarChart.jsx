import React, { useState } from 'react';

const HorizontalStackedBarChart = () => {
  // Sample data - you can replace this with your actual data
  const data = [
    {
      category: "Project Alpha",
      open: 15,
      started: 32,
      completed: 28,
      exception: 5
    },
    {
      category: "Project Beta", 
      open: 8,
      started: 24,
      completed: 48,
      exception: 2
    },
    {
      category: "Project Gamma",
      open: 42,
      started: 38,
      completed: 30,
      exception: 8
    },
    {
      category: "Project Delta",
      open: 3,
      started: 18,
      completed: 56,
      exception: 1
    },
    {
      category: "Project Echo",
      open: 25,
      started: 15,
      completed: 10,
      exception: 4
    }
  ];

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: '' });

  const colors = {
    open: '#6b7280',        // gray
    started: '#3b82f6',     // blue
    completed: '#10b981',   // emerald
    exception: '#ef4444'    // red
  };

  const handleMouseEnter = (e, category, segment, value, total) => {
    const rect = e.target.getBoundingClientRect();
    const percentage = ((value / total) * 100).toFixed(1);
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      content: `${category} - ${segment}: ${value} (${percentage}%)`
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: '' });
  };

  const barHeight = 40;
  const chartWidth = 600;
  const chartHeight = data.length * (barHeight + 20) + 40;
  const minWidthForLabel = 0.08; // Minimum 8% width to show label

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Project Progress Overview</h2>
      
      {/* Chart */}
      <div className="relative">
        <svg width={chartWidth + 200} height={chartHeight} className="overflow-visible">
          {/* Y-axis labels */}
          {data.map((item, index) => {
            const total = item.open + item.started + item.completed + item.exception;
            return (
              <text
                key={`label-${index}`}
                x="180"
                y={index * (barHeight + 20) + 20 + barHeight / 2}
                textAnchor="end"
                className="text-sm fill-gray-700"
                dominantBaseline="middle"
              >
                {item.category} ({total})
              </text>
            );
          })}

          {/* X-axis */}
          <line
            x1="200"
            y1={chartHeight - 20}
            x2={chartWidth + 200}
            y2={chartHeight - 20}
            stroke="#e5e7eb"
            strokeWidth="1"
          />

          {/* X-axis labels */}
          {[0, 20, 40, 60, 80, 100].map((tick) => (
            <g key={`tick-${tick}`}>
              <line
                x1={200 + (tick / 100) * chartWidth}
                y1={chartHeight - 20}
                x2={200 + (tick / 100) * chartWidth}
                y2={chartHeight - 15}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x={200 + (tick / 100) * chartWidth}
                y={chartHeight - 5}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {tick}%
              </text>
            </g>
          ))}

          {/* Bars */}
          {data.map((item, index) => {
            const y = index * (barHeight + 20) + 20;
            const total = item.open + item.started + item.completed + item.exception;
            let xOffset = 200;

            const openWidth = (item.open / total) * chartWidth;
            const startedWidth = (item.started / total) * chartWidth;
            const completedWidth = (item.completed / total) * chartWidth;
            const exceptionWidth = (item.exception / total) * chartWidth;

            return (
              <g key={`bar-${index}`}>
                {/* Open segment */}
                <rect
                  x={xOffset}
                  y={y}
                  width={openWidth}
                  height={barHeight}
                  fill={colors.open}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onMouseEnter={(e) => handleMouseEnter(e, item.category, 'Open', item.open, total)}
                  onMouseLeave={handleMouseLeave}
                />
                
                {/* Open label */}
                {(item.open / total) >= minWidthForLabel && (
                  <text
                    x={xOffset + openWidth / 2}
                    y={y + barHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-medium fill-white pointer-events-none"
                  >
                    {item.open}
                  </text>
                )}
                
                {/* Started segment */}
                <rect
                  x={xOffset + openWidth}
                  y={y}
                  width={startedWidth}
                  height={barHeight}
                  fill={colors.started}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onMouseEnter={(e) => handleMouseEnter(e, item.category, 'Started', item.started, total)}
                  onMouseLeave={handleMouseLeave}
                />
                
                {/* Started label */}
                {(item.started / total) >= minWidthForLabel && (
                  <text
                    x={xOffset + openWidth + startedWidth / 2}
                    y={y + barHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-medium fill-white pointer-events-none"
                  >
                    {item.started}
                  </text>
                )}
                
                {/* Completed segment */}
                <rect
                  x={xOffset + openWidth + startedWidth}
                  y={y}
                  width={completedWidth}
                  height={barHeight}
                  fill={colors.completed}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onMouseEnter={(e) => handleMouseEnter(e, item.category, 'Completed', item.completed, total)}
                  onMouseLeave={handleMouseLeave}
                />
                
                {/* Completed label */}
                {(item.completed / total) >= minWidthForLabel && (
                  <text
                    x={xOffset + openWidth + startedWidth + completedWidth / 2}
                    y={y + barHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-medium fill-white pointer-events-none"
                  >
                    {item.completed}
                  </text>
                )}

                {/* Exception segment */}
                <rect
                  x={xOffset + openWidth + startedWidth + completedWidth}
                  y={y}
                  width={exceptionWidth}
                  height={barHeight}
                  fill={colors.exception}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onMouseEnter={(e) => handleMouseEnter(e, item.category, 'Exception', item.exception, total)}
                  onMouseLeave={handleMouseLeave}
                />
                
                {/* Exception label */}
                {(item.exception / total) >= minWidthForLabel && (
                  <text
                    x={xOffset + openWidth + startedWidth + completedWidth + exceptionWidth / 2}
                    y={y + barHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-medium fill-white pointer-events-none"
                  >
                    {item.exception}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip.visible && (
          <div
            className="absolute bg-gray-800 text-white px-2 py-1 rounded text-sm pointer-events-none z-10"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)'
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.open }}></div>
          <span className="text-sm text-gray-700">Open</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.started }}></div>
          <span className="text-sm text-gray-700">Started</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.completed }}></div>
          <span className="text-sm text-gray-700">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.exception }}></div>
          <span className="text-sm text-gray-700">Exception</span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalStackedBarChart;
