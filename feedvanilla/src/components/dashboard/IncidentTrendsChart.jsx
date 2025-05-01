import { Line } from "react-chartjs-2";

const incidentTrendsData = {
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
  datasets: [
    {
      label: "Incidents",
      data: [5, 8, 6, 10, 7, 9, 12], // Replace with actual data
      borderColor: "#1e88e5",
      backgroundColor: "rgba(30, 136, 229, 0.2)",
      fill: true,
    },
  ],
};

const IncidentTrendsChart = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <h3 className="text-lg font-medium text-gray-700 mb-4">
      Incident Trends (Last 7 Days)
    </h3>
    <Line data={incidentTrendsData} />
  </div>
);

export default IncidentTrendsChart;
