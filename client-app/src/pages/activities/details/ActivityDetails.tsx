import React from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import { Activity } from "../../../models/Activity";

interface Props {
  activity: Activity;
  cancelSelectedActivity: () => void;
  openForm: (id: string) => void;
}

export const ActivityDetails = ({
  activity,
  cancelSelectedActivity,
  openForm,
}: Props) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity?.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity?.date}</span>
        </Card.Meta>
        <Card.Description>{activity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(activity?.id)}
            color="blue"
            content="Edit"
            basic
          />
          <Button
            onClick={cancelSelectedActivity}
            color="grey"
            content="Cancel"
            basic
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
