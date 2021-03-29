import React, { useEffect, useState } from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import { Activity } from "./models/Activity";
import Navbar from "./components/Navbar";
import { ActivityDashboard } from "./pages/activities/dashboard/ActivityDashboard";
import { v4 } from "uuid";
import agent from "./services/agent";
import { LoadingComponent } from "./components/LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = async () => {
    const response = await agent.Activities.list();
    let activities: Activity[] = [];
    response.forEach((activity, index) => {
      activity.date = activity.date.split("T")[0];
      activities.push(activity);
    });
    setActivities(activities);
    setLoading(false);
  };

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((a) => a.id === id));
  };

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = v4();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, { ...activity }]);
        setSelectedActivity(activity);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent content="Loading App..." />;

  return (
    <React.Fragment>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectedActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </React.Fragment>
  );
}

export default App;
