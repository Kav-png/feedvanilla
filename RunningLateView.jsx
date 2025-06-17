import React from "react";

const data = [
  { status: "OPEN", count: 10, delayed: 2, overdue: 3, color: "bg-gray-400" },
  { status: "STARTED", count: 8, delayed: 2, overdue: 1, color: "bg-blue-300" },
  { status: "FAILED", count: 2, delayed: 0, overdue: 4, color: "bg-red-600" },
  { status: "COMPLETED", count: 40, delayed: 10, overdue: null, color: "bg-green-900" },
];

const RunningLateView = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <table className="w-full text-sm font-medium">
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="mb-2">
              <td className="py-2 pr-4 text-left text-gray-700">{item.status}</td>
              <td className={`py-2 px-4 text-white text-center ${item.color}`}>
                {item.count}
              </td>
              <td className="py-2 px-4 text-white text-center bg-black">
                {item.delayed}
              </td>
              <td className="py-2 px-4 text-white text-center bg-purple-800">
                {item.overdue !== null ? item.overdue : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2 text-gray-800">Legend</h3>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
          <LegendItem color="bg-gray-400" label="Open Status" />
          <LegendItem color="bg-black" label="Delayed" />
          <LegendItem color="bg-blue-300" label="Started Status" />
          <LegendItem color="bg-purple-800" label="Overdue" />
          <LegendItem color="bg-red-600" label="Failed Status" />
          <LegendItem color="bg-green-900" label="Completed Status" />
        </div>
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-4 h-4 ${color} rounded`}></div>
    <span className="text-gray-700">{label}</span>
  </div>
);

export default RunningLateView;