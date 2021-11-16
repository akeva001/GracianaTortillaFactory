import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class form extends React.Component {
  render() {
    return (
      <div style={{ margin: "1rem 0" }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Item Code</Form.Label>
            <Form.Control type="email" placeholder="Code" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default form;
