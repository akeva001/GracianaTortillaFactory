import React, { Component } from "react";
import Select from "react-select";
import "./index.css";

class dropdownMenu extends React.Component {
  handleChange = (value) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange("topics", value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur("topics", true);
  };

  render() {
    const { options, title } = this.props;

    return (
      <div style={{ margin: "1rem 0" }}>
        <label htmlFor="color" style={{ padding: "7px" }}>
          {title}
        </label>
        <Select
          id="color"
          options={options}
          multi={true}
          //onChange={this.handleChange}
          //onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error && this.props.touched && (
          <div style={{ color: "red", marginTop: ".5rem" }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
}

export default dropdownMenu;
