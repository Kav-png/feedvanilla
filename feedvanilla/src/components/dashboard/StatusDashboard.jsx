import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const ProductionDashboard = () => {
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [impactedConsumerFilter, setImpactedConsumerFilter] = useState("");
  const [impactedRegionFilter, setImpactedRegionFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of incidents per page
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Updated UBS colors
  const statusColors = {
    GREEN: "#4CAF50", // UBS Green
    AMBER: "#f5a623", // UBS Orange
    RED: "#e60000", // UBS Red
  };

  // Updated UBS colors for severity
  const severityColors = {
    1: "#e60000", // UBS Red for Severity 1
    2: "#ff5722", // UBS Orange-Red for Severity 2
    3: "#f5a623", // UBS Orange for Severity 3
    4: "#4CAF50", // UBS Green for Severity 4
    5: "#81C784", // UBS Light Green for Severity 5
  };

  // Dashboard data
  const dashboardData = {
    overallStatus: "AMBER",
    timestamp: "Friday, March 21 2025 10:07:02 GMT",
    regions: [
      { name: "APAC", time: "07:00 SGT" },
      { name: "EMEA", time: "07:00 UTC" },
      { name: "AMER", time: "07:00 ET" },
    ],
    coreInfra: [
      { name: "Network Services", status: "GREEN" },
      { name: "Distributed Hosting", status: "AMBER" },
      { name: "TISO", status: "GREEN" },
      { name: "Data Centre Services", status: "GREEN" },
      { name: "Mainframe & Midrange", status: "GREEN" },
      { name: "Automation Services", status: "GREEN" },
    ],
    frontEndInfra: [
      { name: "Mobile Pass", status: "GREEN" },
      { name: "MS Office 365", status: "RED" },
      { name: "MS Teams / Voice", status: "GREEN" },
      { name: "Remote Access", status: "GREEN" },
      { name: "UBS Workspace Cloud", status: "GREEN" },
      { name: "UBS Workspace Virtual", status: "GREEN" },
    ],
    businessApplications: [
      { name: "Investment Bank", status: "GREEN" },
      { name: "Asset Management", status: "GREEN" },
      { name: "Group Functions", status: "GREEN" },
      { name: "Technology Services", status: "AMBER" },
      { name: "WMPC", status: "GREEN" },
      { name: "WM USA", status: "GREEN" },
    ],
    incidentCounts: {
      "Asset Management": { 1: 0, 2: 0, 3: 0, 4: 0, 5: 2 },
      "Investment Bank": { 1: 0, 2: 0, 3: 0, 4: 1, 5: 28 },
      "Group Functions": { 1: 0, 2: 0, 3: 0, 4: 1, 5: 43 },
      "WM USA": { 1: 0, 2: 0, 3: 0, 4: 0, 5: 3 },
      WMPC: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 5 },
      "Technology Services": { 1: 0, 2: 0, 3: 2, 4: 3, 5: 45 },
    },
    incidents: [
      {
        division: "Group Functions",
        severity: 4,
        id: "INC1033975851",
        title:
          "[HACL][Office Tier G][IT Tier A], Clayton Road, London, United Kingdom - Utility Power Service - DNO",
        duration: "00 Days, 09 Hours 23 Minutes",
        impactedConsumer: "Corporate Users",
        impactedRegion: "EMEA",
      },
      {
        division: "Investment Bank",
        severity: 4,
        id: "INC1033958782",
        title:
          "Prime brokerage trade processing is stuck in Transaction Processing Engine (TPE) application",
        duration: "01 Days, 09 Hours 52 Minutes",
        impactedConsumer: "Investment Bank Clients",
        impactedRegion: "APAC",
      },
      {
        division: "Technology Services",
        severity: 3,
        id: "INC1033889297",
        title:
          "Multiple users across EMEA region are unable to make and receive calls using Microsoft Teams.",
        duration: "06 Days, 19 Hours 54 Minutes",
        impactedConsumer: "Corporate Users",
        impactedRegion: "EMEA",
      },
      {
        division: "Technology Services",
        severity: 4,
        id: "INC1033689369",
        title: "Delay in mail delivery for some users on Office 365",
        duration: "21 Days, 01 Hours 11 Minutes",
      },
      {
        division: "Technology Services",
        severity: 3,
        id: "INC1033778111",
        title:
          "Multiple applications across numerous LoB have reported latency and dropped packets.",
        duration: "14 Days, 15 Hours 12 Minutes",
      },
      {
        division: "WMPC",
        severity: 4,
        id: "INC1033321955",
        title:
          "Some account transfers and IP SIC outbound payments are not processed through Instant Payments (NPP)",
        duration: "48 Days, 23 Hours 28 Minutes",
      },
    ],
  };

  const changeStatistics = {
    "Asset Management": { last24Hours: 0, last7Days: 25, next7Days: 15 },
    "Investment Bank": { last24Hours: 5, last7Days: 30, next7Days: 20 },
    "Group Functions": { last24Hours: 8, last7Days: 18, next7Days: 12 },
    "WM USA": { last24Hours: 3, last7Days: 10, next7Days: 5 },
    WMPC: { last24Hours: 7, last7Days: 22, next7Days: 18 },
    "Technology Services": { last24Hours: 12, last7Days: 40, next7Days: 25 },
  };

  // Mock ML insights data
  const mlInsights = {
    "Asset Management": { risk: 0.2 }, // 20% risk
    "Investment Bank": { risk: 0.5 }, // 50% risk
    "Group Functions": { risk: 0.8 }, // 80% risk
    "WM USA": { risk: 0.1 }, // 10% risk
    WMPC: { risk: 0.3 }, // 30% risk
    "Technology Services": { risk: 0.7 }, // 70% risk
  };

  // RiskBadge Component
  const RiskBadge = ({ risk }) => {
    let backgroundColor;
    if (risk < 0.3) backgroundColor = "#4CAF50"; // Green for low risk
    else if (risk < 0.6) backgroundColor = "#f5a623"; // Orange for medium risk
    else backgroundColor = "#e60000"; // Red for high risk

    return (
      <span
        className="px-3 py-1 rounded-full text-sm font-medium text-white"
        style={{ backgroundColor }}
      >
        {risk < 0.3 ? "Low Risk" : risk < 0.6 ? "Medium Risk" : "High Risk"}
      </span>
    );
  };

  // Move getFilteredIncidents above its usage
  const getFilteredIncidents = () => {
    let filtered = dashboardData.incidents;

    // Filter by division
    if (selectedDivision) {
      filtered = filtered.filter(
        (incident) => incident.division === selectedDivision
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (incident) =>
          incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.division.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by severity
    if (severityFilter) {
      filtered = filtered.filter(
        (incident) => incident.severity.toString() === severityFilter
      );
    }

    // Filter by impacted consumer
    if (impactedConsumerFilter) {
      filtered = filtered.filter(
        (incident) => incident.impactedConsumer === impactedConsumerFilter
      );
    }

    // Filter by impacted region
    if (impactedRegionFilter) {
      filtered = filtered.filter(
        (incident) => incident.impactedRegion === impactedRegionFilter
      );
    }

    // Sort incidents
    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  const paginatedIncidents = getFilteredIncidents().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(getFilteredIncidents().length / itemsPerPage);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // StatusBadge Component with UBS colors
  const StatusBadge = ({ status }) => {
    const backgroundColor = statusColors[status] || "#9e9e9e"; // Default color if status is invalid
    return (
      <span
        className="px-3 py-1 rounded-full text-sm font-medium text-white"
        style={{ backgroundColor }}
      >
        {status || "Unknown"}
      </span>
    );
  };

  // Updated SeverityBadge Component
  const SeverityBadge = ({ severity }) => {
    const backgroundColor = severityColors[severity];
    const textColor = "#ffffff"; // White text for all UBS colors

    return (
      <span
        className="px-3 py-1 rounded-full text-sm font-medium inline-block transition-transform duration-300 hover:translate-x-1 hover:translate-y-1"
        style={{ backgroundColor, color: textColor }}
      >
        Severity {severity}
      </span>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div
        className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm"
        style={{}}
      >
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">
            Technology Production Stability View
          </h1>
          <p className="text-sm text-gray-500">{dashboardData.timestamp}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="text-sm text-gray-600">Overall Readiness</p>
            <StatusBadge status={dashboardData.overallStatus} />
          </div>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: statusColors[dashboardData.overallStatus],
            }}
          ></div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Regions Column */}
        <div className="md:col-end-1 flex flex-col justify-evenly">
          {dashboardData.regions.map((region, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg shadow-sm text-center md:mb-0"
              style={{
                height: "calc(26% - 1rem)", // Ensures equal height for each region card
                maxWidth: "90%", // Reduces the width of the region column
                margin: "0 auto", // Centers the region cards horizontally
              }}
            >
              <h3 className="font-medium text-gray-700">{region.name}</h3>
              <p className="text-xs text-gray-500">{region.time}</p>
            </div>
          ))}
        </div>

        {/* Technology Infrastructure Tables */}
        <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Core Technology Infra */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div
              className="p-3"
              style={{
                borderBottom: "3px solid #e60000", // UBS red underline
              }}
            >
              <h2 className="font-semibold text-[#111111]">
                Core Technology Infra
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {dashboardData.coreInfra.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3"
                >
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Front End Technology Infra */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div
              className="p-3"
              style={{
                borderBottom: "3px solid #e60000", // UBS red underline
              }}
            >
              <h2 className="font-semibold text-[#111111]">
                Front End Technology Infra
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {dashboardData.frontEndInfra.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3"
                >
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Business Application Portfolio */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div
              className="p-3"
              style={{
                borderBottom: "3px solid #e60000", // UBS red underline
              }}
            >
              <h2 className="font-semibold text-[#111111]">
                Business Application Portfolio
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {dashboardData.businessApplications.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3"
                >
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Updated Incident Summary by Division */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div
          className="p-3 border-g"
          style={{
            borderBottom: "3px solid #e60000", // UBS red underline
          }}
        >
          <h2 className="font-semibold text-gray-700">
            Incident Summary by Division
          </h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table
            className="w-full text-sm text-left table-fixed"
            style={{ tableLayout: "fixed" }} // Ensures equal column widths
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2 w-1/6">Severity</th>
                {Object.keys(dashboardData.incidentCounts).map(
                  (division, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-2 w-1/6 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        setSelectedDivision(
                          division === selectedDivision ? null : division
                        )
                      }
                    >
                      <div
                        className={`flex flex-col items-center ${
                          division === selectedDivision ? "font-bold" : ""
                        }`}
                      >
                        {division}
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((sev, idx) => (
                <tr key={idx} className="border-g">
                  <td
                    className="px-4 py-2 font-medium text-gray-500" // Gray text for severity labels
                  >
                    Severity {sev}
                  </td>
                  {Object.keys(dashboardData.incidentCounts).map(
                    (division, idxDiv) => {
                      const count = dashboardData.incidentCounts[division][sev];
                      return (
                        <td key={idxDiv} className="px-4 py-2 text-center">
                          <div
                            className={`rounded py-1 ${
                              count > 0 ? "font-medium" : ""
                            }`}
                            style={{
                              backgroundColor:
                                count > 0 ? severityColors[sev] : "#f5f5f5",
                              color: count > 0 ? "#ffffff" : "#9e9e9e",
                            }}
                          >
                            {count}
                          </div>
                        </td>
                      );
                    }
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Updated Change Statistics Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div
          className="p-3 border-g"
          style={{
            borderBottom: "3px solid #e60000", // UBS red underline
          }}
        >
          <h2 className="font-semibold text-gray-700">
            Change Statistics by Division
          </h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table
            className="w-full text-sm text-left table-fixed"
            style={{ tableLayout: "fixed" }} // Ensures equal column widths
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2 w-1/6">Time Period</th>
                {Object.keys(dashboardData.incidentCounts).map(
                  (division, idx) => (
                    <th key={idx} className="px-4 py-2 w-1/6 text-center">
                      {division}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Last 24 Hours", key: "last24Hours" },
                { label: "Last 7 Days", key: "last7Days" },
                { label: "Next 7 Days", key: "next7Days" },
              ].map((timePeriod, idx) => (
                <tr key={idx} className="border-g">
                  <td className="px-4 py-2 font-medium text-gray-500">
                    {/* Gray text for time period */}
                    {timePeriod.label}
                  </td>
                  {Object.keys(changeStatistics).map((division, idxDiv) => {
                    const changeStats =
                      changeStatistics[division][timePeriod.key];
                    return (
                      <td key={idxDiv} className="px-4 py-2 text-center">
                        <div
                          className={`rounded py-1 ${
                            changeStats > 0 ? "font-medium" : ""
                          }`}
                          style={{
                            backgroundColor:
                              changeStats > 0 ? "#d0e7ff" : "#f5f5f5", // Muted blue for cells with data
                            color: changeStats > 0 ? "#0056b3" : "#9e9e9e", // Dark blue for text
                          }}
                        >
                          {changeStats}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ML Insights Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div
          className="p-3 border-g"
          style={{
            borderBottom: "3px solid #e60000", // UBS red underline
          }}
        >
          <h2 className="font-semibold text-gray-700">
            Predicted Incident Risk (Next Hour)
          </h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(mlInsights).map((division, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow"
            >
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                {division}
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="h-4 rounded-full"
                  style={{
                    width: `${mlInsights[division].risk * 100}%`,
                    backgroundColor:
                      mlInsights[division].risk < 0.3
                        ? "#4CAF50"
                        : mlInsights[division].risk < 0.6
                        ? "#f5a623"
                        : "#e60000",
                  }}
                ></div>
              </div>
              <RiskBadge risk={mlInsights[division].risk} />
            </div>
          ))}
        </div>
      </div>

      {/* Current Incidents */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div
          className="p-3 border-g flex justify-between items-center"
          style={{
            borderBottom: "3px solid #e60000", // UBS red underline
          }}
        >
          <h2 className="font-semibold text-gray-700">
            Current Incidents {selectedDivision ? `- ${selectedDivision}` : ""}
          </h2>
          {selectedDivision && (
            <button
              onClick={() => setSelectedDivision(null)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-200 disabled:opacity-50 ml-2 mb-2"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Search and Filter */}
        <div className="p-4 flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow">
            <input
              type="text"
              placeholder="Search incidents..."
              className="w-full outline-none text-sm text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Severity Filter */}
          <div className="relative">
            <select
              className="w-full bg-white rounded-lg pl-3 pr-7 py-2 shadow appearance-none cursor-pointer text-sm text-gray-700 hover:scale-105 transition-transform duration-200"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="">All Severities</option>
              <option value="1">Severity 1</option>
              <option value="2">Severity 2</option>
              <option value="3">Severity 3</option>
              <option value="4">Severity 4</option>
              <option value="5">Severity 5</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Impacted Consumer Filter */}
          <div className="relative">
            <select
              className="w-full bg-white rounded-lg pl-3 pr-7 py-2 shadow appearance-none cursor-pointer text-sm text-gray-700"
              value={impactedConsumerFilter}
              onChange={(e) => setImpactedConsumerFilter(e.target.value)}
            >
              <option value="">All Consumers</option>
              {[
                ...new Set(
                  dashboardData.incidents.map((i) => i.impactedConsumer)
                ),
              ].map((consumer, idx) => (
                <option key={idx} value={consumer}>
                  {consumer}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Impacted Region Filter */}
          <div className="relative">
            <select
              className="w-full bg-white rounded-lg pl-3 pr-7 py-2 shadow appearance-none cursor-pointer text-sm text-gray-700"
              value={impactedRegionFilter}
              onChange={(e) => setImpactedRegionFilter(e.target.value)}
            >
              <option value="">All Regions</option>
              {[
                ...new Set(
                  dashboardData.incidents.map((i) => i.impactedRegion)
                ),
              ].map((region, idx) => (
                <option key={idx} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Incident Table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("division")}
                >
                  <div className="flex items-center">
                    Division
                    {sortConfig.key === "division" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("severity")}
                >
                  <div className="flex items-center">
                    Severity
                    {sortConfig.key === "severity" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("id")}
                >
                  <div className="flex items-center">
                    Incident ID
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("title")}
                >
                  <div className="flex items-center">
                    Title
                    {sortConfig.key === "title" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("duration")}
                >
                  <div className="flex items-center">
                    Duration
                    {sortConfig.key === "duration" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedIncidents.map((incident, idx) => (
                <tr
                  key={idx}
                  className="border-g hover:bg-gray-100 hover:scale-[1.02] transition-transform duration-200"
                  style={{
                    backgroundColor: "#f5f5f5", // Light gray background for rows
                    borderRadius: "12px", // Rounded corners for rows
                    marginBottom: "8px", // Padding between rows
                  }}
                >
                  <td className="px-4 py-3 font-medium text-[#333333]">
                    {incident.division}
                  </td>
                  <td className="px-4 py-3">
                    <SeverityBadge severity={incident.severity} />
                  </td>
                  <td className="px-4 py-3 text-[#e60000]">{incident.id}</td>
                  <td className="px-4 py-3 text-[#333333] max-w-md truncate">
                    {incident.title}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {incident.duration}
                  </td>
                </tr>
              ))}
              {paginatedIncidents.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    No incidents found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-200 disabled:opacity-50 ml-2 mb-2"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-200 disabled:opacity-50 mr-2 mb-2"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Status Legend
        </h3>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: statusColors.RED }}
            ></div>
            <span className="text-xs text-gray-600">
              Severity 1-2 incident(s)
            </span>
          </div>
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: statusColors.AMBER }}
            ></div>
            <span className="text-xs text-gray-600">
              Severity 3 incident(s)
            </span>
          </div>
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: statusColors.GREEN }}
            ></div>
            <span className="text-xs text-gray-600">
              Severity 4-5 or no incidents
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionDashboard;
