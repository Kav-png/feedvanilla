import React from "react"; // Explicitly import React for Vite compatibility
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/dashboard/Sidebar";
import StatusDashboard from "./components/dashboard/StatusDashboard";
import SubSectionPage from "./components/dashboard/SubSectionPage";

export default function App() {
  // Static dictionary for service divisions and their streams
  const sidebarOptions = [
    {
      title: "Asset Management",
      subOptions: [{ stream: "AM Tech VC" }, { stream: "AM Tech TF" }],
    },
    {
      title: "Investment Bank",
      subOptions: [{ stream: "IB Tech Trading" }, { stream: "IB Tech Risk" }],
    },
    {
      title: "Group Functions",
      subOptions: [{ stream: "GF Tech HR" }, { stream: "GF Tech Finance" }],
    },
  ];

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar sidebarOptions={sidebarOptions} />

          {/* Main Content */}
          <main className="flex-1 bg-gray-50 p-4">
            <Routes>
              <Route path="/" element={<StatusDashboard />} />
              {sidebarOptions.map((option) =>
                option.subOptions.map((subOption) => (
                  <Route
                    key={subOption.stream}
                    path={`/${subOption.stream
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                    element={<SubSectionPage title={subOption.stream} />}
                  />
                ))
              )}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
