import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

interface Props {}

export default function HomePage({}: Props): ReactElement {
  return (
    <Container style={{ marginTop: "7rem" }}>
      <h1>Home Page</h1>
      <h3>
        Go to <Link to="/activities">activities</Link>
      </h3>
    </Container>
  );
}
