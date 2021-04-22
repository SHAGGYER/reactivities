import { observer } from "mobx-react-lite";
import React from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import ActivityListItem from "./ActivityListItem";

interface Props {}

export default observer(function ActivityList({}: Props) {
  const { activityStore } = useStore();
  const { groupedActivitiesList } = activityStore;

  return (
    <React.Fragment>
      {groupedActivitiesList.map(([group, activities]) => (
        <React.Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {activities.map((activity, index) => (
            <ActivityListItem activity={activity} key={index} />
          ))}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
});
