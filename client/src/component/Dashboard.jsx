
import React, { useState } from "react";
import Tracker from "./Tracker";
import Analytics from "./Analytics";
import History from "./History";

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("Tracker");

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <button onClick={() => handleComponentChange("Tracker")}>
          Tracker
        </button>
        <button onClick={() => handleComponentChange("Analytics")}>
          Analytics
        </button>
        <button onClick={() => handleComponentChange("History")}>
          History
        </button>
      </div>
      {selectedComponent === "Tracker" && <Tracker />}
      {selectedComponent === "Analytics" && <Analytics />}
      {selectedComponent === "History" && <History />}
    </div>
  );
};

export default Dashboard;
