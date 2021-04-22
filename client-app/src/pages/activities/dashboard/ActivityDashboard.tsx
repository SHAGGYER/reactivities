import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, List } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

interface Props {}

export default observer(function ActivityDashboard({}: Props) {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
});
