import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = async () => {
    const { data } = await axios.get("https://localhost:5001/api/activities");
    setActivities(data);
  };

  return (
    <>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity, index) => (
          <List.Item key={index}>{activity.title}</List.Item>
        ))}
      </List>
    </>
  );
}

export default App;
