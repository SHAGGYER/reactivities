import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../models/Activity";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export const ActivityDashboard = ({
  activities,
  cancelSelectedActivity,
  selectActivity,
  selectedActivity,
  closeForm,
  editMode,
  openForm,
  createOrEdit,
  deleteActivity,
  submitting,
}: Props) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          selectActivity={selectActivity}
          activities={activities}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && (
          <ActivityDetails
            cancelSelectedActivity={cancelSelectedActivity}
            activity={selectedActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            submitting={submitting}
            closeForm={closeForm}
            createOrEdit={createOrEdit}
            activity={selectedActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
