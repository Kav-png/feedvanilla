import React, { useState, useEffect, useRef } from 'react';

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
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const containerRef = useRef(null);

  const colors = {
    open: '#6b7280',        // gray
    started: '#3b82f6',     // blue
    completed: '#10b981',   // emerald
    exception: '#ef4444'    // red
  };

  // Update dimensions when container size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width: Math.max(300, width), height: Math.max(200, height) });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Use ResizeObserver if available for more accurate container tracking
    let resizeObserver;
    if (window.ResizeObserver && containerRef.current) {
      resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

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

  // Dynamic sizing calculations
  const minWidthForLabel = 0.08; // Minimum 8% width to show label
  const headerHeight = 80;
  const legendHeight = 60;
  const availableHeight = dimensions.height - headerHeight - legendHeight;
  const barHeight = Math.max(20, Math.min(40, availableHeight / (data.length * 1.5)));
  const barSpacing = Math.max(10, barHeight * 0.5);
  
  // Calculate if we should show y-axis labels based on available space
  const labelWidth = 180;
  const minWidthForLabels = 500; // Minimum container width to show labels
  const showLabels = dimensions.width >= minWidthForLabels;
  
  const chartMarginLeft = showLabels ? labelWidth : 40;
  const chartMarginRight = 40;
  const chartWidth = Math.max(200, dimensions.width - chartMarginLeft - chartMarginRight);
  const chartHeight = data.length * (barHeight + barSpacing);

  return (
    <div ref={containerRef} className="w-full h-full p-4 bg-white overflow-hidden">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Project Progress Overview</h2>
      
      {/* Chart Container */}
      <div className="relative flex-1" style={{ height: `calc(100% - ${headerHeight + legendHeight}px)` }}>
        <svg 
          width={dimensions.width - 32} 
          height={Math.max(chartHeight + 40, availableHeight)} 
          className="overflow-visible"
          viewBox={`0 0 ${dimensions.width - 32} ${Math.max(chartHeight + 40, availableHeight)}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Y-axis labels - only show if container is wide enough */}
          {showLabels && data.map((item, index) => {
            const total = item.open + item.started + item.completed + item.exception;
            return (
              <text
                key={`label-${index}`}
                x={chartMarginLeft - 10}
                y={index * (barHeight + barSpacing) + 20 + barHeight / 2}
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
            x1={chartMarginLeft}
            y1={chartHeight + 20}
            x2={chartMarginLeft + chartWidth}
            y2={chartHeight + 20}
            stroke="#e5e7eb"
            strokeWidth="1"
          />

          {/* X-axis labels - dynamic based on width */}
          {[0, 25, 50, 75, 100].map((tick) => {
            if (chartWidth < 300 && tick !== 0 && tick !== 50 && tick !== 100) return null;
            return (
              <g key={`tick-${tick}`}>
                <line
                  x1={chartMarginLeft + (tick / 100) * chartWidth}
                  y1={chartHeight + 20}
                  x2={chartMarginLeft + (tick / 100) * chartWidth}
                  y2={chartHeight + 25}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <text
                  x={chartMarginLeft + (tick / 100) * chartWidth}
                  y={chartHeight + 35}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((item, index) => {
            const y = index * (barHeight + barSpacing) + 20;
            const total = item.open + item.started + item.completed + item.exception;
            let xOffset = chartMarginLeft;

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
                
                {/* Open label - only show if segment is wide enough and bar is tall enough */}
                {(item.open / total) >= minWidthForLabel && barHeight >= 20 && (
                  <text
                    x={xOffset + openWidth / 2}
                    y={y + barHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`font-medium fill-white pointer-events-none ${barHeight < 30 ? 'text-xs' : 'text-sm'}`}
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
                {(item.started / total) >= minWidthForLabel && barHeight >= 20 && (
                  <text
                    x={xOffset + openWidth + startedWidth / 2}
                    y={y + barHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`font-medium fill-white pointer-events-none ${barHeight < 30 ? 'text-xs' : 'text-sm'}`}
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
                {(item.completed / total) >= minWidthForLabel && barHeight >= 20 && (
                  <text
                    x={xOffset + openWidth + startedWidth + completedWidth / 2}
                    y={y + barHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`font-medium fill-white pointer-events-none ${barHeight < 30 ? 'text-xs' : 'text-sm'}`}
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
                {(item.exception / total) >= minWidthForLabel && barHeight >= 20 && (
                  <text
                    x={xOffset + openWidth + startedWidth + completedWidth + exceptionWidth / 2}
                    y={y + barHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`font-medium fill-white pointer-events-none ${barHeight < 30 ? 'text-xs' : 'text-sm'}`}
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
            className="absolute bg-gray-800 text-white px-2 py-1 rounded text-sm pointer-events-none z-10 whitespace-nowrap"
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

      {/* Legend - responsive layout */}
      <div className={`flex justify-center mt-4 ${dimensions.width < 400 ? 'flex-wrap gap-2' : 'gap-6'}`}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.open }}></div>
          <span className="text-xs text-gray-700">Open</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.started }}></div>
          <span className="text-xs text-gray-700">Started</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.completed }}></div>
          <span className="text-xs text-gray-700">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.exception }}></div>
          <span className="text-xs text-gray-700">Exception</span>
        </div>
      </div>

      {/* Show category info when labels are hidden */}
      {!showLabels && (
        <div className="mt-4 text-xs text-gray-600 text-center">
          <div className="grid grid-cols-1 gap-1">
            {data.map((item, index) => {
              const total = item.open + item.started + item.completed + item.exception;
              return (
                <div key={`mobile-label-${index}`}>
                  {item.category} ({total})
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HorizontalStackedBarChart;
