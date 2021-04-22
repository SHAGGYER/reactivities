import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import { Header, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";

interface Props {}

export default observer(function ServerError({}: Props): ReactElement {
  const { commonStore } = useStore();
  return (
    <div>
      <Header as="h1" content="Server Error" />
      <Header sub as="h5" content={commonStore.error?.message} />
      {commonStore.error?.details && (
        <Segment>
          <Header as="h4" content="Stack trace" color="teal" />
          <code style={{ marginTop: 10 }}>{commonStore.error.details}</code>
        </Segment>
      )}
    </div>
  );
});
