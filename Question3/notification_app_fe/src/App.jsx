import { useEffect, useState } from "react";
import { logger } from "./logger";
import "./index.css";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    logger("Application Started");

    const sampleData = [
      {
        id: 1,
        type: "Placement",
        message: "Cisco Hiring",
        timestamp: "2026-04-22T17:51:18",
      },
      {
        id: 2,
        type: "Result",
        message: "Mid Sem Result",
        timestamp: "2026-04-22T17:51:30",
      },
      {
        id: 3,
        type: "Event",
        message: "Hackathon",
        timestamp: "2026-04-22T17:51:06",
      },
      {
        id: 4,
        type: "Placement",
        message: "Google Hiring",
        timestamp: "2026-04-22T17:49:42",
      },
      {
        id: 5,
        type: "Result",
        message: "Project Review Result",
        timestamp: "2026-04-22T17:50:42",
      },
    ];

    setNotifications(sampleData);

    logger("Notifications Loaded");
  }, []);

  const handleFilter = (type) => {
    logger(`Filter Applied: ${type}`);
    setFilter(type);
  };

  const filtered =
    filter === "All"
      ? notifications
      : notifications.filter(
          (item) => item.type === filter
        );

  const weights = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const priorityNotifications = [...notifications]
    .sort((a, b) => {
      if (weights[b.type] !== weights[a.type]) {
        return weights[b.type] - weights[a.type];
      }

      return (
        new Date(b.timestamp) -
        new Date(a.timestamp)
      );
    })
    .slice(0, 10);

  return (
    <div className="app">
      <header className="header">
        <h1>Campus Notifications</h1>
      </header>

      <div className="filters">
        <button onClick={() => handleFilter("All")}>
          All
        </button>

        <button
          onClick={() => handleFilter("Placement")}
        >
          Placement
        </button>

        <button
          onClick={() => handleFilter("Result")}
        >
          Result
        </button>

        <button
          onClick={() => handleFilter("Event")}
        >
          Event
        </button>
      </div>

      <h2 className="section-title">
        Priority Notifications
      </h2>

      <div className="notification-container">
        {priorityNotifications.map((item) => (
          <div className="card" key={item.id}>
            <span
              className={`badge ${item.type.toLowerCase()}`}
            >
              {item.type}
            </span>

            <h3>{item.message}</h3>

            <small>{item.timestamp}</small>
          </div>
        ))}
      </div>

      <hr />

      <h2 className="section-title">
        All Notifications
      </h2>

      <div className="notification-container">
        {filtered.map((item) => (
          <div className="card" key={item.id}>
            <span
              className={`badge ${item.type.toLowerCase()}`}
            >
              {item.type}
            </span>

            <h3>{item.message}</h3>

            <small>{item.timestamp}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;