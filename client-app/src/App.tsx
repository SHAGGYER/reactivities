import React, { useEffect, useState } from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import { Activity } from "./models/Activity";
import Navbar from "./components/Navbar";
import ActivityDashboard from "./pages/activities/dashboard/ActivityDashboard";
import agent from "./services/agent";
import { LoadingComponent } from "./components/LoadingComponent";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router";
import HomePage from "./pages/home/HomePage";
import ActivityForm from "./pages/activities/form/ActivityForm";
import ActivityDetails from "./pages/activities/details/ActivityDetails";

function App() {
  const { activityStore } = useStore();

  const location = useLocation();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading App..." />;

  return (
    <React.Fragment>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route
        path="/(.+)"
        render={() => (
          <React.Fragment>
            <Navbar />
            <Container style={{ marginTop: "7rem" }}>
              <Route path="/activities" exact>
                <ActivityDashboard />
              </Route>
              <Route
                key={location.key}
                path={["/create-activity", "/manage/:id"]}
              >
                <ActivityForm />
              </Route>
              <Route path="/activities/:id">
                <ActivityDetails />
              </Route>
            </Container>
          </React.Fragment>
        )}
      ></Route>
    </React.Fragment>
  );
}

export default observer(App);
