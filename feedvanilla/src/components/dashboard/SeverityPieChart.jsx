import { Pie } from "react-chartjs-2";

const severityDistributionData = {
  labels: ["Severity 1-2", "Severity 3", "Severity 4-5"],
  datasets: [
    {
      data: [
        Object.values(dashboardData.incidentCounts).reduce(
          (sum, division) => sum + division["1-2"],
          0
        ),
        Object.values(dashboardData.incidentCounts).reduce(
          (sum, division) => sum + division[3],
          0
        ),
        Object.values(dashboardData.incidentCounts).reduce(
          (sum, division) => sum + division["4-5"],
          0
        ),
      ],
      backgroundColor: ["#ef5350", "#ffb74d", "#7cb342"],
    },
  ],
};

const SeverityPieChart = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <h3 className="text-lg font-medium text-gray-700 mb-4">
      Incident Severity Distribution
    </h3>
    <Pie data={severityDistributionData} />
  </div>
);

export default SeverityPieChart;
