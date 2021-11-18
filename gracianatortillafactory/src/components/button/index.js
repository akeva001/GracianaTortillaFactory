import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export default function button({ text }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <Button variant="light">{text}</Button>
    </div>
  );
}
