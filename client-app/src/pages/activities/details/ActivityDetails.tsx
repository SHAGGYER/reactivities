import React, { useEffect } from "react";
import { Card, Image, Icon, Button, Grid } from "semantic-ui-react";
import { LoadingComponent } from "../../../components/LoadingComponent";
import { useStore } from "../../../stores/store";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

interface Props {}

export default observer(function ActivityDetails({}: Props) {
  const { id } = useParams<{ id: string }>();
  const { activityStore } = useStore();
  const {
    loadActivity,
    selectedActivity: activity,
    loadingInitial,
  } = activityStore;

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
});
