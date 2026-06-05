import { useEffect, useState } from "react";
import { logger } from "./logger";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    logger("Application Started");

    const sampleData = [
      { id: 1, type: "Placement", message: "Cisco Hiring" },
      { id: 2, type: "Result", message: "Mid Sem Result" },
      { id: 3, type: "Event", message: "Hackathon" },
      { id: 4, type: "Placement", message: "Google Hiring" },
    ];

    setNotifications(sampleData);
  }, []);

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((item) => item.type === filter);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notifications</h1>

      <select
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          logger(`Filter changed to ${e.target.value}`);
        }}
      >
        <option value="All">All</option>
        <option value="Placement">Placement</option>
        <option value="Result">Result</option>
        <option value="Event">Event</option>
      </select>

      <br />
      <br />

      {filteredNotifications.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{item.type}</h3>
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
}

export default App;