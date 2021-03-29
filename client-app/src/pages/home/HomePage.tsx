import React, { ReactElement } from "react";
import { Container } from "semantic-ui-react";

interface Props {}

export default function HomePage({}: Props): ReactElement {
  return (
    <Container style={{ marginTop: "7rem" }}>
      <h1>Home Page</h1>
    </Container>
  );
}
