import { useEffect, useState } from "react";
import { Log } from "./logger";
import "./App.css";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [viewed, setViewed] = useState([]);
  const [topN, setTopN] = useState(10);

  useEffect(() => {
    Log(
      "frontend",
      "info",
      "component",
      "Application Started"
    );

    const sampleData = [
      {
        id: 1,
        type: "Placement",
        message: "Cisco Hiring",
        timestamp: "2026-04-22 17:51:18",
      },
      {
        id: 2,
        type: "Result",
        message: "Mid Sem Result",
        timestamp: "2026-04-22 17:51:30",
      },
      {
        id: 3,
        type: "Event",
        message: "Hackathon",
        timestamp: "2026-04-22 17:51:06",
      },
      {
        id: 4,
        type: "Placement",
        message: "Google Hiring",
        timestamp: "2026-04-22 17:49:42",
      },
      {
        id: 5,
        type: "Result",
        message: "Project Review Result",
        timestamp: "2026-04-22 17:50:42",
      },
    ];

    setNotifications(sampleData);

    Log(
      "frontend",
      "info",
      "api",
      "Notifications Loaded"
    );
  }, []);

  const handleFilter = (type) => {
    setFilter(type);

    Log(
      "frontend",
      "info",
      "component",
      `Filter Applied: ${type}`
    );
  };

  const markViewed = (id) => {
    if (!viewed.includes(id)) {
      setViewed([...viewed, id]);

      Log(
        "frontend",
        "info",
        "component",
        `Notification Viewed ${id}`
      );
    }
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
    .slice(0, topN);

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
          onClick={() =>
            handleFilter("Placement")
          }
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

      <div className="top-select">
        <label>Priority Count:</label>

        <select
          value={topN}
          onChange={(e) =>
            setTopN(Number(e.target.value))
          }
        >
          <option value={10}>Top 10</option>
          <option value={15}>Top 15</option>
          <option value={20}>Top 20</option>
        </select>
      </div>

      <h2 className="section-title">
        Priority Notifications
      </h2>

      <div className="notification-container">
        {priorityNotifications.map((item) => (
          <div
            className="card"
            key={item.id}
            onClick={() => markViewed(item.id)}
          >
            <span
              className={`badge ${item.type.toLowerCase()}`}
            >
              {item.type}
            </span>

            <h3>{item.message}</h3>

            <small>{item.timestamp}</small>

            <p className="status">
              {viewed.includes(item.id)
                ? "Viewed"
                : "NEW"}
            </p>
          </div>
        ))}
      </div>

      <hr />

      <h2 className="section-title">
        All Notifications
      </h2>

      <div className="notification-container">
        {filtered.map((item) => (
          <div
            className="card"
            key={item.id}
            onClick={() => markViewed(item.id)}
          >
            <span
              className={`badge ${item.type.toLowerCase()}`}
            >
              {item.type}
            </span>

            <h3>{item.message}</h3>

            <small>{item.timestamp}</small>

            <p className="status">
              {viewed.includes(item.id)
                ? "Viewed"
                : "NEW"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;