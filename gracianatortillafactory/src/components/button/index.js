import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class button extends React.Component {
  render() {
    return (
      <div style={{ margin: "1rem 0" }}>
        <Button variant="light">Print</Button>
      </div>
    );
  }
}

export default button;
