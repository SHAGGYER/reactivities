import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../models/Activity";
import { useStore } from "../../../stores/store";
import { v4 } from "uuid";

interface Props {}

export default observer(function ActivityForm({}: Props) {
  const history = useHistory();
  const { activityStore } = useStore();
  const { loadActivity, createActivity, updateActivity } = activityStore;
  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  function handleSubmit() {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: v4() };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Date"
          type="date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          loading={activityStore.loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
});
