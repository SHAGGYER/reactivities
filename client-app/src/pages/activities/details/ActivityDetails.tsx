import React, { useEffect } from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import { LoadingComponent } from "../../../components/LoadingComponent";
import { useStore } from "../../../stores/store";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

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
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity?.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity?.title}</Card.Header>
        <Card.Meta>
          <span>{activity?.date}</span>
        </Card.Meta>
        <Card.Description>{activity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            color="blue"
            content="Edit"
            as={Link}
            to={`/manage/${activity.id}`}
            basic
          />
          <Button color="grey" content="Cancel" basic />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
